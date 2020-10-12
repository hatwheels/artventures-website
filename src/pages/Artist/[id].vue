<template>
  <Layout>
    <v-main>
      <!-- OK -->
      <v-container v-if="state === 0" class="background-color-fafafa" fluid>
        <!-- Info -->
        <!-- Desktop -->
        <div class="hidden-sm-and-down py-12 px-12">
          <v-row justify="center" align="center">
            <v-col cols="4">
              <div class="d-flex">
                <g-image
                  class="mx-3 rounded"
                  :src="artist.pic"
                  alt="artist pic"
                  fit="contain"
                  style="height: 100px"
                />
                <div>
                  <div class="raleway-30-700 text-uppercase">{{ artist.firstName }}</div>
                  <div class="raleway-30-700 text-uppercase">{{ artist.lastName }}</div>
                </div>
              </div>
            </v-col>
            <v-col cols="4">
              <div class="raleway-18-400">{{ artist.bio }}</div>
            </v-col>
          </v-row>
          <!-- Artworks -->
          <div
            class="px-12 py-6 text-center playfair-38-700"
          >
            {{getLang === 'gr' ? 'Εργα Τέχνης' : 'Artworks'}}
          </div>
          <v-row class="hidden-sm-and-down pb-12 px-12" justify="start" align="start">
            <v-col class="pr-6" v-for="(column, j) in artist.columns" :key="'column' + j" cols="4">
              <v-card class="my-6 text-center" v-for="(artwork, i) in column" :key="'artwork-' + i">
                <g-image
                  :src="artwork.url"
                  :alt="artwork.title"
                  style="width: 100%;"
                />
                <div class="d-flex justify-space-between">
                  <v-card-title
                    class="raleway-28-400 text-capitalize"
                    v-text="artwork.title" />
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
                  </v-card-actions>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <!-- Mobile -->
        <div class="hidden-md-and-up">
          <v-row class="pt-12 px-12" justify="center" align="center">
            <v-col cols="auto">
              <g-image
                class="mx-3 rounded"
                :src="artist.pic"
                alt="artist pic"
                fit="contain"
                style="height: 100px;"
              />
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col class="text-center" cols="auto">
              <div class="raleway-30-700 text-uppercase">{{ artist.firstName }}</div>
              <div class="raleway-30-700 text-uppercase">{{ artist.lastName }}</div>
            </v-col>
          </v-row>
          <v-row class="pb-12" justify="center" align="center">
            <v-col class="text-center" cols="auto">
              <div class="raleway-18-400">{{ artist.bio }}</div>
            </v-col>
          </v-row>
          <!-- Artworks -->
          <div
            class="px-12 py-6 text-center playfair-38-700"
          >
            {{getLang === 'gr' ? 'Εργα Τέχνης' : 'Artworks'}}
          </div>
          <v-row class="hidden-md-and-up px-12" justify="center" align="center">
            <v-col v-for="(artwork, i ) in artist.gallery" :key="'artwork-' + i" cols="12">
              <v-card>
                <g-image
                  :src="artwork.url"
                  :alt="artwork.title"
                  fit="contain"
                  style="width: 100%"
                />
                <div class="d-flex justify-space-between">
                  <v-card-title
                    class="raleway-18-400 text-capitalize"
                    v-text="artwork.title" />
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
                  </v-card-actions>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- Desktop Overlay -->
        <v-overlay class="hidden-sm-and-down" :value="overlayDesktop">
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
              :alt="enlargedImg.title"
              fit="contain"
              @click="enlargedImg.url = ''; enlargedImg.title = ''; overlayMobile = false;"
            />
          </div>
        </v-dialog>
      </v-container>

      <!-- Loading -->
      <v-overlay v-else-if="state === 1" color="#FAFAFA" opacity="0.70">
        <img src="../../../static/loading.svg" width="300vw" alt="loading">
      </v-overlay>
      <!-- Not found -->
      <v-container v-else-if="state === -1" class="pa-0 background-color-fafafa" fluid>
        <v-card class="center-viewport" color="#fafafa" flat>
          <v-row style="height: 100%" justify="center" align="center">
            <v-col>
              <p class="text-center" :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'">404</p>
              <p class="text-center" :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'">{{ msg404[getLang] }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
      <!-- Error -->
      <v-container v-else class="pa-0 background-color-fafafa" fluid>
        <v-card class="center-viewport" color="#fafafa" flat>
          <v-row style="height: 100%" justify="center" align="center">
            <v-col>
              <p class="text-center" :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'">{{ msgError[getLang] }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-main>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data () {
    return {
      /*  -2: Error
          -1: Not found
          0:  OK
          1:  Loading */
      state: 1,
      artist: {
        userId: '',
        fistName: '',
        lastName: '',
        pic: '',
        bio: '',
        gallery: [],
        columns: [[], [], []]
      },
      overlayDesktop: false,
      overlayMobile: false,
      enlargedImg: {
        url: "",
        title: ""
      },
      msg404: {
        en: 'Oops, page not found.',
        gr:  'Ωχ, η σελίδα δεν βρέθηκε.'
      },
      msgError: {
        en: 'Oops, an error occured. Please try again later',
        gr:  'Ωχ, κάποιο σφάλμα προέκυψε. Παρακαλώ δοκιμάστε αργότερα.'
      }
    }
  },
  mounted () {
    this.getUserId(this.$route.params.id);
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  methods: {
    getUserId(ref) {
      this.$db.getUserId(ref)
        .then(id => {
          this.$auth.getMgUser(id)
            .then(artist => {
              this.artist.firstName = artist.given_name;
              this.artist.lastName = artist.family_name;
              this.artist.pic = artist.hasOwnProperty("picture_large") ? artist.picture_large : artist.picture;
              if (artist.hasOwnProperty("user_metadata") && artist.user_metadata.hasOwnProperty("bio")) {
                this.artist.bio = artist.user_metadata.bio;
              }
              this.$imgdb.retrieveArtworks(artist.user_id, 'approved')
                .then(found => {
                  if (found.total_count> 0) {
                    // found approved artworks
                    found.resources.forEach(resource => {
                      this.artist.gallery.push({
                        url: resource.secure_url,
                        title: resource.filename.replace(/_/g, ' ')
                      });
                    });
                    var count = 0;
                    this.artist.gallery.forEach(artwork => {
                      switch (count) {
                        case 0:
                          this.artist.columns[0].push(artwork);
                          break;
                        case 1:
                          this.artist.columns[1].push(artwork);
                          break;
                        case 2:
                          this.artist.columns[2].push(artwork);
                          break;
                      }
                      count = (count + 1) % 3;
                    });
                    this.state = 0; // OK
                  } else {
                    // Artist has no approved artworks, designate as not found
                    this.state = -1;
                  }
                })
                .catch(() => {
                  // Error while fetching artworks occured
                  this.state = -2;
                })
            })
            .catch(err => {
              if (err === 404) {
                this.state = -1; // Simple user, designate as not found
              } else {
                this.state = -2; // Error
              }
            })
        })
        .catch(() => {
          this.state = -1; // Not found
        })
    },
  }
}
</script>

<style scoped>
.center-viewport {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>