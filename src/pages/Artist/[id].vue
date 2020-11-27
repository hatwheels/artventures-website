<template>
  <Layout>
    <v-main>
      <!-- OK -->
      <v-container v-if="state === 0" class="pa-0 background-color-fafafa" fluid>
        <!-- Desktop -->
        <div class="hidden-sm-and-down py-12 px-12">
          <!-- Info -->
          <v-row justify="center" align="center">
            <v-col cols="auto">
              <div class="raleway-30-700 text-uppercase">{{ artist.firstName + ' ' + artist.lastName }}</div>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="8">
              <v-row justify="center" align="center">
                <v-col cols="auto">
                  <div class="raleway-18-400 text-justify">{{ artist.bio }}</div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="8">
              <v-divider></v-divider>
            </v-col>
          </v-row>

          <!-- Artworks -->
          <div
            class="px-12 pb-6 pt-8 text-center playfair-38-700"
          >
            {{ plainText.artworks[getLang] }}
          </div>
          <v-row class="pb-12 px-12" justify="start" align="start">
            <v-col class="pr-6" v-for="(column, j) in artist.columns" :key="'column' + j" cols="4">
              <v-card class="my-6 text-center" v-for="(artwork, i) in column" :key="'artwork-' + i">
                <v-img
                  :src="artwork.url"
                  :lazy-src="artwork.url.replace('artventures/image/upload/', 'artventures/image/upload/c_thumb,w_100/')"
                  :alt="artwork.title || 'Untitled'"
                  contain
                />
                <div class="d-flex justify-space-between">
                  <div>
                    <v-card-title v-if="artwork.title"
                      class="raleway-23-400 text-capitalize font-italic text-start pr-0"
                      v-text="artwork.title" />
                    <v-card-text class="raleway-18-400 text-start pr-0">
                      <div v-if="artwork.type" class="text-capitalize">{{ artwork.type[getLang] }}
                        <span v-if="artwork.size" class="text-lowercase"> - {{ artwork.size }}</span>
                      </div>
                      <div v-else-if="artwork.size" class="text-lowercase">{{ artwork.size }}</div>
                      <v-row v-if="artwork.tags.length > 0"
                        class="pt-2"
                        no-gutters
                        justify="start"
                        align="start"
                        style="width: 100%"
                      >
                        <v-col
                          class="nunito-12-400 text-capitalize pr-1"
                          cols="auto"
                          v-for="(tag, tagId) in artwork.tags" :key="'tag-' + tagId"
                        >
                          {{ tag }}<span v-if="tagId !== artwork.tags.length - 1">,</span>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </div>
                  <div class="d-flex flex-column align-end">
                    <v-card-actions>
                      <v-tooltip top color="black">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            icon
                            large
                            v-bind="attrs"
                            v-on="on"
                            @click="overlayDesktop = true; enlargedImg.url = artwork.url; enlargedImg.title = artwork.title"
                          >
                            <v-icon size="30">mdi-fullscreen</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ plainText.artworkZoom[getLang] }}</span>
                      </v-tooltip>
                    </v-card-actions>
                    <div class="pb-2 pr-4 text-end">
                      <div class="raleway-23-400" v-if="artwork.salePrice">{{ artwork.salePrice }}€</div>
                      <div class="raleway-18-400" v-if="artwork.rentPrice">
                        <span class="pr-1">{{ plainText.rentFor[getLang] }}</span>
                        {{ artwork.rentPrice }}
                        <span>{{ plainText.rentPerMonth[getLang] }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <!-- Mobile -->
        <div class="hidden-md-and-up">
          <!-- Info -->
          <v-row class="pt-12 px-12" justify="center" align="center">
            <v-col class="text-center" cols="auto">
              <div class="raleway-30-700 text-uppercase">{{ artist.firstName }}</div>
              <div class="raleway-30-700 text-uppercase">{{ artist.lastName }}</div>
            </v-col>
          </v-row>
          <v-row class="pb-6" justify="center" align="center">
            <v-col class="text-justify" cols="10">
              <div class="raleway-18-400">{{ artist.bio }}</div>
            </v-col>
            <v-col cols="10">
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <!-- Artworks -->
          <div
            class="py-6 text-center playfair-38-700"
          >
            {{ plainText.artworks[getLang] }}
          </div>
          <v-row
            class="px-6"
            v-for="(artwork, i ) in artist.gallery" :key="'artwork-mobile-' + i"
            justify="center" align="center"
          >
            <v-col cols="12">
              <v-card>
                <v-img
                  :src="artwork.url"
                  :lazy-src="artwork.url.replace('artventures/image/upload/', 'artventures/image/upload/c_thumb,w_100/')"
                  :alt="artwork.title || 'Untitled'"
                  contain
                />
                <div class="d-flex justify-space-between">
                  <div>
                    <v-card-title v-if="artwork.title"
                      class="raleway-16-400 text-capitalize font-italic text-start pr-0"
                      v-text="artwork.title" />
                    <v-card-text class="raleway-12-400 text-start pr-0">
                      <div v-if="artwork.type" class="text-capitalize">{{ artwork.type[getLang] }}
                        <span v-if="artwork.size" class="text-lowercase"> - {{ artwork.size }}</span>
                      </div>
                      <div v-else-if="artwork.size" class="text-lowercase">{{ artwork.size }}</div>
                      <v-row v-if="artwork.tags.length > 0"
                        class="pt-2"
                        no-gutters
                        justify="start"
                        align="start"
                        style="width: 100%"
                      >
                        <v-col
                          class="nunito-12-400 text-capitalize pr-1"
                          cols="auto"
                          v-for="(tag, tagId) in artwork.tags" :key="'tag-mobile-' + tagId"
                        >
                          {{ tag }}<span v-if="tagId !== artwork.tags.length - 1">,</span>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </div>
                  <div class="d-flex flex-column align-end">
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
                        <span>{{ plainText.artworkZoom[getLang] }}</span>
                      </v-tooltip>
                    </v-card-actions>
                    <div class="pb-2 pr-4 text-end">
                      <div class="raleway-16-400" v-if="artwork.salePrice">{{ artwork.salePrice }}€</div>
                      <div class="raleway-12-400" v-if="artwork.rentPrice">
                        <span class="pr-1">{{ plainText.rentFor[getLang] }}</span>
                        {{ artwork.rentPrice }}
                        <span>{{ plainText.rentPerMonth[getLang] }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <!-- Scroll to Top -->
        <scroll-to-top />

        <!-- Desktop Overlay -->
        <v-overlay class="hidden-sm-and-down" :value="overlayDesktop">
          <v-row no-gutters>
            <v-col>
              <v-img
                class="rounded"
                :src="enlargedImg.url"
                :lazy-src="enlargedImg.url.replace('artventures/image/upload/', 'artventures/image/upload/c_thumb,w_100/')"
                :alt="enlargedImg.title || 'Untitled'"
                max-height="98vh"
                max-width="95vw"
                contain
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
                <span>{{ plainText.close[getLang] }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-overlay>
        <!-- Mobile Overlay -->
        <v-dialog class="hidden-md-and-up" v-model="overlayMobile" fullscreen persistent hide-overlay no-click-animation>
          <div style="width: 100vw; height: 100vh">
            <v-img
              class="rounded"
              :src="enlargedImg.url"
              :lazy-src="enlargedImg.url.replace('artventures/image/upload/', 'artventures/image/upload/c_thumb,w_100/')"
              :alt="enlargedImg.title || 'Untitled'"
              contain
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
              <p class="text-center" :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'">
                {{ plainText.error404[getLang] }}
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
      <!-- Error -->
      <v-container v-else class="pa-0 background-color-fafafa" fluid>
        <v-card class="center-viewport" color="#fafafa" flat>
          <v-row style="height: 100%" justify="center" align="center">
            <v-col>
              <p class="text-center" :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'">
                {{ plainText.error[getLang] }}
              </p>
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
  components: {
    ScrollToTop: () => import("~/components/ScrollToTop.vue")
  },
  data () {
    return {
      /*  -2: Error
          -1: Not found
          0:  OK
          1:  Loading */
      state: 1,
      artist: {
        userId: '',
        fistName: 'Artist',
        lastName: 'Page',
        name: 'Artist Page',
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
      plainText: {
        artworks: {
          en: "Artworks",
          gr: "Εργα Τέχνης"
        },
        artworkZoom: {
          gr: 'Μεγέθυνση',
          en: 'Enlarge'
        },
        type: {
          painting: {
            gr: "Πίνακας",
            en: "Painting"
          },
          sculpture: {
            gr: "Γλυπτό",
            en: "Sculpture"
          }
        },
        rentFor: {
          gr: 'Ενοικίαση',
          en: 'Rent'
        },
        rentPerMonth: {
          gr: '€/μ',
          en: '€/m'
        },
        close: {
          gr: 'Κλείσιμο',
          en: 'Close'
        },
        error404: {
          en: 'Oops, page not found.',
          gr:  'Ωχ, η σελίδα δεν βρέθηκε.'
        },
        error: {
          en: 'Oops, an error occured. Please try again later',
          gr:  'Ωχ, κάποιο σφάλμα προέκυψε. Παρακαλώ δοκιμάστε αργότερα.'
        }
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
              if (artist.hasOwnProperty("given_name")) {
                this.artist.firstName = artist.given_name;
              } else {
                this.artist.firstName = artist.name.split(" ")[0];
              }
              if (artist.hasOwnProperty("family_name")) {
                this.artist.lastName = artist.family_name;
              } else {
                this.artist.lastName = artist.name.split(" ")[1];
              }
              this.artist.name = artist.name;
              this.artist.pic = artist.hasOwnProperty("picture_large") ? artist.picture_large : artist.picture;
              if (artist.hasOwnProperty("user_metadata") && artist.user_metadata.hasOwnProperty("bio")) {
                this.artist.bio = artist.user_metadata.bio;
              }
              this.$imgdb.retrieveArtworks(artist.user_id, 'approved')
                .then(found => {
                  if (found.total_count> 0) {
                    // found approved artworks
                    found.resources.forEach(resource => {
                      var title = '';
                      var rentPrice = '';
                      var salePrice = '';
                      var size = '';
                      var type = '';
                      var tags = resource.hasOwnProperty('tags') ? resource.tags : [];
                      if (resource.hasOwnProperty('context')) {
                        // Title
                        if (resource.context.hasOwnProperty('caption')) {
                          title = resource.context.caption;
                          title = title.toLowerCase();
                        }
                        // Rent, Sale Price
                        if (resource.context.hasOwnProperty('rent_price')) {
                          rentPrice = resource.context.rent_price
                        }
                        if (resource.context.hasOwnProperty('sale_price')) {
                          salePrice = resource.context.sale_price
                        }
                        if (resource.context.hasOwnProperty('type')) {
                          type = this.plainText.type[resource.context.type];
                          if (type.en.toLowerCase() === 'sculpture') {
                            // it's a sculpture
                            if (resource.context.hasOwnProperty('dimension') &&
                                resource.context.hasOwnProperty('height') &&
                                resource.context.hasOwnProperty('width') &&
                                resource.context.hasOwnProperty('depth')) {
                              size = resource.context.height + ' x ' + resource.context.width + ' x ' +
                                resource.context.depth + ' ' + resource.context.dimension
                            }
                          } else if (type.en.toLowerCase() === 'painting') {
                            // it's a painting
                            if (resource.context.hasOwnProperty('dimension') &&
                                resource.context.hasOwnProperty('height') &&
                                resource.context.hasOwnProperty('width')) {
                              size = resource.context.height + ' x ' + resource.context.width + ' ' +
                                resource.context.dimension
                            }
                          }
                        }
                      }
                      this.artist.gallery.push({
                        url: resource.secure_url,
                        title: title,
                        type: type,
                        rentPrice: rentPrice,
                        salePrice: salePrice,
                        size: size,
                        tags: tags
                      });
                    });
                    var count = 0;
                    this.artist.gallery.forEach(artwork => {
                      this.artist.columns[count].push(artwork);
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
  },
  metaInfo() {
    return {
      titleTemplate: this.artist.name + " — Artventures",
      meta: [{ name: "description", content: "Gallery" }],
    };
  },
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