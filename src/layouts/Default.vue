<template>
  <v-app>
    <v-app-bar app absolute color="white">
      <v-btn id="logo" class="mx-1" text icon to="/">
        <v-img
          class="flex-grow-0"
          :src="require('~/assets/images/artventures-logo.png')"
          height="54px" width="84px"
          contain
        />
      </v-btn>
      <v-spacer />
      <v-toolbar-items>
        <v-tabs optional color="black" height="100%">
          <v-tab class="black--text" :ripple="false" to="/for-home">For Home</v-tab>
          <v-tab class="black--text" :ripple="false" to="/for-business">For Business</v-tab>
        </v-tabs>
        <v-menu bottom left :offset-y="true">
          <template v-slot:activator="{ on }">
            <v-btn text icon v-on="on" :ripple="false">
              <v-img height="44px" contain :src="require('~/assets/svg/' + flags[flagId])" />
            </v-btn>
          </template>
          <v-list width="100px">
            <v-list-item v-for="(flag, i) in flags" :key="i" @click="changeLang(i)">
              <v-img height="34px" contain :src="require('~/assets/svg/' + flag)" />
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
    <v-content class="px-0 py-0">
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
        <v-btn text icon color="blue darken-3" href="https://www.facebook.com/artventures.me">
          <v-icon>mdi-facebook-box</v-icon>
        </v-btn>
      </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      flags: [
        'gr-flag.svg',
        'gb-flag.svg',
      ],
      flagId: 0,
    }
  },
  methods: {
    changeLang (id) {
      this.flagId = id
    },
  }
}
</script>

<style>
#logo:active {
  color: transparent;
}
</style>

<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>