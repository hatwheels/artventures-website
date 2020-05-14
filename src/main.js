// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import './assets/style/index.scss'
import DefaultLayout from '~/layouts/Default.vue'
import axios from 'axios'
import VueWaypoint from "vue-waypoint"

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

  // router.options.scrollBehavior = function(to, from, savedPosition) {
  //   if (to.hash) {
  //   } else {
  //     return savedPosition || { x: 0, y: 0 }
  //   }
  // }
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
            firstname: params.firstname,
            lastname: params.lastname,
            subject: params.subject,
            message: params.message,
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
            firstname: params.firstname,
            lastname: params.lastname,
            subject: params.subject,
            message: params.message,
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
      }
    },
    state: {
      lang: 'en',
      languages: ['en', 'gr'],
    },
    getters: {
      getLang: state => {
        return state.lang
      },
      getLanguages: state => {
        return state.languages
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

  Vue.use(VueWaypoint)

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
}
