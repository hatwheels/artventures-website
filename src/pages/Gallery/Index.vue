<template>
  <Layout>
    <v-main>

    </v-main>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  created() {
    this.$auth.getUsersInRole('artist')
        .then(artists => {
            this.artists = artists;
            this.artists.forEach(artist => {
              console.log(artist.user_id);
            });
        })
        .catch(err => console.log(err))
  },
  data () {
      return {
        artists: undefined
      }
  },
  metaInfo() {
    return {
      titleTemplate:
        this.getLang === "gr"
          ? "Γκαλερί — Artventures"
          : "Gallery — Artventures",
      meta: [{ name: "description", content: "Landing page" }],
    };
  },
};
</script>