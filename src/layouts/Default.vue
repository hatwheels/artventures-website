<template>
  <v-app>
    <v-app-bar flat class="hidden-sm-and-down px-11" app absolute color="#e8e8e8" height="76px">

      <v-btn width="185" color="transparent" text icon to="/">/
        <v-img :src="logo[0]" />
      </v-btn>

      <v-spacer />

      <v-toolbar-items class="pa-0">
        <v-btn
          :class="getLang === 'gr' ? 'noto-18-600' : 'nunito-18-600'"
          class="px-2"
          text color="transparent"
          to="/"
          v-html="routes.about[getLang]"
        />
        <v-menu open-on-hover bottom :offset-y="true" transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn class="px-2" text color="transparent" v-on="on" :ripple="false">
              <div
                :class="getLang === 'gr' ? 'noto-18-600' : 'nunito-18-600'"
                class="color-333333"
                v-html="routes.explore[getLang]"
              />
            </v-btn>
          </template>
          <v-list flat color="#e8e8e8">
            <v-list-item v-for="(route, i) in routes.explore.routes" :key="'route-' + i" :to="route.route">
              <v-list-item-title :class="getLang === 'gr' ? 'noto-18-600' : 'nunito-18-600'" v-html="route[getLang]" />
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          v-if="$route.path == '/'"
          :class="getLang === 'gr' ? 'noto-18-600' : 'nunito-18-600'"
          class="px-2"
          text color="transparent"
          @click="$vuetify.goTo('#artists')"
          v-html="routes.forArtists[getLang]"
        />
        <v-btn
          v-else
          :class="getLang === 'gr' ? 'noto-18-600' : 'nunito-18-600'"
          class="px-2"
          text color="transparent"
          :to="{ path: '/', hash:'#artists' }"
          v-html="routes.forArtists[getLang]"
        />
        <v-btn
          :class="getLang === 'gr' ? 'noto-18-600' : 'nunito-18-600'"
          class="px-2"
          text color="transparent"
          to="/faq"
          v-html="routes.faq[getLang]"
        />
        <div class="py-4 px-2">
        <v-btn
          v-if="$route.path == '/'"
          :class="getLang === 'gr' ? 'noto-18-400' : 'raleway-18-400'"
          depressed
          color="#333333"
          @click="$vuetify.goTo('#contact-us')"
          v-html="routes.contact[getLang]"
        />
        <v-btn
          v-else
          :class="getLang === 'gr' ? 'noto-18-400' : 'raleway-18-400'"
          depressed
          color="#333333"
          :to="{ path: '/', hash:'#contact-us' }"
          v-html="routes.contact[getLang]"
        />
        </div>
        <v-menu open-on-hover bottom :offset-y="true" transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn class="px-2" text color="transparent" v-on="on" :ripple="false">
              <div
                :class="getLang === 'gr' ? 'noto-18-600' : 'nunito-18-600'"
                class="color-333333"
              >
              {{ getLang }}
              </div>
              <v-icon color="#333333" right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list flat color="#e8e8e8">
            <v-list-item v-for="(language, i) in languages" :key="'lang-' + i" @click="setLang(language)">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-18-600' : 'nunito-18-600'"
                class="color-333333 text-center text-uppercase"
              >
              {{ language }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>

    <v-app-bar class="hidden-md-and-up px-3" app absolute color="#F7F7F7" height="50px">
      <v-btn width="122px" color="transparent" text icon to="/">
        <v-img :src="logo[1]" />
      </v-btn>

      <v-spacer />

      <v-toolbar-items class="px-0 py-0">
        <v-dialog v-model="modalMenu" fullscreen hide-overlay>
          <template v-slot:activator="{ on }">
            <v-btn color="#333333" icon v-on="on" :ripple="false">
              <v-icon size="28">mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-card flat>
            <div class="d-flex justify-space-between">
              <v-carousel ref="menucarousel" hide-delimiter-background hide-delimiters :show-arrows="false">
                <v-carousel-item>
                  <v-list color="#ffffff" class="px-9 py-9">
                    <v-list-item class="pb-5 px-0" to="/">
                      <v-list-item-title
                        :class="getLang === 'gr' ? 'noto-35-400' : 'raleway-35-400'"
                        v-html="routes.about[getLang]"
                      />
                    </v-list-item>
                    <v-list-item class="pb-5 px-0" @click="$refs.menucarousel.next();">
                      <v-list-item-title
                        :class="getLang === 'gr' ? 'noto-35-400' : 'raleway-35-400'"
                        v-html="routes.explore[getLang]"
                      />
                      <v-list-item-icon>
                        <v-icon large color="#757575">mdi-chevron-double-right</v-icon>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-list-item class="pb-5 px-0" to="/#artists">
                      <v-list-item-title
                        :class="getLang === 'gr' ? 'noto-35-400' : 'raleway-35-400'"
                        v-html="routes.forArtists[getLang]"
                      />
                    </v-list-item>
                    <v-list-item class="pb-5 px-0" to="/faq">
                      <v-list-item-title
                        :class="getLang === 'gr' ? 'noto-35-400' : 'raleway-35-400'"
                        v-html="routes.faq[getLang]"
                      />
                    </v-list-item>
                    <v-list-item class="pb-5 px-0">
                      <v-btn
                        :class="getLang === 'gr' ? 'noto-25-400' : 'raleway-25-400'"
                        class="py-4"
                        x-large
                        depressed
                        color="#333333"
                        to="#contact"
                        v-html="routes.contact[getLang]"
                      />
                    </v-list-item>
                  </v-list>
                </v-carousel-item>
                <v-carousel-item>
                  <v-list color="#ffffff" class="px-9 py-9">
                    <v-list-item class="pb-5 px-0" @click="$refs.menucarousel.prev();">
                      <v-list-item-icon class="mx-0">
                        <v-icon small color="#757575">mdi-chevron-double-left</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title
                        class="color-333333"
                        :class="getLang === 'gr' ? 'noto-15-400' : 'nunito-15-400'"
                      >
                      Back
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item class="pb-5 px-0" v-for="(route, i) in routes.explore.routes" :key="'modal-route-' + i" :to="route.route">
                      <v-list-item-title
                        :class="getLang === 'gr' ? 'noto-35-400' : 'raleway-35-400'"
                        v-html="route[getLang]"
                      />
                    </v-list-item>
                  </v-list>
                </v-carousel-item>
              </v-carousel>
              <v-btn class="mx-4 my-4" color="#333333" icon @click="modalMenu = false; modalMenuExplore = false;">
                <v-icon color="1a1a1a">mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-dialog>
      </v-toolbar-items>
    </v-app-bar>

    <slot />

    <v-footer
      app
      color="#dddddd"
      absolute
      class="d-flex flex-xs-row flex-sm-row flex-column justify-space-around align-center px-12 py-9"
    >

      <newsletter></newsletter>

      <div class="hidden-md-and-up pb-6"></div>

      <div class="d-flex flex-column align-center">
        <div class="pb-1" >
          <v-btn class="hidden-lg-and-down" large text icon color="black" href="https://www.facebook.com/artventures.me">
            <v-icon>mdi-facebook-box</v-icon>
          </v-btn>
          <v-btn class="hidden-xl-only hidden-xs-only" text icon color="black" href="https://www.facebook.com/artventures.me">
            <v-icon>mdi-facebook-box</v-icon>
          </v-btn>
          <v-btn class="hidden-sm-and-up" small text icon color="black" href="https://www.facebook.com/artventures.me">
            <v-icon>mdi-facebook-box</v-icon>
          </v-btn>
          <v-btn class="hidden-lg-and-down" large text icon color="black" href="https://www.instagram.com/artventures.me/">
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
          <v-btn class="hidden-xl-only hidden-xs-only" text icon color="black" href="https://www.instagram.com/artventures.me/">
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
          <v-btn class="hidden-sm-and-up" small text icon color="black" href="https://www.instagram.com/artventures.me/">
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
          <v-btn class="hidden-lg-and-down" large text icon color="black" href="https://twitter.com/Artventures6">
            <v-icon>mdi-twitter-box</v-icon>
          </v-btn>
          <v-btn class="hidden-xl-only hidden-xs-only" text icon color="black" href="https://twitter.com/Artventures6">
            <v-icon>mdi-twitter-box</v-icon>
          </v-btn>
          <v-btn class="hidden-sm-and-up" small text icon color="black" href="https://twitter.com/Artventures6">
            <v-icon>mdi-twitter-box</v-icon>
          </v-btn>
          <v-btn class="hidden-lg-and-down" large text icon color="black" href="https://www.linkedin.com/company/artventuresco">
            <v-icon>mdi-linkedin-box</v-icon>
          </v-btn>
          <v-btn class="hidden-xl-only hidden-xs-only" text icon color="black" href="https://www.linkedin.com/company/artventuresco">
            <v-icon>mdi-linkedin-box</v-icon>
          </v-btn>
          <v-btn class="hidden-sm-and-up" small text icon color="black" href="https://www.linkedin.com/company/artventuresco">
            <v-icon>mdi-linkedin-box</v-icon>
          </v-btn>
        </div>
        <div class="pt-1">
          <div
            :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
            class="black-text"
          >
          Artventures
          <span
            :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
            class="color-757575"
          >
          &copy; 2020
          </span>
          </div>
        </div>
      </div>

    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Newsletter from '~/components/Newsletter.vue'

export default {
  components: {
    Newsletter,
  },
  data () {
    return {
      logo: [
        'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_76,w_auto/v1583838043/artventures/artventures_logo.svg',
        'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_50,w_auto/v1583838043/artventures/artventures_logo.svg',
      ],
      routes: {
        about: {
          gr: '<div class="color-333333 text-capitalize">Αρχική</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">About</div>', // English, raw html
        },
        explore: {
          gr: '<div class="color-333333 text-capitalize">Εξερεύνησε</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">Explore</div>', // English, raw html
          routes: [
            {
              gr: '<div class="color-333333 text-capitalize">Ιδιώτες</div>',
              en: '<div class="color-333333 text-capitalize">Individuals</div>',
              route: '/individuals',
            },
            {
              gr: '<div class="color-333333 text-capitalize">Εταιρείες</div>',
              en: '<div class="color-333333 text-capitalize">Businesses</div>',
              route: '/businesses',
            },
            {
              gr: '<div class="color-333333 text-capitalize">Ξενοδοχεία</div>',
              en: '<div class="color-333333 text-capitalize">Hotels</div>',
              route: '/hotels',
            }
          ]
        },
        forArtists: {
          gr: '<div class="color-333333 text-capitalize">Για Καλλιτέχνες</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">For Artists</div>', // English, raw html
        },
        faq: {
          gr: '<div class="color-333333 text-capitalize">Ερωτήσεις</div>', // Greek, raw html
          en: '<div class="color-333333">F.A.Q.</div>', // English, raw html
        },
        contact: {
          gr: '<div class="white--text text-capitalize">Επικοινωνία</div>', // Greek, raw html
          en: '<div class="white--text text-capitalize">Contact</div>', // English, raw html
        }
      },
      modalMenu: false,
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  methods: {
    ...mapMutations(['setLang']),
  },
}
</script>

<style>
.v-navigation-drawer__border {
  background-color: transparent !important;
}

.v-toolbar__content {
  padding-bottom: 0px;
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
}

.pos-rel {
  position: relative;
}

.color-757575 {
  color: #757575
}

.color-333333 {
  color: #333333
}

.color-1a1a1a {
  color: #1A1A1A;
}

.color-rgba-0-0-0-p52 {
  color: rgba(0, 0, 0, 0.52);
}

.background-color-fafafa {
  background-color: #FAFAFA;
}

.background-color-dddddd {
  background-color: #DDDDDD;
}

.background-color-dedede {
  background-color: #DEDEDE;
}

.background-color-f5f5f5 {
  background-color: #F5F5F5;
}

.background-color-white {
  background-color: white;
}

/* Text Fonts */
/* For Greek */
.noto-13-400 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 13px !important;
  font-weight: 400 !important;
}
.noto-13-600 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 13px !important;
  font-weight: 600 !important;
}
.noto-15-400 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 15px !important;
  font-weight: 400 !important;
}
.noto-15-600 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  letter-spacing: 1.5px !important;
}
.noto-15-700 {
  font-family: "Noto Sans", sans-serif !important;
  font-size: 15px !important;
  font-weight: 700 !important;
}
.noto-16-400 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 16px !important;
  font-weight: 400 !important;
}
.noto-16-400-1p6em {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 1.6em !important;
}
.noto-18-400 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 18px !important;
  font-weight: 400 !important;
}
.noto-18-400-1p4em {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 18px !important;
  font-weight: 400 !important;
  line-height: 1.4em !important;
}
.noto-18-600 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 18px !important;
  font-weight: 600 !important;
}
.noto-25-400 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 25px !important;
  font-weight: 400 !important;
}
.noto-25-600 {
  font-family: 'Noto Sans', serif !important;
  font-size: 25px !important;
  font-weight: 600 !important;
}
.noto-30-700 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 30px !important;
  font-weight: 700 !important;
}
.noto-30-700-1p2 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 30px !important;
  font-weight: 700 !important;
  line-height: 1.2em !important;
}
.noto-35-400 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 35px !important;
  font-weight: 400 !important;
}
.noto-38-700 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 38px !important;
  font-weight: 700 !important;
}
.noto-32-700 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 32px !important;
  font-weight: 700 !important;
}
.noto-44-700 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 44px !important;
  font-weight: 700 !important;
}
.noto-1p312vw-400 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 1.312vw !important;
  font-weight: 400 !important;
}
.noto-1p312vw-600 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 1.312vw !important;
  font-weight: 700 !important;
  letter-spacing: 1.5px !important;
}
.noto-3p28vw-600-1p2em {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 3.28vw !important;
  font-weight: 600 !important;
  line-height: 1.2em !important;
}
/* Nunito */
.nunito-15-400 {
  font-family: 'Nunito', sans-serif !important;
  font-size: 15px !important;
  font-weight: 400 !important;
}
.nunito-18-600 {
  font-family: 'Nunito', sans-serif !important;
  font-size: 18px !important;
  font-weight: 600 !important;
}
/* Raleway */
.raleway-13-400 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 13px !important;
  font-weight: 400 !important;
}
.raleway-13-600 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 13px !important;
  font-weight: 600 !important;
}
.raleway-15-600 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  letter-spacing: 1.5px !important;
}
.raleway-15-700 {
  font-family: "Raleway", sans-serif !important;
  font-size: 15px !important;
  font-weight: 700 !important;
}
.raleway-16-400 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 16px !important;
  font-weight: 400 !important;
}
.raleway-16-600 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 16px !important;
  font-weight: 600 !important;
}
.raleway-16-400-1p6em {
  font-family: 'Raleway', sans-serif !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 1.6em !important;
}
.raleway-18-400 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 18px !important;
  font-weight: 400 !important;
}
.raleway-18-600 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 18px !important;
  font-weight: 600 !important;
}
.raleway-25-400 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 25px !important;
  font-weight: 400 !important;
}
.raleway-30-700 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 30px !important;
  font-weight: 700 !important;
}
.raleway-35-400 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 35px !important;
  font-weight: 400 !important;
}
.raleway-44-700 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 44px !important;
  font-weight: 700 !important;
}
.raleway-1p312vw-400 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 1.312vw !important;
  font-weight: 400 !important;
}
.raleway-1p312vw-600 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 1.312vw !important;
  font-weight: 700 !important;
  letter-spacing: 1.5px !important;
}
.raleway-3p28vw-600-1p2em {
  font-family: 'Raleway', sans-serif !important;
  font-size: 3.28vw !important;
  font-weight: 600 !important;
  line-height: 1.2em !important;
}
/* Playfair Display */
.playfair-18-400-1p4em {
  font-family: 'Playfair Display', serif !important;
  font-size: 18px !important;
  font-weight: 400 !important;
  line-height: 1.4em !important;
}
.playfair-18-600 {
  font-family: 'Playfair Display', serif !important;
  font-size: 18px !important;
  font-weight: 600 !important;
}
.playfair-25-600 {
  font-family: 'Playfair Display', serif !important;
  font-size: 25px !important;
  font-weight: 600 !important;
}
.playfair-30-700 {
  font-family: 'Playfair Display', serif !important;
  font-size: 30px !important;
  font-weight: 700 !important;
}
.playfair-30-700-1p2 {
  font-family: 'Playfair Display', serif !important;
  font-size: 30px !important;
  font-weight: 700 !important;
  line-height: 1.2em !important;
}
.playfair-32-700 {
  font-family: 'Playfair Display', serif !important;
  font-size: 32px !important;
  font-weight: 700 !important;
}
.playfair-38-700 {
  font-family: 'Playfair Display', serif !important;
  font-size: 38px !important;
  font-weight: 700 !important;
}
</style>

<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>