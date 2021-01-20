<template>
  <Layout>
    <!-- Desktop -->
    <v-main class="hidden-sm-and-down">
      <v-container class="pa-0 background-color-fafafa" fluid>

        <!-- spacer -->
        <div class="py-10" />

        <!-- main -->
        <div class="px-12 pt-12 pb-10 background-color-fafafa pos-rel">
          <g-image style="width: 69.84%" :src="main.img" alt="businesses-main" />
          <div class="biz-cross-main">
            <div
              :class="getLang === 'gr' ? 'noto-3p28vw-600-1p2em' : 'raleway-3p28vw-600-1p2em'"
              class="black--text pb-6"
              v-html="$page.businesses.edges[0].node.main.title[getLang]"
            />
            <div
              :class="getLang === 'gr' ? 'noto-1p312vw-400' : 'raleway-1p312vw-400'"
              class="color-rgba-0-0-0-p52 pb-12"
              v-html="$page.businesses.edges[0].node.main.text[getLang]"
            />
            <div class="pt-3" />
            <g-link
              :class="getLang === 'gr' ? 'noto-1p312vw-600' : 'raleway-1p312vw-600'"
              class="contact-us-btn white--text text-center text-uppercase"
              :to="{ path: '/', hash:'#contact-us' }"
            >
              {{ $page.businesses.edges[0].node.main.button[getLang] }}
            </g-link>
          </div>
        </div>

        <!-- spacer -->
        <div class="py-12" />

        <!-- advantages -->
        <div class="py-12">
          <v-row class="px-12 pb-3" justify="space-around">
            <v-col cols="4" v-for="(advantage, i) in advantages.content" :key="'advantage-' + i">
              <g-image fit="contain" style="width: 100%" :src="advantage.img" :alt="'businesses-advantages-' + i" />
            </v-col>
          </v-row>
          <v-row class="px-12 pt-3" justify="space-around">
            <v-col
              class="color-333333"
              cols="4"
              v-for="(advantage, i) in $page.businesses.edges[0].node.advantages" :key="'advantage-' + i"
            >
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
          <wp-transition class="text-center custom-block pt-8 pb-8" :isActive="true" nm="surf">
            <g-link
              :class="getLang === 'gr' ? 'noto-15-600-1p5' : 'raleway-15-600-1p5'"
              class="learn-more-btn white--text text-uppercase"
              :to="{ path: '/', hash:'#contact-us' }"
            >
              {{ $page.businesses.edges[0].node.button[getLang] }}
            </g-link>
          </wp-transition>
        </div>


        <!-- spacer with divider -->
        <div class="pb-8">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- testimonials -->
        <v-row class="pb-6 pt-12" justify="space-around" align="center">
          <v-col
            class="col-biz-testimonials-width color-1a1a1a"
            v-for="(testimonial, i) in $page.businesses.edges[0].node.testimonials"
            :key="'biz-testimonials-' + i"
          >
            <wp-transition :isActive="true" nm="ride">
              <div
                :class="getLang === 'gr' ? 'noto-18-400-1p4em' : 'playfair-18-400-1p4em'"
                class="text-center"
                v-html="testimonial.quote[getLang]"
              />
              <div
                :class="getLang === 'gr' ? 'noto-13-600' : 'raleway-13-600'"
                class="text-center pt-2"
                v-html="testimonial.author[getLang]"
              />
            </wp-transition>
          </v-col>
        </v-row>

        <!-- spacer -->
        <div class="pb-12" />

      </v-container>
    </v-main>

    <!-- Mobile -->
    <v-main class="hidden-md-and-up">
      <v-container class="pa-0 background-color-fafafa" fluid>

        <!-- main -->
        <v-row justify="center">
          <v-col cols=11>
            <g-image style="width: 100%" :src="main.img" alt="businesses-main" />
          </v-col>
          <v-col
            class="background-color-f5f5f5"
            cols=11
          >
            <wp-transition :isActive="true" nm="surf" :dir="false">
              <div
                :class="getLang === 'gr' ? 'noto-30-700' : 'raleway-30-700'"
                class="black--text pb-4"
                v-html="$page.businesses.edges[0].node.main.title[getLang]"
              />
              <div
                :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                class="color-rgba-0-0-0-p52 pb-7"
                v-html="$page.businesses.edges[0].node.main.text[getLang]"
              />
              <g-link
                :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                class="contact-us-btn-small white--text text-center"
                :to="{ path: '/', hash:'#contact-us-small' }"
              >
                {{ $page.businesses.edges[0].node.main.button[getLang] }}
              </g-link>
            </wp-transition>
          </v-col>
        </v-row>

        <!-- advantages -->
        <div class="pt-6">
          <v-row
            justify="center"
            v-for="(advantage, i) in $page.businesses.edges[0].node.advantages"
            :key="'adv-sm-' + i"
          >
            <v-col cols="11">
              <g-image class="mb-4" style="width: 100%" :src="advantages.content[i].img" :alt="'businesses-advatanges-' + i" />
              <wp-transition class="color-333333" :isActive="wpActiveMob" nm="ride">
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
        <wp-transition class="text-center custom-block" :isActive="wpActiveMob" nm="surf">
          <g-link
            :class="getLang === 'gr' ? 'noto-15-600-1p5' : 'raleway-15-600-1p5'"
            class="learn-more-btn-small white--text text-uppercase"
            :to="{ path: '/', hash:'#contact-us-small' }"
          >
            {{ $page.businesses.edges[0].node.button[getLang] }}
          </g-link>
        </wp-transition>

        <!-- spacer with divider -->
        <div class="py-8">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- testimonials -->
        <wp-transition :isActive="wpActiveMob" nm="ride">
          <v-row
            justify="center" align="center"
            v-for="(testimonial, i) in $page.businesses.edges[0].node.testimonials"
            :key="'biz-testimonials-small-' + i"
          >
            <v-col class="pt-0 pb-6 color-1a1a1a" cols=11>
              <div>
                <div
                  :class="getLang === 'gr' ? 'noto-18-400-1p4em' : 'playfair-18-400-1p4em'"
                  class="text-center"
                  v-html="testimonial.quote[getLang]"
                />
                <div
                  :class="getLang === 'gr' ? 'noto-13-600' : 'raleway-13-600'"
                  class="text-center pt-2"
                  v-html="testimonial.author[getLang]"
                />
              </div>
            </v-col>
          </v-row>
        </wp-transition>

        <!-- spacer -->
        <div class="pb-10" />

      </v-container>
    </v-main>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  mounted () {
    setTimeout( () => this.wpActiveMob = true, 1000)
  },
  components: {
    WpTransition: () => import('~/components/WpTransition.vue'),
  },
  data () {
    return {
      /* Elements CSS transitions */
      // intersection option for all
      wpActiveMob: false,
      /* Sections */
      // main
      main: {
        img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585685621/artventures/businesses01.jpg',
        lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1585685621/artventures/businesses01.jpg',
      },
      // advantages
      advantages: {
        content: [
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/businesses02.jpg',
            lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/businesses02.jpg',
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/businesses03.jpg',
            lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/businesses03.jpg',
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/businesses04.jpg',
            lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/businesses04.jpg',
          },
        ]
      },
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  metaInfo () {
    return {
      titleTemplate: this.getLang === 'gr' ? 'Επιχειρήσεις — Artventures' : 'Businesses — Artventures',
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>

<page-query>
query {
  businesses: allPages(filter: { path: { eq: "/content/pages/businesses/" }}) {
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
      button {
        en
        gr
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
      testimonials {
        quote {
          en
          gr
        }
        author {
          en
          gr
        }
      }
    }
  }
 }
}
</page-query>

<style scoped>
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

.biz-cross-main {
  position: absolute;
  background-color: #F5F5F5;
  width: 42.65%;
  z-index: 100;
  right: 2.7%;
  top: 17%;
  padding: 4.737%;
}

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

.learn-more-btn {
  display: inline-block;
  background-color: #4C4C4A;
  text-decoration: none;
  border-radius: 4px;
  padding: 21px 34px;
  cursor: pointer;
}

.learn-more-btn-small {
  display: inline-block;
  background-color: #4C4C4A;
  text-decoration: none;
  border-radius: 4px;
  padding: 10.5px 17px;
  cursor: pointer;
}

.col.col-biz-testimonials-width {
  width: 45%;
  max-width: 45%;
  flex-basis: 45%;
}
</style>