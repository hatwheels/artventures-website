<template>
  <Layout>
    <v-img
      :height="0.85 * windowHeight"
      :src="require('~/assets/images/img04.png')"
      :lazy-src="require('~/assets/images/lazy-img04.png')"
    >
      <v-row justify="space-around" align="end">
        <v-col cols=3 justify="center" align="center">
          <v-text-field
            class="subtitle-2 black--text"
            color="brown darken-3"
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
    ...mapGetters(['getLang'])
  },
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