<template>
  <v-app>
    <v-app-bar app absolute color="white">
      <v-btn color="transparent" class="mx-1" text icon to="/">
        <v-img
          class="flex-grow-0"
          :src="require('~/assets/images/artventures-logo.png')"
          height="54px" width="84px"
          contain
        />
      </v-btn>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          class="text-capitalize subtitle-1"
          text color="black"
          to="/for-home"
        >
          {{ routes.forHome[getLang] }}
        </v-btn>
        <v-btn
          class="text-capitalize subtitle-1"
          text color="black"
          to="/for-business"
        >
          {{ routes.forBusiness[getLang] }}
        </v-btn>
        <v-menu bottom :offset-y="true" transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn color="transparent" text icon v-on="on" :ripple="false">
              <v-img height="44px" width="44px" contain :src="require('~/assets/svg/' + flags[getLang])" />
            </v-btn>
          </template>
          <v-list width="100px">
            <v-list-item v-for="(flag, i) in flags" :key="i" @click="setLang(i)">
              <v-img height="34px" width="34px" contain :src="require('~/assets/svg/' + flag)" />
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-md-and-up">
        <v-menu bottom left :offset-y="true" transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn large icon v-on="on">
              <v-icon large>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/for-home">
              <v-list-item-title class="subtitle-1">{{ routes.forHome[getLang] }}</v-list-item-title>
            </v-list-item>
            <v-list-item to="/for-home">
              <v-list-item-title class="subtitle-1">{{ routes.forBusiness[getLang] }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu bottom :offset-y="true" transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn color="transparent" text icon v-on="on" :ripple="false">
              <v-img height="34px" width="34px" contain :src="require('~/assets/svg/' + flags[getLang])" />
            </v-btn>
          </template>
          <v-list width="70px">
            <v-list-item v-for="(flag, i) in flags" :key="i" @click="setLang(i)">
              <v-img height="24px" width="24px" contain :src="require('~/assets/svg/' + flag)" />
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

        <v-btn class="hidden-sm-and-down" text color="transparent" to="/">
          <div class="text-capitalize grey--text text--darken-1 subtitle-1">{{ routes.home[getLang] }}</div>
        </v-btn>
        <v-divider class="hidden-sm-and-down" vertical />
        <v-btn class="hidden-sm-and-down" text color="transparent" to="/for-home">
          <div class="text-capitalize grey--text text--darken-1 subtitle-1">{{ routes.forHome[getLang] }}</div>
        </v-btn>
        <v-divider class="hidden-sm-and-down" vertical />
        <v-btn class="hidden-sm-and-down" text color="transparent" to="/for-business">
          <div class="text-capitalize grey--text text--darken-1 subtitle-1">{{ routes.forBusiness[getLang] }}</div>
        </v-btn>

        <div class="flex-grow-1"/>
        <v-btn text icon color="blue darken-3" href="https://www.facebook.com/artventures.me">
          <v-icon>mdi-facebook-box</v-icon>
        </v-btn>
      </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      flags: [
        'gr-flag.svg', // Greek
        'gb-flag.svg', // English
      ],
      routes: {
        home: [
          'Αρχική',
          'Home'
        ],
        forHome: [
          'Για το Σπίτι', // Greek
          'For Home', // English
        ],
        forBusiness: [
          'Για την Επιχείρηση', // Greek
          'For Business', // English
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['getLang'])
  },
  methods: {
    ...mapMutations(['setLang'])
  },
}
</script>

<style>
  .v-application .subtitle-1,
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
    font-family: 'Lato', sans-serif !important;
  }
</style>

<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>