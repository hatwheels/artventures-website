<template>
  <v-app>
    <main>
      <slot />
    </main>
  </v-app>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
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
  computed: {
    ...mapGetters(['getLang']),
  },
  methods: {
    ...mapMutations(['setLang'])
  }
}
</script>