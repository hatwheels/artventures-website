// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import './assets/style/index.scss'
import DefaultLayout from '~/layouts/Default.vue'
import VueCookieAcceptDecline from 'vue-cookie-accept-decline'
import axios from 'axios'
import VueWaypoint from "vue-waypoint"
import goTo from 'vuetify/es5/services/goto'
import AuthPlugin from './plugins/auth'

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
    href: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.1/css/swiper.css'
  })
  head.link.push({
    rel: 'stylesheet',
    type: "text/css",
    href: 'https://unpkg.com/vue-cookie-accept-decline@5.3.1/dist/vue-cookie-accept-decline.css'
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
    if (to.hash) {
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
    if (to.path != '/profile') {
      next()
    }
    else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
      if (from.name !== null) {
        if (from.query._storyblok) {
          return next(false)
        }
      }
      next()
    }
    else { // trigger auth0's login
      router.app.$auth.login()
    }
  })
  // router.afterEach((to, from) => {
  //   if (to.hash) {
  //   }
  // })

  const vuexOpts = {
    actions: {
      async mcSubscribe({commit}, params) {
        return await axios.post('https://www.artventures.me/.netlify/functions/newsletter',
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
        return await axios.post('https://www.artventures.me/.netlify/functions/message',
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
        return await axios.post('https://www.artventures.me/.netlify/functions/newmessage',
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
        axios.post('https://www.artventures.me/.netlify/functions/mg_send',
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
      cookieRedirect: '/'
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
      }
    },
    mutations: {
      setLang (state, val) {
        state.lang = val
      },
      setCookieRedirect (state, val) {
        state.cookieRedirect = val
      }
    }
  }
  Vue.use(Vuex)
  appOptions.store = new Vuex.Store(vuexOpts)

  Vue.use(Vuelidate)

  Vue.use(VueWaypoint)

  Vue.use(AuthPlugin)

  Vue.mixin({
    computed: {
      getViewSize() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
          case 'sm':
            return 'mobile'
          default:
            return 'desktop'
        }
      }
    }
  })

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('vue-cookie-accept-decline', VueCookieAcceptDecline);
}
