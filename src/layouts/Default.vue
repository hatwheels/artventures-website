<template>
  <v-app>
    <v-app-bar app absolute color="#dddddd" height="74px">
      <v-btn width="180px" color="transparent" text icon to="/">/
        <v-img
          src="https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_74,w_auto/v1583838043/artventures/artventures_logo.svg"
        />
      </v-btn>

      <v-spacer />

      <v-toolbar-items  class="hidden-sm-and-up">
        <v-btn
          class="body-1 px-2"
          text color="transparent"
          to="/about"
          v-html="routes.about[getLang]"
        />
        <v-menu open-on-hover bottom :offset-y="true" transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn class="px-2" text color="transparent" v-on="on" :ripple="false">
              <div style="color: #333333" class="body-1" v-html="routes.explore[getLang]"></div>
            </v-btn>
          </template>
          <v-list flat color="#dddddd">
            <v-list-item v-for="(route, i) in routes.explore.routes" :key="'route-' + i" :to="route.route">
              <v-list-item-title class="body-1" v-html="route[getLang]" />
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          class="body-1 px-2"
          text color="transparent"
          to="/artists"
          v-html="routes.forArtists[getLang]"
        />
        <v-btn
          class="body-1 px-2"
          text color="transparent"
          to="/faq"
          v-html="routes.faq[getLang]"
        />
        <div class="py-4 px-2">
        <v-btn
          class="subtitle-1 py-5"
          depressed
          color="#333333"
          to="#contact"
          v-html="routes.contact[getLang]"
        />
        </div>
        <v-menu bottom :offset-y="true" transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn class="px-2" text color="transparent" v-on="on" :ripple="false">
              <div style="color: #333333" class="body-1">{{ getLang }}</div>
              <v-icon color="#333333" right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(language, i) in languages" :key="i" @click="setLang(language)">
              <v-list-item-title style='color: #333333' class="text-center body-1 text-uppercase">
                {{ language }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>

      <v-toolbar-items class="hidden-md-and-up">
        <!-- <v-menu bottom left :offset-y="true" transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn large icon v-on="on">
              <v-icon large>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/for-home">
              <v-list-item-title class="subtitle-1" v-html="routes.forHome[getLang]" />
            </v-list-item>
            <v-list-item to="/for-home">
              <v-list-item-title class="subtitle-1" v-html="routes.forBusiness[getLang]" />
            </v-list-item>
          </v-list>
        </v-menu> -->
        <v-menu bottom :offset-y="true" transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn text class="black--text" color="black--text" v-on="on" :ripple="false">
              <div>{{ getLang }}</div>
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(language, i) in languages" :key="i" @click="setLang(language)">
              <v-list-item-title class="text-center subtitle-1 text-uppercase">{{ language }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
    <slot />
    <v-footer
      app
      color="white"
      absolute
    >
      <span class="black--text"><strong>Artventures</strong> &copy; 2020</span>
      
      <div class="flex-grow-1" />

      <div class="flex-grow-1" />
      <v-btn class="hidden-lg-and-down" large text icon color="rgb(59,89,152)" href="https://www.facebook.com/artventures.me">
        <v-icon>mdi-facebook-box</v-icon>
      </v-btn>
      <v-btn class="hidden-xl-only hidden-xs-only" text icon color="rgb(59,89,152)" href="https://www.facebook.com/artventures.me">
        <v-icon>mdi-facebook-box</v-icon>
      </v-btn>
      <v-btn class="hidden-sm-and-up" small text icon color="rgb(59,89,152)" href="https://www.facebook.com/artventures.me">
        <v-icon>mdi-facebook-box</v-icon>
      </v-btn>
      <v-btn class="hidden-lg-and-down" large text icon color="rgb(193,53,132)" href="https://www.instagram.com/artventures.me/">
        <v-icon>mdi-instagram</v-icon>
      </v-btn>
      <v-btn class="hidden-xl-only hidden-xs-only" text icon color="rgb(193,53,132)" href="https://www.instagram.com/artventures.me/">
        <v-icon>mdi-instagram</v-icon>
      </v-btn>
      <v-btn class="hidden-sm-and-up" small text icon color="rgb(193,53,132)" href="https://www.instagram.com/artventures.me/">
        <v-icon>mdi-instagram</v-icon>
      </v-btn>
      <v-btn class="hidden-lg-and-down" large text icon color="rgb(29,161,242)" href="https://twitter.com/Artventures6">
        <v-icon>mdi-twitter-box</v-icon>
      </v-btn>
      <v-btn class="hidden-xl-only hidden-xs-only" text icon color="rgb(29,161,242)" href="https://twitter.com/Artventures6">
        <v-icon>mdi-twitter-box</v-icon>
      </v-btn>
      <v-btn class="hidden-sm-and-up" small text icon color="rgb(29,161,242)" href="https://twitter.com/Artventures6">
        <v-icon>mdi-twitter-box</v-icon>
      </v-btn>
      <v-btn class="hidden-lg-and-down" large text icon color="rgb(0,119,181)" href="https://www.linkedin.com/company/artventuresco">
        <v-icon>mdi-linkedin-box</v-icon>
      </v-btn>
      <v-btn class="hidden-xl-only hidden-xs-only" text icon color="rgb(0,119,181)" href="https://www.linkedin.com/company/artventuresco">
        <v-icon>mdi-linkedin-box</v-icon>
      </v-btn>
      <v-btn class="hidden-sm-and-up" small text icon color="rgb(0,119,181)" href="https://www.linkedin.com/company/artventuresco">
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
      }
    }
  },
  computed: {
    ...mapGetters(['getLang']),
    setVContentHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true
        default:
          return false
      }
    }
  },
  methods: {
    ...mapMutations(['setLang']),
  },
}
</script>

<style>
  .v-toolbar__content {
    padding-bottom: 10px;
    padding-top: 10px;
    padding-left: 43px;
    padding-right: 43px;
  }
  .v-application .body-1 {
    font-family: 'Nunito', sans-serif !important;
    font-size: 18px !important;
    font-weight: 600;
  }
  .v-application .subtitle-1 {
    font-family: 'Raleway', sans-serif !important;
    font-size: 18px !important;
  }

  .v-application .caption,
  .v-application .overline,

  .v-application .body-2,

  .v-application .subtitle-2,
  .v-application .body-1,
  .v-application .body-2,
  .v-application .caption,
  .v-application .overline,
  .v-application .title,
  .v-application .headline,
  .v-application .display-1,
  .v-application .display-2,
  .v-application .display-3,
  .v-application .display-4 {
    
  }
</style>

<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>