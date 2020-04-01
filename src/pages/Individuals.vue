<template>
  <Layout>
    <v-content>
      <v-container class="pa-0 background-color-fafafa" fluid>
        <!-- spacer -->
        <div class="py-10" />
        
        <!-- main -->
        <div class="px-12 py-12 background-color-fafafa pos-rel">
          <div class="cross-main">
            <div class="black--text raleway-3p28vw-600-1p2em pb-6" v-html="main.title[getLang]" />
            <div class="raleway-1p312vw-400 color-rgba-0-0-0-p52 pb-12" v-html="main.description[getLang]" />
            <div class="pt-3" />
            <a
              class="contact-us-btn raleway-1p312vw-600 white--text text-center text-uppercase"
              v-html="main.button[getLang]"
            />
          </div>
          <v-img width="65vw" :src="main.img" :lazy="main.lazy" />
        </div>

        <!-- spacer -->
        <div class="py-12" />

        <!-- advantages -->
        <div class="py-12">
          <v-row class="px-12 py-12" justify="space-between">
            <v-col class="px-4" cols="4" v-for="(advantage, i) in advantages" :key="'advantage-' + i">
              <v-row justify="space-between">
                <v-col class="px-5" cols="6">
                  <v-img contain :src="advantage.img" :lazy-src="advantage.lazy" />
                </v-col>
                <v-col class="px-5 color-333333" cols="6">
                  <p class="playfair-30-700" v-html="advantage.title[getLang]" />
                  <p class="raleway-16-400" v-html="advantage.description[getLang]" />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>

        <!-- spacer with divider -->
        <div class="py-8">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- Rent -->
        <div class="text-center custom-block">
          <div class="playfair-38-700 text-capitalize pb-6" v-html="rent.title[getLang]" />
          <div class="raleway-16-400" style="padding-bottom: 34px" v-html="rent.description[getLang]" />
          <a
            class="personality-test-btn raleway-15-600 white--text text-uppercase"
            v-html="rent.button[getLang]"
          />
        </div>

        <!-- spacer -->
        <div style="padding: 100px 0px" />

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
        img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585685621/artventures/individuals01.jpg',
        lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1585685621/artventures/individuals01.jpg',
        title: {
          gr: 'Experience original Art without spending a fortune',
          en: 'Experience original Art without spending a fortune',
        },
        description: {
          gr: 'Subscribe to Artventures. Get a new Artwork in your home. Change it whenever you want.<br>Take the Art personality test. Subscribe to Artventures. With 50€ per month, you’ll get a new work of Art every 2 or 3 months delivered to your space',
          en: 'Subscribe to Artventures. Get a new Artwork in your home. Change it whenever you want.<br>Take the Art personality test. Subscribe to Artventures. With 50€ per month, you’ll get a new work of Art every 2 or 3 months delivered to your space',
        },
        button: {
          gr: 'Contact Us',
          en: 'Contact Us',
        },
      },
      // advantages
      advantages: [
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/individuals02.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/individuals02.jpg',
          title: {
            gr: 'Experience it in person',
            en: 'Experience it in person',
          },
          description: {
            gr: 'Try the Art that inspires you the most, either by buying it, or by giving it a try in your space. With your subscription to Artventures you’ll have the chance to get in your space 4-6 different works of Art in a whole year, for a small amount every month. Moving to and from your place every 2-3 months is included in the subscription, and anytime you want, you can buy the artwork you enjoy, or even something by the same artist or genre.',
            en: 'Try the Art that inspires you the most, either by buying it, or by giving it a try in your space. With your subscription to Artventures you’ll have the chance to get in your space 4-6 different works of Art in a whole year, for a small amount every month. Moving to and from your place every 2-3 months is included in the subscription, and anytime you want, you can buy the artwork you enjoy, or even something by the same artist or genre.',
          },
        },
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/individuals03.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/individuals03.jpg',
          title: {
            gr: 'Your Art speaks for you',
            en: 'Your Art speaks for you',
          },
          description: {
            gr: 'Whether you’re looking to inspire, ask questions, start a conversation, make an impression, or challenge an assumption, the art you show can make the statement over and over in unique, dynamic ways.',
            en: 'Whether you’re looking to inspire, ask questions, start a conversation, make an impression, or challenge an assumption, the art you show can make the statement over and over in unique, dynamic ways.',
          },
        },
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/individuals04.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/individuals04.jpg',
          title: {
            gr: 'Invest smart',
            en: 'Invest smart',
          },
          description: {
            gr: 'Get to know young and talented artists before they even gain much publicity, help those you value by trying out and / or purchasing their artworks, promote those you believe are worth more, by giving them the exposure they need. Start or increase your collection and give it good value by supporting and discovering new, promising artists at the same time.<br><br>Art Rentals for 50€ Per Month.Get original art in your home for a fixed monthly fee. We ship each work ready to hang. And we don’t believe in minimum terms or hidden costs, so there aren’t any.',
            en: 'Get to know young and talented artists before they even gain much publicity, help those you value by trying out and / or purchasing their artworks, promote those you believe are worth more, by giving them the exposure they need. Start or increase your collection and give it good value by supporting and discovering new, promising artists at the same time.<br><br>Art Rentals for 50€ Per Month.Get original art in your home for a fixed monthly fee. We ship each work ready to hang. And we don’t believe in minimum terms or hidden costs, so there aren’t any.',
          },
        },
      ],
      // Rent
      rent: {
        title: {
          gr: 'Why rent art?',
          en: 'Why rent art?',
        },
        description: {
          gr: 'Because that’s the best way to find out if what you love works. Or even fits. Renting a piece of art gives you a chance to road test, experiment, or explore your taste — risk free. Check trends or techniques you hadn’t seen before or learn about new and upcoming artists. And of course, whatever you like, you can buy it anytime you want.<br><br>What does the Art you like say about you?',
          en: 'Because that’s the best way to find out if what you love works. Or even fits. Renting a piece of art gives you a chance to road test, experiment, or explore your taste — risk free. Check trends or techniques you hadn’t seen before or learn about new and upcoming artists. And of course, whatever you like, you can buy it anytime you want.<br><br>What does the Art you like say about you?',
        },
        button: {
          gr: 'Take the art personality test',
          en: 'Take the art personality test',
        },
      },
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
  .pos-rel {
    position: relative;
  }

  .contact-us-btn {
    display: inline-block;
    background-color: #2B2B2B;
    border-radius: 8px;
    padding: 1.312vw 3.28vw;
    cursor: pointer;
  }

 .personality-test-btn {
    display: inline-block;
    background-color: #4C4C4A;
    border-radius: 8px;
    padding: 21px 34px;
    cursor: pointer;
  }

  .background-color-fafafa {
    background-color: #FAFAFA;
  }

  .background-color-dddddd {
    background-color: #DDDDDD;
  }

  .color-rgba-0-0-0-p52 {
    color: rgba(0, 0, 0, 0.52);
  }

  .color-333333 {
    color: #333333
  }

  .cross-main {
    background-color: #F5F5F5;
    width: 42vw;
    position: absolute;
    z-index: 100;
    right: 70px;
    top: 225px;
    padding: 4.65vw;
  }

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
  }
  .raleway-3p28vw-600-1p2em {
    font-family: 'Raleway', sans-serif !important;
    font-size: 3.28vw !important;
    font-weight: 600 !important;
    line-height: 1.2em !important;
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
</style>