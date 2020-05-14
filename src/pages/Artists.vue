<template>
  <Layout>

    <v-content v-show="getViewSize === 'desktop'">
      <v-container class="pa-0 background-color-fafafa" fluid>

        <!-- Main -->
        <v-row class="pt-12 pl-12 pr-10 pb-5" justify="space-between" align="center">
          <v-col class="pl-4 pr-0 col-artists-width">
            <!-- <v-img contain :src="artists.img" :lazy-src="artists.lazy" /> -->
          </v-col>
          <v-col class="pl-0 pr-5 col-artists-width">
              <div class="color-333333">
                <div
                  :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                  class="pb-9"
                  v-html="$page.artists.edges[0].node.main.title[getLang]"
                />
                <div
                  :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                  class="pb-8"
                  v-html="$page.artists.edges[0].node.main.body[getLang]"
                />
                <a
                  class="btn-grey white--text px-12 py-5 text-uppercase"
                  :class="getLang === 'gr' ? 'noto-11p5-600' :'montserrat-11p5-600'"
                  v-html="$page.artists.edges[0].node.main.button[getLang]"
                />
              </div>
          </v-col>
        </v-row>

        <div class="py-6" />

        <div class="py-12">
          <!-- <v-row class="px-12 pb-3" justify="space-between">
            <v-col cols="4" v-for="(benefit, i) in benefits" :key="'benefit-img-' + i">
              <v-img contain :src="benefit.img" :lazy-src="benefit.lazy" />
            </v-col>
          </v-row> -->
          <v-row class="px-12 pt-3" justify="space-between">
            <v-col
              class="color-333333"
              cols="4"
              v-for="(advantage, i) in $page.artists.edges[0].node.advantages"
              :key="'advantage-text-' + i"
            >
              <div>
                <div
                  class="pb-5"
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
        <div class="py-8">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- Earnings -->
        <div class="text-center custom-block-2">
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
                v-html="earning.body[getLang]"
              />
            </v-col>
          </v-row>
        </div>

        <!-- spacer with divider -->
        <div class="py-8">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- Button -->
        <div class="text-center custom-block">
          <div
            :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
            class="pb-6"
            v-html="$page.artists.edges[0].node.button.title[getLang]"
          />
          <g-link
            :class="getLang === 'gr' ? 'noto-13-600' : 'raleway-13-600'"
            class="join-btn white--text text-uppercase"
          >
            {{ $page.artists.edges[0].node.button.body[getLang] }}
          </g-link>
        </div>

        <!-- spacer with divider -->
        <div class="py-8">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- Testimonials -->
        <div
          :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
          class="pb-6"
          v-html="$page.artists.edges[0].node.testimonials.title[getLang]"
        />
        <v-row class="pt-12" justify="space-around" align="center">
          <v-col
            class="col-artists-testimonials-width"
            v-for="(testimonial, i) in $page.artists.edges[0].node.testimonials.items"
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

        <!-- Contact -->
        <div class="pb-12">
          <contact-us />
        </div>

      </v-container>
    </v-content>

  </Layout>
</template>

<script>
import { mapGetters } from "vuex"
import ContactUs from '~/components/ContactUs.vue'

export default {
  components: {
    ContactUs,
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
          body {
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
        body {
          en
          gr
        }
      }
      testimonials {
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