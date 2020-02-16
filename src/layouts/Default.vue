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
        />
        <v-menu bottom :offset-y="true" transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn text class="black--text" color="black--text" v-on="on" :ripple="false">
              <div>{{ flags[getLang] }}</div>
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(flag, i) in flags" :key="i" @click="setLang(i)">
              <v-list-item-title class="subtitle-1">{{ flag }}</v-list-item-title>
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
              <v-list-item-title class="subtitle-1" v-html="routes.forHome[getLang]" />
            </v-list-item>
            <v-list-item to="/for-home">
              <v-list-item-title class="subtitle-1" v-html="routes.forBusiness[getLang]" />
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu bottom :offset-y="true" transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-btn text class="black--text" color="black--text" v-on="on" :ripple="false">
              <div>{{ flags[getLang] }}</div>
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(flag, i) in flags" :key="i" @click="setLang(i)">
              <v-list-item-title class="subtitle-1">{{ flag }}</v-list-item-title>
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
        'GR', // Greek
        'EN', // English
      ],
      routes: {
        home: [
          'Αρχική',
          'Home'
        ],
        forHome: [
          '<div><span class="text-capitalize">Για</span><span class="text-lowercase"> το </span><span class="text-capitalize">Σπίτι</span></div>',// Greek, raw html
          '<div class="text-capitalize">For Home</div>', // English, raw html
        ],
        forBusiness: [
          '<div><span class="text-capitalize">Για</span><span class="text-lowercase"> την </span><span class="text-capitalize">Επιχείρηση</span></div>',// Greek, raw html
          '<div class="text-capitalize">For Business</div>', // English, raw html
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

<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>