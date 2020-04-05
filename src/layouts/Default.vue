<template>
  <v-app>
    <v-app-bar flat class="hidden-sm-and-down px-11" app absolute color="#e8e8e8" height="76px">

      <v-btn width="185" color="transparent" text icon to="/">/
        <v-img
          :src="logo[0]"
        />
      </v-btn>

      <v-spacer />

      <v-toolbar-items class="pa-0">
        <v-btn
          class="nunito-18-600 px-2"
          text color="transparent"
          to="/"
          v-html="routes.about[getLang]"
        />
        <v-menu open-on-hover bottom :offset-y="true" transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn class="px-2" text color="transparent" v-on="on" :ripple="false">
              <div style="color: #333333" class="nunito-18-600" v-html="routes.explore[getLang]"></div>
            </v-btn>
          </template>
          <v-list flat color="#e8e8e8">
            <v-list-item v-for="(route, i) in routes.explore.routes" :key="'route-' + i" :to="route.route">
              <v-list-item-title class="nunito-18-600" v-html="route[getLang]" />
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          v-if="$route.path == '/'"
          class="nunito-18-600 px-2"
          text color="transparent"
          @click="$vuetify.goTo('#artists')"
          v-html="routes.forArtists[getLang]"
        />
        <v-btn
          v-else
          class="nunito-18-600 px-2"
          text color="transparent"
          :to="{ path: '/', hash:'#artists' }"
          v-html="routes.forArtists[getLang]"
        />
        <v-btn
          class="nunito-18-600 px-2"
          text color="transparent"
          to="/faq"
          v-html="routes.faq[getLang]"
        />
        <div class="py-4 px-2">
        <v-btn
          class="raleway-18-400 py-5"
          depressed
          color="#333333"
          to="#contact"
          v-html="routes.contact[getLang]"
        />
        </div>
        <v-menu bottom :offset-y="true" transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn class="px-2" text color="transparent" v-on="on" :ripple="false">
              <div style="color: #333333" class="nunito-18-600">{{ getLang }}</div>
              <v-icon color="#333333" right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(language, i) in languages" :key="'lang-' + i" @click="setLang(language)">
              <v-list-item-title style='color: #333333' class="text-center nunito-18-600 text-uppercase">
                {{ language }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>

    <v-app-bar class="hidden-md-and-up px-3" app absolute color="#F7F7F7" height="50px">
      <v-btn width="122px" color="transparent" text icon to="/">/
        <v-img
          :src="logo[1]"
        />
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
                      <v-list-item-title class="raleway-35-400" v-html="routes.about[getLang]" />
                    </v-list-item>
                    <v-list-item class="pb-5 px-0" @click="$refs.menucarousel.next();">
                      <v-list-item-title class="raleway-35-400" v-html="routes.explore[getLang]" />
                      <v-list-item-icon>
                        <v-icon large color="#757575">mdi-chevron-double-right</v-icon>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-list-item class="pb-5 px-0" to="/#artists">
                      <v-list-item-title class="raleway-35-400" v-html="routes.forArtists[getLang]" />
                    </v-list-item>
                    <v-list-item class="pb-5 px-0" to="/faq">
                      <v-list-item-title class="raleway-35-400" v-html="routes.faq[getLang]" />
                    </v-list-item>
                    <v-list-item class="pb-5 px-0">
                      <v-btn
                        class="raleway-25-400 py-4"
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
                      <v-list-item-title style="color: #333333" class="nunito-15-400">Back</v-list-item-title>
                    </v-list-item>
                    <v-list-item class="pb-5 px-0" v-for="(route, i) in routes.explore.routes" :key="'modal-route-' + i" :to="route.route">
                      <v-list-item-title class="raleway-35-400" v-html="route[getLang]" />
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
      class="px-12 py-9"
    >
      <div style="color: #757575" class="raleway-16-400"><span style="color: #000000; font-weight: 600;">Artventures</span> &copy; 2020</div>
      
      <div class="flex-grow-1" />

      <div class="flex-grow-1" />
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
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      logo: [
        'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_76,w_auto/v1583838043/artventures/artventures_logo.svg',
        'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_50,w_auto/v1583838043/artventures/artventures_logo.svg',
      ],
      routes: {
        about: {
          'gr': '<div style="color: #333333" class="text-capitalize">Αρχική</div>', // Greek, raw html
          'en': '<div style="color: #333333" class="text-capitalize">About</div>', // English, raw html
        },
        explore: {
          'gr': '<div style="color: #333333" class="text-capitalize">Εξερεύνησε</div>', // Greek, raw html
          'en': '<div style="color: #333333" class="text-capitalize">Explore</div>', // English, raw html
          'routes': [
            {
              'gr': '<div style="color: #333333" class="text-capitalize">Ιδιώτες</div>',
              'en': '<div style="color: #333333" class="text-capitalize">Individuals</div>',
              'route': '/individuals',
            },
            {
              'gr': '<div style="color: #333333" class="text-capitalize">Εταιρείες</div>',
              'en': '<div style="color: #333333" class="text-capitalize">Businesses</div>',
              'route': '/businesses',
            },
            {
              'gr': '<div style="color: #333333" class="text-capitalize">Ξενοδοχεία</div>',
              'en': '<div style="color: #333333" class="text-capitalize">Hotels</div>',
              'route': '/hotels',
            }
          ]
        },
        forArtists: {
          'gr': '<div style="color: #333333" class="text-capitalize">Για Καλλιτέχνες</div>', // Greek, raw html
          'en': '<div style="color: #333333" class="text-capitalize">For Artists</div>', // English, raw html
        },
        faq: {
          'gr': '<div style="color: #333333" class="text-capitalize">Ερωτήσεις</div>', // Greek, raw html
          'en': '<div style="color: #333333">F.A.Q.</div>', // English, raw html
        },
        contact: {
          'gr': '<div style="color: #FFFFFF" class="text-capitalize">Επικοινωνία</div>', // Greek, raw html
          'en': '<div style="color: #FFFFFF" class="text-capitalize">Contact</div>', // English, raw html
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

  /* Text Fonts */
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
  .raleway-16-400 {
    font-family: 'Raleway', sans-serif !important;
    font-size: 16px !important;
    font-weight: 400 !important;
  }
  .raleway-18-400 {
    font-family: 'Raleway', sans-serif !important;
    font-size: 18px !important;
    font-weight: 400 !important;
  }
  .raleway-25-400 {
    font-family: 'Raleway', sans-serif !important;
    font-size: 25px !important;
    font-weight: 400 !important;
  }
  .raleway-35-400 {
    font-family: 'Raleway', sans-serif !important;
    font-size: 35px !important;
    font-weight: 400 !important;
  }
</style>

<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>