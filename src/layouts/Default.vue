<template>
  <v-app>
    <v-app-bar app>
      <div class="flex-grow-1"></div>
      <v-toolbar-items>
        <v-btn color="black--text" text to="/for-home"/>
        <v-btn color="black--text" text to="/for-business"/>
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

<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>