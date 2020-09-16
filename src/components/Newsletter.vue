<template>
  <div>
    <!-- Desktop -->
    <div
      v-show="!$vuetify.breakpoint.mobile"
      class="pb-4"
      :class="getLang === 'gr' ? 'noto-25-600' : 'playfair-25-600'"
      v-html="title[getLang]"
    />
    <!-- Mobile -->
    <div
      v-show="$vuetify.breakpoint.mobile"
      class="pb-4"
      :class="getLang === 'gr' ? 'noto-18-600 text-center' : 'playfair-18-600 text-center'"
      v-html="title[getLang]"
    />
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
      <!-- Desktop -->
      <button
        v-show="!$vuetify.breakpoint.mobile"
        :class="getLang === 'gr' ? 'noto-18-400' : 'raleway-18-400'"
        class="newsletter-btn white--text text-capitalize mx-2 py-1 px-4 text-center"
        :disabled="btnLoading"
        :loading="btnLoading"
        @click="submit"
      >
        {{ emailText[getLang] }}
        <span v-show="btnLoading" class="px-1 lds-ring"><div></div><div></div><div></div><div></div></span>
      </button>
      <!-- Mobile -->
      <button
        v-show="$vuetify.breakpoint.mobile"
        :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
        class="newsletter-btn white--text text-capitalize mx-2 py-1 px-4 text-center"
        :disabled="btnLoading"
        @click="submit"
      >
        <div v-show="!btnLoading">{{ emailText[getLang] }}</div>
        <div v-show="btnLoading" class="lds-ring"><div></div><div></div><div></div><div></div></div>
      </button>
    </form>

    <v-dialog v-model="dialog" max-width="290" overlay-color="transparent">
      <v-card>
        <v-card-text
          class="px-3 pt-2 pb-4"
          :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'">
          {{ dialogText[getLang] }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
            color="#333333" @click="() => unsetDialog()"
          >
            OK
          </v-btn>
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
        gr: 'Εγγραφή',
        en: 'Subscribe'
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
  },
  methods: {
    subscribe() {
      this.$store
        .dispatch("mcSubscribe", { email: this.email, tag: this.getLang })
        .then(res => {
          if (200 === res.status) {
            // subscribed
            this.dialogText.en = "You've subscribed to our newsletter!";
            this.dialogText.gr = "Εγγραφήκατε στο newsletter μας!";
            this.btnLoading = false;
            this.dialog = true;
            this.email = ''
          } else {
            // subscribing failed
            this.dialogText.en = "Unfortunately we couldn't subscribe you. Please try again later.";
            this.dialogText.gr = "Δυστυχώς η εγγραφή απέτυχε. Παρκαλώ δοκιμάστε αργότερα.";
            this.btnLoading = false;
            this.dialog = true;
            this.email = ''
          }
        })
        .catch(err => {
          // server-side error
          this.dialogText.en = "An internal error has occured!";
          this.dialogText.gr = "Κάποιο σφάλμα προέκυψε!";
          this.btnLoading = false;
          this.dialog = true;
          this.email = ''
        })
    },
    // Form
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // no errors
        this.btnLoading = true;
        // check if member exists first
        this.$store
          .dispatch("mcGetMember", { email: this.email })
          .then(res => {
            if (200 === res.status) {
              if ('subscribed' === res.data.status) {
                // already subscribed
                this.dialogText.en = "You're already subscribed!";
                this.dialogText.gr = "Είστε ήδη εγγεγραμμένοι!";
                this.btnLoading = false;
                this.dialog = true;
                this.email = "";
              } else {
                // member exists, but not subscribed
                this.subscribe();
              }
            } else {
              // member does not exist, add him as subscriber
              this.subscribe()
            }
          })
          .catch(() => {
            // member does not exist, add him as subscriber
            this.subscribe()
          })
        this.$v.$reset();
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
@import '../assets/style/lds-ring.css';

/* Button */
.newsletter-btn {
  background-color: #333333;
  border-radius: 4px;
}
</style>
