<template>
  <div>
    <div class="pb-4" :class="getTitle" v-html="title[getLang]" /> 
    <form class="d-flex justify-center align-center">
      <v-text-field
        v-model="email"
        dense
        hide-details
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
        :class="getTextFont"
        class="white--text text-capitalize mx-2 text-center"
        depressed
        color="#333333"
        :disabled="btnLoading"
        :loading="btnLoading"
        @click="submit"
        v-html="emailText[getLang]"
      />
    </form>

    <v-dialog v-model="dialog" max-width="290" overlay-color="transparent">
      <v-card>
        <div class="px-3 pt-2 pb-4 subtitle-2">{{ dialogText[getLang] }}</div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="white--text" color="blue" @click="() => unsetDialog()">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required, email } from "vuelidate/lib/validators";

export default {
  validations: {
    email: { required, email },
  },
  data() {
    return {
      // Title
      title: {
        en: 'Sign up to our newsletter',
        gr: 'Εγγραφείτε στο newsletter μας',
      },
      // Form
      email: "",
      errMsg: {
        invalid: {
          gr: "Το email δεν είναι έγκυρο",
          en: "Must be valid e-mail"
        },
        empty: {
          gr: "Το email είναι υποχρεωτικό ",
          en: "E-mail is required"
        }
      },
      emailText: {
        gr:
          'Εγγραφη',
        en:
          'Subscribe'
      },
      emailPlaceholder: {
        gr: "Το email σας",
        en: "Your email"
      },
      // Dialog
      dialog: false,
      dialogText: {
        gr: "",
        en: ""
      },
      btnLoading: false
    };
  },
  computed: {
    ...mapGetters(["getLang"]),
    // Form
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push(this.errMsg.invalid[this.getLang]);
      !this.$v.email.required && errors.push(this.errMsg.empty[this.getLang]);
      return errors;
    },
    getTitle() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': case 'sm':
          return this.getLang === 'gr' ? 'noto-18-600 text-center' : 'playfair-18-600 text-center'
        case 'md': case 'lg': case 'xl':
          return this.getLang === 'gr' ? 'noto-25-600' : 'playfair-25-600'
      }
    },
    getTextFont() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': case 'sm':
          return this.getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'
        case 'md': case 'lg': case 'xl':
          return this.getLang === 'gr' ? 'noto-18-400' : 'raleway-18-400'
      }
    },
  },
  methods: {
    // Form
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // no errors
        this.btnLoading = true;
        this.$store
          .dispatch("mcSubscribe", { email: this.email, tag: this.getLang })
          .then(res => {
            if (200 == res.status) {
              // success
              this.dialogText.en = "You've subscribed to our newsletter!";
              this.dialogText.gr = "Εγγραφήκατε στο newsletter μας!";
            }
            this.btnLoading = false;
            this.dialog = true;
          })
          .catch(err => {
            // server-side error
            if (err) {
              if ("Member Exists" == err.response.data.title) {
                this.dialogText.en = "You're already subscribed!";
                this.dialogText.gr = "Είστε ήδη εγγεγραμμένοι!";
              } else {
                this.dialogText.en = "An internal error has occured!";
                this.dialogText.gr = "Κάποιο σφάλμα προέκυψε!";
              }
            } else {
              this.dialogText.en = "An internal error has occured!";
              this.dialogText.gr = "Κάποιο σφάλμα προέκυψε!";
            }
            this.btnLoading = false;
            this.dialog = true;
          });
        this.$v.$reset();
        this.email = "";
      }
    },
    // Dialog
    unsetDialog() {
      this.dialog = false;
      this.dialogText.en = "";
      this.dialogText.gr = "";
    }
  }
};
</script>

<style>
</style>
