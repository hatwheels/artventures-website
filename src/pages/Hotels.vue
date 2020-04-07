<template>
  <Layout>
    <v-content>
      <v-container class="pa-0 background-color-fafafa" fluid>

        <!-- spacer -->
        <div class="py-10" />

        <!-- main -->
        <div class="px-12 pt-12 pb-10 background-color-fafafa pos-rel">
          <v-img width="69.84%" :src="main.img" :lazy="main.lazy" />
          <div class="hot-cross-main">
            <div class="black--text raleway-3p28vw-600-1p2em pb-6" v-html="main.title[getLang]" />
            <div class="raleway-1p312vw-400 color-rgba-0-0-0-p52 pb-12" v-html="main.description[getLang]" />
            <div class="pt-3" />
            <router-link
              class="contact-us-btn raleway-1p312vw-600 white--text text-center text-uppercase"
              :to="{ path: '/', hash:'#contact-us' }"
              v-html="main.button[getLang]"
            />
          </div>
        </div>

        <!-- advantages -->
        <div class="pb-7">
          <v-row class="px-12 pt-12 pb-4" justify="space-between">
            <v-col class="px-4" cols="4" v-for="(advantage, i) in advantages" :key="'advantage-' + i">
              <v-row justify="space-between">
                <v-col class="px-5" cols="6">
                  <v-img contain :src="advantage.img" :lazy-src="advantage.lazy" />
                </v-col>
                <v-col class="pl-5 pr-6 color-333333" cols="6">
                  <p class="playfair-30-700-1p2" v-html="advantage.title[getLang]" />
                  <p class="raleway-16-400" v-html="advantage.description[getLang]" />
                </v-col>
              </v-row>
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
            v-for="(testimonial, i) in testimonials"
            :key="'hot-testimonials-' + i"
          >
            <div class="playfair-18-400 text-center" v-html="testimonial.quote[getLang]" />
            <div class="raleway-13-600 text-center pt-2" v-html="testimonial.author[getLang]" />
          </v-col>
        </v-row>

        <!-- spacer with divider -->
        <div class="pt-5 pb-12">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- form -->
        <div class="text-center pt-12">
          <div class="playfair-38-700 pb-6" v-html="form.title[getLang]" />
          <div class="custom-block">
            <a
              class="form-btn raleway-15-600 white--text text-uppercase"
              v-html="form.button[getLang]"
            />
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
        title: {
          gr: 'Art that make your spaces shine',
          en: 'Art that make your spaces shine',
        },
        description: {
          gr: 'Transform your spaces to an “open gallery” and expand your brand narrative through Art.<br><br>Whether you’re a small boutique hotel, a 5* resort or a real estate project, Artventures will help you create a unique collection and maximize all the advantages of exhibiting Art in your premises.',
          en: 'Transform your spaces to an “open gallery” and expand your brand narrative through Art.<br><br>Whether you’re a small boutique hotel, a 5* resort or a real estate project, Artventures will help you create a unique collection and maximize all the advantages of exhibiting Art in your premises.',
        },
        button: {
          gr: 'Contact Us',
          en: 'Contact Us',
        },
      },
      // advantages
      advantages: [
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/hotels02.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/businesses02.jpg',
          title: {
            gr: 'Take an innovative approach to renovation',
            en: 'Take an innovative approach to renovation',
          },
          description: {
            gr: 'Change the artwork in your spaces and rooms as often as you want.<br><br>Refresh the whole atmosphere and renovate without changing anything else (or spending a fortune). Choose a different narrative for your hotel very time.',
            en: 'Change the artwork in your spaces and rooms as often as you want.<br><br>Refresh the whole atmosphere and renovate without changing anything else (or spending a fortune). Choose a different narrative for your hotel very time.',
          },
        },
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/hotels03.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/hotels03.jpg',
          title: {
            gr: 'Discover the right piece of art for every room',
            en: 'Discover the right piece of art for every room',
          },
          description: {
            gr: 'From floor-to-ceiling lobby installations to hallway triptychs, we offer a full range of artworks. You’ll work one-on-one with a dedicated Art Advisor to find the perfect piece for every space.',
            en: 'From floor-to-ceiling lobby installations to hallway triptychs, we offer a full range of artworks. You’ll work one-on-one with a dedicated Art Advisor to find the perfect piece for every space.',
          },
        },
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/hotels04.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/hotels04.jpg',
          title: {
            gr: 'Get more value and even more revenue',
            en: 'Get more value and even more revenue',
          },
          description: {
            gr: 'Purchase or rent. Pay up front or over time. We offer a range of flexible options to make the most of your budget, every time. And get commissions from every sale.',
            en: 'Purchase or rent. Pay up front or over time. We offer a range of flexible options to make the most of your budget, every time. And get commissions from every sale.',
          },
        },
      ],
      // Testimonials
      testimonials: [
        {
          quote: {
            gr: '“We were very lucky to work with the Artventures team from the very begining. Communication was great all along. They really provide a great service. The whole group was very helpful and professional.”',
            en: '“We were very lucky to work with the Artventures team from the very begining. Communication was great all along. They really provide a great service. The whole group was very helpful and professional.”',
          },
          author: {
            gr: '— Michael D., 5* Hotel Manager',
            en: '— Michael D., 5* Hotel Manager',
          }
        },
      ],
      // Form
      form: {
        title: {
          gr: 'Find out what we can do for you',
          en: 'Find out what we can do for you',
        },
        button: {
          gr: 'Complete the Form',
          en: 'Complete the Form',
        },
      }
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  metaInfo () {
    return {
      titleTemplate: 'Hotels — Artventures',
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>

<style>
  .pos-rel {
    position: relative;
  }

  .background-color-fafafa {
    background-color: #FAFAFA;
  }

  .background-color-dddddd {
    background-color: #DDDDDD;
  }

  .color-333333 {
    color: #333333;
  }

  .color-1a1a1a {
    color: #1A1A1A;
  }

  .color-rgba-0-0-0-p52 {
    color: rgba(0, 0, 0, 0.52);
  }

  .custom-divider {
    width: 30vw;
    height: 1px;
    margin-right: 35vw;
    margin-left: 35vw;
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

 .form-btn {
    display: inline-block;
    background-color: #4C4C4A;
    border-radius: 4px;
    padding: 21px 34px;
    cursor: pointer;
  }

  .col.col-hot-testimonials-width {
    width: 30%;
    max-width: 30%;
    flex-basis: 30%;
  }

  /* Raleway */
  .raleway-1p312vw-400 {
    font-family: 'Raleway', sans-serif !important;
    font-size: 1.312vw !important;
    font-weight: 400 !important;
  }
  .raleway-1p312vw-600 {
    font-family: 'Raleway', sans-serif !important;
    font-size: 1.312vw !important;
    font-weight: 700 !important;
    letter-spacing: 1.5px !important;
  }
  .raleway-3p28vw-600-1p2em {
    font-family: 'Raleway', sans-serif !important;
    font-size: 3.28vw !important;
    font-weight: 600 !important;
    line-height: 1.2em !important;
  }
  .raleway-13-600 {
    font-family: 'Raleway', sans-serif !important;
    font-size: 13px !important;
    font-weight: 600 !important;
  }
  .raleway-15-600 {
    font-family: 'Raleway', sans-serif !important;
    font-size: 15px !important;
    font-weight: 600 !important;
    letter-spacing: 1.5px !important;
  }
  .raleway-16-400 {
    font-family: 'Raleway', sans-serif !important;
    font-size: 16px !important;
    font-weight: 400 !important;
    line-height: 1.6em !important;
  }
  /* Playfair Display */
  .playfair-18-400 {
    font-family: 'Playfair Display', serif !important;
    font-size: 18px !important;
    font-weight: 400 !important;
    line-height: 1.4em !important;
  }
  .playfair-30-700-1p2 {
    font-family: 'Playfair Display', serif !important;
    font-size: 30px !important;
    font-weight: 700 !important;
    line-height: 1.2em !important;
  }
  .playfair-38-700 {
    font-family: 'Playfair Display', serif !important;
    font-size: 38px !important;
    font-weight: 700 !important;
  }
</style>
