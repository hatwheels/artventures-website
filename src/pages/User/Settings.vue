<template>
    <UserLayout>
      <v-content class="background-color-fafafa">
        <v-container class="px-0 py-12" fluid>
            <div
                :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
                class="pb-10 my-0 text-center"
                v-html="getLang === 'gr' ? 'Οι Ρυθμίσεις μου' : 'My Settings'"
            />
        </v-container>
      </v-content>
    </UserLayout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getLang', 'getLanguages']),
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