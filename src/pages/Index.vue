<template>
  <Layout>
    <v-content>
      <v-container  class="pt-12 px-12" fluid>
        <div v-cloak class="pb-8">
          <v-lazy
            v-model="aboutIsActive"
            :options="{
              threshold: .5
            }"
            transition="slide-y-reverse-transition"
          >
            <v-row justify="space-between" align="center">
              <v-col cols="5">
                <v-card flat>
                  <v-img contain height="700px" :src="aboutImage.img" :lazy-src="aboutImage.lazy" />
                </v-card>
              </v-col>
              <v-col class="pl-2 pr-12" cols="6">
                <div class="pr-8">
                  <p style="color: #333333" class="title pb-7 pr-12" v-html="aboutText.title[getLang]" />
                  <p v-for="(p, i) in aboutText.body" :key="'aboutTextBody-' + i"
                    style="color: #333333" class="subtitle-2 pb-4 pr-12" v-html="p[getLang]"
                  />
                </div>
              </v-col>
            </v-row>
          </v-lazy>
        </div>

        <div v-cloak class="pt-8">
          <p class="pb-10 text-center display-2" v-html="exploreText.title[getLang]" />
          <v-lazy
            v-model="exploreIsActive"
            :options="{
              threshold: 1.0
            }"
            transition="slide-y-transition"
          >
            <v-row class="pt-12" justify="space-between" align="center">
              <v-col cols="4" v-for="(img, i) in exploreImages" :key="'exploreImage-' + i">
                  <v-img gradient="to top right, rgba(0,0,0,.15), rgba(0,0,0,.15)" :src="img.img">
                    <div style="height: 100%" class="d-flex flex-column justify-center align-center">
                      <p class="display-1 white--text" v-html="img.p[getLang]" />
                      <v-btn
                        class="subtitle-1 white--text"
                        depressed
                        x-large
                        color="#525252"
                      >
                        Find out more
                      </v-btn>
                    </div>
                  </v-img>
              </v-col>
            </v-row>
          </v-lazy>
        </div>

      </v-container>
    </v-content>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data () {
    return {
      // Text
      aboutText: {
        'title': {
          'gr': 'A new Artwork in your space, anytime you want',
          'en': 'A new Artwork in your space, anytime you want',
        },
        'body': [
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
      },
      exploreText: {
        'title': {
          'gr': 'Explore your options',
          'en': 'Explore your options',
        },
      },
      // Images
      aboutImage: {
        img: "https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1582236536/artventures/img21.png",
        lazy: "https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,w_100,h_100/v1582236536/artventures/img21.png",
      },
      exploreImages: [
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill/v1585320134/artventures/img22.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,w_100,h_100/v1585320134/artventures/img22.jpg',
          p: {
            gr: 'Individuals',
            en: 'Individuals',
          },
        },
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill/v1585320139/artventures/img23.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,w_100,h_100/v1585320139/artventures/img23.jpg',
          p: {
            gr: 'Businesses',
            en: 'Businesses',
          }
        },
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/g_center,ar_1:1,c_fill/v1585320144/artventures/img24.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,w_100,h_100/v1585320139/artventures/img24.jpg',
          p: {
            gr: 'Hotels',
            en: 'Hotels',
          }
        },
      ],
      aboutIsActive: false,
      exploreIsActive: false,
    }
  },
  computed: {
    ...mapGetters(['getLang']),
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
  .v-application .title {
    font-family: 'Playfair Display', serif !important;
    font-size: 30px !important;
    font-weight: 700 !important;
  }
  .v-application .display-2 {
    font-family: 'Playfair Display', serif !important;
    font-size: 38px !important;
    font-weight: 700 !important;
  }

  .v-application .subtitle-1 {
    font-family: 'Raleway', sans-serif !important;
    font-size: 14px !important;
    font-weight: 600 !important;
  }
  .v-application .display-1 {
    font-family: 'Raleway', sans-serif !important;
    font-size: 36px !important;
    font-weight: 800 !important;
  }
</style>