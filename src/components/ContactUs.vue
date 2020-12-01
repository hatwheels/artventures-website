<template>
  <div>
  <v-row justify="center" align="center">
    <v-col :cols="colWidth">
      <div
        :class="getTitleFont"
        class="text-center pt-12 pb-10"
        v-html="form.title[getLang]"
      />

      <form lazy-validation @submit.prevent="submit()">
        <v-row justify="space-between" align="center">
          <v-col class="py-0" cols="6">
            <label
              :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
              class="color-1a1a1a"
              v-html="form.firstname[getLang]"
            />
            <v-text-field
              v-model.trim="name"
              background-color="#FAFAFA"
              color="#1A1A1A"
              :error-messages="nameErrors"
              outlined
              required
              @input="delayTouch($v.name)"
              @blur="$v.name.$touch()"
            ></v-text-field>
          </v-col>
          <v-col class="py-0" cols="6">
            <label
              :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
              class="color-1a1a1a"
              v-html="form.lastname[getLang]"
            />
            <v-text-field
              v-model.trim="lastName"
              background-color="#FAFAFA"
              color="#1A1A1A"
              :error-messages="lastNameErrors"
              outlined
              required
              @input="delayTouch($v.lastName)"
              @blur="$v.lastName.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>

        <label
          :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
          class="color-1a1a1a"
          v-html="form.email[getLang]"
        />
        <v-text-field
          v-model="email"
          background-color="#FAFAFA"
          color="#1A1A1A"
          :error-messages="emailErrors"
          outlined
          required
          @input="delayTouch($v.email)"
          @blur="$v.email.$touch()"
        ></v-text-field>

        <label
          :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
          class="color-1a1a1a"
          v-html="form.subject[getLang]"
        />
        <v-text-field
          v-model.trim="subject"
          background-color="#FAFAFA"
          color="#1A1A1A"
          :error-messages="subjectErrors"
          outlined
          required
          @input="delayTouch($v.subject)"
          @blur="$v.subject.$touch()"
        ></v-text-field>

        <label
          :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
          class="color-1a1a1a"
          v-html="form.message[getLang]"
        />
        <v-textarea
          v-model.trim="message"
          background-color="#FAFAFA"
          color="#1A1A1A"
          :error-messages="messageErrors"
          :auto-grow="!$vuetify.breakpoint.mobile"
          outlined
          required
          @input="delayTouch($v.message)"
          @blur="$v.email.$touch()"
        ></v-textarea>

        <div class="d-flex justify-center">
          <button
            :class="getLang === 'gr' ? 'noto-15-700' : 'raleway-15-700'"
            class="send-msg-btn white--text text-center text-uppercase"
            type="submit"
            :disabled="$v.$invalid"
          >
            {{ form.button[getLang] }}
            <span v-show="isLoading" class="px-1 lds-ring"><div></div><div></div><div></div><div></div></span>
          </button>
        </div>
      </form>
    </v-col>
  </v-row>
  <v-alert
    class="contact-block"
    :type='alertType'
    v-model="alert"
    dismissible
    transition="slide-x-transition"
  >
    {{ alertMsg }}
  </v-alert>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

const touchMap = new WeakMap();

export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    lastName: { required },
    email: { required, email },
    subject: { required },
    message: { required }
  },
  props: {
    colWidth: {
      type: String,
      default: "8",
    },
    isSmall: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      form: {
        title: {
          gr: "Επικοινωνία",
          en: "Contact Us"
        },
        firstname: {
          gr: 'Όνομα *',
          en: 'First Name *',
        },
        lastname: {
          gr: 'Επίθετο *',
          en: 'Last Name *',
        },
        email: {
          gr: 'Email *',
          en: 'Email *',
        },
        subject: {
          gr: 'Θέμα *',
          en: 'Subject *',
        },
        message: {
          gr: 'Μήνυμα *',
          en: 'Message *',
        },
        button: {
          gr: 'Στειλτε Μηνυμα',
          en: 'Send Message',
        },
        errors: {
          firstname: {
            gr: 'Το όνομα είναι υποχρεωτικό.',
            en: 'First Name is required.',
          },
          lastname: {
            gr: 'Το επίθετο είναι υποχρεωτικό.',
            en: 'Last name is required.',
          },
          email: {
            invalid: {
              gr: 'Το email δεν είναι έγκυρο.',
              en: 'Must be valid e-mail.'
            },
            missing: {
              gr: 'Το email είναι υποχρεωτικό.',
              en: 'Email is required.'
            },
          },
          subject: {
            gr: 'Το Θέμα είναι υποχρετικό.',
            en: 'Subject is required.',
          },
          message: {
            gr: 'Το μήνυμα είναι υποχρετικό.',
            en: 'Message is required.',
          },
        }
      },
      name: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
      fields: {},
      alert: false,
      alertMsg: "",
      alertType: "error",
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["getLang"]),
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push(this.form.errors.firstname[this.getLang]);
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push(this.form.errors.lastname[this.getLang]);
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push(this.form.errors.email.invalid[this.getLang]);
      !this.$v.email.required && errors.push(this.form.errors.email.missing[this.getLang]);
      return errors;
    },
    subjectErrors() {
      const errors = [];
      if (!this.$v.subject.$dirty) return errors;
      !this.$v.subject.required && errors.push(this.form.errors.subject[this.getLang]);
      return errors;
    },
    messageErrors() {
      const errors = [];
      if (!this.$v.message.$dirty) return errors;
      !this.$v.message.required && errors.push(this.form.errors.message[this.getLang]);
      return errors;
    },
    getTitleFont() {
      if (this.isSmall) {
        return this.getLang === 'gr' ? 'noto-32-700' : 'playfair-32-700'
      } else {
        return this.getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'
      }
    }
  },
  methods: {
    setAlert(type) {
      if (type == "success") {
        this.alertMsg = this.getLang === 'gr' ? "Το μήνυμα σας εστάλη" : "Your message has been sent";
        this.alertType = "success";
      } else {
        this.alertMsg = this.getLang === 'gr' ? "Κάποιο λάθος συνέβη" : "An error occured";
        this.alertType = "error";
      }
      const that = this
      function clearAlert() {
        that.alert = false
      }
      this.alert = true;
      setTimeout(clearAlert, 6000)
    },
    clearFields() {
      this.fields = {};
      this.name = "";
      this.lastName = "";
      this.email = "";
      this.subject = "";
      this.message = "";
      this.$v.$reset();
      this.isLoading = false;
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.fields = {
          email_address: this.email,
          merge_fields: {
              'FNAME': this.name,
              'LNAME': this.lastName,
              'SUBJECT': this.subject,
              'MESSAGE': this.message,
              'ROLE': 'user'
          },
        };
        this.isLoading = true;
        this.$marketing.getMember({ email_address: this.email })
          .then(res => {
            // member found
            if (200 == res.status) {
              // subscribed, keep him subscribed
              if ("subscribed" !== res.data.status && "pending" !== res.data.status && "transactional" !== res.data.status) {
                this.fields.status = 'transactional'
              }
              this.$marketing.sendMsg(this.fields)
                .then(res => {
                  if (200 === res.status) {
                    // success
                    this.$admin.sendEmail({
                      email: this.email,
                      firstname: this.name,
                      lastname: this.lastName,
                      subject: this.subject,
                      message: this.message,
                      to: 'all'
                    }); // send to us message from user
                    this.clearFields()
                    this.setAlert('success')
                  } else {
                    // error
                    this.clearFields()
                    this.setAlert('error')
                  }
                })
                .catch(err => {
                  // server-side error
                  this.clearFields()
                  this.setAlert('error')
                })
              } else {
              // error
              this.clearFields()
              this.setAlert('error')
            }
          })
          .catch(() => {
            // member does not exist, make him transactional
            this.fields.status_if_new = 'transactional'
            this.$marketing.sendMsg(this.fields)
              .then(res => {
                if (200 === res.status) {
                  // success
                  this.$admin.sendEmail({
                    email: this.email,
                    firstname: this.name,
                    lastname: this.lastName,
                    subject: this.subject,
                    message: this.message,
                    to: 'all'
                  }); // send to us message from user
                  this.clearFields()
                  this.setAlert('success')
                } else {
                  // error
                  this.clearFields()
                  this.setAlert('error')
                }
              })
              .catch((err) => {
                // server-side error
                this.clearFields()
                this.setAlert('error')
              })
          })
      }
    },
    delayTouch($v) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      touchMap.set($v, setTimeout($v.$touch, 1000));
    }
  }
};
</script>

<style>
@import '../assets/style/lds-ring.css';

.send-msg-btn {
  display: inline-block;
  background-color: #525252;
  border-radius: 4px;
  padding: 14px 35px;
  cursor: pointer;
}

.v-messages__message {
  font-family: 'Raleway', sans-serif !important;
}

.contact-block {
  width: 50vw;
  margin-right: 25vw;
  margin-left: 25vw;
}
</style>