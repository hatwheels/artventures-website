<template>
  <div>
    <v-row align="center" justify="center">
      <v-col class="hidden-md-and-down" cols="6">
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
          <v-btn
            class="white--text subtitle-1 mx-2 text-center"
            x-large
            color="green"
            v-html="emailText[getLang]"
            :disabled="btnLoading"
            :loading="btnLoading"
            @click="submit"
          />
        </form>
      </v-col>

      <v-col class="hidden-lg-and-up hidden-sm-and-down" cols="8">
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
          ></v-text-field>
          <v-btn
            class="white--text subtitle-1 mx-2 text-center"
            x-large
            color="green"
            v-html="emailText[getLang]"
            :disabled="btnLoading"
            :loading="btnLoading"
            @click="submit"
          />
        </form>
      </v-col>

      <v-col class="hidden-md-and-up hidden-xs-only" cols="9">
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
          ></v-text-field>
          <v-btn
            class="white--text subtitle-2 mx-2 text-center"
            x-large
            color="green"
            v-html="emailText[getLang]"
            :disabled="btnLoading"
            :loading="btnLoading"
            @click="submit"
          />
        </form>
      </v-col>

      <v-col class="hidden-sm-and-up" cols="10">
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
    </v-row>

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
          '<span class="text-capitalize">Ζήσε</span>&nbsp;<span class="text-lowercase">την πρώτη σου</span>&nbsp;<span class="text-capitalize">Artventure</span>',
        en:
          '<span class="text-capitalize">Live</span>&nbsp;<span class="text-lowercase">your first</span>&nbsp;<span class="text-capitalize">Artventure</span>'
      },
      emailPlaceholder: {
        gr: "Γράψε το email σου",
        en: "Write your email"
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
    }
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
