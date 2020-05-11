<template>
  <Layout>
    <div v-show="getViewSize === 'desktop'">
      <v-navigation-drawer
        class="ml-4 mr-4"
        mini-variant-width="120px"
        style="margin-top: 43vh;"
        fixed
        permanent
        right
        hide-overlay
        mini-variant
        color="transparent"
      >
        <div class="d-flex flex-column align-end">
          <div class="pb-1" v-for="(navItem, i) in sideNav" :key="'nav-item-' + i">
            <v-hover v-slot:default="{ hover }">
              <div class="d-flex align-center justify-center">
                <div v-if="hover"
                  class='pr-2 text-uppercase'
                  :class="getLang === 'gr' ? 'noto-10-700' : 'montserrat-10-700'"
                  v-html="navItem[getLang]"
                />
                <v-btn :id="'nav-' + i" :ripple="false" x-small icon @click="$vuetify.goTo(navItem.tag)">
                  <v-icon v-if="!navItem.active" :color="hover ? 'black' : ''" small>mdi-checkbox-blank-circle-outline</v-icon>
                  <v-icon v-else size="23" color="black">mdi-record-circle-outline</v-icon>
                </v-btn>
              </div>
            </v-hover>
          </div>
        </div>
      </v-navigation-drawer>

      <v-content class="background-color-dddddd">
        <v-container class="px-0 pt-0" fluid>

          <!-- About -->
          <div
            id="about"
            class="px-12 pt-12 background-color-white"
            v-waypoint="{ active: true, callback: onAbout, options: intersectOptions }"
          >
            <v-row justify="space-between" align="center">
              <v-col cols="5">
                <v-img contain width="42vw" :src="about.img" :lazy-src="about.lazy" />
              </v-col>
              <v-col class="pl-2 pr-12" cols="6">
                <div class="pr-8">
                  <div
                    :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                    class="color-333333 pb-7 pr-12"
                    v-html="$page.about.edges[0].node.title[getLang]"
                  />
                  <div
                    :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                    class="color-333333 pb-4 pr-12"
                    v-html="$page.about.edges[0].node.body[getLang]"
                  />
                </div>
              </v-col>
            </v-row>
          </div>

          <div class="py-8 background-color-white" />

          <!-- Explore -->
          <div
            id="explore"
            class="px-12 background-color-white"
            v-waypoint="{ active: true, callback: onExplore, options: intersectOptions }"
          >
            <div
              :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
              class="pb-10 my-0 text-center"
              v-html="$page.explore.edges[0].node.title[getLang]"
            />
            <v-row class="pt-12" justify="space-between" align="center">
              <v-col class="px-4" cols="4" v-for="(image, i) in $page.explore.edges[0].node.images" :key="'exploreImages-' + i">
                  <v-img gradient="to top right, rgba(0,0,0,.15), rgba(0,0,0,.15)" :src="explore.images[i].img">
                    <div style="height: 100%" class="d-flex flex-column justify-center align-center">
                      <div
                        :class="getLang === 'gr' ? 'noto-44-700' : 'raleway-44-700'"
                        class="white--text"
                        v-html="image[getLang]"
                      />
                      <v-btn
                        class="white--text px-10"
                        :class="getLang === 'gr' ? 'noto-11p5-600' :'montserrat-11p5-600'"
                        depressed
                        x-large
                        color="#525252"
                        v-html="$page.explore.edges[0].node.button[getLang]"
                        :to="explore.images[i].route"
                      />
                    </div>
                  </v-img>
              </v-col>
            </v-row>
          </div>

          <div class="py-12 background-color-white" />

          <!-- Artists -->
          <div
            id="artists"
            class="background-color-dedede pt-12 pb-10"
            v-waypoint="{ active: true, callback: onArtists, options: intersectOptions }"
          >
            <div>
              <v-row class="pt-12 pl-12 pr-10 pb-5" justify="space-between" align="center">
                <v-col class="pl-4 pr-0 col-artists-width">
                  <v-img contain :src="artists.img" :lazy-src="artists.lazy" />
                </v-col>
                <v-col class="pl-0 pr-5 col-artists-width">
                    <div class="color-333333">
                      <div
                        :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                        class="pb-9"
                        v-html="$page.artists.edges[0].node.title[getLang]"
                      />
                      <div
                        :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                        class="pb-8"
                        v-html="$page.artists.edges[0].node.body[getLang]"
                      />
                      <!-- <v-btn
                        class="white--text px-10"
                        :class="getLang === 'gr' ? 'noto-10p5-600' :'montserrat-10p5-600'"
                        depressed
                        x-large
                        color="#525252"
                        v-html="$page.artists.edges[0].node.button[getLang]"
                        @click="$vuetify.goTo('#contact-us')"
                      /> -->
                    </div>
                </v-col>
              </v-row>
              <v-row class="py-3" justify="space-around" align="center">
                <v-col
                  class="color-1a1a1a col-testimonials-width"
                  v-for="(testimonial, i) in $page.artists.edges[0].node.testimonials"
                  :key="'artists-testimonials-' + i"
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
            </div>
          </div>

          <!-- Benefits -->
          <div
            id="benefits"
            class="background-color-fafafa pt-12 pb-12"
            v-waypoint="{ active: true, callback: onBenefits, options: intersectOptions }"
          >
            <div class="pb-12">
              <v-row class="px-12 pb-3" justify="space-between">
                <v-col cols="4" v-for="(benefit, i) in benefits" :key="'benefit-img-' + i">
                  <v-img contain :src="benefit.img" :lazy-src="benefit.lazy" />
                </v-col>
              </v-row>
              <v-row class="px-12 pt-3" justify="space-between">
                <v-col class="color-333333" cols="4" v-for="(benefit, i) in $page.benefits.edges[0].node.benefits" :key="'benefit-text-' + i">
                  <div>
                    <div
                      :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                      v-html="benefit.title[getLang]"
                    />
                    <div
                      :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                      v-html="benefit.body[getLang]"
                    />
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>

          <!-- Media -->
          <div 
            id="media"
            class="pt-8 pb-12 white"
            v-waypoint="{ active: true, callback: onMedia, options: intersectOptions}"
          >
            <div>
              <div
                :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
                class="text-center color-333333 pb-12 mb-0"
                v-html="$page.media.edges[0].node.title[getLang]"
              />
              <div class="carousel-upper swiper-container">
                <div class="carousel-mid text-center pt-12" v-swiper:swiperNormal="swiperOption">
                  <div class="carousel-lower swiper-wrapper">
                    <div class="swiper-slide" v-for="(logo, i ) in media.logos" :key="'media-logos-' + i">
                      <img class="img-slide" :src="logo.img" />
                    </div>
                  </div>
                  <div class="swiper-pagination swiper-pagination-black" slot="pagination" />
                </div>
                <div class="swiper-button-prev swiper-button-white" slot="button-prev" />
                <div class="swiper-button-next swiper-button-white" slot="button-next" />
              </div>
            </div>
        </div>

        <!-- Contact -->
        <div
          id="contact-us"
          class="background-color-dddddd py-12"
          v-waypoint="{ active: true, callback: onContact, options: intersectOptions}"
        >
          <!-- <contact-us /> -->
        </div>

      </v-container>
    </v-content>
  </div>

  <div v-show="getViewSize === 'mobile'">
    <v-content class="background-color-dddddd">
      <v-container class="py-0 px-0 background-color-white">

        <!-- About -->
        <div id="about-small" class="pt-6">
          <v-row justify="center" align="center">
            <v-col cols=11>
              <v-img :src="about.img" :lazy-src="about.lazy" />
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="11">
              <div>
                <div
                  :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                  class="color-333333 pb-2"
                  v-html="$page.about.edges[0].node.title[getLang]"
                />
                <div
                  :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                  class="color-333333 pb-2"
                  v-html="$page.about.edges[0].node.body[getLang]"
                />
              </div>
            </v-col>
          </v-row>
        </div>

        <div class="py-8" />

        <!-- Explore -->
        <div id="explore-small">
          <div
            :class="getLang === 'gr' ? 'noto-32-700' : 'playfair-32-700'"
            class="pb-4 my-0 text-center"
            v-html="$page.explore.edges[0].node.title[getLang]"
          />
          <v-row
            class="pt-2"
            justify="center"
            align="center"
            v-for="(image, i) in $page.explore.edges[0].node.images" :key="'exploreImages-small-' + i"
          >
            <v-col cols="11">
              <v-img gradient="to top right, rgba(0,0,0,.15), rgba(0,0,0,.15)" :src="explore.images[i].img">
                <div style="height: 100%" class="d-flex flex-column justify-center align-center">
                  <div
                    :class="getLang === 'gr' ? 'noto-44-700' : 'raleway-44-700'"
                    class="white--text"
                    v-html="image[getLang]"
                  />
                  <!-- <v-btn
                    class="white--text px-10"
                    :class="getLang === 'gr' ? 'noto-11p5-600' :'montserrat-11p5-600'"
                    depressed
                    x-large
                    color="#525252"
                    v-html="$page.explore.edges[0].node.button[getLang]"
                    :to="explore.images[i].route"
                  /> -->
                </div>
              </v-img>
            </v-col>
          </v-row>
        </div>

        <div class="py-8" />

        <!-- Artists -->
        <div
          id="artists-small"
          class="background-color-dedede pt-12 pb-10"
        >
          <div>
            <v-row justify="center" align="center">
              <v-col cols=11>
                <v-img :src="artists.img" :lazy-src="artists.lazy" />
              </v-col>
            </v-row>
            <v-row justify="center" align="center">
              <v-col cols=11>
                <div class="color-333333">
                  <div
                    :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                    class="pb-2"
                    v-html="$page.artists.edges[0].node.title[getLang]"
                  />
                  <div
                    :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                    class="pb-2"
                    v-html="$page.artists.edges[0].node.body[getLang]"
                  />
                  <!-- <v-btn
                    class="white--text px-10"
                    :class="getLang === 'gr' ? 'noto-10p5-600' :'montserrat-10p5-600'"
                    depressed
                    x-large
                    color="#525252"
                    v-html="$page.artists.edges[0].node.button[getLang]"
                  /> -->
                </div>
              </v-col>
            </v-row>
            <v-row
              class="py-3" justify="space-around" align="center"
              v-for="(testimonial, i) in $page.artists.edges[0].node.testimonials"
              :key="'artists-testimonials-small-' + i"
            >
              <v-col class="color-1a1a1a" cols=11>
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
          </div>
        </div>

        <!-- Benefits -->
        <div
          id="benefits-small"
          class="background-color-fafafa pt-6"
        >
          <v-row justify="center" v-for="(benefit, i) in $page.benefits.edges[0].node.benefits" :key="'benefit-small-' + i">
            <v-col cols=11>
              <v-img class="mb-4" :src="benefits[i].img" :lazy-src="benefits[i].lazy" />
              <div class="color-333333 pb-6">
                <div
                  :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                  v-html="benefit.title[getLang]"
                />
                <div
                  :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                  v-html="benefit.body[getLang]"
                />
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- Media -->
        <div 
          id="media-small"
          class="pt-8 pb-10 white"
        >
          <div>
            <div
              :class="getLang === 'gr' ? 'noto-32-700' : 'playfair-32-700'"
              class="text-center color-333333 pb-2 mb-0"
              v-html="$page.media.edges[0].node.title[getLang]"
            />
            <div class="carousel-upper-small swiper-container">
              <div class="carousel-mid-small text-center pt-12" v-swiper:swiperSmall="swiperOption">
                <div class="carousel-lower-small swiper-wrapper">
                  <div class="swiper-slide" v-for="(logo, i ) in media.logos" :key="'media-logos-small-' + i">
                    <img class="img-slide" :src="logo.imgSmall" />
                  </div>
                </div>
                <div class="swiper-pagination swiper-pagination-black" slot="pagination" />
              </div>
            </div>
          </div>
      </div>

      <div id="contact-us-small" class="background-color-dddddd pt-4 pb-12">
        <!-- <contact-us class="pb-12" :isSmall="true" colWidth="11" /> -->
      </div>

      </v-container>
    </v-content>
  </div>

  </Layout>
</template>

<script>
import { mapGetters } from "vuex"
import { directive } from 'vue-awesome-swiper'
import ContactUs from '~/components/ContactUs.vue'

export default {
  components: {
    ContactUs,
  },
  directives: {
    swiper: directive
  },
  mounted () {
    this.$nextTick(() => {
      // Enable side navigation with a 200ms delay to avoid
      // load waypoint triggers and set active hash because
      // no waypoint triggered
      setTimeout(() => {
        this.isSideNav = true;
        switch (this.$route.hash) {
          case '':
          case '#about':
            this.sideNav[0].active = true;
            break;
          case '#explore':
            this.sideNav[1].active = true;
            break;
          case '#artists':
            this.sideNav[2].active = true;
            break;
          case '#benefits':
            this.sideNav[3].active = true;
            break;
          case '#media':
            this.sideNav[4].active = true;
            break;
          case '#contact-us':
            this.sideNav[5].active = true;
            break;
        }
      }, 200);
    })
  },
  updated () {
    this.$nextTick(() => {
      if (this.$route.hash) {
        const el = document.querySelector(this.$route.hash);
        el && el.scrollIntoView();
      }
    })
  },
  data () {
    return {
      isSideNav: false,
      intersectOptions: {
        rootMargin: '0px 0px -50% 0px',
        threshold: [0.3],
        root: null
      },
      /* Side Navigation */
      sideNav: [
        {
          gr: 'Εμεις',
          en: 'About',
          tag: '#about',
          active: false,
        },
        {
          gr: 'Ανακαλυψε',
          en: 'Explore',
          tag: '#explore',
          active: false,
        },
        {
          gr: 'Καλλιτεχνες',
          en: 'Artists',
          tag: '#artists',
          active: false,
        },
        {
          gr: 'Πλεονεκτηματα',
          en: 'Benefits',
          tag: '#benefits',
          active: false,
        },
        {
          gr: 'ΜΜΕ',
          en: 'Media',
          tag: '#media',
          active: false,
        },
        {
          gr: 'Επικοινωνια',
          en: 'Contact',
          tag: '#contact-us',
          active: false,
        },
      ],
      /* Sections */
      // About
      about: {
        isActive: false,
        img: "https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1582236536/artventures/img21.png",
        lazy: "https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582236536/artventures/img21.png",
      },
      // Explore
      explore: {
        isActive: false,
        images: [
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill/v1585320134/artventures/img22.jpg',
            lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill,w_100,h_100/v1585320134/artventures/img22.jpg',
            route: '/individuals',
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill/v1585320139/artventures/img23.jpg',
            lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill,w_100,h_100/v1585320139/artventures/img23.jpg',
            route: '/businesses',
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill/v1585320144/artventures/img24.jpg',
            lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill,w_100,h_100/v1585320139/artventures/img24.jpg',
            route: '/hotels',
          },
        ],
      },
      // Artists
      artists: {
        isActive: false,
        img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1582416241/artventures/img17.jpg',
        lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/img17.jpg',
      },
      // Benefits
      benefits: [
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/img25.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/img25.jpg',
        },
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/img26.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/img26.jpg',
        },
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/img27.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/img27.jpg',
        },
      ],
      // Media
      media: {
        logos: [
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_176/v1585653768/artventures/logo-om.jpg',
            imgSmall: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_60/v1585653768/artventures/logo-om.jpg',
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_176/v1585653768/artventures/logo-popaganda.jpg',
            imgSmall: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_60/v1585653768/artventures/logo-popaganda.jpg'
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_176/v1585653768/artventures/logo-fortunegreece.jpg',
            imgSmall: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_60/v1585653768/artventures/logo-fortunegreece.jpg',
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_176/v1585653768/artventures/logo-kathimerini.jpg',
            imgSmall: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_60/v1585653768/artventures/logo-kathimerini.jpg',
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_176/v1585653768/artventures/logo-liberal.jpg',
            imgSmall: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_60/v1585653768/artventures/logo-liberal.jpg',
          },
        ]
      },
      /* Carousel */
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 0,
        setWrapperSize: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      },
      swiperSmallOption: {
        slidesPerView: 3,
        spaceBetween: 0,
        setWrapperSize: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      },
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  methods: {
    onAbout ({ el, going, direction, _entry }) {
      if (going === this.$waypointMap.GOING_IN && this.isSideNav) {
        this.sideNav[0].active = true;
        this.sideNav[1].active =
        this.sideNav[2].active =
        this.sideNav[3].active =
        this.sideNav[4].active =
        this.sideNav[5].active = false;
      }
    },
    onExplore ({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN && this.isSideNav) {
        this.sideNav[1].active = true;
        this.sideNav[0].active =
        this.sideNav[2].active =
        this.sideNav[3].active =
        this.sideNav[4].active =
        this.sideNav[5].active = false;
      }
    },
    onArtists ({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN && this.isSideNav) {
        this.sideNav[2].active = true;
        this.sideNav[0].active =
        this.sideNav[1].active =
        this.sideNav[3].active =
        this.sideNav[4].active =
        this.sideNav[5].active = false;
      }
    },
    onBenefits ({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN && this.isSideNav) {
        this.sideNav[3].active = true;
        this.sideNav[0].active =
        this.sideNav[1].active =
        this.sideNav[2].active =
        this.sideNav[4].active =
        this.sideNav[5].active = false;
      }
    },
    onMedia ({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN && this.isSideNav) {
        this.sideNav[4].active = true;
        this.sideNav[0].active =
        this.sideNav[1].active =
        this.sideNav[2].active =
        this.sideNav[3].active =
        this.sideNav[5].active = false;
      }
    },
    onContact ({ going, direction }) {
      if (going === this.$waypointMap.GOING_IN && this.isSideNav) {
        this.sideNav[5].active = true;
        this.sideNav[0].active =
        this.sideNav[1].active =
        this.sideNav[2].active =
        this.sideNav[3].active =
        this.sideNav[4].active = false;
      }
    },
  },
  metaInfo () {
    return {
      titleTemplate: 'Artventures',
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>

<page-query>
query {
  about: allHome(filter: { path: { eq: "/content/home/about/" }}) {
    edges {
      node {
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
  explore: allHome(filter: { path: { eq: "/content/home/explore/" }}) {
    edges {
      node {
        title {
          en
          gr
        }
        images {
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
  artists: allHome(filter: { path: { eq: "/content/home/artists/" }}) {
    edges {
      node {
        title {
          en
          gr
        }
        body {
          en
          gr
        }
        testimonials {
          quote{
            en
            gr
          }
          author {
            en
            gr
          }
        }
        button {
          en
          gr
        }
      }
    }
  }
  benefits: allHome(filter: { path: { eq: "/content/home/benefits/" }}) {
    edges {
      node {
        benefits {
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
  media: allHome(filter: { path: { eq: "/content/home/media/" }}) {
    edges {
      node {
        title {
          en
          gr
        }
      }
    }
  }
}
</page-query>

<style>
  #nav-0.v-btn:hover:before,
  #nav-0.v-btn:focus:before,
  #nav-1.v-btn:hover:before,
  #nav-1.v-btn:focus:before,
  #nav-2.v-btn:hover:before,
  #nav-2.v-btn:focus:before,
  #nav-3.v-btn:hover:before,
  #nav-3.v-btn:focus:before,
  #nav-4.v-btn:hover:before,
  #nav-4.v-btn:focus:before,
  #nav-5.v-btn:hover:before,
  #nav-5.v-btn:focus:before {
    display: none;
  }
  #nav-0.v-btn--active:before,
  #nav-1.v-btn--active:before,
  #nav-2.v-btn--active:before,
  #nav-3.v-btn--active:before,
  #nav-4.v-btn--active:before,
  #nav-5.v-btn--active:before {
    opacity: 0;
  }

/* Carousel */
.carousel-upper {
  width: 900px;
}
.carousel-mid {
  width: 616px;
}
.carousel-lower {
  padding-bottom: 40px;
}
.carousel-upper-small {
  width: 300px;
}
.carousel-mid-small {
  width: 210px;
}
.carousel-lower-small {
  padding-bottom: 40px;
}
.swiper-button-next,
.swiper-button-prev {
  background-color: rgba(0, 0, 0, 0.12);
  padding: 40px;
  /* Remove Chrome focurs border */
  outline-style: none;
  box-shadow: none;
  border-color: transparent;
}
.img-slide {
  background-position: 50%;
  background-size: cover;
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
.noto-10-700 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 10px !important;
  font-weight: 700 !important;
}
.noto-10p5-600 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 10.5px !important;
  font-weight: 600 !important;
}
.noto-11p5-600 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 11.5px !important;
  font-weight: 600 !important;
}
/* Montserrat */
.montserrat-10-700 {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 10px !important;
  font-weight: 700 !important;
}
.montserrat-10p5-600 {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 10.5px !important;
  font-weight: 600 !important;
}
.montserrat-11p5-600 {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 11.5px !important;
  font-weight: 600 !important;
}
</style>