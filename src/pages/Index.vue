<template>
  <Layout>
    <v-content :style="$vuetify.breakpoint.name == 'xs' ? 'height:115vh;' : 'height:100vh;'">
    <v-img
      height="100%"
      :key="images[imageId].img"
      :src="images[imageId].img"
      :lazy-src="images[imageId].lazy"
      :gradient="this.getAvGradient"
      eager
    >
      <v-container fluid fill-height>

        <v-row :no-gutters="isXsmall" align="center" justify="center">
          <v-col style="cursor: default;" class="hidden-sm-and-down" cols="10">
            <p class="font-weight-bold display-3 white--text text-center">{{ title[getLang] }}</p>
            <p class="display-1 white--text text-center no-cursor" v-html="subtitle[getLang]"></p>
          </v-col>
          <v-col style="cursor: default;" class="hidden-md-and-up hidden-xs-only" cols="11">
            <p class="mb-2 font-weight-bold display-1 white--text text-center no-cursor">{{ title[getLang] }}</p>
            <p class="mb-4 title white--text text-center no-cursor" v-html="subtitle[getLang]"></p>
          </v-col>
          <v-col style="cursor: default;" class="hidden-sm-and-up" cols="11">
            <p class="mb-2 font-weight-bold headline white--text text-center no-cursor">{{ title[getLang] }}</p>
            <p class="mb-4 subtitle-1 white--text text-center no-cursor" v-html="subtitle[getLang]"></p>
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
                @blur="$v.email.$reset()"
                background-color="white"
                outlined
                single-line
                :placeholder="emailPlaceholder[getLang]"
                color="black"
              />
              <vue-recaptcha
                hidden
                ref="recaptcha1"
                :sitekey="sitekey"
                :loadRecaptchaScript="true"
                size="invisible"
                badge="inline"
                @verify="validate"
                @expired="onExpired"
              ></vue-recaptcha>
              <v-btn
                class="white--text subtitle-1 mx-2 text-center"
                x-large color="green"
                v-html="emailText[getLang]"
                :disabled="btnLoading"
                :loading="btnLoading"
                @click="submitLgXl"
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
                @blur="$v.email.$reset()"
                background-color="white"
                outlined
                single-line
                :placeholder="emailPlaceholder[getLang]"
                color="black"
              >
              </v-text-field>
              <v-btn
                class="white--text subtitle-1 mx-2 text-center"
                x-large color="green"
                v-html="emailText[getLang]"
                :disabled="btnLoading"
                :loading="btnLoading"
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
                @blur="$v.email.$reset()"
                background-color="white"
                outlined
                single-line
                :placeholder="emailPlaceholder[getLang]"
                color="black"
              >
              </v-text-field>
              <v-btn
                class="white--text subtitle-2 mx-2 text-center"
                x-large color="green"
                v-html="emailText[getLang]"
                :disabled="btnLoading"
                :loading="btnLoading"
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
                @blur="$v.email.$reset()"
                background-color="white"
                outlined
                single-line
                :placeholder="emailPlaceholder[getLang]"
                color="black"
              />
              <v-btn
                class="white--text subtitle-2 text-center"
                color="green"
                v-html="emailText[getLang]"
                :disabled="btnLoading"
                :loading="btnLoading"
                @click="submit"
              />
            </form>
          </v-col>

          <v-dialog
            v-model="dialog"
            max-width="290"
            overlay-color="transparent"
          >
            <v-card>
              <div class="px-3 pt-2 pb-4 subtitle-2">{{ dialogText[getLang] }}</div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  class="white--text"
                  color="blue"
                  @click="() => unsetDialog()"
                >
                  OK
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-row>

      </v-container>
    </v-img>
    </v-content>
  </Layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import VueRecaptcha from 'vue-recaptcha'

export default {
  components: {
    VueRecaptcha
  },
  validations: {
    email: { required, email },
  },
  created () {
    let self = this
    setInterval(() => {
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
        {
          img: "https://res.cloudinary.com/de1jgt6c5/image/upload/v1582236536/artventures/img01.png",
          lazy: "https://res.cloudinary.com/de1jgt6c5/image/upload/w_400,e_blur:1200/v1582236536/artventures/img01.png"
        },
        {
          img: "https://res.cloudinary.com/de1jgt6c5/image/upload/v1582236536/artventures/img02.png",
          lazy: "https://res.cloudinary.com/de1jgt6c5/image/upload/w_400,e_blur:1200/v1582236536/artventures/img02.png"
        },
        {
          img: "https://res.cloudinary.com/de1jgt6c5/image/upload/v1582236536/artventures/img03.png",
          lazy: "https://res.cloudinary.com/de1jgt6c5/image/upload/w_400,e_blur:1200/v1582236536/artventures/img03.png"
        },
      ],
      imageId: Math.floor(Math.random() * 3),
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
      // Dialog
      dialog: false,
      dialogText: {
        gr: "",
        en: ""
      },
      btnLoading: false,
      // Recaptcha
      sitekey: "6LdI3NoUAAAAAKjAi-LI4GUFkcPuZOaP5v0sU1b9"//process.env.GRIDSOME_RECAPTCHA_PUBLIC_KEY,
    }
  },
  computed: {
    ...mapGetters(['getLang', 'getAvGradient']),
    isXsmall () {
      return this.$vuetify.breakpoint.name ? true : false
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
    // ReCAPTCHA
    validate (response) {
      this.$store.dispatch('recaptchaVerify', { Response: response })
        .then(res => {
          if (200 == res.status) { // success
            this.submit()
          }
        })
        .catch(err => console.log(err))
    },
    onExpired () {
      this.$refs.recaptcha1.reset()
    },
    submitLgXl () {
      this.$refs.recaptcha1.execute()
    },
    submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) { // no errors
        this.btnLoading = true
        this.$store.dispatch('mcSubscribe', { email: this.email, tag: this.getLang })
          .then(res => {
            if (200 == res.status) { // success
              this.dialogText.en = "You've subscribed to our newsletter!"
              this.dialogText.gr = "Εγγραφήκατε στο newsletter μας!"
            }
            this.btnLoading = false
            this.dialog = true
          })
          .catch(err => {
            // server-side error
            if (err) {
              if ("Member Exists" == err.response.data.title) {
                this.dialogText.en = "You're already subscribed!"
                this.dialogText.gr = 'Είστε ήδη εγγεγραμμένοι!'
              } else {
                this.dialogText.en = 'An internal error has occured!'
                this.dialogText.gr = 'Κάποιο σφάλμα προέκυψε!'
              }
            } else {
              this.dialogText.en = 'An internal error has occured!'
              this.dialogText.gr = 'Κάποιο σφάλμα προέκυψε!'
            }
            this.btnLoading = false
            this.dialog = true
          })
        this.$v.$reset()
        this.email = ''
      }
    },
    // Dialog
    unsetDialog () {
      this.dialog = false
      this.dialogText.en = ""
      this.dialogText.gr = ""
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