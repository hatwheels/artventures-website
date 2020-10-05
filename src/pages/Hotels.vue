<template>
  <Layout>
    <!-- Desktop -->
    <v-main class="hidden-sm-and-down">
      <v-container class="pa-0 background-color-fafafa" fluid>

        <!-- spacer -->
        <div class="py-10" />

        <!-- main -->
        <div class="px-12 pt-12 pb-10 background-color-fafafa pos-rel">
          <g-image style="width: 69.84%" :src="main.img" alt="hotels-main" />
          <div class="hot-cross-main">
            <div
              :class="getLang === 'gr' ? 'noto-3p28vw-600-1p2em' : 'raleway-3p28vw-600-1p2em'"
              class="black--text pb-6"
              v-html="$page.hotels.edges[0].node.main.title[getLang]"
            />
            <div
              :class="getLang === 'gr' ? 'noto-1p312vw-400' : 'raleway-1p312vw-400'"
              class="color-rgba-0-0-0-p52 pb-12"
              v-html="$page.hotels.edges[0].node.main.text[getLang]"
            />
            <div class="pt-3" />
            <g-link
              :class="getLang === 'gr' ? 'noto-1p312vw-600' : 'raleway-1p312vw-600'"
              class="contact-us-btn white--text text-center text-uppercase"
              :to="{ path: '/', hash:'#contact-us' }"
            >
              {{ $page.hotels.edges[0].node.main.button[getLang] }}
            </g-link>
          </div>
        </div>

        <!-- spacer -->
        <div class="py-12" />

        <!-- advantages -->
        <div class="py-12">
          <v-row class="px-12 pb-3" justify="space-around">
            <v-col cols="4" v-for="(advantage, i) in advantages" :key="'advantage-' + i">
              <g-image style="width: 100%" fit="contain" :src="advantage.img" :alt="'hotels-advantages-' + i" />
            </v-col>
          </v-row>
          <v-row class="px-12 pt-3" justify="space-around">
            <v-col class="color-333333" cols="4" v-for="(advantage, i) in $page.hotels.edges[0].node.advantages" :key="'advantage-' + i">
              <wp-transition :isActive="true" nm="ride">
                <div
                  :class="getLang === 'gr' ? 'noto-30-700-1p2' : 'playfair-30-700-1p2'"
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
        <div class="pt-2 pb-5">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- testimonials -->
        <v-row class="py-6" justify="space-around" align="center">
          <v-col
            class="col-hot-testimonials-width color-1a1a1a"
            v-for="(testimonial, i) in $page.hotels.edges[0].node.testimonials"
            :key="'hot-testimonials-' + i"
          >
            <wp-transition :isActive="true" nm="surf">
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

        <!-- spacer with divider -->
        <div class="pt-5 pb-12">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- form -->
        <wp-transition class="text-center pt-12" :isActive="true" nm="ride">
          <div
            :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
            class="pb-6"
            v-html="$page.hotels.edges[0].node.button.title[getLang]"
          />
          <div class="custom-block">
            <g-link
              :class="getLang === 'gr' ? 'noto-15-600-1p5' : 'raleway-15-600-1p5'"
              class="form-btn white--text text-uppercase"
              :to="{ path: '/', hash:'#contact-us' }"
            >
              {{ $page.hotels.edges[0].node.button.text[getLang] }}
            </g-link>
          </div>
          <div class="py-12" />
        </wp-transition>

      </v-container>
    </v-main>

    <!-- Mobile -->
    <v-main class="hidden-md-and-up">
      <v-container class="pa-0 background-color-fafafa" fluid>

        <!-- main -->
        <v-row justify="center">
          <v-col cols=11>
            <g-image style="width: 100%" :src="main.img" alt="hotels-main" />
          </v-col>
          <v-col
            class="background-color-f5f5f5"
            cols=11
          >
            <wp-transition :isActive="true" nm="surf" :dir="false">
              <div
                :class="getLang === 'gr' ? 'noto-30-700' : 'raleway-30-700'"
                class="black--text pb-4"
                v-html="$page.hotels.edges[0].node.main.title[getLang]"
              />
              <div
                :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                class="color-rgba-0-0-0-p52 pb-7"
                v-html="$page.hotels.edges[0].node.main.text[getLang]"
              />
              <g-link
                :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                class="contact-us-btn-small white--text text-center"
                :to="{ path: '/', hash:'#contact-us-small' }"
              >
                {{ $page.hotels.edges[0].node.main.button[getLang] }}
              </g-link>
            </wp-transition>
          </v-col>
        </v-row>

        <!-- advantages -->
        <div class="pt-6">
          <v-row justify="center" v-for="(advantage, i) in $page.hotels.edges[0].node.advantages" :key="'adv-sm-' + i">
            <v-col cols="11">
              <g-image class="mb-4" style="width: 100%" :src="advantages[i].img" :alt="'hotels-advantages-' + i" />
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

        <!-- spacer with divider -->
        <div class="pt-2 pb-5">
          <div class="background-color-dddddd custom-divider-small" />
        </div>

        <!-- testimonials -->
        <wp-transition :isActive="wpActiveMob" nm="surf">
          <v-row
            justify="center" align="center"
            v-for="(testimonial, i) in $page.hotels.edges[0].node.testimonials"
            :key="'hot-testimonials-small-' + i"
          >
            <v-col class="pt-0 pb-6 color-1a1a1a" cols=11>
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
            </v-col>
          </v-row>
        </wp-transition>

        <!-- spacer with divider -->
        <div class="pt-5 pb-12">
          <div class="background-color-dddddd custom-divider-small" />
        </div>

        <!-- form -->
        <wp-transition class="text-center" :isActive="wpActiveMob" nm="ride">
          <div
            :class="getLang === 'gr' ? 'noto-32-700' : 'playfair-32-700'"
            class="pb-6"
            v-html="$page.hotels.edges[0].node.button.title[getLang]"
          />
          <div class="custom-block">
            <g-link
              :class="getLang === 'gr' ? 'noto-13-600' : 'raleway-13-600'"
              class="form-btn-small white--text text-uppercase"
              :to="{ path: '/', hash:'#contact-us-small' }"
            >
              {{ $page.hotels.edges[0].node.button.text[getLang] }}
            </g-link>
          </div>
        </wp-transition>
        <div class="py-12" />
      </v-container>
    </v-main>

  </Layout>
</template>

<script>
import WpTransition from '~/components/WpTransition.vue'
import { mapGetters } from "vuex"

export default {
  components: {
    WpTransition,
  },
  mounted () {
    setTimeout( () => this.wpActiveMob = true, 1000)
  },
  data () {
    return {
      /* Element CSS transitions */
      wpActiveMob: false,
      /* Sections */
      // main
      main: {
        img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585685621/artventures/hotels01.jpg',
        lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1585685621/artventures/hotels01.jpg',
      },
      // advantages
      advantages: [
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/hotels02.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/businesses02.jpg',
        },
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/hotels03.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/hotels03.jpg',
        },
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/hotels04.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/hotels04.jpg',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  metaInfo () {
    return {
      titleTemplate: this.getLang === 'gr' ? 'Ξενοδοχεία — Artventures' : 'Hotels — Artventures',
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>

<page-query>
# Write your query or mutation here
query {
  hotels: allPages(filter: { path: { eq: "/content/pages/hotels/" }}) {
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
      button {
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

<style>
.custom-divider {
  width: 30vw;
  height: 1px;
  margin-right: 35vw;
  margin-left: 35vw;
}

.custom-divider-small {
  width: 80vw;
  height: 1px;
  margin-right: 10vw;
  margin-left: 10vw;
}

.custom-block {
  width: 50vw;
  margin-right: 25vw;
  margin-left: 25vw;
}

.hot-cross-main {
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

.form-btn {
  display: inline-block;
  background-color: #4C4C4A;
  text-decoration: none;
  border-radius: 4px;
  padding: 21px 34px;
  cursor: pointer;
}

.form-btn-small {
  display: inline-block;
  background-color: #4C4C4A;
  text-decoration: none;
  border-radius: 4px;
  padding: 10.5px 17px;
  cursor: pointer;
}

.col.col-hot-testimonials-width {
  width: 30%;
  max-width: 30%;
  flex-basis: 30%;
}

/* Local Fonts */
.playfair-30-700-1p2 {
  font-family: 'Playfair Display', serif !important;
  font-size: 30px !important;
  font-weight: 700 !important;
  line-height: 1.2em !important;
}
</style>
