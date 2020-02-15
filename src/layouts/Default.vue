<template>
  <v-app>
    <v-app-bar app absolute color="white">
      <v-btn id="logo" class="mx-2" text icon to="/">
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