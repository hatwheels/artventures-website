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
          <v-col class="hidden-md-and-down" cols="6">
            <p
              style="cursor: default;"
              class="font-weight-bold headline white--text text-center no-cursor"
            >
              {{ newletter[getLang] }}
            </p>
            <form class="d-flex">
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                background-color="white"
                outlined
                single-line
                :placeholder="emailPlaceholder[getLang]"
                color="black"
              >
              </v-text-field>
              <v-btn
                class="white--text subtitle-2 mx-2"
                x-large color="green"
                v-html="emailText[getLang]"
                @click="submit"
              />
            </form>
          </v-col>
          <v-col class="hidden-lg-and-up hidden-sm-and-down" cols="8">
            <p
              style="cursor: default;"
              class="font-weight-bold title white--text text-center no-cursor"
            >
              {{ newletter[getLang] }}
            </p>
            <form class="d-flex">
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                background-color="white"
                outlined
                single-line
                :placeholder="emailPlaceholder[getLang]"
                color="black"
              >
              </v-text-field>
              <v-btn
                class="white--text subtitle-2 mx-2"
                x-large color="green"
                v-html="emailText[getLang]"
                @click="submit"
              />
            </form>
          </v-col>
          <v-col class="hidden-md-and-up hidden-xs-only" cols="9">
            <p
              style="cursor: default;"
              class="font-weight-bold subtitle-1 white--text text-center no-cursor"
            >
              {{ newletter[getLang] }}
            </p>
            <form class="d-flex">
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                background-color="white"
                outlined
                single-line
                :placeholder="emailPlaceholder[getLang]"
                color="black"
              >
              </v-text-field>
              <v-btn
                class="white--text subtitle-2 mx-2"
                x-large color="green"
                v-html="emailText[getLang]"
                @click="submit"
              />
            </form>
          </v-col>
          <v-col class="hidden-sm-and-up" cols="10">
            <p
              style="cursor: default;"
              class="mb-2 font-weight-bold subtitle-2 white--text text-center no-cursor"
            >
              {{ newletter[getLang] }}
            </p>
            <form class="d-flex flex-column align-center">
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                background-color="white"
                outlined
                single-line
                :placeholder="emailPlaceholder[getLang]"
                color="black"
              />
              <v-btn
                class="white--text subtitle-2"
                color="green"
                v-html="emailText[getLang]"
                @click="submit"
              />
            </form>
          </v-col>
        </v-row>

      </v-container>
    </v-img>
  </Layout>
</template>

<script>
import { vueWindowSizeMixin } from 'vue-window-size';
import { mapGetters } from 'vuex'
import axios from 'axios';
import { required, email } from 'vuelidate/lib/validators'

export default {
  mixins: [vueWindowSizeMixin],
  validations: {
    email: { required, email },
  },
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
      // Texts
      title: {
        gr: "H ΑRTVENTURES ΕΡΧΕΤΑΙ....",
        en: "ARTVENTURES IS COMING...",
      },
      subtitle: {
        gr: "Βάλε Τέχνη στη ζωή σου. Στο χώρο σου.<br> Κι άλλαξε την όποτε θες. Εύκολα. Γρήγορα. Οικονομικά... Τώρα.",
        en: "Put Art in your Life. In your space.<br> And change it whenever you want. Easy. Quickly. Affordably... Now.",
      },
      newletter: [
        { gr: "ΜΑΘΕ ΚΑΙ ΔΙΑΛΕΞΕ ΠΡΩΤΟΣ" },
        { en: "BE THE FIRST TO KNOW" },
      ],
      emailText: {
        gr: '<span class="text-capitalize">Ζήσε</span>&nbsp;<span class="text-lowercase">την πρώτη σου</span>&nbsp;<span class="text-capitalize">Artventure</span>' ,
        en:'<span class="text-capitalize">Live</span>&nbsp;<span class="text-lowercase">your first</span>&nbsp;<span class="text-capitalize">Artventure</span>',
      },
      emailPlaceholder: {
        gr: "Γράψε το email σου",
        en: "Write your email",
      },
      // Images
      images: [
        { img: "img03.png", lazy: "lazy-img03.png" },
        { img: "img01.png", lazy: "lazy-img01.png" },
        { img: "img02.png", lazy: "lazy-img02.png" },
      ],
      imageId: 0,
      image: { img: null, lazy: null },
      // Form
      email: '',
      errMsg: {
        invalid: {
          gr: 'Το email δεν είναι έγκυρο',
          en: 'Must be valid e-mail',
        },
        empty: {
          gr: 'Το email είναι υποχρεωτικό ',
          en: 'E-mail is required',
        }
      },
      mailchimp : null
    }
  },
  computed: {
    ...mapGetters(['getLang']),
    // getNewsletterCol () {
    //   switch (this.$vuetify.breakpoint.name) {
    //     case 'xs':
    //       return '9'
    //     case 'sm':
    //       return '8'
    //     case 'md':
    //       return '7'
    //     case 'lg':
    //     case 'xl':
    //       return '6'
    //   }
    // },
    isXsmall () {
      return this.$vuetify.breakpoint.name ? true : false
    },
    // Mailchimp API 3.0
    mcRegionName () {
      return 'us4'
    },
    mcApiKey () {
      return '5f222c41b31bda43c4f9e27afb2680c7-us4'
    },
    mcListId () {
      return '1fd92341c5'
    },
    mcUrl () {
      return 'https://' + this.mcRegionName + '.api.mailchimp.com/3.0/lists/' + this.mcListId + '/members/'
    },
    // Form
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push(this.errMsg.invalid[this.getLang])
      !this.$v.email.required && errors.push(this.errMsg.empty[this.getLang])
      return errors
    },
  },
  methods: {
    submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) { // no errors
        console.log('OK')
        axios.post(
          this.mcUrl,
          {
            status: 'subscribed',
            email_address: this.email,
            tags: [this.getLang]
          },
          // { username: 'petrosArt', password: this.mcApiKey, headers: { 'Content-Type': 'application/json', } },
          {
            headers: {
              Authorization: `apikey ${this.mcApiKey}`,
              'content-type': ''
            }
          },
        ).catch(error => {
          console.log(error.response)
        })
        this.$v.$reset()
        this.email = ''
      } else console.log('NOK')
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
.v-input__append-outer {
  margin:0 !important;
}
.overlay-on-text {
  background-color: rgba(100, 100, 100, 0.25);
}
</style>