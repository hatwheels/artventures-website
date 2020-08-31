<template>
    <UserLayout>
      <v-content>
        <v-container class="px-0 py-12 background-color-fafafa" fluid>
          <div
              :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
              class="pb-10 my-0 text-center"
              v-html="getLang === 'gr' ? 'Το Πορτφόλιο μου' : 'My Portfolio'"
          />
          <v-card flat height="100%" color="rgba(250, 250, 250, 1)">
            <v-tabs
              v-model="currentTab"
              class="raleway-16-600 text-capitalize px-8"
              background-color="rgba(250, 250, 250, 1)"
              color="black"
            >
              <v-tab>In Process</v-tab>
              <v-tab>Approved</v-tab>
            </v-tabs>
            <v-tabs-items v-model="currentTab" class="background-color-fafafa px-8 center-viewport">
              <v-tab-item
                class="background-color-fafafa"
                style="height: 100% !important"
                transition="fade-transition"
                reverse-transition="fade-transition"
              >
                <v-card v-if="!images[0]" flat color="#FAFAFA">
                  <v-card-text>
                    No Artwork
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item
                class="background-color-fafafa"
                style="height: 100% !important"
                transition="fade-transition"
                reverse-transition="fade-transition"
              >
                <v-card v-if="!images[0]" flat color="#FAFAFA">
                  <v-card-text>
                    No Artwork
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-container>
      </v-content>
    </UserLayout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  mounted () {
    console.log(!this.images)
  },
  data () {
    return {
      currentTab: null,
      images: [null, null],
    }
  },
  computed: {
    ...mapGetters(['getLang', 'getLanguages']),
  },
  metaInfo () {
    return {
      titleTemplate: this.getLang === 'gr' ? 'Πορτφόλιο — Artventures' : 'Portfolio — Artventures',
      meta: [
        { name: 'description', content: 'Web Application' },
      ],
    }
  },
}
</script>

<style>
.center-viewport {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>