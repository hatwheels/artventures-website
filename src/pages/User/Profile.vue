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
                            <div v-show="getViewSize === 'desktop'">
                                <g-image
                                    v-if="userPicture.length > 0"
                                    :src="userPicture"
                                    style="height: 200px;"
                                    fit="cover"
                                    alt="profile pic"
                                />
                            </div>
                            <div v-show="getViewSize === 'mobile'">
                                <g-image
                                    v-if="userPicture.length > 0"
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
    if (process.isClient && this.$auth.user) {
        this.userPicture = this.$auth.user.picture || null
        this.userGivenName = this.$auth.user.given_name || null
        this.userFamilyName = this.$auth.user.family_name || null
        this.userNickname = this.$auth.user.nickname || null
        this.userEmail = this.$auth.user.email || null
        this.userRole = this.$auth.userRole || null
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