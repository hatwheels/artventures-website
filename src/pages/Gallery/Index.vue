<template>
  <Layout>
    <v-main>
        <v-container class="pa-0 background-color-fafafa" fluid>
            <div class="py-10" />
            <div class="playfair-38-700 text-center">Gallery</div>
            <div class="py-4" />
            <!-- Desktop -->
            <div class="hidden-sm-and-down">
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
                  <div  v-if="gallery.length > 0">
                    <v-row class="px-12" justify="start" align="start">
                      <v-col class="pr-6" v-for="(column, j) in columns" :key="'column' + j" cols="4">
                        <v-card class="my-6 text-center" v-for="(artwork, i) in column" :key="'artwork-' + i">
                          <g-image
                            :src="artwork.url"
                            :alt="artwork.title || 'Untitled'"
                            style="width: 100%;"
                          />
                          <div class="d-flex justify-space-between">
                            <div>
                              <v-card-title v-if="artwork.title"
                                class="raleway-25-400 text-capitalize text-start"
                                v-text="artwork.title" />
                              <v-card-subtitle v-if="artwork.artist_name"
                                class="raleway-25-400 text-capitalize text-start"
                                v-text="artwork.artist_name" />
                              <v-card-text class="raleway-18-400 text-start">
                                <div v-if="artwork.size" v-text="artwork.size" />
                                <div v-if="artwork.type" v-text="artwork.type" />
                              </v-card-text>
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
                                  <v-btn icon v-bind="attrs" v-on="on" @click="getRef(artwork.user_id)">
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
            </div>
            <!-- Mobile -->
            <div class="hidden-md-and-up py-4">
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
                          :alt="artwork.title || 'Untitled'"
                          fit="contain"
                          style="width: 100%"
                        />
                        <div class="d-flex justify-space-between">
                          <div>
                            <v-card-title v-if="artwork.title"
                              class="raleway-18-400 text-capitalize text-start"
                              v-text="artwork.title" />
                            <v-card-subtitle v-if="artwork.artist_name"
                              class="raleway-16-400 text-capitalize text-start"
                              v-text="artwork.artist_name" />
                            <v-card-text class="raleway-13-400 text-start">
                              <div v-if="artwork.type" v-text="artwork.type" />
                              <div v-if="artwork.size" v-text="artwork.size" />
                            </v-card-text>
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
                                <v-btn icon v-bind="attrs" v-on="on" @click="getRef(artwork.user_id)">
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
            </div>
            <div class="py-4" />
            <!-- Scroll to Top -->
            <scroll-to-top />
        </v-container>
        <!-- Desktop Overlay -->
        <v-overlay class="hidden-sm-and-down" :value="overlayDesktop">
          <v-row no-gutters>
            <v-col>
              <g-image
                class="rounded"
                :src="enlargedImg.url"
                :alt="enlargedImg.title || 'Untitled'"
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
                    @click="enlargedImg.url = ''; enlargedImg.title = ''; overlayDesktop = false;"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </template>
                <span>{{ getLang === 'gr' ? 'Κλείσιμο' : "Close" }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-overlay>
        <!-- Mobile Overlay -->
        <v-dialog class="hidden-md-and-up" v-model="overlayMobile" fullscreen persistent hide-overlay no-click-animation>
          <div style="width: 100vw; height: 100vh">
            <g-image
              class="rounded"
              :src="enlargedImg.url"
              :alt="enlargedImg.title || 'Untitled'"
              fit="contain"
              @click="enlargedImg.url = ''; enlargedImg.title = ''; overlayMobile = false;"
            />
          </div>
        </v-dialog>
        <!-- Wait routing to artist's page -->
        <v-overlay :value="goToArtist" color="#FAFAFA" opacity="0.70">
          <img src="../../../static/loading.svg" width="300vw" alt="loading">
        </v-overlay>
    </v-main>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {
    ScrollToTop: () => import("~/components/ScrollToTop.vue")
  },
  async created () {
    this.$auth.getMgUsersInRole('artist')
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
                              var title = '';
                              var size = '';
                              var type = '';
                              if (resource.hasOwnProperty('context')) {
                                title = resource.context.caption;
                                if (resource.context.hasOwnProperty('type') && resource.context.type === 'sculpture') {
                                  // it's a sculpture
                                  type = 'Sculpture'
                                  if (resource.context.hasOwnProperty('dimension') &&
                                      resource.context.hasOwnProperty('height') &&
                                      resource.context.hasOwnProperty('width') &&
                                      resource.context.hasOwnProperty('depth')) {
                                    size = resource.context.height + ' x ' + resource.context.width + ' x ' +
                                      resource.context.depth + ' ' + resource.context.dimension
                                  }
                                } else {
                                  // it's a painting
                                  if (resource.context.hasOwnProperty('dimension') &&
                                      resource.context.hasOwnProperty('height') &&
                                      resource.context.hasOwnProperty('width')) {
                                    size = resource.context.height + ' x ' + resource.context.width + ' ' +
                                      resource.context.dimension
                                  }
                                }
                              }
                              this.gallery.push({
                                  user_id: artist.user_id,
                                  artist_name: artist.name,
                                  url: resource.secure_url,
                                  title: title,
                                  size: size,
                                  type: type
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
        .catch(err => {
          this.fetched = true; console.error(err);
        })
  },
  data () {
      return {
        fetched: false,
        artists: [],
        gallery: [],
        columns: [[], [], []],
        overlayDesktop: false,
        overlayMobile: false,
        enlargedImg: {
          url: "",
          title: ""
        },
        goToArtist: false,
      }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  methods: {
    getRef(user_id) {
      this.goToArtist = true;
      this.$db.getRef(user_id)
        .then(ref => {
          // Fetched artist's reference, go to artist's page.
          this.$router.push({ path: '/artist/' + ref });
          this.goToArtist = false;
        })
        .catch(err => {
          console.error(err);
          this.goToArtist = false;
        })
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

<style scoped>
.center-viewport {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>