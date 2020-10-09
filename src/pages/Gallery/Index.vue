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
                  <div v-if="gallery.length > 0">
                    <v-row class="px-12" justify="start" align="start">
                      <v-col class="pr-6" v-for="(column, j) in columns" :key="'column' + j" cols="4">
                        <v-card class="my-6 text-center" v-for="(artwork, i) in column" :key="'artwork-' + i">
                          <g-image
                            :src="artwork.url"
                            :alt="artwork.title"
                            style="width: 100%;"
                          />
                          <div class="d-flex justify-space-between">
                            <div>
                              <v-card-title
                                class="raleway-28-400 text-capitalize"
                                v-text="artwork.title" />
                              <v-card-subtitle
                                class="raleway-25-400 text-capitalize text-start"
                                v-text="artwork.artist_name" />
                            </div>
                            <v-card-actions>
                              <v-tooltip top color="black">
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                    icon
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="overlayDesktop = true; enlargedImg.url = artwork.url; enlargedImg.title = artwork.title"
                                  >
                                    <v-icon>mdi-fullscreen</v-icon>
                                  </v-btn>
                                </template>
                                <span>{{ getLang === 'gr' ? 'Μεγέθυνση' : 'Enlarge' }}</span>
                              </v-tooltip>
                              <v-tooltip top color="black">
                                <template v-slot:activator="{ on, attrs }">
                                  <!-- <v-btn icon @click="getRef(artwork.user_id)"> -->
                                  <v-btn icon v-bind="attrs" v-on="on">
                                    <v-icon>mdi-link</v-icon>
                                  </v-btn>
                                </template>
                                <span>{{ getLang === 'gr' ? 'Σελίδα καλλιτέχνη' : "Artist's page" }}</span>
                              </v-tooltip>
                            </v-card-actions>
                          </div>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>
                  <div v-else class="center-viewport">
                    <v-row style="height: 100%;" justify="center" align="center">
                      <v-col>
                        <p
                          class="text-center"
                          :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                        >{{ 
                            getLang === 'gr' ?
                            'Ωχ, κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα' :
                            'Oops, something went wrong. Please reload the page later.'
                          }}</p>
                      </v-col>
                    </v-row>
                  </div>
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
                  <div v-if="gallery.length > 0">
                    <v-row class="px-12" justify="center" align="center">
                      <v-col v-for="(artwork, i ) in gallery" :key="'artwork-' + i" cols="12">
                        <v-card>
                          <g-image
                            :src="artwork.url"
                            :alt="artwork.title"
                            fit="contain"
                            style="width: 100%"
                          />
                          <div class="d-flex justify-space-between">
                            <div>
                              <v-card-title
                                class="raleway-28-400 text-capitalize"
                                v-text="artwork.title" />
                              <v-card-subtitle
                                class="raleway-25-400 text-capitalize text-start"
                                v-text="artwork.artist_name" />
                            </div>
                            <v-card-actions>
                              <v-tooltip top color="black">
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                    icon
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="overlayMobile = true; enlargedImg.url = artwork.url; enlargedImg.title = artwork.title"
                                  >
                                    <v-icon>mdi-fullscreen</v-icon>
                                  </v-btn>
                                </template>
                                <span>{{ getLang === 'gr' ? 'Μεγέθυνση' : 'Enlarge' }}</span>
                              </v-tooltip>
                              <v-tooltip top color="black">
                                <template v-slot:activator="{ on, attrs }">
                              <!-- <v-btn icon @click="getRef(artwork.user_id)"> -->
                                  <v-btn icon v-bind="attrs" v-on="on">
                                    <v-icon>mdi-link</v-icon>
                                  </v-btn>
                                </template>
                                <span>{{ getLang === 'gr' ? 'Σελίδα καλλιτέχνη' : "Artist's page" }}</span>
                              </v-tooltip>
                            </v-card-actions>
                          </div>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>
                  <div v-else class="center-viewport">
                    <v-row style="height: 100%;" justify="center" align="center">
                      <v-col>
                        <p
                          class="text-center"
                          :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                        >{{ 
                            getLang === 'gr' ?
                            'Ωχ, κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα' :
                            'Oops, something went wrong. Please reload the page later.'
                          }}</p>
                      </v-col>
                    </v-row>
                  </div>
                </div>
                <div class="py-4" />
            </div>
        </v-container>
        <v-overlay class="hidden-sm-and-down" :value="overlayDektop">
          <v-row no-gutters>
            <v-col>
              <g-image
                class="rounded"
                :src="enlargedImg.url"
                :alt="enlargedImg.title"
                style="max-height: 98vh; max-width 95vw;"
                fit="contain"
              />
            </v-col>
            <v-col>
              <v-tooltip right color="black">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-on="on"
                    v-bind="attrs"
                    @click="enlargedImg.url = ''; enlargedImg.title = ''; overlayDektop = false;"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </template>
                <span>{{ getLang === 'gr' ? 'Κλείσιμο' : "Close" }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-overlay>
        <v-dialog class="hidden-md-and-up" v-model="overlayMobile" fullscreen persistent hide-overlay no-click-animation>
          <div style="width: 100vw; height: 100vh">
            <g-image
              class="rounded"
              :src="enlargedImg.url"
              :alt="enlargedImg.title"
              fit="contain"
              @click="enlargedImg.url = ''; enlargedImg.title = ''; overlayMobile = false;"
            />
          </div>
        </v-dialog>
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
                                    artist_name: artist.name,
                                    url: resource.secure_url,
                                    title: resource.filename.replace(/_/g, ' ')
                                });
                            });
                        }
                    })
                    .catch(err => console.error(err))
            })).finally(()=> {
              var count = 0;
              this.gallery.forEach(artwork => {
                switch (count) {
                  case 0:
                    this.columns[0].push(artwork);
                    break;
                  case 1:
                    this.columns[1].push(artwork);
                    break;
                  case 2:
                    this.columns[2].push(artwork);
                    break;
                }
                count = (count + 1) % 3;
                
              });
              this.fetched = true;
            })
        })
        .catch(err => console.error(err))
  },
  data () {
      return {
        fetched: false,
        artists: [],
        gallery: [],
        columns: [[], [], []],
        overlayDektop: false,
        overlayMobile: false,
        enlargedImg: {
          url: "",
          title: ""
        },
      }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  methods: {
    // getRef(user_id) {
    //   this.$db.getRef(user_id)
    //     .then(ref => {
    //       this.$db.getUserId(ref)
    //         .then(id => console.log(id))
    //         .catch(err => console.error(err))
    //     })
    //     .catch(err => console.error(err))
    // }
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

<style>
.center-viewport {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>