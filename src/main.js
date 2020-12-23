// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
// Front-End UI component
import Vuetify from 'vuetify/lib/framework' //treeshaking
import goTo from 'vuetify/es5/services/goto'
import 'vuetify/dist/vuetify.min.css'
// Layouts
import DefaultLayout from '~/layouts/Default.vue'
import UserLayout from '~/layouts/User.vue'
import VoidLayout from '~/layouts/Void.vue'
// Components
import Vuex from 'vuex'
const VueCookieAcceptDecline = require('vue-cookie-accept-decline');
import 'vue-cookie-accept-decline/dist/vue-cookie-accept-decline.css'
import VueWaypoint from "vue-waypoint"
// Plugins
import AuthPlugin from './plugins/auth'
import DbPlugin from './plugins/db'
import ImgdbPlugin from './plugins/imgdb'
import MarketingPlugin from './plugins/marketing'
import AdminPlugin from './plugins/admin'

export default function (Vue, { appOptions, router, head, isClient }) {
  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
  })
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|family=Nunito:400,600|Playfair+Display:400,600,700|Raleway:400,600,700|Montserrat:400,600,700|Noto+Sans:400,600,700&display=swap'
  })

  // Register Front-End UI component (Vuetify)
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
      case '/admin/gallery':
      if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
        if (router.app.$auth.userRole[0].name === 'admin') { // only admin allowed
          next();
        } else { // other roles not allowed!
          next(false);
        }
      } else { // trigger auth0's login
        router.app.$auth.login();
      }
      case '/user/profile':
      case '/user/settings':
        if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
          next();
        }
        else { // trigger auth0's login
          router.app.$auth.login();
        }
        break;

      case '/user/portfolio':
        if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
          if (router.app.$auth.userRole[0].name === 'user') { // users have no portfolio
            next(false);
          } else {
            next();
          }
        }
        else { // trigger auth0's login
          router.app.$auth.login();
        }
        break;

      case '/user/favorites':
        if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
          if (router.app.$auth.userRole[0].name === 'artist') { // artists have no favorites
            next(false);
          } else {
            next();
          }
        }
        else { // trigger auth0's login
          router.app.$auth.login();
        }
        break;

      default:
        next();
        break;
    }
  })

  // Register Vue Router component (Vuex)
  const vuexOpts = {
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
  Vue.use(Vuex);
  appOptions.store = new Vuex.Store(vuexOpts);

  // Register components
  Vue.use(VueWaypoint);
  Vue.use(VueCookieAcceptDecline);
  if (isClient) {
    const ImageUploader = require("vue-image-upload-resize");
    Vue.use(ImageUploader);
  }

  // Register plugins
  Vue.use(AuthPlugin);
  Vue.use(DbPlugin);
  Vue.use(ImgdbPlugin);
  Vue.use(MarketingPlugin);
  Vue.use(AdminPlugin);

  // Register layouts
  Vue.component('Layout', DefaultLayout)
  Vue.component('UserLayout', UserLayout)
  Vue.component('VoidLayout', VoidLayout)
}
