<template>
  <Layout>

    <v-main>
      <!-- spacer -->
      <div class="py-10" />

      <!-- Main -->
      <v-row justify="space-around" align="center">
        <v-col class="pb-0" cols="10">
            <div
              class="pb-1 text-uppercase"
              :class="getLang === 'gr' ? 'noto-30-700' : 'raleway-30-700'"
              v-html="$page.contract.edges[0].node.title[getLang]"
            />
            <div
              class="pb-6"
              :class="getLang === 'gr' ? 'noto-18-600' : 'raleway-18-600'"
              v-html="$page.contract.edges[0].node.date[getLang]"
            />
          <div v-for="(chapter, i) in $page.contract.edges[0].node.chapters" :key="'chapter-' + i">
              <div>
                <div
                  class="text-uppercase  pb-1"
                  :class="getLang === 'gr' ? 'noto-18-600' : 'raleway-18-600'"
                  v-html="chapter.title[getLang]"
                >
              </div>
              <div
                  :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
                  class="text-justify"
                  v-html="chapter.text[getLang]"
                />
                <br>
              </div>
          </div>
        </v-col>
      </v-row>

      <!-- spacer -->
      <div class="py-10" />
    </v-main>

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
      titleTemplate: this.getLang === 'en' ?  "Seller Terms — Artventures" : 'Όροι Πωλητή — Artventures' ,
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>

<page-query>
query {
  contract: allPages(filter: { path: { eq: "/content/pages/artists-contract/" }}) {
    edges {
      node {
        id
        path
        title {
          en
          gr
        }
        date {
          en
          gr
        }
        chapters {
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
}
</page-query>
