<template>
    <UserLayout>
      <template v-slot:profile>
      <v-content class="background-color-fafafa">
        <v-container class="px-0 py-12" fluid>
            <table class="table-auto mx-auto mb-4">
                <tbody :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'">
                    <tr>
                        <td class="border px-4 py-2">{{ pic[getLang] }}</td>
                        <td class="border px-4 py-2">
                            <g-image
                                v-if="$auth.user.picture"
                                :src="$auth.user.picture"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">{{ givenName[getLang] }}</td>
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
                        <td class="border px-4 py-2">{{ firstName[getLang] }}</td>
                        <td
                            class="border px-4 py-2"
                            :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                        >
                            {{ $auth.user.name }}
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
                </tbody>
            </table>
        </v-container>
      </v-content>
      </template>
    </UserLayout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
        pic: {
            gr: 'Φωτογραφία',
            en: 'Picture',
        },
        givenName: {
            gr: 'Όνομα',
            en: 'Given Name',
        },
        lastName: {
            gr: 'Επίθετο',
            en: 'Last Name',
        },
        firstName: {
            gr: 'Όνομα',
            en: 'First Name',
        },
        nickname: {
            gr: 'Παρατσούκλι',
            en: 'Nickname',
        },
        email: {
            gr: 'Ηλεκτρονική διεύθυνση',
            en: 'Email',
        },
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  metaInfo () {
    return {
      titleTemplate: this.getLang === 'gr' ? 'Προφίλ — Artventures' : 'Profile — Artventures',
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>