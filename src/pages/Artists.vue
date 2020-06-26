<template>
  <Layout>

    <v-content v-show="getViewSize === 'desktop'">
      <v-container class="pa-0 background-color-fafafa" fluid>

        <!-- Main -->
        <v-row class="pt-12 pl-12 pr-10 pb-5" justify="space-between" align="center">
          <v-col class="pl-4 pr-0 col-artists-width">
            <v-img contain :src="artists.img" :lazy-src="artists.lazy" />
          </v-col>
          <v-col class="pl-0 pr-5 col-artists-width">
            <wp-transition class="color-333333" :isActive="true" nm="slide" :dir="false">
              <div
                :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                class="pb-9"
                v-html="$page.artists.edges[0].node.mainartists.title[getLang]"
              />
              <div
                :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                class="pb-8"
                v-html="$page.artists.edges[0].node.mainartists.par[getLang]"
              />
              <g-link
                class="btn-grey white--text px-12 py-5 text-uppercase"
                :class="getLang === 'gr' ? 'noto-11p5-600' :'montserrat-11p5-600'"
              >
                {{ $page.artists.edges[0].node.mainartists.button[getLang] }}
              </g-link>
            </wp-transition>
          </v-col>
        </v-row>

        <!-- Spacer -->
        <div class="py-6" />

        <!-- Advantages -->
        <div class="py-12">
          <v-row class="px-12 pb-3" justify="space-between">
            <v-col cols="4" v-for="(advantage, i) in advantages" :key="'advantage-img-' + i">
              <v-img contain :src="advantage.img" :lazy-src="advantage.lazy" />
            </v-col>
          </v-row>
          <v-row class="px-12 pt-3" justify="space-between">
            <v-col
              class="color-333333"
              cols="4"
              v-for="(advantage, i) in $page.artists.edges[0].node.advantages"
              :key="'advantage-text-' + i"
            >
              <wp-transition :isActive="true" nm="surf">
                <div
                  class="pb-5"
                  :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                  v-html="advantage.title[getLang]"
                />
                <div
                  :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                  v-html="advantage.par[getLang]"
                />
              </wp-transition>
            </v-col>
          </v-row>
        </div>

        <!-- spacer with divider -->
        <div class="py-8">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- Earnings -->
        <wp-transition class="text-center custom-block-2" :isActive="true" nm="ride">
          <div
            :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
            class="pb-6"
            v-html="$page.artists.edges[0].node.earnings.title[getLang]"
          />
          <v-row justify="space-around" align="center">
            <v-col
              cols=3
              v-for="(earning, i) in $page.artists.edges[0].node.earnings.items"
              :key="'earning-' + i"
            >
              <div
                class="pb-3"
                :class="getLang === 'gr' ? 'noto-25-600' : 'playfair-25-600'"
                v-html="earning.title[getLang]"
              />
              <div
                :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
                v-html="earning.par[getLang]"
              />
            </v-col>
          </v-row>
        </wp-transition>

        <!-- spacer with divider -->
        <div class="py-8">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- Button -->
        <wp-transition class="text-center custom-block" :isActive="true" nm="surf">
          <div
            :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
            class="pb-6"
            v-html="$page.artists.edges[0].node.button.title[getLang]"
          />
          <g-link
            :class="getLang === 'gr' ? 'noto-13-600' : 'raleway-13-600'"
            class="join-btn white--text text-uppercase"
          >
            {{ $page.artists.edges[0].node.button.par[getLang] }}
          </g-link>
        </wp-transition>

        <!-- spacer with divider -->
        <div class="py-8">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- Testimonials -->
        <wp-transition :isActive="true" nm="ride">
          <div
            :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
            class="pt-10 pb-6 text-center"
            v-html="$page.artists.edges[0].node.artisttestimonials.title[getLang]"
          />
          <v-row class="py-12" justify="space-around" align="center">
            <v-col
              class="col-artists-testimonials-width"
              v-for="(testimonial, i) in $page.artists.edges[0].node.artisttestimonials.items"
              :key="'testimonial-' + i"
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
        </wp-transition>

        <!-- spacer with divider -->
        <div class="pt-8">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- Contact -->
        <wp-transition :isActive="true" nm="surf">
          <contact-us />
        </wp-transition>

      </v-container>
    </v-content>

    <v-content v-show="getViewSize === 'mobile'">
      <v-container class="pa-0 background-color-fafafa" fluid>

        <!-- Main -->
        <v-row justify="center" align="center">
          <v-col cols=11>
            <v-img :src="artists.img" :lazy-src="artists.lazy" />
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols=11>
            <wp-transition class="color-333333" :isActive="true" nm="surf" :dir="false">
              <div
                :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                class="pb-9"
                v-html="$page.artists.edges[0].node.mainartists.title[getLang]"
              />
              <div
                :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                class="pb-8"
                v-html="$page.artists.edges[0].node.mainartists.par[getLang]"
              />
              <g-link
                class="btn-grey white--text px-12 py-5 text-uppercase"
                :class="getLang === 'gr' ? 'noto-11p5-600' :'montserrat-11p5-600'"
              >
                {{ $page.artists.edges[0].node.mainartists.button[getLang] }}
              </g-link>
            </wp-transition>
          </v-col>
        </v-row>

        <!-- Advantages -->
        <div class="pt-12">
          <v-row justify="center" v-for="(advantage, i) in $page.artists.edges[0].node.advantages" :key="'adv-sm' + i">
            <v-col cols=11>
              <v-img class="mb-4" :src="advantages[i].img" :lazy-src="advantages[i].lazy" />
              <wp-transition class="color-333333 pb-6" :isActive="wpActiveMob" nm="ride">
                <div
                  :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                  v-html="advantage.title[getLang]"
                />
                <div
                  :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                  v-html="advantage.par[getLang]"
                />
              </wp-transition>
            </v-col>
          </v-row>
        </div>

        <!-- spacer with divider -->
        <div class="py-8">
          <div class="background-color-dddddd custom-divider-small" />
        </div>

        <!-- Earnings -->
        <div class="text-center">
          <wp-transition class="color-333333 pb-6" :isActive="wpActiveMob" nm="surf">
            <div
              :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
              class="pb-6"
              v-html="$page.artists.edges[0].node.earnings.title[getLang]"
              key="earnings-small-title"
            />
            <v-row
              justify="center" align="start"
              v-for="(earning, i) in $page.artists.edges[0].node.earnings.items"
              :key="'earnings-small-' + i"
            >
              <v-col cols=11>
                <div
                  class="pb-3"
                  :class="getLang === 'gr' ? 'noto-25-600' : 'playfair-25-600'"
                  v-html="earning.title[getLang]"
                />
                <div
                  :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
                  v-html="earning.par[getLang]"
                />
              </v-col>
            </v-row>
          </wp-transition>
        </div>

        <!-- spacer with divider -->
        <div class="py-8">
          <div class="background-color-dddddd custom-divider-small" />
        </div>

        <!-- Button -->
        <wp-transition class="text-center custom-block" :isActive="wpActiveMob" nm="ride">
          <div
            :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
            class="pb-6"
            v-html="$page.artists.edges[0].node.button.title[getLang]"
          />
          <g-link
            :class="getLang === 'gr' ? 'noto-13-600' : 'raleway-13-600'"
            class="join-btn white--text text-uppercase"
          >
            {{ $page.artists.edges[0].node.button.par[getLang] }}
          </g-link>
        </wp-transition>

        <!-- spacer with divider -->
        <div class="py-8">
          <div class="background-color-dddddd custom-divider-small" />
        </div>

        <!-- Testimonials -->
        <wp-transition :isActive="wpActiveMob" nm="surf">
          <div
            :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
            class="pt-10 pb-6 text-center"
            v-html="$page.artists.edges[0].node.artisttestimonials.title[getLang]"
            key="testimonial-small-title"
          />
          <v-row
            justify="center" align="center"
            v-for="(testimonial, i) in $page.artists.edges[0].node.artisttestimonials.items"
            :key="'testimonial-small-' + i"
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
        <div class="pt-8">
          <div class="background-color-dddddd custom-divider-small" />
        </div>

        <wp-transition :isActive="wpActiveMob" nm="ride">
          <contact-us class="pb-12" :isSmall="true" colWidth="11" />
        </wp-transition>

      </v-container>
    </v-content>


  </Layout>
</template>

<script>
import { mapGetters } from "vuex"
import ContactUs from '~/components/ContactUs.vue'
import WpTransition from '~/components/WpTransition.vue'

export default {
  mounted () {
    setTimeout( () => this.wpActiveMob = true, 1000)
  },
  components: {
    ContactUs,
    WpTransition,
  },
  data () {
    return {
      /* Element CSS transitions */
      wpActiveMob: false,
      /* Sections */
      // Main
      artists: {
        img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1582416241/artventures/img14.jpg',
        lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/img14.jpg',
      },
      // Advantages
      advantages: [
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/img15.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/img15.jpg',
        },
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/img16.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/img16.jpg',
        },
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_scale,h_577,w_768,q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/img28.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/img28.jpg',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  metaInfo () {
    return {
      titleTemplate: this.getLang === 'gr' ? 'Καλλιτέχνες — Artventures' : 'Artists — Artventures',
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>

<page-query>
query {
  artists: allPages(filter: { path: { eq: "/content/pages/artists/" }}) {
  edges {
    node {
 	    mainartists {
        title {
          en
          gr
        }
        par {
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
        par {
          en
          gr
        }
      }
      earnings {
        title {
          en
          gr
        }
        items {
          title {
            en
            gr
          }
          par {
            en
            gr
          }
        }
      }
      button {
        title {
          en
          gr
        }
        par {
          en
          gr
        }
      }
      artisttestimonials {
        title {
          en
          gr
        }
        items {
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
}
</page-query>

<style>
.custom-divider {
  width: 50vw;
  height: 1px;
  margin-right: 25vw;
  margin-left: 25vw;
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

.custom-block-2 {
  width: 70vw;
  margin-right: 15vw;
  margin-left: 15vw;
}

.join-btn {
  display: inline-block;
  background-color: #4C4C4A;
  text-decoration: none;
  border-radius: 4px;
  padding: 16px 39px;
  cursor: pointer;
}

.join-btn-small {
  display: inline-block;
  background-color: #4C4C4A;
  text-decoration: none;
  border-radius: 4px;
  padding: 10.5px 17px;
  cursor: pointer;
}

.col.col-artists-testimonials-width {
  width: 25%;
  max-width: 25%;
  flex-basis: 25%;
}

.btn-grey {
  background-color: #525252;
  border-radius: 4px;
  text-decoration: none;
}

/* Custom column width */
.col.col-artists-width {
  width: 45%;
  max-width: 45%;
  flex-basis: 45%;
}
.col.col-testimonials-width {
  width: 31%;
  max-width: 31%;
  flex-basis: 31%;
}

/* Text fonts */
/* For Greek */
.noto-11p5-600 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 11.5px !important;
  font-weight: 600 !important;
}
/* Montserrat */
.montserrat-11p5-600 {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 11.5px !important;
  font-weight: 600 !important;
}
</style>