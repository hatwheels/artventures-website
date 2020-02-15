<template>
  <Layout>
    <v-img :height="0.85 * windowHeight" :src="require('~/assets/images/img04.png')"/>
  </Layout>
</template>

<script>
import { vueWindowSizeMixin } from 'vue-window-size';

export default {
  mixins: [vueWindowSizeMixin],
  metaInfo () {
    return {
      title: 'For Business',
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>