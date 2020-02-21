<template>
  <v-app>
    <v-app-bar app absolute color="white">
      <v-btn color="transparent" class="mx-1" text icon to="/">
        <v-img
          class="flex-grow-0"
          src="https://res.cloudinary.com/de1jgt6c5/image/upload/v1582236469/artventures/artventures-logo.png"
          height="54px" width="84px"
          contain
        />
      </v-btn>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <!-- <v-btn
          class="subtitle-1"
          text color="black"
          to="/for-home"
          v-html="routes.forHome[getLang]"
        />
        <v-btn
          class="subtitle-1"
          text color="black"
          to="/for-business"
          v-html="routes.forBusiness[getLang]"
        /> -->
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
    <v-content>
      <v-container class="px-0 py-0" fluid>
        <slot />
      </v-container>
    </v-content>
      <v-footer
        app
        color="white"
        absolute
      >
        <span class="black--text"><strong>Artventures</strong> &copy; 2020</span>
        
        <div class="flex-grow-1"/>

        <div class="flex-grow-1"/>
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
      // routes: {
      //   home: [
      //     'Αρχική',
      //     'Home'
      //   ],
      //   forHome: [
      //     '<div><span class="text-capitalize">Για</span><span class="text-lowercase"> το </span><span class="text-capitalize">Σπίτι</span></div>',// Greek, raw html
      //     '<div class="text-capitalize">For Home</div>', // English, raw html
      //   ],
      //   forBusiness: [
      //     '<div><span class="text-capitalize">Για</span><span class="text-lowercase"> την </span><span class="text-capitalize">Επιχείρηση</span></div>',// Greek, raw html
      //     '<div class="text-capitalize">For Business</div>', // English, raw html
      //   ]
      // }
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  methods: {
    ...mapMutations(['setLang']),
    track () {
      this.$gtag.pageview({
        page_path: '/',
      })
    }
  },
}
</script>

<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>