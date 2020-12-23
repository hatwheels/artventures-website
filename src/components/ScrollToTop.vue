<template>
    <v-fab-transition>
        <v-btn
        v-show="toToBtn"
        v-scroll="onScroll"
        @click="toTop"
        color="#333333"
        fab
        fixed
        :large="!$vuetify.breakpoint.mobile"
        dark
        bottom
        right
        >
        <v-icon :large="!$vuetify.breakpoint.mobile">mdi-chevron-up</v-icon>
        </v-btn>
    </v-fab-transition>
</template>

<script>
export default {
  data () {
      return {
        toToBtn: false
      }
  },
  methods: {
    onScroll (e) {
      if (process.isClient) {
        if (typeof window === 'undefined') return
        const top = window.pageYOffset ||  e.target.scrollTop || 0;
        this.toToBtn = top > 200;
      }
    },
    toTop () {
      this.$vuetify.goTo(0);
    }
  },
}
</script>