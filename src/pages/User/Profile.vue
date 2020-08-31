<template>
    <UserLayout>
      <v-content class="background-color-fafafa">
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
                            <v-img
                                v-if="$auth.user.picture"
                                :src="$auth.user.picture"
                                width="200"
                                height="200"
                                max-width="200"
                                max-height="200"
                                contain
                            />
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">{{ firstName[getLang] }}</td>
                        <td 
                            class="border px-4 py-2"
                            :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                        >
                            {{ $auth.user.given_name }}
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">{{ lastName[getLang] }}</td>
                        <td
                            class="border px-4 py-2"
                            :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                        >
                            {{ $auth.user.family_name }}
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">{{ nickname[getLang] }}</td>
                        <td
                            class="border px-4 py-2"
                            :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                        >
                            {{ $auth.user.nickname }}
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">{{ email[getLang] }}</td>
                        <td
                            class="border px-4 py-2"
                            :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                        >
                            {{ $auth.user.email }}
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">{{ role.title[getLang] }}</td>
                        <td
                            class="border px-4 py-2"
                            :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                        >
                            {{ role.name[getLang] }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </v-container>
      </v-content>
    </UserLayout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  mounted () {
    this.getRole()
  },
  data() {
    return {
        availableRoles: {
            admin: {
                gr: 'διαχειριστής',
                en: 'admin'
            },
            artist: {
                gr: 'καλλιτέχνης',
                en: 'artist'
            },
            user: {
                gr: 'χρήστης',
                en: 'user'
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
            gr: 'Ψευδόνυμο',
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
            },
            name: {
                gr: '',
                en: '',
            }
        },
    }
  },
  computed: {
    ...mapGetters(['getLang', 'getLanguages']),
  },
  methods: {
      getRole() {
        this.getLanguages.forEach(lang => {
            if (this.$auth.userRole && this.$auth.userRole.length) {
                this.role.name[lang] = this.availableRoles[this.$auth.userRole[0].name][lang]
            }
        });
      }
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