<template>
  <Layout>
    <v-img
      :height="0.85 * windowHeight"
      :src="require('~/assets/images/img01.png')"
      :lazy-src="require('~/assets/images/lazy-img01.png')"
    >
      <v-row justify="space-around" align="end">
        <v-col :cols="getCols" justify="center" align="center">
          <v-text-field
            class="subtitle-2 black--text"
            color="blue lighten-2"
            prepend-inner-icon="mdi-email"
            append-outer-icon="mdi-send"
            :label="label[getLang]"
            outlined
            @click:append-outer="{}"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-img>
  </Layout>
</template>

<script>
import { vueWindowSizeMixin } from 'vue-window-size'
import { mapGetters } from 'vuex'

export default {
  mixins: [vueWindowSizeMixin],
  data () {
    return {
      label: [
        'Το email σας',
        'Your email'
      ]
    }
  },
  computed: {
    ...mapGetters(['getLang']),
    getCols () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '8'
        case 'sm':
          return '6'
        case 'md':
          return '5'
        case 'lg':
        case 'xl':
          return '4'
      }
    }
  },
  metaInfo () {
    return {
      titleTemplate: 'Artventures',
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>