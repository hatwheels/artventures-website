// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuetify from 'vuetify/lib/framework';
// import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import './assets/style/index.scss'
import DefaultLayout from '~/layouts/Default.vue'
import UserLayout from '~/layouts/User.vue'
import VoidLayout from '~/layouts/Void.vue'
import VueCookieAcceptDecline from 'vue-cookie-accept-decline'
import axios from 'axios'
import VueWaypoint from "vue-waypoint"
import goTo from 'vuetify/es5/services/goto'
import AuthPlugin from './plugins/auth'
import ImgdbPlugin from './plugins/imgdb'

export default function (Vue, { appOptions, router, head, isClient }) {
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
  })
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Nunito:400,600|Playfair+Display:400,600,700|Raleway:400,600,700|Montserrat:400,600,700|Noto+Sans:400,600,700&display=swap'
  })
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
  });
  head.link.push({
    rel: 'stylesheet',
    type: "text/css",
    href: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.4.5/css/swiper.min.css'
    // latest swiper is 6.x.x but hasn't been incorporated into vue-awesome-swiper yet
    // href: 'https://unpkg.com/swiper@6.2.0/swiper-bundle.min.css'
  })
  head.link.push({
    rel: 'stylesheet',
    type: "text/css",
    href: 'https://cdn.jsdelivr.net/npm/vue-cookie-accept-decline@5.3.1/dist/vue-cookie-accept-decline.css'
  })

  const vuetifyOpts = {
    icons: {
      iconfont: 'mdi',
    },
    theme: {
      themes: {
        light: {
          error: '#b71c1c',
        },
      },
    },
  }// opts includes, vuetify themes, icons, etc.
  Vue.use(Vuetify)
  appOptions.vuetify = new Vuetify(vuetifyOpts)

  router.options.scrollBehavior = function(to, from, savedPosition) {
    if (to.hash && to.path !== '/auth0cb' && to.path !== '/auth0cb/') {
      // Go To anchor tag with smooth scrolling
      // Hack to reach id if page too long
      goTo(to.hash, {
        duration: 400,
        easings: 'easeInSine'
      })
      return setTimeout(() => {
        goTo(to.hash, {
          duration: 400,
          easings: 'easeOutSine'
        })
      }, 400)
    } else {
      return savedPosition || { x: 0, y: 0 }
    }
  }
  router.beforeEach((to, from, next) => {
    switch (to.path) {
      case '/user/profile':
      case '/user/settings':
        if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
          next()
        }
        else { // trigger auth0's login
          router.app.$auth.login()
        }
        break;

      case '/user/portfolio':
        if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
          if (router.app.$auth.userRole[0].name === 'user') { // users have no portfolio
            next(false)
          } else {
            next()
          }
        }
        else { // trigger auth0's login
          router.app.$auth.login()
        }
        break;

      default:
        next()
        break;
    }
  })
  // router.afterEach((to, from) => {
  //   if (to.hash) {
  //   }
  // })

  const vuexOpts = {
    actions: {
      async mcSubscribe({commit}, params) {
        return await axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/newsletter',
          {
            email: params.email,
            tag: params.tag,
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
      },
      async mcMessage({commit}, params) {
        return await axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/message',
          {
            email: params.email,
            firstname: params.name,
            lastname: params.lastName,
            subject: params.subject,
            message: params.msg,
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
      },
      async mcNewMessage({commit}, params) {
        return await axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/newmessage',
          {
            email: params.email,
            firstname: params.name,
            lastname: params.lastName,
            subject: params.subject,
            message: params.msg,
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
      },
      mgSend({commit}, params) {
        axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/mg_send',
          {
            email: params.email,
            firstname: params.name,
            lastname: params.lastName,
            subject: params.subject,
            message: params.msg,
          }
        )
      }
    },
    state: {
      lang: 'en',
      languages: ['en', 'gr'],
      cookieRedirect: '/',
      userRole: null,
    },
    getters: {
      getLang: state => {
        return state.lang
      },
      getLanguages: state => {
        return state.languages
      },
      getCookieRedirect: state => {
        return state.cookieRedirect
      },
      getUserRole: state => {
        return state.userRole
      }
    },

    mutations: {
      setLang (state, val) {
        state.lang = val
      },
      setCookieRedirect (state, val) {
        state.cookieRedirect = val
      },
      setUserRole (state, val) {
        state.userRole = val
      }
    }
  }
  Vue.use(Vuex)
  appOptions.store = new Vuex.Store(vuexOpts)

  Vue.use(Vuelidate)

  Vue.use(VueWaypoint)

  Vue.use(AuthPlugin)

  Vue.use(ImgdbPlugin)

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('UserLayout', UserLayout)
  Vue.component('VoidLayout', VoidLayout)
  Vue.component('vue-cookie-accept-decline', VueCookieAcceptDecline);
}
