<template>
  <Layout>
    <v-img
      :height="0.92 * windowHeight"
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
            <p class="display-2 text-center no-cursor">{{ title[getLang] }}</p>
            <p class="headline text-center no-cursor">{{ subtitle[getLang] }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
    <v-card class="pt-8" flat color="grey lighten-2">
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
        <v-col cols=4>
          <v-text-field
            id="email-field"
            label="Email"
            background-color="white"
            outlined
            :placeholder="email[getLang]"
            color="black"
          >
            <template v-slot:append-outer>
              <v-btn
                class="white--text"
                color="green"
                :height="setBtnHeight()"
                tile block
              >
                {{ btnText[getLang] }} <v-icon right>mdi-send</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-card>
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
        "Βάλε Τέχνη στη ζωή σου. Στο χώρο σου. Κι άλλαξε την όποτε θες. Εύκολα. Γρήγορα. Οικονομικά... Τώρα.",
        "Put Art in your Life. In your space. And change it whenever you want. Easy. Quickly. Affordably... Now.",
      ],
      newletter: [
        "ΜΑΘΕ ΠΡΩΤΟΣ",
        "BE THE FIRST TO KNOW",
      ],
      email: [
        "Ζήσε την πρώτη σου Artventure",
        "Live your first Artventure",
      ],
      images: [
        { img: "img03.png", lazy: "lazy-img03.png" },
        { img: "img01.png", lazy: "lazy-img01.png" },
        { img: "img04.png", lazy: "lazy-img04.png" },
      ],
      imageId: 0,
      image: { img: null, lazy: null },
      btnSz: 30,
      btnText: [
        "ΞΕΚΙΝΑ",
        "Let's start"
      ]
    }
  },
  computed: {
    ...mapGetters(['getLang'])
  },
  methods: {
    setBtnHeight () {
      let h = document.getElementsByClassName('v-text-field__slot')[0]
      return h ? h.clientHeight : 30
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
</style>