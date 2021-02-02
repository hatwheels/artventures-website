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
      <div slot="message" class="messageText" :class="'nunito-18-400'">
        {{ $helper.cookieTxt[getLang] }}
      </div>
      <div slot="declineContent" :class="'nunito-18-400'">
        {{ $helper.declineCookies[getLang] }}
      </div>
      <div slot="acceptContent" :class="'nunito-18-400'">
        {{ $helper.allowCookies[getLang] }}
        </div>
    </vue-cookie-accept-decline>

    <!-- Desktop -->
    <v-app-bar
      class="hidden-md-and-down px-4 rounded-b-xl"
      app outlined absolute
      color="#e8e8e8" height="76px"
    >
      <v-toolbar-items class="pa-0">
        <g-link to="/">
          <g-image width="185" :src="$helper.logo[0]" alt="logo" />
        </g-link>
      </v-toolbar-items>

      <v-spacer />

      <v-toolbar-items class="pa-0">
        <v-btn
          :class="'nunito-18-400'"
          text color="transparent"
          to="/"
          v-html="$helper.routes.about[getLang]"
        />
        <v-menu open-on-hover open-delay="300" bottom :offset-y="true" transition="slide-y-transition">
          <template v-slot:activator="{ on, attrs, value }">
            <v-btn text color="transparent" v-on="on" v-bind="attrs" :ripple="false">
              <div
                :class="'nunito-18-400'"
                class="color-333333"
                v-html="$helper.routes.explore[getLang]"
              />
              <v-icon v-if="value" color="#333333">mdi-chevron-up</v-icon>
              <v-icon v-else color="#333333">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list color="#e8e8e8">
            <v-list-item v-for="(route, i) in $helper.routes.explore.routes" :key="'route-' + i" :to="route.route">
              <v-list-item-title :class="getLang === 'gr' ? 'noto-16-500' : 'nunito-18-400'" v-html="route[getLang]" />
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          :class="'nunito-18-400'"
          text color="transparent"
          to="/artists"
          v-html="$helper.routes.forArtists[getLang]"
        />
        <v-btn
          :class="'nunito-18-400'"
          text color="transparent"
          to="/gallery"
          v-html="$helper.routes.gallery[getLang]"
        />
        <v-btn
          :class="'nunito-18-400'"
          text color="transparent"
          to="/faq"
          v-html="$helper.routes.faq[getLang]"
        />
        <div class="my-5 mx-2">
          <v-btn
            v-if="$route.path == '/'"
            :class="'raleway-18-400'"
            class="rounded-lg"
            depressed
            elevation="2"
            color="#333333"
            @click="goTo('#contact-us')"
            v-html="$helper.routes.contact[getLang]"
          />
          <v-btn
            v-else
            :class="'raleway-18-400'"
            class="rounded-lg"
            depressed
            elevation="2"
            color="#333333"
            :to="{ path: '/', hash:'#contact-us' }"
            v-html="$helper.routes.contact[getLang]"
          />
        </div>
        <v-menu open-on-hover open-delay="300" bottom :offset-y="true" transition="slide-y-transition">
          <template v-slot:activator="{ on, attrs, value }">
            <v-btn text color="transparent" v-on="on" v-bind="attrs" :ripple="false">
              <div
                class="color-333333 nunito-18-400"
                v-html="getLang"
              />
              <v-icon v-if="!value" color="#333333">mdi-chevron-down</v-icon>
              <v-icon v-else color="#333333">mdi-chevron-up</v-icon>
            </v-btn>
          </template>
          <v-list color="#e8e8e8">
            <v-list-item v-for="(language, i) in getLanguages" :key="'lang-' + i" @click="setLanguage(language)">
              <v-list-item-title
                class="color-333333 text-center text-uppercase nunito-18-400"
                v-html="language"
              />
            </v-list-item>
          </v-list>
        </v-menu>
        <v-divider class="mx-1" vertical inset />
      </v-toolbar-items>
      <v-tooltip bottom color="black">
        <template v-slot:activator="{ on, attrs }">
          <v-badge
            v-show="$eshop.basketValue.length > 0"
            class="mx-4"
            overlap
            color="green"
            left
            :content="$eshop.basketValue.length"
          >
            <v-btn
              class="ml-1"
              v-bind="attrs" v-on="on"
              height="30" width="30"
              large
              icon color="transparent"
              to="/eshop/checkout"
            >
              <v-icon color="#333333">mdi-basket</v-icon>
            </v-btn>
          </v-badge>
          <v-btn
            v-show="$eshop.basketValue.length === 0"
            class="mx-4"
            v-bind="attrs" v-on="on"
            height="30" width="30"
            large
            icon color="transparent"
            to="/eshop/checkout"
          >
            <v-icon color="#333333">mdi-basket</v-icon>
          </v-btn>
        </template>
        <span v-html="$helper.routes.basket[getLang]" />
      </v-tooltip>
      <v-btn
        v-if="!isAuthenticated"
        id="login-btn"
        class="nunito-18-400 rounded-lg"
        outlined
        elevation="1"
        color="transparent"
        @click="$auth.login()"
        v-html="$helper.routes.login[getLang]"
      />
      <v-toolbar-items v-else class="pa-0 ml-4">
        <v-menu bottom :offset-y="true" transition="slide-y-transition" open-on-hover open-delay="300">
          <template v-slot:activator="{ on, attrs, value }">
            <v-btn class="px-0" v-on="on" v-bind="attrs" text color="transparent" :ripple="false">
              <v-avatar>
                <v-img v-if="userPicture" :src="userPicture" alt="profile pic" />
              </v-avatar>
              <v-icon v-if="value" color="#333333">mdi-chevron-up</v-icon>
              <v-icon v-else color="#333333">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list color="#e8e8e8">
            <v-list-item to="/user/profile">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="$helper.spa.profile[getLang]"
              />
            </v-list-item>
            <v-list-item v-if="userRole === 'admin' || userRole === 'artist'" to="/user/portfolio">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="$helper.spa.portfolio[getLang]"
              />
            </v-list-item>
            <v-list-item to="/gallery">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="$helper.spa.gallery[getLang]"
              />
            </v-list-item>
            <v-list-item to="/user/favorites">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="$helper.spa.favorites[getLang]"
              />
            </v-list-item>
            <v-list-item to="/user/settings">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="$helper.spa.settings[getLang]"
              />
            </v-list-item>
            <v-list-item v-if="userRole === 'admin'" to="/admin/gallery">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="$helper.spa.galleryList[getLang]"
              />
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="$helper.routes.logout[getLang]"
              />
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>

  <!-- Mobile -->
    <v-app-bar
      app absolute
      class="hidden-lg-and-up px-3"
      color="#F7F7F7" height="50px"
    >
      <v-btn width="122px" color="transparent" text icon to="/">
        <g-image style="width: 100%" :src="$helper.logo[1]" alt="logo" />
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
              <v-carousel
                ref="menucarousel"
                hide-delimiter-background
                hide-delimiters
                :show-arrows="false"
                height="100%"
              >
                <v-carousel-item>
                  <v-list color="#ffffff" class="px-9  py-9">
                    <v-list-item class="pb-5 px-0" to="/">
                      <v-list-item-title
                        :class="getLang === 'gr' ? 'noto-28-400' : 'raleway-28-400'"
                        v-html="$helper.routes.about[getLang]"
                      />
                    </v-list-item>
                    <v-list-item class="pb-5 px-0" @click="modalSlide = 'explore'; $refs.menucarousel.next();">
                      <v-list-item-title
                        :class="getLang === 'gr' ? 'noto-28-400' : 'raleway-28-400'"
                        v-html="$helper.routes.explore[getLang]"
                      />
                      <v-list-item-icon>
                        <v-icon large color="#757575">mdi-chevron-double-right</v-icon>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-list-item class="pb-5 px-0" to="/artists">
                      <v-list-item-title
                        :class="getLang === 'gr' ? 'noto-28-400' : 'raleway-28-400'"
                        v-html="$helper.routes.forArtists[getLang]"
                      />
                    </v-list-item>
                    <v-list-item class="pb-5 px-0" to="/gallery">
                      <v-list-item-title
                        :class="getLang === 'gr' ? 'noto-28-400' : 'raleway-28-400'"
                        v-html="$helper.routes.gallery[getLang]"
                      />
                    </v-list-item>
                    <v-list-item class="pb-5 px-0" to="/faq">
                      <v-list-item-title
                        :class="getLang === 'gr' ? 'noto-28-400' : 'raleway-28-400'"
                        v-html="$helper.routes.faq[getLang]"
                      />
                    </v-list-item>
                    <v-list-item v-if="$route.path == '/'" class="pb-5 px-0">
                      <v-btn
                        :class="getLang === 'gr' ? 'noto-25-400' : 'raleway-25-400'"
                        depressed
                        elevation="2"
                        x-large
                        color="#333333"
                        @click="modalMenu = false; goTo('#contact-us-small');"
                        v-html="$helper.routes.contact[getLang]"
                      />
                    </v-list-item>
                    <v-list-item v-else class="pb-5 px-0">
                      <v-btn
                        :class="getLang === 'gr' ? 'noto-25-400' : 'raleway-25-400'"
                        class="py-4"
                        depressed
                        elevation="2"
                        x-large
                        color="#333333"
                        :to="{ path: '/', hash:'#contact-us-small' }"
                        v-html="$helper.routes.contact[getLang]"
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
                    <v-list-item class="pb-5 px-0" to="/eshop/checkout">
                        <v-badge
                          v-show="$eshop.basketValue.length > 0"
                          class="mr-6"
                          color="green"
                          :content="$eshop.basketValue.length"
                        >
                          <v-icon color="#333333">mdi-basket</v-icon>
                        </v-badge>
                        <v-icon
                          v-show="$eshop.basketValue.length === 0"
                          class="mr-4"
                          color="#333333"
                        >
                          mdi-basket
                        </v-icon>
                        <v-list-item-content>
                          <v-list-item-title
                            :class="getLang === 'gr' ? 'noto-28-400' : 'raleway-28-400'"
                            class="color-333333"
                            v-html="$helper.routes.basket[getLang]"
                          >
                          </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="!isAuthenticated" class="pb-5 px-0" @click="$auth.login()">
                      <v-list-item-title
                        :class="getLang === 'gr' ? 'noto-28-400' : 'raleway-28-400'"
                        v-html="$helper.routes.login[getLang]"
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
                    <v-list-item
                      class="pb-5 px-0"
                      v-for="(route, i) in $helper.routes.explore.routes"
                      :key="'modal-route-' + i" :to="route.route"
                    >
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
        <v-menu v-if="isAuthenticated" bottom :offset-y="true" transition="slide-y-transition">
          <template v-slot:activator="{ on, attrs, value }">
            <v-btn class="px-0" text v-on="on" v-bind="attrs" color="transparent" :ripple="false">
              <v-avatar size="36">
                <v-img v-if="userPicture" :src="userPicture" alt="profile pic" />
              </v-avatar>
              <v-icon v-if="value" color="#333333">mdi-chevron-up</v-icon>
              <v-icon v-else color="#333333">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list flat color="#e8e8e8">
            <v-list-item to="/user/profile">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="$helper.spa.profile[getLang]"
              />
            </v-list-item>
            <v-list-item v-if="userRole === 'admin' || userRole === 'artist'" to="/user/portfolio">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="$helper.spa.portfolio[getLang]"
              />
            </v-list-item>
            <v-list-item to="/gallery">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="$helper.spa.gallery[getLang]"
              />
            </v-list-item>
            <v-list-item to="/user/favorites">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="$helper.spa.favorites[getLang]"
              />
            </v-list-item>
            <v-list-item to="/user/settings">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="$helper.spa.settings[getLang]"
              />
            </v-list-item>
            <v-list-item v-if="userRole === 'admin'" to="/admin/gallery">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="$helper.spa.galleryList[getLang]"
              />
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title
                :class="getLang === 'gr' ? 'noto-16-500' : 'raleway-18-400'"
                color="#333333"
                v-html="$helper.routes.logout[getLang]"
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
      fixed
      absolute
      class="d-flex flex-xs-row flex-sm-row flex-column justify-space-around align-center px-12 py-9"
    >

      <newsletter></newsletter>

      <div class="hidden-md-and-up pb-6"></div>

      <div class="d-flex flex-column align-center">
        <!-- Desktop -->
        <div class="hidden-sm-and-down pb-1">
          <a class="px-1 no-decoration" href="https://www.facebook.com/artventures.me" target="_blank">
            <v-icon large class="black--text">mdi-facebook</v-icon>
          </a>
          <a class="px-1 no-decoration" href="https://www.instagram.com/artventures.me/" target="_blank">
            <v-icon large class="black--text">mdi-instagram</v-icon>
          </a>
          <a class="px-1 no-decoration" href="https://twitter.com/Artventures6" target="_blank">
            <v-icon large class="black--text">mdi-twitter</v-icon>
          </a>
          <a class="px-1 no-decoration" href="https://www.linkedin.com/company/artventuresco" target="_blank">
            <v-icon large class="black--text">mdi-linkedin</v-icon>
          </a>
        </div>
        <!-- Mobile -->
        <div class="hidden-md-and-up pb-1">
          <a class="px-2 no-decoration" href="https://www.facebook.com/artventures.me" target="_blank">
            <v-icon class="black--text" small>mdi-facebook</v-icon>
          </a>
          <a class="px-2 no-decoration" href="https://www.instagram.com/artventures.me/" target="_blank">
            <v-icon class="black--text" small>mdi-instagram</v-icon>
          </a>
          <a class="px-2 no-decoration" href="https://twitter.com/Artventures6" target="_blank">
            <v-icon class="black--text" small>mdi-twitter</v-icon>
          </a>
          <a class="px-2 no-decoration" href="https://www.linkedin.com/company/artventuresco" target="_blank">
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
          :class="getLang === 'en' ? 'raleway-13-400' : 'noto-13-400'"
          class="black--text no-decoration"
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
      },
    }
  },
  computed: {
    ...mapGetters(['getLang', 'getLanguages']),
    userRole () {
      if (this.$auth.userRole != null) {
        return this.$auth.userRole[0].name;
      }
      return null;
    },
    userPicture () {
      if (this.$auth.user) {
        if (process.isClient) {
          var user = JSON.parse(localStorage.getItem('user'));
          return user.picture;
        }
      }
      return null;
    }
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
    },
    logout() {
      this.$auth.logout();
    }
  },
}
</script>

<style>
@import '../assets/style/transitions.css';

#login-btn.v-btn--outlined {
  border: thin solid #333333 !important;
}

.border-fa-btn {
  border: thin solid #333333 !important;
}

.no-decoration {
  text-decoration: none;
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
.nunito-12-400 {
  font-family: 'Nunito', sans-serif !important;
  font-size: 12px !important;
  font-weight: 400 !important;
  font-style: italic;
}

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
.raleway-12-400 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 12px !important;
  font-weight: 400 !important;
}
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
/* Montserrat */
.montserrat-10-400-italic {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 10px !important;
  font-weight: 400 !important;
  font-style: italic !important;
}
.montserrat-12-400-italic {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px !important;
  font-weight: 400 !important;
  font-style: italic !important;
}

.cookie__bar__buttons__button--accept {
  border: 1px solid #525252 !important;
  background: #F5F5F5 !important;
  color: #525252 !important;
}
.cookie__bar__buttons__button--decline {
  background: #525252 !important;
}
.v-card__text, .v-card__title, .v-card__subtitle {
  word-break: normal imp !important;
  line-height: 1.1;
}

.v-navigation-drawer__border {
  background-color: transparent !important;
}

.v-toolbar__content {
  padding-bottom: 0px;
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
}
</style>

<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>