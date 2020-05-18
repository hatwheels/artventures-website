<template>
  <Layout>
    <v-content v-show="getViewSize === 'desktop'">
      <v-container class="pa-0 background-color-fafafa" fluid>

        <!-- spacer -->
        <div class="py-10" />

        <!-- main -->
        <div class="px-12 pt-12 pb-10 background-color-fafafa pos-rel">
          <v-img width="69.84%" :src="main.img" :lazy="main.lazy" />
          <div class="biz-cross-main">
            <div
              :class="getLang === 'gr' ? 'noto-3p28vw-600-1p2em' : 'raleway-3p28vw-600-1p2em'"
              class="black--text pb-6"
              v-html="$page.businesses.edges[0].node.main.title[getLang]"
            />
            <div
              :class="getLang === 'gr' ? 'noto-1p312vw-400' : 'raleway-1p312vw-400'"
              class="color-rgba-0-0-0-p52 pb-12"
              v-html="$page.businesses.edges[0].node.main.body[getLang]"
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
              <v-img contain :src="advantage.img" :lazy-src="advantage.lazy" />
            </v-col>
          </v-row>
          <v-row class="px-12 pt-3" justify="space-around">
            <v-col class="color-333333" cols="4" v-for="(advantage, i) in $page.businesses.edges[0].node.advantages" :key="'advantage-' + i">
              <div v-waypoint="{ active: true, callback: onAdvantagesEl, options: elIsOpt }">
                <template v-if="advantagesEl">
                  <transition name="ride" appear>
                    <div>
                      <div
                        :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                        v-html="advantage.title[getLang]"
                      />
                      <div
                        :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                        v-html="advantage.body[getLang]"
                      />
                    </div>
                  </transition>
                </template>
                <template v-else>
                  <div>
                    <div
                      :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                      v-html="advantage.title[getLang]"
                    />
                    <div
                      :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                      v-html="advantage.body[getLang]"
                    />
                  </div>
                </template>
              </div>
            </v-col>
          </v-row>
          <div class="text-center custom-block pt-8 pb-8" v-waypoint="{ active: true, callback: onAdvantagesBtnEl, options: elIsOpt }">
            <template v-if="advantagesBtnEl">
              <transition name="surf" appear>
                <g-link
                  :class="getLang === 'gr' ? 'noto-15-600-1p5' : 'raleway-15-600-1p5'"
                  class="learn-more-btn white--text text-uppercase"
                  :to="{ path: '/', hash:'#contact-us' }"
                >
                  {{ $page.businesses.edges[0].node.button[getLang] }}
                </g-link>
              </transition>
            </template>
            <template v-else>
              <g-link
                :class="getLang === 'gr' ? 'noto-15-600-1p5' : 'raleway-15-600-1p5'"
                class="learn-more-btn white--text text-uppercase"
                :to="{ path: '/', hash:'#contact-us' }"
              >
                {{ $page.businesses.edges[0].node.button[getLang] }}
              </g-link>
            </template>
          </div>
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
            <div v-waypoint="{ active: true, callback: onTestimonialsEl, options: elIsOpt }">
              <template v-if="testimonialsEl">
                <transition name="ride" appear>
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
                </transition>
              </template>
              <template v-else>
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
              </template>
            </div>
          </v-col>
        </v-row>

        <!-- spacer -->
        <div class="pb-12" />

      </v-container>
    </v-content>

    <v-content v-show="getViewSize === 'mobile'">
      <v-container class="pa-0 background-color-fafafa" fluid>

        <!-- main -->
        <v-row justify="center">
          <v-col cols=11>
            <v-img :src="main.img" :lazy="main.lazy" />
          </v-col>
          <v-col
            class="background-color-f5f5f5"
            cols=11
            v-waypoint="{ active: true, callback: onMainElMob, options: elIsOpt }"
          >
            <template v-if="mainElMob">
              <transition name="surf" appear>
                <div>
                  <div
                    :class="getLang === 'gr' ? 'noto-30-700' : 'raleway-30-700'"
                    class="black--text pb-4"
                    v-html="$page.businesses.edges[0].node.main.title[getLang]"
                  />
                  <div
                    :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                    class="color-rgba-0-0-0-p52 pb-7"
                    v-html="$page.businesses.edges[0].node.main.body[getLang]"
                  />
                  <g-link
                    :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                    class="contact-us-btn-small white--text text-center"
                    :to="{ path: '/', hash:'#contact-us-small' }"
                  >
                    {{ $page.businesses.edges[0].node.main.button[getLang] }}
                  </g-link>
                </div>
              </transition>
            </template>
            <template v-else>
              <div
                :class="getLang === 'gr' ? 'noto-30-700' : 'raleway-30-700'"
                class="black--text pb-4"
                v-html="$page.businesses.edges[0].node.main.title[getLang]"
              />
              <div
                :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                class="color-rgba-0-0-0-p52 pb-7"
                v-html="$page.businesses.edges[0].node.main.body[getLang]"
              />
              <g-link
                :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                class="contact-us-btn-small white--text text-center"
                :to="{ path: '/', hash:'#contact-us-small' }"
              >
                {{ $page.businesses.edges[0].node.main.button[getLang] }}
              </g-link>
            </template>
          </v-col>
        </v-row>

        <!-- advantages -->
        <div class="pt-6">
          <v-row justify="center">
            <v-col cols="11">
              <v-img class="mb-4" :src="advantages.content[0].img" :lazy-src="advantages.content[0].lazy" />
              <div
                v-if="wpActiveMob"
                v-waypoint="{ active: true, callback: onAdvantagesElMob0, options: elIsOpt }"
              />
              <template v-if="advantagesElMob0">
                <transition name="ride" appear>
                    <div class="color-333333">
                      <div
                        :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                        v-html="$page.businesses.edges[0].node.advantages[0].title[getLang]"
                      />
                      <div
                        :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                        v-html="$page.businesses.edges[0].node.advantages[0].body[getLang]"
                      />
                    </div>
                </transition>
              </template>
              <template v-else>
                <div class="color-333333">
                  <div
                    :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                    v-html="$page.businesses.edges[0].node.advantages[0].title[getLang]"
                  />
                  <div
                    :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                    v-html="$page.businesses.edges[0].node.advantages[0].body[getLang]"
                  />
                </div>
              </template>
              <div
                v-if="wpActiveMob"
                v-waypoint="{ active: true, callback: onAdvantagesElMob0, options: elIsOpt }"
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="11">
              <v-img class="mb-4" :src="advantages.content[1].img" :lazy-src="advantages.content[1].lazy" />
              <div
                v-if="wpActiveMob"
                v-waypoint="{ active: true, callback: onAdvantagesElMob1, options: elIsOpt }"
              />
              <template v-if="advantagesElMob1">
                <transition name="ride" appear>
                    <div class="color-333333">
                      <div
                        :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                        v-html="$page.businesses.edges[0].node.advantages[1].title[getLang]"
                      />
                      <div
                        :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                        v-html="$page.businesses.edges[0].node.advantages[1].body[getLang]"
                      />
                    </div>
                </transition>
              </template>
              <template v-else>
                <div class="color-333333">
                  <div
                    :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                    v-html="$page.businesses.edges[0].node.advantages[1].title[getLang]"
                  />
                  <div
                    :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                    v-html="$page.businesses.edges[0].node.advantages[1].body[getLang]"
                  />
                </div>
              </template>
              <div
                v-if="wpActiveMob"
                v-waypoint="{ active: true, callback: onAdvantagesElMob1, options: elIsOpt }"
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="11">
              <v-img class="mb-4" :src="advantages.content[2].img" :lazy-src="advantages.content[2].lazy" />
              <div
                v-if="wpActiveMob"
                v-waypoint="{ active: true, callback: onAdvantagesElMob2, options: elIsOpt }"
              />
              <template v-if="advantagesElMob2">
                <transition name="ride" appear>
                    <div class="color-333333">
                      <div
                        :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                        v-html="$page.businesses.edges[0].node.advantages[2].title[getLang]"
                      />
                      <div
                        :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                        v-html="$page.businesses.edges[0].node.advantages[2].body[getLang]"
                      />
                    </div>
                </transition>
              </template>
              <template v-else>
                <div class="color-333333">
                  <div
                    :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                    v-html="$page.businesses.edges[0].node.advantages[2].title[getLang]"
                  />
                  <div
                    :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                    v-html="$page.businesses.edges[0].node.advantages[2].body[getLang]"
                  />
                </div>
              </template>
              <div
                v-if="wpActiveMob"
                v-waypoint="{ active: true, callback: onAdvantagesElMob2, options: elIsOpt }"
              />
            </v-col>
          </v-row>
        </div>
        <div
          v-if="wpActiveMob"
          v-waypoint="{ active: true, callback: onAdvantagesBtnElMob, options: elIsOpt }"
        />
        <template v-if="advantagesBtnElMob">
          <transition name="surf" appear>
            <div class="text-center custom-block">
              <g-link
                :class="getLang === 'gr' ? 'noto-15-600-1p5' : 'raleway-15-600-1p5'"
                class="learn-more-btn-small white--text text-uppercase"
                :to="{ path: '/', hash:'#contact-us' }"
              >
                {{ $page.businesses.edges[0].node.button[getLang] }}
              </g-link>
            </div>
          </transition>
        </template>
        <template v-else>
          <div class="text-center custom-block">
            <g-link
              :class="getLang === 'gr' ? 'noto-15-600-1p5' : 'raleway-15-600-1p5'"
              class="learn-more-btn-small white--text text-uppercase"
              :to="{ path: '/', hash:'#contact-us' }"
            >
              {{ $page.businesses.edges[0].node.button[getLang] }}
            </g-link>
          </div>
        </template>
        <div
          v-if="wpActiveMob"
          v-waypoint="{ active: true, callback: onAdvantagesBtnElMob, options: elIsOpt }"
        />

        <!-- spacer with divider -->
        <div class="py-8">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- testimonials -->
        <div v-waypoint="{ active: true, callback: onTestimonialsElMob, options: elIsOpt }">
          <template v-if="testimonialsElMob">
            <transition-group name="surf" appear>
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
            </transition-group>
          </template>
          <template v-else>
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
          </template>
        </div>

        <!-- spacer -->
        <div class="pb-10" />

      </v-container>
    </v-content>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex"

export default {
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
      // Main Section
      mainElMob: false,
      // Advantages Section
      advantagesEl: false,
      advantagesElMob0: false,
      advantagesElMob1: false,
      advantagesElMob2: false,
      advantagesBtnEl: false,
      advantagesBtnElMob: false,
      // Testimonials Section
      testimonialsEl: false,
      testimonialsElMob: false,
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
  methods: {
    /* Element CSS transitions */
    onMainElMob ({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN) {
        this.mainElMob = true
      }
    },
    onAdvantagesEl ({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN && direction) {
        this.advantagesEl = true
      }
    },
    onAdvantagesElMob0 ({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN && direction) {
        this.advantagesElMob0 = true
      }
    },
    onAdvantagesElMob1 ({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN && direction) {
        this.advantagesElMob1 = true
      }
    },
    onAdvantagesElMob2 ({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN && direction) {
        this.advantagesElMob2 = true
      }
    },
    onAdvantagesBtnEl ({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN && direction) {
        this.advantagesBtnEl = true
      }
    },
    onAdvantagesBtnElMob ({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN && direction) {
        this.advantagesBtnElMob = true
      }
    },
    onTestimonialsEl ({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN && direction) {
        this.testimonialsEl = true
      }
    },
    onTestimonialsElMob ({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN && direction) {
        this.testimonialsElMob = true
      }
    },
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
        body {
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