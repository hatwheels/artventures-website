<template>
  <Layout>

    <v-main>
      <!-- spacer -->
      <div class="py-10" />

      <!-- Main -->
      <v-row justify="space-around" align="center">
        <v-col class="pb-0" cols="10">
          <wp-transition class="pr-8" :isActive="true" nm="surf" :dir="false">
            <div
              :class="getLang === 'gr' ? 'noto-18-600' : 'raleway-18-600'"
              v-html="$page.contract.edges[0].node.title[getLang]"
            />
          </wp-transition>
          <wp-transition class="pr-8" :isActive="true" nm="surf" :dir="false">
            <div
              :class="getLang === 'gr' ? 'noto-18-600' : 'raleway-18-600'"
              v-html="$page.contract.edges[0].node.date[getLang]"
            />
          </wp-transition>
          <div v-for="(chapter, i) in $page.contract.edges[0].node.chapters" :key="'chapter-' + i">
            <wp-transition class="pr-8" :isActive="true" nm="surf" :dir="false">
              <div>
                <div
                  class="text-capitalize"
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
            </wp-transition>
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
      titleTemplate: this.getLang === 'gr' ?  "Seller Terms — Artventures" : 'Όροι Πωλητή — Artventures' ,
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>

<page-query>
query {
  contract: allTerms(filter: { path: { eq: "/content/terms/contract/" }}) {
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
