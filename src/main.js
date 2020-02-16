// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import './assets/style/index.scss'
import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { appOptions, router, head, isClient }) {
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
  })
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Lato:100,300,400,500,700,900',
  })
  
  const vuetifyOpts = { icons: {
    iconfont: 'mdi',
  } }// opts includes, vuetify themes, icons, etc.
  Vue.use(Vuetify)
  appOptions.vuetify = new Vuetify(vuetifyOpts)

  const vuexOpts = {
    state: {
      lang: 0
    },
    getters: {
      getLang: state => {
        return state.lang
      }
    },
    mutations: {
      setLang (state, val) {
        state.lang = val
      }
    }
  }
  Vue.use(Vuex)
  appOptions.store = new Vuex.Store(vuexOpts)

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
