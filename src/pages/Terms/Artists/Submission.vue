<template>
  <Layout>

    <v-main>
      <!-- spacer -->
      <div class="py-10" />

      <!-- spacer -->
      <div class="py-10" />
    </v-main>

  </Layout>
</template>

<script>
import { mapGetters } from 'vuex'
import WpTransition from '~/components/WpTransition.vue'

export default {
  computed: {
    ...mapGetters(['getLang']),
  },
  components: {
    WpTransition,
  },
  metaInfo () {
    return {
      titleTemplate: this.getLang === 'gr' ?  "Submission Terms — Artventures" : 'Όροι Υποβολής — Artventures' ,
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>
