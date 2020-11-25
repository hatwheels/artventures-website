<template>
  <v-app class="background-color-fafafa">

    <!-- Cookie consent (GDPR) -->
    <vue-cookie-accept-decline
      :ref="'cookieBar'"
      :elementId="'cookieBar'"
      :debug="false"
      :position="'bottom'"
      :type="'bar'"
      :disableDecline="false"
      :transitionName="'slideFromBottom'"
      :showPostponeButton="true"
      @status="cookieStatus"
      @clicked-accept="cookieClickedAccept"
      @clicked-decline="cookieClickedDecline"
    >
      <div slot="message" class="messageText" :class="getLang === 'gr' ? 'noto-16-500' : 'nunito-18-400'">
        {{ cookieTxt[getLang] }}
      </div>
      <div slot="declineContent" :class="getLang === 'gr' ? 'noto-16-500' : 'nunito-18-400'">
        {{ declineCookies[getLang] }}
      </div>
      <div slot="acceptContent" :class="getLang === 'gr' ? 'noto-16-500' : 'nunito-18-400'">
        {{ allowCookies[getLang] }}
        </div>
    </vue-cookie-accept-decline>
    
    <!-- Desktop -->
    <v-app-bar class="hidden-sm-and-down px-11 rounded-b-xl" app outlined absolute color="#e8e8e8" height="76px">
      <v-btn width="185px" color="transparent" text icon to="/">
        <g-image style="width: 100%" :src="logo[0]" alt="logo" />
      </v-btn>

      <v-spacer />

      <v-toolbar-items class="pa-0">
       <v-menu bottom :offset-y="true" transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn class="px-2" text v-on="on" color="transparent" :ripple="false">
              <v-avatar>
                <v-img v-if="userPicture" :src="userPicture" alt="profile pic" />
              </v-avatar>
              <v-icon color="#333333" right large>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list flat color="#e8e8e8">
            <v-list-item to="/user/profile">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="spa.profile[getLang]"
              />
            </v-list-item>
            <v-list-item v-if="userRole === 'admin' || userRole === 'artist'" to="/user/portfolio">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="spa.portfolio[getLang]"
              />
            </v-list-item>
            <v-list-item v-if="userRole === 'admin'" to="/admin/gallery">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="spa.galleryList[getLang]"
              />
            </v-list-item>
            <v-list-item to="/gallery">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="spa.gallery[getLang]"
              />
            </v-list-item>
            <v-list-item to="/user/settings">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="spa.settings[getLang]"
              />
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="routes.logout[getLang]"
              />
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>

    </v-app-bar>

    <!-- Mobile -->
    <v-app-bar class="hidden-md-and-up px-6 rounded-b-xl" app outlined absolute color="#e8e8e8" height="50px">
      <v-btn width="122px" color="transparent" text icon to="/">
        <g-image style="width: 100%" :src="logo[1]" alt="logo" />
      </v-btn>

      <v-spacer />

      <v-toolbar-items class="pa-0">
       <v-menu bottom :offset-y="true" transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn class="px-2" text v-on="on" color="transparent" :ripple="false">
              <v-avatar size="40">
                <v-img v-if="userPicture" :src="userPicture" alt="profile pic" />
              </v-avatar>
              <v-icon color="#333333" right large>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list flat color="#e8e8e8">
            <v-list-item to="/user/profile">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="spa.profile[getLang]"
              />
            </v-list-item>
            <v-list-item v-if="userRole === 'admin' || userRole === 'artist'" to="/user/portfolio">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="spa.portfolio[getLang]"
              />
            </v-list-item>
            <v-list-item v-if="userRole === 'admin'" to="/admin/gallery">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="spa.galleryList[getLang]"
              />
            </v-list-item>
            <v-list-item to="/user/settings">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="spa.settings[getLang]"
              />
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="routes.logout[getLang]"
              />
            </v-list-item>
          </v-list>
        </v-menu>
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
        <div class="hidden-sm-and-down pb-1">
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
        <div class="hidden-md-and-up pb-1">
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
          <!-- Desktop -->
          <div class="hidden-sm-and-down raleway-18-600 black-text">
            Artventures
            <span class="color-757575">
              &copy; {{ new Date().getFullYear() }}
            </span>
          </div>
          <!-- Mobile -->
          <div class="hidden-md-and-up raleway-16-600 black-text">
            Artventures
            <span class="color-757575">
              &copy; {{ new Date().getFullYear() }}
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

export default {
  components: {
    Newsletter: () => import("~/components/Newsletter.vue"),
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
    if (!this.$auth.isAuthenticated())
      this.$auth.login()
    if (process.isClient) {
      if (localStorage.getItem('vue-cookie-accept-decline-cookieBar') === 'postpone') {
        this.$refs.cookieBar.removeCookie();
        this.$refs.cookieBar.init();
      }
    }
  },
  data () {
    return {
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
        gr: 'Αρνούμαι',
        en: 'Decline',
      },
      logo: [
        'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_76,w_auto/v1583838043/artventures/artventures_logo.svg',
        'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_50,w_auto/v1583838043/artventures/artventures_logo.svg',
      ],
      routes: {
        logout: {
          gr: '<div class="color-333333 text-capitalize">Αποσύνδεση</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">Logout</div>', // English, raw html
        }
      },
      spa: {
        profile: {
          gr: '<div class="color-333333 text-capitalize">Προφίλ</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">Profile</div>', // English, raw html
        },
        portfolio: {
          gr: '<div class="color-333333 text-capitalize">Πορτφόλιο</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">Portfolio</div>', // English, raw html
        },
        settings: {
          gr: '<div class="color-333333 text-capitalize">Ρυθμίσεις</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">Settings</div>', // English, raw html
        },
        galleryList: {
          gr: '<div class="color-333333 text-capitalize">Πίνακας Έργων</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">Artworks Table</div>', // English, raw html
        },
        gallery: {
          gr: '<div class="color-333333 text-capitalize">Γκαλερί</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">Gallery</div>', // English, raw html
        },
      },
    }
  },
  computed: {
    ...mapGetters(['getLang', 'getLanguages']),
    userRole () {
      if (this.$auth.userRole != null) {
        return this.$auth.userRole[0].name
      }
      return null
    },
    userPicture () {
      if (this.$auth.user) {
        if (process.isClient) {
          var user = JSON.parse(localStorage.getItem('user'))
          return user.picture
        }
      }
      return null
    }
  },
  methods: {
    ...mapMutations(['setLang', 'setCookieRedirect']),
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
    },
    logout() {
      this.$auth.logout();
    },
  }
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
.noto-16-600 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 16px !important;
  font-weight: 600 !important;
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
.noto-25-600 {
  font-family: 'Noto Sans', serif !important;
  font-size: 25px !important;
  font-weight: 600 !important;
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
/* Nunito */
.nunito-12-400 {
  font-family: 'Nunito', sans-serif !important;
  font-size: 12px !important;
  font-weight: 400 !important;
  font-style: italic;
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
.raleway-21-400 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 21px !important;
  font-weight: 400 !important;
}
.raleway-23-400 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 23px !important;
  font-weight: 400 !important;
}
.raleway-25-400 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 25px !important;
  font-weight: 400 !important;
}

/* Playfair Display */
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
  border: 1px solid #525252 !important;
  background: #F5F5F5 !important;
  color: #525252 !important;
}
.cookie__bar__buttons__button--decline {
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