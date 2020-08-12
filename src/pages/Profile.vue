<template>
    <ArtistLayout>
      <v-content class="background-color-fafafa">
        <v-container class="px-0 pt-0" fluid>
            <div class="mx-auto my-10 w-64 text-center uppercase font-bold">
                {{ title[getLang] }} {{ user.given_name || user.name }}
            </div>
            <table class="table-auto mx-auto mb-4">
                <tbody>
                    <tr>
                        <td class="border px-4 py-2">{{ pic[getLang] }}</td>
                        <td class="border px-4 py-2"><img :src="user.picture" /></td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">{{ givenName[getLang] }}</td>
                        <td class="border px-4 py-2">{{ user.given_name }}</td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">{{ lastName[getLang] }}</td>
                        <td class="border px-4 py-2">{{ user.family_name }}</td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">{{ firstName[getLang] }}</td>
                        <td class="border px-4 py-2">{{ user.name }}</td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">{{ nickname[getLang] }}</td>
                        <td class="border px-4 py-2">{{ user.nickname }}</td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-2">{{ email[getLang] }}</td>
                        <td class="border px-4 py-2">{{ user.email }}</td>
                    </tr>
                </tbody>
            </table>
        </v-container>
      </v-content>
    </ArtistLayout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  mounted() {
    this.user = this.$auth.user || {};
  },
  data(){
    return{
        user: {},
        title: {
            gr: 'Καλησπέρα',
            en: 'Hello',
        },
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
            gr: 'Ηλεκτγρονική διεύθυνση',
            en: 'Email',
        },
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  metaInfo () {
    return {
      titleTemplate: this.getLang === 'gr' ? 'Προφίλ — Artventures' : 'Profil — Artventures',
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>