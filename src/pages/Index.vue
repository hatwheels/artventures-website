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
      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-col cols="6">
            <p class="display-2 white--text text-center no-cursor">{{ title[getLang] }}</p>
            <p class="headline white--text text-center no-cursor" v-html="subtitle[getLang]"></p>
            
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="6">
          <p class="headline white--text text-center">{{ newletter[getLang] }}</p>
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
        "Βάλε Τέχνη στη ζωή σου. Στο χώρο σου.<br> Κι άλλαξε την όποτε θες.<br> Εύκολα. Γρήγορα. Οικονομικά... Τώρα.",
        "Put Art in your Life. In your space.<br> And change it whenever you want.<br> Easy. Quickly. Affordably... Now.",
      ],
      newletter: [
        "ΜΑΘΕ ΠΡΩΤΟΣ",
        "BE THE FIRST TO KNOW",
      ],
      email: [
        '<span class="text-capitalize">Ζήσε</span>&nbsp;<span class="text-lowercase">την πρώτη σου</span>&nbsp;<span class="text-capitalize">Artventure</span>',
        '<span class="text-capitalize">Live</span>&nbsp;<span class="text-lowercase">your first</span>&nbsp;<span class="text-capitalize">Artventure</span>',
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
</style>