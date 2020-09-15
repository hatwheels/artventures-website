<template>
  <v-app class="background-color-fafafa">
    <!-- Cookie consent (GDPR) -->
    <vue-cookie-accept-decline
      :ref="'cookieBar'"
      :elementId="'cookieBar'"
      :debug="false"
      :position="'bottom'"
      :type="'bar'"
      :disableDecline="true"
      :transitionName="'slideFromBottom'"
      :showPostponeButton="true"
      @status="cookieStatus"
      @clicked-accept="cookieClickedAccept"
      @clicked-decline="cookieClickedDecline"
    >
      <div slot="message" class="messageText" :class="'nunito-18-400'">
        {{ cookieTxt[getLang] }}
      </div>
      <div slot="declineContent" :class="'nunito-18-400'">
        {{ declineCookies[getLang] }}
      </div>
      <div slot="acceptContent" :class="'nunito-18-400'">
        {{ allowCookies[getLang] }}
        </div>
    </vue-cookie-accept-decline>

    <!-- Desktop -->
    <v-app-bar v-show="!$vuetify.breakpoint.mobile" flat class="px-11" app absolute color="#e8e8e8" height="76px">

      <v-btn width="185" color="transparent" text icon to="/">/
        <g-image :src="logo[0]" style="width: 100%" />
      </v-btn>

      <v-spacer />

      <v-toolbar-items class="pa-0">
        <v-btn
          :class="'nunito-18-400'"
          class="px-2"
          text color="transparent"
          to="/"
          v-html="routes.about[getLang]"
        />
        <v-menu open-on-hover bottom :offset-y="true" transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn class="px-2" text color="transparent" v-on="on" :ripple="false">
              <div
                :class="'nunito-18-400'"
                class="color-333333"
                v-html="routes.explore[getLang]"
              />
            </v-btn>
          </template>
          <v-list flat color="#e8e8e8">
            <v-list-item v-for="(route, i) in routes.explore.routes" :key="'route-' + i" :to="route.route">
              <v-list-item-title :class="getLang === 'gr' ? 'noto-16-500' : 'nunito-18-400'" v-html="route[getLang]" />
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          :class="'nunito-18-400'"
          class="px-2"
          text color="transparent"
          to="/artists"
          v-html="routes.forArtists[getLang]"
        />
        <v-btn
          :class="'nunito-18-400'"
          class="px-2"
          text color="transparent"
          to="/faq"
          v-html="routes.faq[getLang]"
        />
        <div class="my-5 mx-2">
          <v-btn
            v-if="$route.path == '/'"
            :class="'raleway-18-400'"
            style="border-radius: 8px;"
            depressed
            color="#333333"
            @click="goTo('#contact-us')"
            v-html="routes.contact[getLang]"
          />
          <v-btn
            v-else
            :class="'raleway-18-400'"
            style="border-radius: 8px;"
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
                class="color-333333 nunito-18-400"
                v-html="getLang"
              />
              <v-icon color="#333333" right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list flat color="#e8e8e8">
            <v-list-item v-for="(language, i) in getLanguages" :key="'lang-' + i" @click="setLanguage(language)">
              <v-list-item-title
                class="color-333333 text-center text-uppercase nunito-18-400"
                v-html="language"
              />
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          :class="'nunito-18-400'"
          class="px-2"
          text color="transparent"
          to="/user/profile"
          v-html="isAuthenticated ? routes.profile[getLang] : routes.login[getLang]"
        />
      </v-toolbar-items>
    </v-app-bar>

  <!-- Mobile -->
    <v-app-bar v-show="$vuetify.breakpoint.mobile" class="px-3" app absolute color="#F7F7F7" height="50px">
      <v-btn width="122px" color="transparent" text icon to="/">
        <g-image style="width: 100%" :src="logo[1]" />
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
              <v-carousel ref="menucarousel" hide-delimiter-background hide-delimiters :show-arrows="false" height="100%">
                <v-carousel-item>
                  <v-list color="#ffffff" class="px-9  py-9">
                    <v-list-item class="pb-5 px-0" to="/">
                      <v-list-item-title
                        :class="getLang === 'gr' ? 'noto-28-400' : 'raleway-3-400'"
                        v-html="routes.about[getLang]"
                      />
                    </v-list-item>
                    <v-list-item class="pb-5 px-0" @click="modalSlide = 'explore'; $refs.menucarousel.next();">
                      <v-list-item-title
                        :class="getLang === 'gr' ? 'noto-28-400' : 'raleway-28-400'"
                        v-html="routes.explore[getLang]"
                      />
                      <v-list-item-icon>
                        <v-icon large color="#757575">mdi-chevron-double-right</v-icon>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-list-item class="pb-5 px-0" to="/artists">
                      <v-list-item-title
                        :class="getLang === 'gr' ? 'noto-28-400' : 'raleway-28-400'"
                        v-html="routes.forArtists[getLang]"
                      />
                    </v-list-item>
                    <v-list-item class="pb-5 px-0" to="/faq">
                      <v-list-item-title
                        :class="getLang === 'gr' ? 'noto-28-400' : 'raleway-28-400'"
                        v-html="routes.faq[getLang]"
                      />
                    </v-list-item>
                    <v-list-item v-if="$route.path == '/'" class="pb-5 px-0">
                      <v-btn
                        :class="getLang === 'gr' ? 'noto-25-400' : 'raleway-25-400'"
                        x-large
                        depressed
                        color="#333333"
                        @click="modalMenu = false; goTo('#contact-us-small');"
                        v-html="routes.contact[getLang]"
                      />
                    </v-list-item>
                    <v-list-item v-else class="pb-5 px-0">
                      <v-btn
                        :class="getLang === 'gr' ? 'noto-25-400' : 'raleway-25-400'"
                        class="py-4"
                        x-large
                        depressed
                        color="#333333"
                        :to="{ path: '/', hash:'#contact-us-small' }"
                        v-html="routes.contact[getLang]"
                      />
                    </v-list-item>
                    <v-list-item class="pb-5 px-0" @click="modalSlide = 'language'; $refs.menucarousel.next();">
                      <v-list-item-title
                        :class="getLang === 'gr' ? 'noto-28-400' : 'raleway-28-400'"
                        v-html="langTitle[getLang]"
                      />
                      <v-list-item-icon>
                        <v-icon large color="#757575">mdi-chevron-double-right</v-icon>
                      </v-list-item-icon>
                    </v-list-item>
                   <v-list-item class="pb-5 px-0" to="/user/profile">
                      <v-list-item-title
                        :class="getLang === 'gr' ? 'noto-28-400' : 'raleway-28-400'"
                        v-html="isAuthenticated ? routes.profile[getLang] : routes.login[getLang]"
                      />
                   </v-list-item>
                  </v-list>
                </v-carousel-item>
                <v-carousel-item>
                  <v-list v-if="modalSlide === 'explore'" color="#ffffff" class="px-9 py-9">
                    <v-list-item class="pb-5 px-0" @click="$refs.menucarousel.prev();">
                      <v-list-item-icon class="mx-0">
                        <v-icon small color="#757575">mdi-chevron-double-left</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title
                        class="color-333333"
                        :class="getLang === 'gr' ? 'noto-15-400' : 'nunito-15-400'"
                      >
                        {{ getLang === 'gr' ? 'Πίσω': 'Back' }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item class="pb-5 px-0" v-for="(route, i) in routes.explore.routes" :key="'modal-route-' + i" :to="route.route">
                      <v-list-item-title
                        :class="getLang === 'gr' ? 'noto-28-400' : 'raleway-28-400'"
                        v-html="route[getLang]"
                      />
                    </v-list-item>
                  </v-list>
                  <v-list v-else color="#ffffff" class="px-9 py-9">
                    <v-list-item class="pb-5 px-0" @click="$refs.menucarousel.prev();">
                      <v-list-item-icon class="mx-0">
                        <v-icon small color="#757575">mdi-chevron-double-left</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title
                        class="color-333333"
                        :class="getLang === 'gr' ? 'noto-15-400' : 'nunito-15-400'"
                      >
                        {{ getLang === 'gr' ? 'Πίσω': 'Back' }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      class="pb-5 px-0" v-for="(language, i) in getLanguages" :key="'lang-small-' + i"
                      @click="modalMenu = false; setLanguage(language);"
                    >
                      <v-list-item-title :class="getLang === 'gr' ? 'noto-28-400' : 'raleway-28-400'">
                        <div class="color-333333 text-capitalize" v-html="langChoices[language][getLang]" />
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-carousel-item>
              </v-carousel>
              <v-btn class="mx-3 my-3" color="#333333" small icon @click="modalMenu = false;">
                <v-icon color="1a1a1a">mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-dialog>
      </v-toolbar-items>
    </v-app-bar>

    <transition name="fade" appear>
      <main>
        <slot />
      </main>
    </transition>

    <v-footer
      app
      color="#dddddd"
      absolute
      class="d-flex flex-xs-row flex-sm-row flex-column justify-space-around align-center px-12 py-9"
    >

      <newsletter></newsletter>

      <div class="hidden-md-and-up pb-6"></div>

      <div class="d-flex flex-column align-center">
        <!-- Desktop -->
        <div v-show="!$vuetify.breakpoint.mobile" class="pb-1">
          <a class="px-1" style="text-decoration: none;" href="https://www.facebook.com/artventures.me" target="_blank">
            <v-icon large class="black--text">mdi-facebook</v-icon>
          </a>
          <a class="px-1" style="text-decoration: none;" href="https://www.instagram.com/artventures.me/" target="_blank">
            <v-icon large class="black--text">mdi-instagram</v-icon>
          </a>
          <a class="px-1" style="text-decoration: none;" href="https://twitter.com/Artventures6" target="_blank">
            <v-icon large class="black--text">mdi-twitter</v-icon>
          </a>
          <a class="px-1" style="text-decoration: none;" href="https://www.linkedin.com/company/artventuresco" target="_blank">
            <v-icon large class="black--text">mdi-linkedin</v-icon>
          </a>
        </div>
        <!-- Mobile -->
        <div v-show="$vuetify.breakpoint.mobile" class="pb-1">
          <a class="px-2" style="text-decoration: none;" href="https://www.facebook.com/artventures.me" target="_blank">
            <v-icon class="black--text" small>mdi-facebook</v-icon>
          </a>
          <a class="px-2" style="text-decoration: none;" href="https://www.instagram.com/artventures.me/" target="_blank">
            <v-icon class="black--text" small>mdi-instagram</v-icon>
          </a>
          <a class="px-2" style="text-decoration: none;" href="https://twitter.com/Artventures6" target="_blank">
            <v-icon class="black--text" small>mdi-twitter</v-icon>
          </a>
          <a class="px-2" style="text-decoration: none;" href="https://www.linkedin.com/company/artventuresco" target="_blank">
            <v-icon class="black--text" small>mdi-linkedin</v-icon>
          </a>
        </div>

        <div class="pt-1">
          <!-- Mobile -->
          <div v-show="$vuetify.breakpoint.mobile" class="raleway-16-600 black-text">
            Artventures
            <span class="color-757575">
              &copy; 2020
            </span>
          </div>
          <!-- Desktop -->
          <div v-show="!$vuetify.breakpoint.mobile" class="raleway-18-600 black-text">
            Artventures
            <span class="color-757575">
              &copy; 2020
            </span>
          </div>
        </div>
        <g-link
          style="text-decoration: none;"
          :class="getLang === 'en' ? 'raleway-13-400' : 'noto-13-400'"
          class="black--text"
          to="/privacy-policy"
        >
          {{ getLang === 'en' ? 'Privacy Policy' : 'Πολιτική Απορρήτου' }}
        </g-link>
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
  created () {
    if (process.isClient) {
      var lang = localStorage.getItem('lang')
      
      if (lang && lang.length > 0) {
        this.setLang(lang)
      } else {
        localStorage.setItem('lang', this.getLang)
      }
    }
  },
  mounted () {
    this.isAuthenticated = this.$auth.isAuthenticated();
    if (process.isClient) {
      if (localStorage.getItem('vue-cookie-accept-decline-cookieBar') === 'postpone') {
        this.$refs.cookieBar.removeCookie();
        this.$refs.cookieBar.init();
      }
    }
  },
  data () {
    return {
      // Auth0
      isAuthenticated: false,
      // Cookies
      status: null,
      cookieTxt: {
        gr: 'Χρησιμοποιούμε αρχεία αναγνώρισης ("cookies") για την βελτίωση της εμπειρίας και την ανάλυση της διαδικτυακής κίνησης.',
        en: 'We use cookies to offer you a better experience and analyse traffic.',
      },
      allowCookies: {
        gr: 'Αποδέχομαι',
        en: 'Accept',
      },
      declineCookies: {
        gr: 'Δεν Αποδέχομαι',
        en: 'Decline',
      },
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
        },
        profile: {
          gr: '<div class="color-333333 text-capitalize">Προφίλ</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">Profile</div>', // English, raw html
        },
        login: {
          gr: '<div class="color-333333 text-capitalize">Σύνδεση</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">Login</div>', // English, raw html
        }
      },
      modalMenu: false,
      modalSlide: 'explore',
      langTitle: {
        gr: '<div class="color-333333 text-capitalize">Γλώσσα</div>', // Greek, raw html
        en: '<div class="color-333333 text-capitalize">Language</div>', // English, raw html
      },
      langChoices: {
        gr: {
          gr: 'Ελληνικά',
          en: 'Greek'
        },
        en: {
          gr: 'Αγγλικά',
          en: 'English'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getLang', 'getLanguages']),
  },
  methods: {
    ...mapMutations(['setLang', 'setCookieRedirect']),
    setLanguage(lang) {
        this.setLang(lang)
        if (process.isClient) {
            localStorage.setItem('lang', lang)
        }
    },
    // Go To anchor tag with smooth scrolling
    goTo(tag) {
      // Hack to reach id if page too long
      this.$vuetify.goTo(tag, {
        duration: 400,
        easings: 'easeInSine'
      })
      setTimeout(() => {
        this.$vuetify.goTo(tag, {
          duration: 400,
          easings: 'easeOutSine'
        })
      }, 400)
    },
    cookieStatus(status) {
      this.status = status;
    },
    cookieClickedAccept() {
      this.status = 'accept';
      this.$ga.enable();
      this.setCookieRedirect(this.$route.path)
      this.$router.replace({
        path: '/cookies-accepted',
        force: true
      });
    },
    cookieClickedDecline() {
      this.status = 'decline';
    }
  },
}
</script>

<style>
@import '../assets/style/transitions.css';

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
  background-color: #FAFAFA !important;
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
}
.noto-15-600-1p5 {
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
.noto-16-500 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 16px !important;
  font-weight: 500 !important;
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
.noto-28-400 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 28px !important;
  font-weight: 400 !important;
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
.nunito-15-600 {
  font-family: 'Nunito', sans-serif !important;
  font-size: 15px !important;
  font-weight: 600 !important;
}
.nunito-18-400 {
  font-family: 'Nunito', sans-serif !important;
  font-size: 18px !important;
  font-weight: 400 !important;
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
.raleway-15-600-1p5 {
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
.raleway-28-400 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 28px !important;
  font-weight: 400 !important;
}
.raleway-30-700 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 30px !important;
  font-weight: 700 !important;
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
.cookie__bar__buttons__button--accept {
  background: #525252 !important;

}
</style>

<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>