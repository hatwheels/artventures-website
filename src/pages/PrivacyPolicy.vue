<template>
  <Layout>
    <v-main>
      <v-container class="pa-0 background-color-fafafa" fluid>

          <!-- spacer -->
          <div class="py-10" />

          <v-row justify="space-around" align="center">
            <v-col class="pb-0" cols="10" >
              <wp-transition class="pr-8" :isActive="true" nm="surf" :dir="false">
              <p
                class="playfair-32-700 text-center"
                v-html="$page.privacypolicy.edges[0].node.title[getLang]"
              />
              <div
                class="raleway-16-400"
                v-html="$page.privacypolicy.edges[0].node.text[getLang]"
              />
              </wp-transition>
            </v-col>
          </v-row>
          <!-- spacer -->
          <div class="py-10" />

      </v-container>
    </v-main>
  </Layout>
</template>

<page-query>
query {
  privacypolicy: allPages(filter: { path: { eq: "/content/pages/privacypolicy/" }}) {
  	edges {
  		node {
        id
        path
        title {
          en
          gr
        }
        text {
          en
          gr
        }
      }
    }
  }
}
</page-query>

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
      titleTemplate: this.getLang === 'gr' ?  "Πολιτική Απορρήτου — Artventures" : 'Privacy Policy — Artventures' ,
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>
