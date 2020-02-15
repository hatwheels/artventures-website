<template>
  <v-app>
    <v-app-bar app>
      <div class="flex-grow-1"></div>
      <v-toolbar-items>
        <v-btn color="black--text" text to="/for-home"/>
        <v-btn color="black--text" text to="/for-business"/>
      </v-toolbar-items>
    </v-app-bar>
    <v-container>
        <slot />
    </v-container>
  </v-app>
</template>

<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>