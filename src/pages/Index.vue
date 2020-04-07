<template>
  <Layout>
    <v-navigation-drawer
      class="ml-4 mr-4"
      mini-variant-width="100px"
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
              <div v-if="hover" class="montserrat-9p5-700 pr-2 text-uppercase" v-html="navItem[getLang]" />
              <v-btn :id="'nav-' + i" :ripple="false" x-small icon @click="$vuetify.goTo(navItem.tag)">
                <v-icon v-if="!navItem.active" :color="hover ? 'black' : ''" small>mdi-checkbox-blank-circle-outline</v-icon>
                <v-icon v-else size="23" color="black">mdi-record-circle-outline</v-icon>
              </v-btn>
            </div>
          </v-hover>
        </div>
      </div>
    </v-navigation-drawer>

    <v-content>
      <v-container class="pt-12 px-0 pb-0" fluid>
        <div id="about" class="px-12" v-waypoint="{ active: true, callback: onAbout, options: intersectOptions}">
          <v-lazy
            v-model="about.isActive"
            :options="{
              threshold: 1.0
            }"
            transition="slide-y-reverse-transition"
          >
            <v-row justify="space-between" align="center">
              <v-col cols="5">
                <v-img contain width="42vw" :src="about.img" :lazy-src="about.lazy" />
              </v-col>
              <v-col class="pl-2 pr-12" cols="6">
                <div class="pr-8">
                  <p style="color: #333333" class="playfair-30-700 pb-7 pr-12" v-html="about.title[getLang]" />
                  <p v-for="(p, i) in about.body" :key="'aboutTextBody-' + i"
                    style="color: #333333" class="raleway-16-400 pb-4 pr-12" v-html="p[getLang]"
                  />
                </div>
              </v-col>
            </v-row>
          </v-lazy>
        </div>

        <div class="py-8" />

        <div id="explore" class="px-12" v-waypoint="{ active: true, callback: onExplore, options: intersectOptions}">
          <p class="pb-10 my-0 text-center playfair-38-700" v-html="explore.title[getLang]" />
          <v-lazy
            v-model="explore.isActive"
            :options="{
              threshold: 1.0
            }"
            transition="slide-y-reverse-transition"
          >
            <v-row class="pt-12" justify="space-between" align="center">
              <v-col class="px-4" cols="4" v-for="(image, i) in explore.images" :key="'exploreImages-' + i">
                  <v-img gradient="to top right, rgba(0,0,0,.15), rgba(0,0,0,.15)" :src="image.img">
                    <div style="height: 100%" class="d-flex flex-column justify-center align-center">
                      <p class="raleway-44-700 white--text" v-html="image.p[getLang]" />
                      <v-btn
                        class="montserrat-11p5-600 white--text px-10"
                        depressed
                        x-large
                        color="#525252"
                        v-html="explore.button[getLang]"
                        :to="image.route"
                      />
                    </div>
                  </v-img>
              </v-col>
            </v-row>
          </v-lazy>
        </div>

        <div class="py-12" />

        <div id="artists" class="pt-12 pb-10" style="background-color: #DEDEDE" v-waypoint="{ active: true, callback: onArtists, options: intersectOptions}">
          <v-lazy
            v-model="artists.isActive"
            :options="{
              threshold: 1.0
            }"
            transition="slide-y-reverse-transition"
          >
          <v-container fluid class="pa-0 ma-0">
            <v-row class="pt-12 pl-12 pr-10 pb-5" justify="space-between" align="center">
              <v-col class="pl-4 pr-0 col-artists-width">
                <v-img contain :src="artists.img" :lazy-src="artists.lazy" />
              </v-col>
              <v-col class="pl-0 pr-5 col-artists-width">
                  <div style="color: #333333">
                    <p class="playfair-30-700 pb-9" v-html="artists.title[getLang]" />
                    <p class="raleway-16-400 pb-8" v-html="artists.body[getLang]"/>
                    <v-btn
                      class="montserrat-10p5-600 white--text px-10"
                      depressed
                      x-large
                      color="#525252"
                      v-html="artists.button[getLang]"
                    />
                  </div>
              </v-col>
            </v-row>
            <v-row class="py-3" justify="space-around" align="center">
              <v-col
                style="color: #1A1A1A"
                class="col-testimonials-width"
                v-for="(testimonial, i) in artists.testimonials"
                :key="'artists-testimonials-' + i"
              >
                <div class="playfair-18-400 text-center" v-html="testimonial.quote[getLang]" />
                <div class="raleway-13-600 text-center pt-2" v-html="testimonial.author[getLang]" />
              </v-col>
            </v-row>
          </v-container>
          </v-lazy>
        </div>

        <div id="benefits" class="pt-6" style="background-color: #FAFAFA" v-waypoint="{ active: true, callback: onBenefits, options: intersectOptions}">
          <v-lazy
            v-model="artists.isActive"
            :options="{
              threshold: 1.0
            }"
            transition="slide-y-reverse-transition"
          >
            <v-row class="px-12 py-12" justify="space-between">
              <v-col class="px-4" cols="4" v-for="(benefit, i) in benefits" :key="'benefit-' + i">
                <v-row justify="space-between">
                  <v-col class="px-5" cols="6">
                    <v-img contain :src="benefit.img" :lazy-src="benefit.lazy" />
                  </v-col>
                  <v-col class="px-5" style="color: #333333" cols="6">
                    <p class="playfair-30-700" v-html="benefit.title[getLang]" />
                    <p class="raleway-16-400" v-html="benefit.description[getLang]" />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-lazy>
        </div>

        <div id="media" class="pt-8 pb-12 white" v-waypoint="{ active: true, callback: onMedia, options: intersectOptions}">
          <v-lazy
            v-model="artists.isActive"
            :options="{
              threshold: 1.0
            }"
            transition="slide-y-reverse-transition"
          >
            <div>
              <p class="playfair-38-700 text-center pb-12 mb-0" style="color: #333333" v-html="media.title[getLang]" />
              <div class="carousel-upper swiper-container">
                <div class="carousel-mid text-center pt-12" v-swiper="swiperOption">
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
          </v-lazy>
        </div>

        <div id="contact-us" class="pt-12" style="background-color: #dddddd">
          <div v-waypoint="{ active: true, callback: onContact, options: intersectOptions}" />
          <v-lazy
            v-model="artists.isActive"
            :options="{
              threshold: 1.0
            }"
            transition="slide-y-reverse-transition"
          >
            <contact-us />
          </v-lazy>
        </div>

      </v-container>
    </v-content>
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
          gr: 'Media',
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
        title: {
          'gr': 'A new Artwork in your space, anytime you want',
          'en': 'A new Artwork in your space, anytime you want',
        },
        body: [
          {
            'gr': 'We are here to change the way you think and experience Art. So give us your hand and let us take you to your first... Artventure. Get original Art in your home, office, workspace or even your hotel, without spending a fortune.',
            'en': 'We are here to change the way you think and experience Art. So give us your hand and let us take you to your first... Artventure. Get original Art in your home, office, workspace or even your hotel, without spending a fortune.',
          },
          {
            'gr': 'Explore new, upcoming or well established artists from all over Greece, and experience Art as a Service.',
            'en': 'Explore new, upcoming or well established artists from all over Greece, and experience Art as a Service.',
          },
          {
            'gr': 'Explore, rent and enjoy Art.',
            'en': 'Explore, rent and enjoy Art.',
          }
        ],
        img: "https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1582236536/artventures/img21.png",
        lazy: "https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582236536/artventures/img21.png",
      },
      // Explore
      explore: {
        isActive: false,
        title: {
          'gr': 'Explore your options',
          'en': 'Explore your options',
        },
        images: [
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill/v1585320134/artventures/img22.jpg',
            lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill,w_100,h_100/v1585320134/artventures/img22.jpg',
            p: {
              gr: 'Individuals',
              en: 'Individuals',
            },
            route: '/individuals',
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill/v1585320139/artventures/img23.jpg',
            lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill,w_100,h_100/v1585320139/artventures/img23.jpg',
            p: {
              gr: 'Businesses',
              en: 'Businesses',
            },
            route: '/businesses',
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill/v1585320144/artventures/img24.jpg',
            lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill,w_100,h_100/v1585320139/artventures/img24.jpg',
            p: {
              gr: 'Hotels',
              en: 'Hotels',
            },
            route: '/hotels',
          },
        ],
        button: {
          gr: 'Find out more',
          en: 'Find out more',
        }
      },
      // Artists
      artists: {
        isActive: false,
        title: {
          gr: 'Artists, Sell with us!',
          en: 'Artists, Sell with us!',
        },
        body: {
          gr: 'Join Artventures’ team of Artists and get exposure, income and recognition. We don’t care if you’re young and upcoming or experienced and well established, we only care about your Art. Through our experts and partners we provide everything our sellers need, so you can focus on what you love to do – create exquisite Art!',
          en: 'Join Artventures’ team of Artists and get exposure, income and recognition. We don’t care if you’re young and upcoming or experienced and well established, we only care about your Art. Through our experts and partners we provide everything our sellers need, so you can focus on what you love to do – create exquisite Art!',
        },
        testimonials: [
          {
            quote: {
              gr: '“Artventures is a wonderful idea, and a great way to get more exposure and buyers. But above all, it’s a rare team with passionate, amazing people who love art and artists and do everything to help us.”',
              en: '“Artventures is a wonderful idea, and a great way to get more exposure and buyers. But above all, it’s a rare team with passionate, amazing people who love art and artists and do everything to help us.”',
            },
            author: {
              gr: '— Kostas Vaviloussakis',
              en: '— Kostas Vaviloussakis',
            }
          },
          {
            quote: {
              gr: '“I’m very happy to be a part of the Artventures since the beginning. They’re kind, helpful and trustworthy. And most of all they’re great guys and take care of my work.”',
              en: '“I’m very happy to be a part of the Artventures since the beginning. They’re kind, helpful and trustworthy. And most of all they’re great guys and take care of my work.”',
            },
            author: {
              gr: '— Yorgis Yerolymbos',
              en: '— Yorgis Yerolymbos',
            }
          }
        ],
        img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1582416241/artventures/img17.jpg',
        lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/img17.jpg',
        button: {
          gr: 'Apply to Artventures',
          en: 'Apply to Artventures',
        },
      },
      // Benefits
      benefits: [
        {
          title: {
            gr: 'Your Art speaks for you.',
            en: 'Your Art speaks for you.',
          },
          description: {
            gr: 'Whether you’re looking to inspire, ask questions, start a conversation, make an impression, or challenge an assumption, the art you show can make the statement over and over in unique, dynamic ways.',
            en: 'Whether you’re looking to inspire, ask questions, start a conversation, make an impression, or challenge an assumption, the art you show can make the statement over and over in unique, dynamic ways.',
          },
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/img25.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/img25.jpg',
        },
        {
          title: {
            gr: 'Support local artists.',
            en: 'Support local artists.',
          },
          description: {
            gr: 'Exhibit artwork that represents your community and support the artists who share it with you. Whether you are renting or buying artwork, a percentage of every Euro you spend with Artventures is paid directly to the artists whose work you enjoy.',
            en: 'Exhibit artwork that represents your community and support the artists who share it with you. Whether you are renting or buying artwork, a percentage of every Euro you spend with Artventures is paid directly to the artists whose work you enjoy.',
          },
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/img26.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/img26.jpg',
        },
        {
          title: {
            gr: 'Invest smart.',
            en: 'Invest smart.',
          },
          description: {
            gr: 'Get to know young and talented artists before they even gain much publicity, help those you value by trying out and / or purchasing their artworks, promote those you believe are worth more, by giving them the exposure they need. Start or increase your collection and give it good value by supporting and discovering new, promising artists at the same time.',
            en: 'Get to know young and talented artists before they even gain much publicity, help those you value by trying out and / or purchasing their artworks, promote those you believe are worth more, by giving them the exposure they need. Start or increase your collection and give it good value by supporting and discovering new, promising artists at the same time.',
          },
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/img27.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/img27.jpg',
        },
      ],
      // Media
      media: {
        title: {
          gr: 'They say about us',
          en: 'They say about us',
        },
        logos: [
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_176/v1585653768/artventures/logo-om.jpg'
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_176/v1585653768/artventures/logo-popaganda.jpg'
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_176/v1585653768/artventures/logo-fortunegreece.jpg'
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_176/v1585653768/artventures/logo-kathimerini.jpg'
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/c_thumb,h_176/v1585653768/artventures/logo-liberal.jpg'
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
/* Montserrat */
.montserrat-9p5-700 {
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
/* Playfair Display */
.playfair-18-400 {
  font-family: 'Playfair Display', serif !important;
  font-size: 18px !important;
  font-weight: 400 !important;
  line-height: 1.4em !important;
}
.playfair-30-700 {
  font-family: 'Playfair Display', serif !important;
  font-size: 30px !important;
  font-weight: 700 !important;
}
.playfair-38-700 {
  font-family: 'Playfair Display', serif !important;
  font-size: 38px !important;
  font-weight: 700 !important;
}
/* Raleway */
.raleway-13-600 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 13px !important;
  font-weight: 600 !important;
}
.raleway-16-400 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 1.6em !important;
}
.raleway-44-700 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 44px !important;
  font-weight: 700 !important;
}
</style>