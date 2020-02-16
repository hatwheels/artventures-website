<template>
  <Layout>
    <v-img
      :height="0.85 * windowHeight"
      :src="require('~/assets/images/img03.png')"
      :lazy-src="require('~/assets/images/lazy-img03.png')"
    />
  </Layout>
</template>

<script>
import { vueWindowSizeMixin } from 'vue-window-size';

export default {
  mixins: [vueWindowSizeMixin],
  metaInfo () {
    return {
      title: 'We Democratise Art',
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>