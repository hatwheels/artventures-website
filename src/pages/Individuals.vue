<template>
  <Layout>
    <!-- Desktop -->
    <v-main v-show="!$vuetify.breakpoint.mobile">
      <v-container class="pa-0 background-color-fafafa" fluid>

        <!-- spacer -->
        <div class="py-10" />
        
        <!-- main -->
        <div class="px-12 py-12 background-color-fafafa pos-rel">
          <v-img width="69.84%" :src="main.img" :lazy="main.lazy" />
          <div class="ind-cross-main">
            <div
              :class="getLang === 'gr' ? 'noto-3p28vw-600-1p2em' : 'raleway-3p28vw-600-1p2em'"
              class="black--text pb-6"
              v-html="$page.individuals.edges[0].node.main.title[getLang]"
            />
            <div
              :class="getLang === 'gr' ? 'noto-1p312vw-400' : 'raleway-1p312vw-400'"
              class="color-rgba-0-0-0-p52 pb-12"
              v-html="$page.individuals.edges[0].node.main.text[getLang]"
            />
            <div class="pt-3" />
            <g-link
              :class="getLang === 'gr' ? 'noto-1p312vw-600' : 'raleway-1p312vw-600'"
              class="contact-us-btn white--text text-center text-uppercase"
              :to="{ path: '/', hash:'#contact-us' }"
            >
              {{ $page.individuals.edges[0].node.main.button[getLang] }}
            </g-link>
          </div>
        </div>

        <!-- spacer -->
        <div class="py-12" />

        <!-- advantages -->
        <div class="py-12">
          <v-row class="px-12 pb-3" justify="space-around">
            <v-col cols="4" v-for="(advantage, i) in advantages" :key="'advantage-' + i">
              <v-img contain :src="advantage.img" :lazy-src="advantage.lazy" />
            </v-col>
          </v-row>
          <v-row class="px-12 pt-3" justify="space-around">
            <v-col class="color-333333" cols="4" v-for="(advantage, i) in $page.individuals.edges[0].node.advantages" :key="'advantage-' + i">
              <wp-transition :isActive="true" nm="ride">
                <div
                  :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                  v-html="advantage.title[getLang]"
                />
                <div
                  :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                  v-html="advantage.text[getLang]"
                />
              </wp-transition>
            </v-col>
          </v-row>
        </div>

        <!-- spacer with divider -->
        <div class="py-8">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- Rent -->
        <div class="text-center custom-block">
          <wp-transition :isActive="true" nm="surf">
            <div
              :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
              class="pb-6"
              v-html="$page.individuals.edges[0].node.rent.title[getLang]"
            />
            <div
              :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
              style="padding-bottom: 34px"
              v-html="$page.individuals.edges[0].node.rent.text[getLang]"
            />
            <g-link
              :class="getLang === 'gr' ? 'noto-15-600-1p5' : 'raleway-15-600-1p5'"
              class="personality-test-btn white--text text-uppercase"
            >
              {{ $page.individuals.edges[0].node.rent.button[getLang] }}
            </g-link>
          </wp-transition>
        </div>

        <!-- spacer -->
        <div style="padding: 100px 0px" />

      </v-container>
    </v-main>

    <!-- Mobile -->
    <v-main v-show="$vuetify.breakpoint.mobile">
      <v-container class="pa-0 background-color-fafafa" fluid>

        <!-- main -->
        <v-row justify="center">
          <v-col cols=11>
            <v-img contain :src="main.img" :lazy="main.lazy" />
          </v-col>
          <v-col class="background-color-f5f5f5" cols=11>
            <wp-transition :isActive="wpActiveMob" nm="surf" :dir="false">
              <div
                :class="getLang === 'gr' ? 'noto-30-700' : 'raleway-30-700'"
                class="black--text pb-4"
                v-html="$page.individuals.edges[0].node.main.title[getLang]"
              />
              <div
                :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                class="color-rgba-0-0-0-p52 pb-7"
                v-html="$page.individuals.edges[0].node.main.text[getLang]"
              />
              <g-link
                :class="getLang === 'gr' ? 'noto-13-600' : 'raleway-13-400'"
                class="contact-us-btn-small white--text text-center"
                :to="{ path: '/', hash:'#contact-us-small' }"
              >
                {{ $page.individuals.edges[0].node.main.button[getLang] }}
              </g-link>
            </wp-transition>
          </v-col>
        </v-row>

        <!-- advantages -->
        <div class="pt-6">
          <v-row justify="center" v-for="(advantage, i) in $page.individuals.edges[0].node.advantages" :key="'advantages-small-' + i">
            <v-col cols="11">
              <v-img class="mb-4" :src="advantages[i].img" :lazy-src="advantages[i].lazy" />
              <wp-transition :isActive="wpActiveMob" nm="ride">
                <div class="color-333333">
                  <div
                    :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                    v-html="advantage.title[getLang]"
                  />
                  <div
                    :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                    v-html="advantage.text[getLang]"
                  />
                </div>
              </wp-transition>
            </v-col>
          </v-row>
        </div>

        <!-- spacer with divider -->
        <div class="py-8">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- Rent -->
        <v-row justify="center">
          <v-col class="text-center" cols="11">
            <wp-transition :isActive="wpActiveMob" nm="surf">
              <div
                :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
                class="pb-6"
                v-html="$page.individuals.edges[0].node.rent.title[getLang]"
              />
              <div
                :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                style="padding-bottom: 34px"
                v-html="$page.individuals.edges[0].node.rent.text[getLang]"
              />
              <g-link
                :class="getLang === 'gr' ? 'noto-13-600' : 'raleway-13-600'"
                class="personality-test-btn-small white--text text-uppercase text-center"
              >
                {{ $page.individuals.edges[0].node.rent.button[getLang] }}
              </g-link>
            </wp-transition>
          </v-col>
        </v-row>

        <!-- spacer -->
        <div class="py-6" />

      </v-container>
    </v-main>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex"
import WpTransition from '~/components/WpTransition.vue'

export default {
  components: {
    WpTransition,
  },
  mounted () {
    setTimeout( () => this.wpActiveMob = true, 1000)
  },
  data () {
    return {
      /* Elements CSS transitions */
      // intersection option for all
      wpActiveMob: false,
      elIsOpt: {
        threshold: [0],
      },
      /* Sections */
      // main
      main: {
        img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585685621/artventures/individuals01.jpg',
        lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1585685621/artventures/individuals01.jpg',
      },
      // advantages
      advantages: [
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/individuals02.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/individuals02.jpg',
        },
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/individuals03.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/individuals03.jpg',
        },
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/individuals04.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/individuals04.jpg',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  metaInfo () {
    return {
      titleTemplate: this.getLang === 'gr' ? 'Ιδιώτες — Artventures' : 'Individuals - Artventures',
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>

<page-query>
query {
  individuals: allPages(filter: { path: { eq: "/content/pages/individuals/" }}) {
  edges {
    node {
      main {
        title {
          en
          gr
        }
        text {
          en
          gr
        }
        button {
          en
          gr
        }
      }
      advantages {
        title {
          en
          gr
        }
        text {
          en
          gr
        }
      }
      rent {
        title {
          en
          gr
        }
        text {
          en
          gr
        }
        button {
          en
          gr
        }
      }
    }
  }
 }
}
</page-query>

<style>
.contact-us-btn {
  display: inline-block;
  background-color: #2B2B2B;
  text-decoration: none;
  border-radius: 8px;
  padding: 1.1vw 3.28vw;
  cursor: pointer;
}

.contact-us-btn-small {
  display: inline-block;
  background-color: #2B2B2B;
  text-decoration: none;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
}

.personality-test-btn {
  display: inline-block;
  background-color: #4C4C4A;
  text-decoration: none;
  border-radius: 4px;
  padding: 21px 34px;
  cursor: pointer;
}

.personality-test-btn-small {
  display: inline-block;
  background-color: #4C4C4A;
  text-decoration: none;
  border-radius: 4px;
  padding: 10.5px 17px;
  cursor: pointer;
}

.ind-cross-main {
  position: absolute;
  background-color: #F5F5F5;
  width: 42.65%;
  z-index: 100;
  right: 3.3%;
  top: 24.5%;
  padding: 4.737%;
}

.custom-divider {
  width: 50vw;
  height: 1px;
  margin-right: 25vw;
  margin-left: 25vw;
}

.custom-block {
  width: 50vw;
  margin-right: 25vw;
  margin-left: 25vw;
}
</style>