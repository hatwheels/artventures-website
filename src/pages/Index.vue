<template>
  <Layout>
    <v-img
      
      :height="0.85 * windowHeight"
      :src="image.img ?
        require('~/assets/images/' + image.img) :
        require('~/assets/images/' + images[imageId].img)"
      :lazy-src="image.lazy ?
        require('~/assets/images/' + image.lazy) :
        require('~/assets/images/' + images[imageId].lazy)"
    >
      <v-container class="overlay-on-text" fluid fill-height>

        <v-row :no-gutters="isXsmall" align="center" justify="center">
          <v-col style="cursor: default;" class="hidden-md-and-down" cols="8">
            <p class="font-weight-bold display-2 white--text text-center">{{ title[getLang] }}</p>
            <p class="headline white--text text-center no-cursor" v-html="subtitle[getLang]"></p>
          </v-col>
          <v-col style="cursor: default;" class="hidden-lg-and-up hidden-sm-and-down" cols="8">
            <p class="font-weight-bold display-1 white--text text-center no-cursor">{{ title[getLang] }}</p>
            <p class="title white--text text-center no-cursor" v-html="subtitle[getLang]"></p>
          </v-col>
          <v-col style="cursor: default;" class="hidden-md-and-up hidden-xs-only" cols="11">
            <p class="font-weight-bold headline white--text text-center no-cursor">{{ title[getLang] }}</p>
            <p class="subtitle-1 white--text text-center no-cursor" v-html="subtitle[getLang]"></p>
          </v-col>
          <v-col style="cursor: default;" class="hidden-sm-and-up" cols="11">
            <p class="mb-2 font-weight-bold title white--text text-center no-cursor">{{ title[getLang] }}</p>
            <p class="mb-4 caption white--text text-center no-cursor" v-html="subtitle[getLang]"></p>
          </v-col>
        </v-row>
        
        <v-row :no-gutters="isXsmall" align="center" justify="center">
          <v-col :cols="getNewsletterCol">
            <p style="cursor: default;" class="hidden-md-and-down font-weight-bold headline white--text text-center no-cursor">{{ newletter[getLang] }}</p>
            <p style="cursor: default;" class="hidden-lg-and-up hidden-sm-and-down font-weight-bold title white--text text-center no-cursor">{{ newletter[getLang] }}</p>
            <p style="cursor: default;" class="hidden-md-and-up hidden-xs-only font-weight-bold subtitle-1 white--text text-center no-cursor">{{ newletter[getLang] }}</p>
            <p style="cursor: default;" class="mb-2 hidden-sm-and-up font-weight-bold subtitle-2 white--text text-center no-cursor">{{ newletter[getLang] }}</p>
            <div class="hidden-xs-only">
              <div class="d-flex">
                <v-text-field
                  background-color="white"
                  outlined
                  single-line
                  :placeholder="emailPlaceholder[getLang]"
                  color="black"
                >
                </v-text-field>
                <v-btn class="white--text subtitle-2 mx-2" x-large color="green" v-html="email[getLang]"/>
              </div>
            </div>
            <div class="hidden-sm-and-up">
              <div class="d-flex flex-column align-center">
                <v-text-field
                  class="align-self-stretch"
                  background-color="white"
                  outlined
                  single-line
                  :placeholder="emailPlaceholder[getLang]"
                  color="black"
                />
                <v-btn class="white--text subtitle-2" color="green" v-html="email[getLang]"/>
              </div>
            </div>
          </v-col>
        </v-row>

      </v-container>
    </v-img>
    <!-- <v-card class="pt-8" flat color="grey lighten-2">
      <div class="d-flex justify-center align-end">
        <v-img
          class="flex-grow-0"
          :src="require('~/favicon.png')"
          height="54px" width="54px"
          contain
        />
        <p class="pl-1 black--text text-center">{{ newletter[getLang] }}</p>
      </div>
      <v-row class="pt-2" align="center" justify="center">
        <v-col cols=5>
          <v-text-field
            id="email-field"
            background-color="white"
            outlined
            single-line
            placeholder="Email"
            color="black"
          >
            <template v-slot:append-outer>
              <v-btn class="white--text subtitle-2 mx-2" x-large color="green" v-html="email[getLang]"/>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-card> -->
  </Layout>
</template>

<script>
import { vueWindowSizeMixin } from 'vue-window-size';
import { mapGetters } from 'vuex'

export default {
  mixins: [vueWindowSizeMixin],
  created () {
    let self = this
    setInterval(() => {
      self.image.lazy = self.images[self.imageId].lazy
      self.image.img = self.images[self.imageId].img
      self.imageId = (self.imageId + 1) % self.images.length
    }, 10000)
  },
  data () {
    return {
      title: [
        "H ΑRTVENTURES ΕΡΧΕΤΑΙ....",
        "ARTVENTURES IS COMING...",
      ],
      subtitle: [
        "Βάλε Τέχνη στη ζωή σου. Στο χώρο σου.<br> Κι άλλαξε την όποτε θες. Εύκολα. Γρήγορα. Οικονομικά... Τώρα.",
        "Put Art in your Life. In your space.<br> And change it whenever you want. Easy. Quickly. Affordably... Now.",
      ],
      newletter: [
        "ΜΑΘΕ ΚΑΙ ΔΙΑΛΕΞΕ ΠΡΩΤΟΣ",
        "BE THE FIRST TO KNOW",
      ],
      email: [
        '<span class="text-capitalize">Ζήσε</span>&nbsp;<span class="text-lowercase">την πρώτη σου</span>&nbsp;<span class="text-capitalize">Artventure</span>',
        '<span class="text-capitalize">Live</span>&nbsp;<span class="text-lowercase">your first</span>&nbsp;<span class="text-capitalize">Artventure</span>',
      ],
      emailPlaceholder: [
        "Γράψε το email σου",
        "Write your email",
      ],
      images: [
        { img: "img03.png", lazy: "lazy-img03.png" },
        { img: "img01.png", lazy: "lazy-img01.png" },
        { img: "img02.png", lazy: "lazy-img02.png" },
      ],
      imageId: 0,
      image: { img: null, lazy: null },
      btnSz: 30,
      btnText: [
        "ΞΕΚΙΝΑ",
        "Let's start"
      ],
    }
  },
  computed: {
    ...mapGetters(['getLang']),
    getNewsletterCol () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '9'
        case 'sm':
          return '8'
        case 'md':
          return '7'
        case 'lg':
        case 'xl':
          return '6'
      }
    },
    isXsmall () {
      return this.$vuetify.breakpoint.name ? true : false
    }
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
.v-input__append-outer {
  margin:0 !important;
}
.overlay-on-text {
  background-color: rgba(100, 100, 100, 0.25);
}
</style>