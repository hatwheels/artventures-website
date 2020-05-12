<template>
  <Layout>
    <v-content v-show="getViewSize === 'desktop'">
      <v-container class="pa-0 background-color-fafafa" fluid>

        <!-- spacer -->
        <div class="py-10" />

        <!-- main -->
        <div class="px-12 pt-12 pb-10 background-color-fafafa pos-rel">
          <v-img width="69.84%" :src="main.img" :lazy="main.lazy" />
          <div class="hot-cross-main">
            <div
              :class="getLang === 'gr' ? 'noto-3p28vw-600-1p2em' : 'raleway-3p28vw-600-1p2em'"
              class="black--text pb-6"
              v-html="$page.hotels.edges[0].node.main.title[getLang]"
            />
            <div
              :class="getLang === 'gr' ? 'noto-1p312vw-400' : 'raleway-1p312vw-400'"
              class="color-rgba-0-0-0-p52 pb-12"
              v-html="$page.hotels.edges[0].node.main.body[getLang]"
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
              <v-img contain :src="advantage.img" :lazy-src="advantage.lazy" />
            </v-col>
          </v-row>
          <v-row class="px-12 pt-3" justify="space-around">
            <v-col class="color-333333" cols="4" v-for="(advantage, i) in $page.hotels.edges[0].node.advantages" :key="'advantage-' + i">
              <div
                :class="getLang === 'gr' ? 'noto-30-700-1p2' : 'playfair-30-700-1p2'"
                v-html="advantage.title[getLang]"
              />
              <div
                :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                v-html="advantage.body[getLang]"
              />
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

        <!-- spacer with divider -->
        <div class="pt-5 pb-12">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- form -->
        <div class="text-center pt-12">
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
              {{ $page.hotels.edges[0].node.button.body[getLang] }}
            </g-link>
          </div>
          <div class="py-12" />
        </div>

      </v-container>
    </v-content>

    <v-content v-show="getViewSize === 'mobile'">
      <v-container class="pa-0 background-color-fafafa" fluid>

        <!-- main -->
        <v-row justify="center">
          <v-col cols=11>
            <v-img :src="main.img" :lazy="main.lazy" />
          </v-col>
          <v-col class="background-color-f5f5f5" cols=11>
            <div
              :class="getLang === 'gr' ? 'noto-30-700' : 'raleway-30-700'"
              class="black--text pb-4"
              v-html="$page.hotels.edges[0].node.main.title[getLang]"
            />
            <div
              :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
              class="color-rgba-0-0-0-p52 pb-7"
              v-html="$page.hotels.edges[0].node.main.body[getLang]"
            />
            <g-link
              :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
              class="contact-us-btn-small white--text text-center"
              :to="{ path: '/', hash:'#contact-us-small' }"
            >
              {{ $page.hotels.edges[0].node.main.button[getLang] }}
            </g-link>
          </v-col>
        </v-row>

        <!-- advantages -->
        <div class="pt-6">
          <v-row justify="center" v-for="(advantage, i) in $page.hotels.edges[0].node.advantages" :key="'advantage-small-' + i">
            <v-col cols="11">
              <v-img class="mb-4" :src="advantages[i].img" :lazy-src="advantages[i].lazy" />
              <div class="color-333333">
                <div
                  :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                  v-html="advantage.title[getLang]"
                />
                <div
                  :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                  v-html="advantage.body[getLang]"
                />
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- spacer with divider -->
        <div class="pt-2 pb-5">
          <div class="background-color-dddddd custom-divider-small" />
        </div>

        <!-- testimonials -->
        <v-row
          justify="center" align="center"
          v-for="(testimonial, i) in $page.hotels.edges[0].node.testimonials"
          :key="'hot-testimonials-small-' + i"
        >
          <v-col class="pt-0 pb-4 color-1a1a1a" cols=11>
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

        <!-- spacer with divider -->
        <div class="pt-5 pb-12">
          <div class="background-color-dddddd custom-divider-small" />
        </div>

        <!-- form -->
        <div class="text-center">
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
              {{ $page.hotels.edges[0].node.button.body[getLang] }}
            </g-link>
          </div>
          <div class="py-12" />
        </div>

      </v-container>
    </v-content>

  </Layout>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  data () {
    return {
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
        body {
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
        body {
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
        body {
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
</style>
