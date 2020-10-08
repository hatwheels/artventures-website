<template>
  <Layout>
    <v-main>
        <v-container class="pa-0 background-color-fafafa" fluid>
            <!-- Desktop -->
            <div class="hidden-sm-and-down">
                <div class="py-10" />
                <div v-if="!fetched">
                    <v-row class="px-12 mx-12" justify="center" align="center">
                        <v-col><v-skeleton-loader type="card" /></v-col>
                        <v-col><v-skeleton-loader type="card" /></v-col>
                        <v-col><v-skeleton-loader type="card" /></v-col>
                    </v-row>
                    <v-row class="px-12 mx-12" justify="center" align="center">
                        <v-col><v-skeleton-loader type="card" /></v-col>
                        <v-col><v-skeleton-loader type="card" /></v-col>
                        <v-col><v-skeleton-loader type="card" /></v-col>
                    </v-row>
                </div>
                <div v-else>
                  <v-row class="px-12" justify="center" align="center">
                    <v-col
                      v-for="(artwork, i ) in gallery"
                      :key="'artwork-' + i"
                      cols="4"
                    >
                      <g-image style="width: 90%" :src="artwork.url" :alt="artwork.title" @click="getRef(artwork.user_id)" />
                      <div class="raleway-28-400 text-center text-capitalize">{{ artwork.title }}</div>
                    </v-col>
                  </v-row>
                </div>
                <div class="py-10" />
            </div>
            <!-- Mobile -->
            <div class="hidden-md-and-up py-4">
                <div class="py-4" />
                <div v-if="!fetched">
                    <v-row class="px-4" justify="center" align="center">
                        <v-col><v-skeleton-loader type="card" /></v-col>
                    </v-row>
                    <v-row class="px-4" justify="center" align="center">
                        <v-col><v-skeleton-loader  type="card" /></v-col>
                    </v-row>
                </div>
                <div v-else>
                    <v-row class="px-12" justify="center" align="center">
                    <v-col
                      v-for="(artwork, i ) in gallery"
                      :key="'artwork-' + i"
                      cols="12"
                    >
                      <g-image style="width: 90%" :src="artwork.url" :alt="artwork.title" @click="getRef(artwork.user_id)" />
                      <div class="raleway-28-400 text-center text-capitalize">{{ artwork.title }}</div>
                    </v-col>
                  </v-row>
                </div>
                <div class="py-4" />
            </div>
        </v-container>
    </v-main>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async created () {
    this.$auth.getUsersInRole('artist')
        .then(artists => {
            Promise.all(artists.map(async (artist) => {
                await this.$imgdb.retrieveArtworks(artist.user_id, 'approved')
                    .then(found => {
                        if (found.total_count> 0) {
                            this.artists.push({
                                email: artist.email,
                                name: artist.name,
                                picture: artist.picture,
                                user_id: artist.user_id,
                                resources: found.resources.map(resource => resource.secure_url)
                            });
                            found.resources.forEach(resource => {
                                this.gallery.push({
                                    user_id: artist.user_id,
                                    url: resource.secure_url,
                                    title: resource.filename.replace(/_/g, ' ')
                                });
                            });
                        }
                    })
                    .catch(err => console.error(err))
            })).finally(()=> this.fetched = true)
        })
        .catch(err => console.error(err))
  },
  data () {
      return {
        fetched: false,
        artists: [],
        gallery: []
      }
  },
  methods: {
    getRef(user_id) {
      this.$db.getRef(user_id)
        .then(ref => {
          this.$db.getUserId(ref)
            .then(id => console.log(id))
            .catch(err => console.error(err))
        })
        .catch(err => console.error(err))
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