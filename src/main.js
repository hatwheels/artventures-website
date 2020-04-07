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
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Nunito:400,600|Playfair+Display:400,600,700|Raleway:400,600,700|Montserrat:400,600,700&display=swap'
  })
  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.1/css/swiper.css'
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
    },
    state: {
      lang: 'en',
    },
    getters: {
      getLang: state => {
        return state.lang
      },
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
