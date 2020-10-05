<template>
    <UserLayout>
      <v-main>
        <v-container class="px-4 py-12" fluid>
            <div
                :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
                class="pb-10 my-0 mx-1 text-center"
                v-html="getLang === 'gr' ? 'Το Προφίλ μου' : 'My Profile'"
            />

            <v-row justify="center" align="center">
                <v-col md="4" lg="2" xl="2">
                    <div :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'">{{ pic[getLang] }}</div>
                </v-col>
                <v-col md="4" lg="2" xl="2">
                    <!-- Desktop -->
                    <g-image
                        v-if="userPicture"
                        class="hidden-sm-down"
                        :src="userPicture"
                        style="height: 200px;"
                        fit="cover"
                        alt="profile pic"
                    />
                    <!-- Mobile -->
                    <g-image
                        v-if="userPicture"
                        class="hidden-md-and-up"
                        :src="userPicture"
                        style="height: 100px;"
                        fit="cover"
                        alt="profile pic"
                    />
                </v-col>
            </v-row>

            <v-row justify="center" align="center">
                <v-col md="4" lg="2" xl="2">
                    <div :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'">{{ firstName[getLang] }}</div>
                </v-col>
                <v-col md="4" lg="2" xl="2">
                    <div :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'">
                        {{ userGivenName }}
                    </div>
                </v-col>
            </v-row>

            <v-row justify="center" align="center">
                <v-col md="4" lg="2" xl="2">
                    <div :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'">{{ lastName[getLang] }}</div>
                </v-col>
                <v-col md="4" lg="2" xl="2">
                    <div :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'">
                        {{ userFamilyName }}
                    </div>
                </v-col>
            </v-row>

            <v-row justify="center" align="center">
                <v-col md="4" lg="2" xl="2">
                    <div :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'">{{ nickname[getLang] }}</div>
                </v-col>
                <v-col md="4" lg="2" xl="2">
                    <div :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'">
                    {{ userNickname }}
                    </div>
                </v-col>
            </v-row>

            <v-row justify="center" align="center">
                <v-col md="4" lg="2" xl="2">
                    <div :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'">{{ email[getLang] }}</div>
                </v-col>
                <v-col md="4" lg="2" xl="2">
                    <div :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'">
                        {{ userEmail }}
                    </div>
                </v-col>
            </v-row>

            <v-row v-if="bio" justify="center" align="center">
                <v-col offset-xl="4" offset-lg="4" offset-md="2" xl="2" lg="2" md="4">
                    <div :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'">{{ bio[getLang] }}</div>
                </v-col>
                <v-col>
                    <div :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'">
                        {{ userBio }}
                    </div>
                </v-col>
            </v-row>

            <v-row v-if="userRole" justify="center" align="center">
                <v-col md="4" lg="2" xl="2">
                    <div :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'" >{{ role.title[getLang] }}</div>
                </v-col>
                <v-col md="4" lg="2" xl="2">
                    <div :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'">
                        {{ availableRoles[userRole[0].name][getLang] }}
                    </div>
                </v-col>
            </v-row>

        </v-container>
      </v-main>
    </UserLayout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  mounted() {
    if (process.isClient) {
        if (this.$auth.user) {
            this.userPicture = this.$auth.user.picture || null
            this.userGivenName = this.$auth.user.given_name || null
            this.userFamilyName = this.$auth.user.family_name || null
            this.userNickname = this.$auth.user.nickname || null
            this.userEmail = this.$auth.user.email || null
            this.userRole = this.$auth.userRole || null
        }
        var userMetadata = this.getUserMetadata()
        if (userMetadata) {
            this.userBio = userMetadata.bio
        }
    }
  },
  data() {
    return {
        // auth0
        userPicture: null,
        userGivenName: null,
        userFamilyName: null,
        userNickname: null,
        userEmail: null,
        userRole: null,
        userBio: null,
        availableRoles: {
            admin: {
                gr: 'Διαχειριστής',
                en: 'Administrator'
            },
            artist: {
                gr: 'Καλλιτέχνης',
                en: 'Artist'
            },
            user: {
                gr: 'χρήστης',
                en: 'User'
            }
        },
        pic: {
            gr: 'Φωτογραφία',
            en: 'Picture',
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
            gr: 'Ψευδώνυμο',
            en: 'Nickname',
        },
        email: {
            gr: 'Ηλεκτρονική διεύθυνση',
            en: 'Email',
        },
        bio: {
            gr: "Βιογραφία",
            en: "Biography"
        },
        role: {
            title: {
                gr: 'Ρόλος',
                en: 'Role'
            }
        },
    }
  },
  computed: {
    ...mapGetters(['getLang', 'getLanguages']),
  },
  methods: {
    getUserMetadata() {
        if (process.isClient) {
            return JSON.parse(localStorage.getItem('user_metadata'))
        } else {
            return null
        }
    },
  },
  metaInfo () {
    return {
      titleTemplate: this.getLang === 'gr' ? 'Προφίλ — Artventures' : 'Profile — Artventures',
      meta: [
        { name: 'description', content: 'Web Application' },
      ],
    }
  },
}
</script>