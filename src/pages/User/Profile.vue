<template>
    <UserLayout>
      <v-main>
        <v-container class="px-0 py-12" fluid>
            <div
                :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
                class="pb-10 my-0 text-center"
                v-html="getLang === 'gr' ? 'Το Προφίλ μου' : 'My Profile'"
            />
            <table class="table-auto mx-auto mb-4">
                <tbody :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'">
                    <tr>
                        <td class="border px-4 py-2">{{ pic[getLang] }}</td>
                        <td class="border px-4 py-2">
                            <!-- Desktop -->
                            <div v-show="!$vuetify.breakpoint.mobile">
                                <g-image
                                    v-if="userPicture"
                                    :src="userPicture"
                                    style="height: 200px;"
                                    fit="cover"
                                    alt="profile pic"
                                />
                            </div>
                            <!-- Mobile -->
                            <div v-show="$vuetify.breakpoint.mobile">
                                <g-image
                                    v-if="userPicture"
                                    :src="userPicture"
                                    style="height: 100px;"
                                    fit="cover"
                                    alt="profile pic"
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">{{ firstName[getLang] }}</td>
                        <td 
                            class="border px-4 py-2"
                            :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                        >
                            {{ userGivenName }}
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">{{ lastName[getLang] }}</td>
                        <td
                            class="border px-4 py-2"
                            :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                        >
                            {{ userFamilyName }}
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">{{ nickname[getLang] }}</td>
                        <td
                            class="border px-4 py-2"
                            :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                        >
                            {{ userNickname }}
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">{{ email[getLang] }}</td>
                        <td
                            class="border px-4 py-2"
                            :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                        >
                            {{ userEmail }}
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">{{ bio[getLang] }}</td>
                        <td
                            style="display: block; width: 20vw"
                            class="border px-4 py-2"
                            :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                        >
                            {{ userBio }}
                        </td>
                    </tr>
                    <tr v-if="userRole">
                        <td  class="border px-4 py-2">{{ role.title[getLang] }}</td>
                        <td
                            class="border px-4 py-2"
                            :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                        >
                            {{ availableRoles[userRole[0].name][getLang] }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </v-container>
      </v-main>
    </UserLayout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  created() {
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