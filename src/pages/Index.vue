<template>
  <Layout>

    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <v-img :height="windowHeight" :src="require('~/assets/images/img01.png')"/>
  </Layout>
</template>

<script>
import { vueWindowSizeMixin } from 'vue-window-size';

export default {
  mixins: [vueWindowSizeMixin],
  metaInfo () {
    return {
      title: 'Artventures',
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>