// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import './assets/style/index.scss'
import DefaultLayout from '~/layouts/Default.vue'
import axios from 'axios'

export default function (Vue, { appOptions, router, head, isClient }) {
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
  })

  const vuetifyOpts = { icons: {
    iconfont: 'mdi',
  } }// opts includes, vuetify themes, icons, etc.
  Vue.use(Vuetify)
  appOptions.vuetify = new Vuetify(vuetifyOpts)

  const vuexOpts = {
    actions: {
      async mcSubscribe({commit}, params) {
        return await axios.post('https://www.artventures.me/.netlify/functions/index',
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
      async recaptchaVerify({commit}, params) {
        return await axios.post('https://www.artventures.me/.netlify/functions/recaptcha', params)
      },
    },
    state: {
      lang: 'en',
      avGradient: 'to left, rgba(0,0,0,.40), rgba(100,100,100,.40)'
    },
    getters: {
      getLang: state => {
        return state.lang
      },
      getAvGradient: state => {
        return state.avGradient
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

  Vue.use(Vuelidate)

  Vue.mixin({
    data() {
      return {
        get languages() {
          return ['en', 'gr'];
        }
      }
    }
  })

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
