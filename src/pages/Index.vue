<template>
  <Layout>
    <v-content>
      <v-container class="pt-12 px-12" fluid>
      <v-row  justify="space-between" align="center">
        <v-col cols="5">
          <v-img contain :src="aboutImage.img" :lazy-src="aboutImage.lazy" />
        </v-col>
        <v-col class="pl-2 pr-12" cols="6">
          <div class="pr-8">
          <p style="color: #333333" class="title pb-7 pr-12" v-html="exploreText.title[getLang]" />
          <p v-for="(p, i) in exploreText.body" :key="'exploreTextBody-' + i" style="color: #333333" class="subtitle-2 pb-4 pr-12" v-html="p[getLang]" />
          </div>
        </v-col>
      </v-row>
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
      exploreText: {
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
      // Images
      aboutImage: {
        img: "https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,w_500,dpr_auto/v1582236536/artventures/img21.png",
        lazy: "https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,w_100,h_100,e_blur:600/v1582236536/artventures/img21.png"
      },
      images: [
        {
          img: "https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,w_auto,dpr_auto/v1582236536/artventures/img01.png",
          lazy: "https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,w_100,h_100,e_blur:600/v1582236536/artventures/img01.png"
        },
        {
          img: "https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,w_auto,dpr_auto/v1582236610/artventures/img02.png",
          lazy: "https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,w_100,h_100,e_blur:600/v1582236536/artventures/img02.png"
        },
        {
          img: "https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,w_auto,dpr_auto/v1582236610/artventures/img03.png",
          lazy: "https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,w_100,h_100,e_blur:600/v1582236536/artventures/img03.png"
        },
      ],

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
</style>