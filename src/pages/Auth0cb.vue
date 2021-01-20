<template>
  <VoidLayout>
    <v-row no-gutters style="height: 100vh !important;" align="center" justify="center">
      <v-progress-circular :size="120" :width="12" indeterminate color="#333333" />
    </v-row>
    <v-dialog :value="stepper.pos" max-width="80vh" overlay-color="transparent" persistent>
      <v-stepper v-model="stepper.pos">
        <v-stepper-header>
          <v-stepper-step
            v-if="emptyName" step="1" :complete="stepper.pos > 1" color="#333333"
            :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
          >
            {{ stepper.headers[0][getLang] }}
          </v-stepper-step>
          <v-divider v-if="emptyName" />
          <v-stepper-step
            v-if="noRole" :step="emptyName ? '2' : '1'" color="#333333"
            :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
          >
            {{ stepper.headers[1][getLang] }}
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content v-if="emptyName" step="1">
            <form lazy-validation @submit.prevent="setNames()">
              <label
                :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                class="color-1a1a1a"
                v-html="stepper.content[0].form.firstName[getLang]"
              />
              <v-text-field
                v-model.trim="firstName"
                background-color="#FAFAFA"
                color="#1A1A1A"
                :placeholder="getLang === 'en' ? 'Your First Name...' : 'Το Όνομα σας...'"
                :error-messages="firstNameErrors"
                outlined
                required
                @input="delayTouch($v.firstName)"
                @blur="$v.firstName.$touch()"
              ></v-text-field>
              <label
                  :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                  class="color-1a1a1a"
                  v-html="stepper.content[0].form.lastName[getLang]"
              />
              <v-text-field
                  v-model.trim="lastName"
                  background-color="#FAFAFA"
                  color="#1A1A1A"
                  :placeholder="getLang === 'en' ? 'Your Last Name...' : 'Το Επίθετο σας...'"
                  :error-messages="lastNameErrors"
                  outlined
                  required
                  @input="delayTouch($v.lastName)"
                  @blur="$v.lastName.$touch()"
              ></v-text-field>
              <v-btn
                :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                class="text-capitalize white--text"
                color="#333333"
                type="submit"
                :disabled="$v.$invalid"
              >
                {{ getLang === 'gr' ? "Υποβολη" : "Submit" }}
              </v-btn>
            </form>
          </v-stepper-content>
          <v-stepper-content v-if="noRole" :step="emptyName ? '2' : '1'">
            <v-card flat>
              <v-card-text
                class="px-3 pt-2 pb-4 color-333333"
                :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'">
                {{ stepper.content[1][getLang] }}
              </v-card-text>
              <v-card-actions>
                <v-btn
                  class="white--text"
                  :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                  color="#333333" @click="setRole('artist');"
                >
                  {{ getLang === 'gr' ? 'Ναι' : 'Yes' }}
                </v-btn>
                <v-btn
                  class="black--text"
                  :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                  color="#FAFAFA" @click="setRole('user');"
                >
                  {{ getLang === 'gr' ? 'Όχι' : 'Νο' }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>
  </VoidLayout>
</template>

<script>
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

const touchMap = new WeakMap();
const alphaTick = (value) => /^[a-zA-Z- ]*$/.test(value)

export default {
  mixins: [validationMixin],
  validations: {
    firstName: { required, alphaTick },
    lastName: { required, alphaTick }
  },
  data () {
    return {
      noRole: false,
      emptyName: false,
      roleName: "",
      firstName: "",
      lastName: "",
      stepper: {
        pos: 0,
        headers: [
          {
            gr: "Ονοματεπώνυμο",
            en: "First & Last names"
          },
          {
            gr: "Ρόλος",
            en: "Role"
          }
        ],
        content: [
          {
            form: {
              firstName: {
                gr: "Ονομα",
                en: "First Name"
              },
              lastName: {
                gr: "Επίθετο",
                en: "Last Name"
              },
              errors: {
                firstName: {
                  invalid: {
                      gr: "Δεκτοί χαρακτήρες είναι oι λατινικοί αλφαβητικοί χαρακτήρες καθώς και το κενό και '-'.",
                      en: "Valid characters are latin alphabet characters as well whitespace and '-'.",
                  },
                  missing: {
                      gr: 'Το όνομα είναι υποχρεωτικό.',
                      en: 'First Name is required.',
                  }
                },
                lastName: {
                    invalid: {
                        gr: "Δεκτοί χαρακτήρες είναι oι λατινικοί αλφαβητικοί χαρακτήρες καθώς και το κενό και '-'.",
                        en: "Valid characters are latin alphabet characters as well whitespace and '-'.",
                    },
                    missing: {
                        gr: 'Το επίθετο είναι υποχρεωτικό.',
                        en: 'Last Name is required.',
                    }
                }
              }
            }
          },
          {
            gr: 'Είσαστε Καλλιτέχνης;',
            en: 'Are you an Artist?',
          }
        ]
      },
    }
  },
  async created() {
    let user_id;
    try {
      user_id = await this.$auth.handleAuthentication();
    } catch { return; }
    let found;
    try {
      found = await this.$db.existsUserId(user_id);
    } catch { this.$auth.logout(); return; }
    if (!found) { // User ID not in DB, add it.
      try {
        await this.$db.addUserId(user_id);
      } catch { this.$auth.logout(); return; }
    }
    await this.processUser();
  },
  computed: {
    ...mapGetters(["getLang"]),
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.alphaTick && errors.push(this.stepper.content[0].form.errors.firstName.invalid[this.getLang]);
      !this.$v.firstName.required && errors.push(this.stepper.content[0].form.errors.firstName.missing[this.getLang]);
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.alphaTick && errors.push(this.stepper.content[0].form.errors.lastName.invalid[this.getLang]);
      !this.$v.lastName.required && errors.push(this.stepper.content[0].form.errors.lastName.missing[this.getLang]);
      return errors;
    },
  },
  methods: {
    delayTouch($v) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      touchMap.set($v, setTimeout($v.$touch, 1000));
    },
    async processUser() {
      let user = JSON.parse(localStorage.getItem('user'));
      if (!Object.prototype.hasOwnProperty.call(user, "given_name") ||
          !Object.prototype.hasOwnProperty.call(user, "family_name")) {
        this.emptyName = true; // empty name(s)
        this.firstName = user.given_name || "";
        this.stepper.content[0].familyName = user.family_name || "";
      }
      let roleObj;
      try {
        roleObj = await this.$auth.getUserRole();
      } catch { this.$auth.logout(); return; }
      if (roleObj == null) { // No role
        this.noRole = true;
      } else { // store role locally
        this.roleName = roleObj[0].name;
      }
      if (this.emptyName || this.noRole) {
          this.stepper.pos = 1;
          // this.$forceUpdate();
      } else {
        try {
          await this.processMarketing();
        } catch {
          // empty
        }
        this.roleName == 'artist' ?
          this.$router.push({ path: '/user/portfolio' }) :
          this.$router.push({ path: '/user/profile' })
      }
    },
    async processMarketing() {
      try { // First get updated user data.
        await this.$auth.getUser();
      } catch { this.$auth.logout(); return; }
      // Check if member is in Marketing Service (Mailchimp)
      let user = JSON.parse(localStorage.getItem('user'));
      try { // Member found. Don't subscribe her.
        await this.$marketing.getMember({ email_address: user.email });
      } catch { // Member not found, automatically subscribe her.
        await this.$marketing.subscribe({
          email_address: user.email,
          merge_fields: {
            'FNAME': user.given_name || '',
            'LNAME': user.family_name || '',
            'ROLE': this.roleName
          },
          tags: [this.getLang],
          status_if_new: 'subscribed'
        });
      }
    },
    async setRole(roleName) { // Always last step
      this.roleName = roleName;
      this.stepper.pos = 0; // Done
      if (this.emptyName) { // Submit Names
        var name = this.firstName + ' ' + this.lastName;
        try {
          await this.$auth.updateUser({
            given_name: this.firstName,
            family_name: this.lastName,
            name: name
          });
        } catch { this.$auth.logout(); return; }
      }
      try { // Submit Role
        await this.$auth.assignUserRole(this.roleName);
      } catch { this.$auth.logout(); return; }
      try {
        await this.processMarketing();
      } catch {
        // empty
      }
      this.roleName == 'artist' ?
        this.$router.push({ path: '/user/portfolio' }) :
        this.$router.push({ path: '/user/profile' });
    },
    async setNames() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.noRole) { // Next step is Role
          this.stepper.pos++;
        } else { // Last step, submit Names
          this.stepper.pos = 0;
          var name = this.firstName + ' ' + this.lastName;
          try {
            await this.$auth.updateUser({
              given_name: this.firstName,
              family_name: this.lastName,
              name: name
            });
          } catch { this.$auth.logout(); return; }
          try {
            await this.processMarketing();
          } catch {
            // empty
          }
          this.roleName == 'artist' ?
            this.$router.push({ path: '/user/portfolio' }) :
            this.$router.push({ path: '/user/profile' })
        }
      }
    }
  },
  metaInfo () {
    return {
      titleTemplate: this.getLang === 'gr' ? 'Σύνδεση — Artventures' : 'Login — Artventures',
      meta: [
        { name: 'description', content: 'Web Application' },
      ],
    }
  },
}
</script>

<style scoped>
.color-333333 {
  color: #333333 !important;
}
.noto-13-400 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 13px !important;
  font-weight: 400 !important;
}
.noto-16-400 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 16px !important;
  font-weight: 400 !important;
}
.noto-16-600 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 16px !important;
  font-weight: 600 !important;
}
.raleway-13-400 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 13px !important;
  font-weight: 400 !important;
}
.raleway-16-400 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 16px !important;
  font-weight: 400 !important;
}
.raleway-16-600 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 16px !important;
  font-weight: 600 !important;
}
</style>