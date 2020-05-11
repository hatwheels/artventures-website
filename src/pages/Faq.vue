<template>
  <Layout>
    <v-content>
      <v-container class="pa-0 background-color-fafafa" fluid>

          <!-- spacer -->
          <div class="py-10" />

          <!-- Main -->
          <v-row justify="space-around" align="center">
            <v-col class="pb-0" cols="10">
              <div v-for="(qa, i) in $page.faq.edges[0].node.qa" :key="'faq-' + i">
                <div
                  :class="getLang === 'gr' ? 'noto-18-600' : 'raleway-18-600'"
                  v-html="qa.q[getLang]"
                >
               </div>
               <div
                  :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
                  class="text-justify"
                  v-html="qa.a[getLang]"
                />
              </div>
            </v-col>
          </v-row>

          <!-- spacer -->
          <div class="py-10" />

      </v-container>
    </v-content>
  </Layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getLang']),
  },
  metaInfo () {
    return {
      titleTemplate: this.getLang === 'gr' ?  "Ερωτηματολόγιο — Artventures" : 'F.A.Q. — Artventures' ,
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>

<page-query>
query {
  faq: allPages(filter: { path: { eq: "/content/pages/faq/" }}) {
    edges {
      node {
        id
        path
        qa {
          q {
            en
            gr
          }
          a {
            en
            gr
          }
        }
      }
    }
  }
}
</page-query>