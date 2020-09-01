<template>
    <UserLayout>
      <v-content>
        <v-container class="px-0 py-12" fluid>
            <div
                :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
                class="pb-10 my-0 text-center"
                v-html="getLang === 'gr' ? 'Οι Ρυθμίσεις μου' : 'My Settings'"
            />
            <v-row v-if="getViewSize === 'desktop'" justify="center" align="start">
                <v-col offset="2" cols="4">
                    <form lazy-validation @submit.prevent="submit()">
                        <v-row justify="start" align="center">
                            <v-col cols="10">
                                <label
                                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                    class="color-1a1a1a"
                                    v-html="form.firstName[getLang]"
                                />
                                <v-text-field
                                    v-model.trim="firstName"
                                    background-color="#FAFAFA"
                                    color="#1A1A1A"
                                    :error-messages="firstNameErrors"
                                    outlined
                                    required
                                    @input="delayTouch($v.firstName)"
                                    @blur="$v.firstName.$touch()"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row justify="start" align="center">
                            <v-col cols="10">
                                <label
                                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                    class="color-1a1a1a"
                                    v-html="form.lastName[getLang]"
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
                        <v-row justify="start" align="center">
                            <v-col cols="10">
                                <label
                                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                    class="color-1a1a1a"
                                    v-html="form.nickname[getLang]"
                                />
                                <v-text-field
                                    v-model.trim="nickname"
                                    background-color="#FAFAFA"
                                    color="#1A1A1A"
                                    :error-messages="nicknameErrors"
                                    outlined
                                    required
                                    @input="delayTouch($v.nickname)"
                                    @blur="$v.nickname.$touch()"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row justify="start" align="center">
                            <v-col cols="10">
                                <label
                                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
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
                            </v-col>
                        </v-row>
                        <v-row justify="start" align="center">
                            <v-col cols="10">
                                <label
                                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                    class="color-1a1a1a"
                                    v-html="form.role[getLang]"
                                />
                                <v-radio-group v-model="role" row :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'">
                                    <v-radio
                                        v-if="role === 'admin'"
                                        color="rgba(26,26,26,1)"
                                        :label="availableRoles['admin'][getLang]"
                                        value="admin">
                                    </v-radio>
                                    <v-radio
                                        color="rgba(26,26,26,1)"
                                        :label="availableRoles['artist'][getLang]"
                                        value="artist">
                                    </v-radio>
                                    <v-radio
                                        color="rgba(26,26,26,1)"
                                        :label="availableRoles['user'][getLang]"
                                        value="user">
                                    </v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-row justify="start" align="center">
                            <!-- <v-btn
                                :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                class="text-capitalize white--text"
                                color="#333333"
                                type="submit"
                                :disabled="$v.invalid"
                                v-html="buttons.form[getLang]"
                            /> -->
                            <v-btn
                                :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                class="text-capitalize white--text"
                                color="#333333"
                                type="submit"
                                disabled
                                v-html="buttons.form[getLang]"
                            />
                        </v-row>
                    </form>
                </v-col>
                <v-col cols="3">
                    <v-row justify="start" align="center">
                        <label
                            :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                            class="color-1a1a1a"
                            v-html="form.pic[getLang]"
                        />
                    </v-row>
                    <v-row>
                        <g-image style="width: 200px; height: 200px" :src="pic" />
                    </v-row>
                    <v-row class="pt-2">
                        <label
                            :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                            class="pic-btn white--text text-capitalize py-1 pl-2 pr-4 text-center"
                            for="pic_profile"
                        >
                            <v-icon class="pb-1 white--text pr-2">mdi-pencil</v-icon>{{ buttons.pic[getLang] }}
                        </label>
                        <input
                            id="pic_profile"
                            name="pic_profile"
                            style="opacity: 0;"
                            :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
                            accept="image/png, image/jpeg, image/bmp"
                            type="file"
                            @input="changeProfilePic"
                        >
                    </v-row>
                    <v-row class="pt-8" justify="start" align="start">
                        <div
                            :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                            class="color-1a1a1a"
                            v-html="pw.title[getLang]"
                        />
                    </v-row>
                    <v-row justify="start" align="start" no-gutter>
                        <v-col cols="8" class="px-0">
                            <v-btn
                                dark
                                color="#333333"
                                v-if="provider === 'auth0'"
                                :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                class="text-capitalize"
                                v-html="pw.reset[getLang]"
                                @click="this.$auth.resetPassword()"
                            />
                            <div
                                v-else
                                :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
                            >
                                {{ pw.text3rd['1st'][getLang] }}
                                <span class='raleway-16-600'>{{ availableProviders[provider] }}</span>
                                {{ pw.text3rd['2nd'][getLang] }}
                            </div>
                        </v-col>
                    </v-row>
                    <v-row justify="start" align="start" no-gutter>
                        <v-col cols="8" class="px-0 pb-0">
                            <label
                                :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                class="color-1a1a1a"
                                v-html="language[getLang]"
                            />
                        </v-col>
                    </v-row>
                    <v-row justify="start" align="start" no-gutter>
                        <v-col cols="8" class="px-0 py-0">
                            <v-select
                                v-model="chosenLanguage"
                                :items="getLanguages"
                                color="#333333"
                                @change="setLang(chosenLanguage)"
                            />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row v-else-if="getViewSize === 'mobile'" justify="center" align="start">
                <v-col cols="10">
                    <v-row justify="center" align="center">
                        <label
                            :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                            class="color-1a1a1a"
                            v-html="form.pic[getLang]"
                        />
                    </v-row>
                    <v-row  justify="center" align="center">
                        <g-image style="width: 150px; height: 150px" :src="pic" />
                    </v-row>
                    <v-row class="pt-2" justify="center" align="center">
                        <label
                            :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                            class="pic-btn white--text text-capitalize py-1 pl-2 pr-4 mt-2 text-center center-label"
                            style="pos"
                            for="pic_profile"
                        >
                            <v-icon class="pb-1 white--text pr-2">mdi-pencil</v-icon>{{ buttons.pic[getLang] }}
                        </label>
                        <input
                            id="pic_profile"
                            name="pic_profile"
                            style="opacity: 0;"
                            accept="image/png, image/jpeg, image/bmp"
                            type="file"
                            @input="changeProfilePic"
                        >
                    </v-row>
                    <v-row class="pt-6" justify="center" align="center">
                        <div
                            :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                            class="color-1a1a1a"
                            v-html="pw.title[getLang]"
                        />
                    </v-row>
                    <v-row class="pt-2" justify="center" align="center">
                        <v-btn
                            dark
                            color="#333333"
                            v-if="provider === 'auth0'"
                            :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                            class="text-capitalize"
                            v-html="pw.reset[getLang]"
                            @click="this.$auth.resetPassword()"
                        />
                        <div
                            v-else
                            :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
                        >
                            {{ pw.text3rd['1st'][getLang] }}
                            <span class='raleway-16-600'>{{ availableProviders[provider] }}</span>
                            {{ pw.text3rd['2nd'][getLang] }}
                        </div>
                    </v-row>
                    <v-row class="pt-6" justify="center" align="center">
                        <label
                            :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                            class="color-1a1a1a"
                            v-html="language[getLang]"
                        />
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="3">
                            <v-select
                                v-model="chosenLanguage"
                                :items="getLanguages"
                                color="#333333"
                                @change="setLang(chosenLanguage)"
                            />
                        </v-col>
                    </v-row>
                    <v-row class="pt-12" justify="center" align="center">
                        <form lazy-validation @submit.prevent="submit()">
                            <label
                                :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                class="color-1a1a1a"
                                v-html="form.firstName[getLang]"
                            />
                            <v-text-field
                                v-model.trim="firstName"
                                background-color="#FAFAFA"
                                color="#1A1A1A"
                                :error-messages="firstNameErrors"
                                outlined
                                required
                                @input="delayTouch($v.firstName)"
                                @blur="$v.firstName.$touch()"
                            ></v-text-field>
                            <label
                                :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                class="color-1a1a1a"
                                v-html="form.lastName[getLang]"
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
                            <label
                                :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                class="color-1a1a1a"
                                v-html="form.nickname[getLang]"
                            />
                            <v-text-field
                                v-model.trim="nickname"
                                background-color="#FAFAFA"
                                color="#1A1A1A"
                                :error-messages="nicknameErrors"
                                outlined
                                required
                                @input="delayTouch($v.nickname)"
                                @blur="$v.nickname.$touch()"
                            ></v-text-field>
                            <label
                                :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
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
                                :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                class="color-1a1a1a"
                                v-html="form.role[getLang]"
                            />
                            <v-radio-group v-model="role" row :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'">
                                <v-radio
                                    v-if="role === 'admin'"
                                    color="rgba(26,26,26,1)"
                                    :label="availableRoles['admin'][getLang]"
                                    value="admin">
                                </v-radio>
                                <v-radio
                                    color="rgba(26,26,26,1)"
                                    :label="availableRoles['artist'][getLang]"
                                    value="artist">
                                </v-radio>
                                <v-radio
                                    color="rgba(26,26,26,1)"
                                    :label="availableRoles['user'][getLang]"
                                    value="user">
                                </v-radio>
                            </v-radio-group>
                        <!-- <v-btn
                            :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                            class="text-capitalize white--text"
                            color="#333333"
                            type="submit"
                            :disabled="$v.invalid"
                            v-html="buttons.form[getLang]"
                        /> -->
                        <v-btn
                            :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                            class="text-capitalize white--text"
                            color="#333333"
                            type="submit"
                            disabled
                            v-html="buttons.form[getLang]"
                        />
                        </form>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
      </v-content>
    </UserLayout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    firstName: { required },
    lastName: { required },
    nickname: { required },
    email: { required, email },
  },
  mounted () {
    if (this.$auth.user) {
        this.firstName = this.$auth.user.given_name || null
        this.lastName = this.$auth.user.family_name || null
        this.nickname = this.$auth.user.nickname || null
        this.email = this.$auth.user.email || null
        this.pic = this.$auth.user.picture || null
    }
    this.provider = this.$auth.provider || null
    if (this.$auth.userRole) {
        this.role = this.$auth.userRole[0].name
    }
    this.chosenLanguage = this.getLang
  },
  data() {
    return {
        provider: null,
        availableProviders: {
            auth0: "Auth0",
            "google-oauth2": "Google",
            "facebook": "Facebook"
        },
        chosenLanguage: '',
        language: {
            gr: 'Γλώσσα',
            en: 'Language'
        },
        pw: {
            title: {
                gr: 'Κωδικός Πρόσβασης',
                en: 'Password'
            },
            textauth0: {
                gr: '',
                en: ''
            },
            text3rd: {
                '1st': {
                    gr: "Χρησιμοποιείται ",
                    en: "You use ",
                },
                '2nd': {
                    gr: "για την σύνδεση σας, παρακαλώ αλλάξτε το κωδικό σας σ' αυτόν τον πάροχο αν το επιθυμείτε.",
                    en: "to login, please change your password at this provider if you wish so."
                }
            },
            reset: {
                gr: 'Επαναφορά κωδικού',
                en: 'Reset Password',
            }
        },
        availableRoles: {
            admin: {
                gr: 'Διαχειριστής',
                en: 'Admin'
            },
            artist: {
                gr: 'Καλλιτέχνης',
                en: 'Artist'
            },
            user: {
                gr: 'Χρήστης',
                en: 'User'
            }
        },
        form: {
            errors: {
                firstName: {
                    gr: 'Το όνομα είναι υποχρεωτικό.',
                    en: 'First Name is required.',
                },
                lastName: {
                    gr: 'Το επίθετο είναι υποχρεωτικό.',
                    en: 'Last Name is required.',
                },
                nickname: {
                    gr: 'Το ψευδώνυμο είναι υποχρεωτικό.',
                    en: 'Nickname is required.',
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
            },
            firstName: {
                gr: 'Όνομα',
                en: 'First Name',
            },
            lastName: {
                gr: 'Επίθετο',
                en: 'Last Name',
            },
            nickname: {
                gr: 'Ψευδόνυμο',
                en: 'Nickname',
            },
            email: {
                gr: 'Ηλεκτρονική διεύθυνση',
                en: 'Email',
            },
            role: {
                gr: 'Ρόλος',
                en: 'Role'
            },
            pic: {
                gr: 'Εικόνα Προφίλ',
                en: 'Profile Pic'
            }
        },
        firstName: '',
        lastName: '',
        nickname: '',
        email: '',
        role: '',
        pic: '',
        buttons: {
            form: {
                gr: 'Επικαιροποίηση προφίλ',
                en: 'Update Profile'
            },
            pic: {
                gr: 'επεξεργασία',
                en: 'edit'
            }
        }
    }
  },
  computed: {
    ...mapGetters(['getLang', 'getLanguages']),
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required && errors.push(this.form.errors.firstName[this.getLang]);
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push(this.form.errors.lastName[this.getLang]);
      return errors;
    },
    nicknameErrors() {
      const errors = [];
      if (!this.$v.nickname.$dirty) return errors;
      !this.$v.nickname.required && errors.push(this.form.errors.nickname[this.getLang]);
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push(this.form.errors.email.invalid[this.getLang]);
      !this.$v.email.required && errors.push(this.form.errors.email.missing[this.getLang]);
      return errors;
    },
  },
  methods: {
      ...mapMutations(['setLang']),
    submit() {
    },
    delayTouch($v) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      touchMap.set($v, setTimeout($v.$touch, 1000));
    },
    changeProfilePic(value) {
        //console.log(value)
    }
  },
  metaInfo () {
    return {
      titleTemplate: this.getLang === 'gr' ? 'Ρυθμίσεις — Artventures' : 'Settings — Artventures',
      meta: [
        { name: 'description', content: 'Web Application' },
      ],
    }
  },
}
</script>

<style>
.theme--light.v-label {
    color: rgba(26, 26, 26, 1) !important;
}
.pic-btn {
    border-radius: 4px;
    cursor: pointer;
    border: outset #333333;
    background-color: #333333;
}
.settings-form-btn {
  background-color: #333333;
  border-radius: 4px;
}
.center-label {
    position: absolute;
    text-align: center;
}
</style>