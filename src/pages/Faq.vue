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
                <div class="pr-8" v-waypoint="{ active: true, callback: onFaqEl, options: elIsOpt }">
                  <template v-if="faqEl">
                    <transition name="slide" appear>
                      <div>
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
                        <br>
                      </div>
                    </transition>
                  </template>
                  <template v-else>
                    <div>
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
                      <br>
                    </div>
                  </template>
                </div>
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
  data () {
    return {
      // Element CSS transitions
      // intersection option for all
      elIsOpt: {
        threshold: [0],
      },
      faqEl: false,
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  methods: {
    /* Element CSS transitions */
    onFaqEl ({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN) {
        this.faqEl = true
      }
    },
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