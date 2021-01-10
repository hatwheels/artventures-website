<template>
  <UserLayout>
    <v-main>
      <v-container class="pa-0 background-color-fafafa" fluid>
        <!-- Favorite Artworks -->
        <div class="py-10" />
        <div
          id="favorite"
          class="text-center"
          :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
          v-html="getLang === 'gr' ? 'Αγαπημένα μου' : 'My Favorites'"
        />
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
            <v-row class="px-12 mx-12" justify="center" align="center">
              <v-col cols="2"><v-skeleton-loader type="actions" /></v-col>
            </v-row>
          </div>
          <div v-else>
            <div v-if="userFavorites.length > 0">
              <v-row class="px-12" justify="start" align="start">
                <v-col
                  class="pr-6"
                  v-for="(column, j) in columns[page.desktop - 1]"
                  :key="'column' + j"
                  cols="4"
                >
                  <v-card
                    class="my-6 text-center"
                    v-for="(artwork, i) in column"
                    :key="'artwork-' + i"
                  >
                    <v-img
                      :src="artwork.url"
                      :lazy-src="
                        artwork.url.replace(
                          'artventures/image/upload/',
                          'artventures/image/upload/c_thumb,w_100/'
                        )
                      "
                      :alt="artwork.title || 'Untitled'"
                      contain
                    />
                    <v-row justify="space-between">
                      <v-col>
                        <v-card-title
                          v-if="artwork.title"
                          class="raleway-23-400 text-capitalize font-italic text-start pr-0 pb-0"
                          v-text="artwork.title"
                        />
                        <div />
                        <v-card-subtitle
                          v-if="artwork.artist_name"
                          class="raleway-25-400 text-capitalize text-start pr-0 pt-2"
                          v-text="artwork.artist_name"
                        />
                        <v-card-text class="raleway-18-400 text-start pr-0">
                          <div v-if="artwork.type" class="text-capitalize">
                            {{ artwork.type[getLang] }}
                            <span v-if="artwork.size" class="text-lowercase">
                              - {{ artwork.size }}</span
                            >
                          </div>
                          <div v-else-if="artwork.size" class="text-lowercase">
                            {{ artwork.size }}
                          </div>
                          <v-row
                            v-if="artwork.tags.length > 0"
                            class="pt-2"
                            no-gutters
                            justify="start"
                            align="start"
                            style="width: 100%"
                          >
                            <v-col
                              class="nunito-12-400 text-capitalize text-justify pr-1"
                              cols="auto"
                              v-for="(tag, tagId) in artwork.tags"
                              :key="'tag-' + tagId"
                            >
                              {{ tag }}
                              <span v-if="tagId !== artwork.tags.length - 1"
                                >,</span
                              >
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-col>
                      <v-col cols="auto" class="d-flex flex-column align-end">
                        <v-card-actions>
                          <v-tooltip top color="black">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                large
                                v-bind="attrs"
                                v-on="on"
                                :loading="artwork.isProcFavorite"
                                @click="toggleFavorite(artwork)"
                              >
                                <v-icon
                                  v-if="!checkIsFavorite(artwork.public_id)"
                                  size="30"
                                  >mdi-heart-outline</v-icon
                                >
                                <v-icon v-else size="30" color="pink lighten-3"
                                  >mdi-heart</v-icon
                                >
                              </v-btn>
                            </template>
                            <span>{{ plainText.heart[getLang] }}</span>
                          </v-tooltip>
                          <v-tooltip top color="black">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                large
                                v-bind="attrs"
                                v-on="on"
                                @click="
                                  overlayDesktop = true;
                                  enlargedImg.url = artwork.url;
                                  enlargedImg.title = artwork.title;
                                "
                              >
                                <v-icon size="30">mdi-fullscreen</v-icon>
                              </v-btn>
                            </template>
                            <span>{{ plainText.artworkZoom[getLang] }}</span>
                          </v-tooltip>
                          <v-tooltip top color="black">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                v-bind="attrs"
                                v-on="on"
                                @click="getRefArtist(artwork.user_id)"
                              >
                                <v-icon size="30">mdi-link</v-icon>
                              </v-btn>
                            </template>
                            <span>{{ plainText.artistPage[getLang] }}</span>
                          </v-tooltip>
                        </v-card-actions>
                        <div class="pb-2 pr-4 text-end">
                          <div class="raleway-23-400" v-if="artwork.salePrice">
                            {{ artwork.salePrice }}€
                          </div>
                          <!-- <div class="raleway-18-400" v-if="artwork.rentPrice">
                            <span class="pr-1">{{ plainText.rentFor[getLang] }}</span>
                            {{ artwork.rentPrice }}
                            <span>{{ plainText.rentPerMonth[getLang] }}</span>
                            </div> -->
                        </div>
                        <div
                          v-if="artwork.likes !== null"
                          class="pr-4 mt-auto montserrat-12-400-italic"
                        >
                          {{ artwork.likes }} LIKES
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </div>
            <div v-else class="center-viewport">
              <v-row style="height: 100%" justify="center" align="center">
                <v-col>
                  <p
                    class="text-center"
                    :class="
                      getLang === 'gr'
                        ? 'noto-16-400-1p6em'
                        : 'raleway-16-400-1p6em'
                    "
                  >
                    {{ plainText.error[getLang] }}
                  </p>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
        <!-- Pagination Desktop -->
        <v-row
          v-if="totalPages.desktop > 1"
          class="hidden-sm-and-down"
          align="center"
          justify="center"
          no-gutters
        >
          <v-col cols="6">
            <v-pagination
              v-model="page.desktop"
              :length="totalPages.desktop"
              color="#333333"
              @input="$vuetify.goTo('#favorite')"
              @next="$vuetify.goTo('#favorite')"
              @previous="$vuetify.goTo('#favorite')"
            >
            </v-pagination>
          </v-col>
        </v-row>
        <!-- Pagination Mobile -->
        <v-row
          v-if="totalPages.mobile > 1"
          class="hidden-md-and-up"
          align="center"
          justify="center"
          no-gutters
        >
          <v-col cols="10">
            <v-pagination
              v-model="page.mobile"
              :length="totalPages.mobile"
              color="#333333"
              @input="$vuetify.goTo('#favorite')"
              @next="$vuetify.goTo('#favorite')"
              @previous="$vuetify.goTo('#favorite')"
            >
            </v-pagination>
          </v-col>
        </v-row>
        <div class="py-4" />
        <!-- Following Artists -->
        <div class="background-color-dddddd custom-divider"></div>
        <div
          class="pb-10 pt-5 my-0 text-center"
          :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
          v-html="getLang === 'gr' ? 'Ακολουθίες μου' : 'My Follows'"
        />
        <!-- Scroll to Top -->
        <scroll-to-top />
      </v-container>
      <!-- Desktop Overlay -->
      <v-overlay class="hidden-sm-and-down" :value="overlayDesktop">
        <v-row no-gutters>
          <v-col>
            <v-img
              class="rounded"
              :src="enlargedImg.url"
              :lazy-src="
                enlargedImg.url.replace(
                  'artventures/image/upload/',
                  'artventures/image/upload/c_thumb,w_100/'
                )
              "
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
                  @click="
                    enlargedImg.url = '';
                    enlargedImg.title = '';
                    overlayDesktop = false;
                  "
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
      <v-dialog
        class="hidden-md-and-up"
        v-model="overlayMobile"
        fullscreen
        persistent
        hide-overlay
        no-click-animation
      >
        <div style="width: 100vw; height: 100vh">
          <v-img
            class="rounded"
            :src="enlargedImg.url"
            :lazy-src="
              enlargedImg.url.replace(
                'artventures/image/upload/',
                'artventures/image/upload/c_thumb,w_100/'
              )
            "
            :alt="enlargedImg.title || 'Untitled'"
            contain
            @click="
              enlargedImg.url = '';
              enlargedImg.title = '';
              overlayMobile = false;
            "
          />
        </div>
      </v-dialog>
      <!-- Wait routing to artist's page -->
      <v-overlay :value="goToArtist" color="#FAFAFA" opacity="0.70">
        <img src="../../../static/loading.svg" width="300vw" alt="loading" />
      </v-overlay>
    </v-main>
  </UserLayout>
</template>

<script>
import { mapGetters } from "vuex";

const toPublicIdNoPath = (publicId, artworkState) => {
  return publicId
    .slice(publicId.indexOf(artworkState))
    .replace(artworkState, "");
};

export default {
  components: {
    ScrollToTop: () => import("~/components/ScrollToTop.vue"),
  },
  data() {
    return {
      fetched: false,
      page: {
        desktop: 1,
        mobile: 1,
      },
      totalPages: {
        desktop: 0,
        mobile: 0,
      },
      artworksPerPage: {
        desktop: 24,
        mobile: 12,
      },
      goToArtist: false,
      overlayDesktop: false,
      overlayMobile: false,
      enlargedImg: {
        url: "",
        title: "",
      },
      plainText: {
        gallery: {
          gr: "Γκαλερί",
          en: "Gallery",
        },
        artistPage: {
          gr: "Σελίδα καλλιτέχνη",
          en: "Artist's page",
        },
        artworkZoom: {
          gr: "Μεγέθυνση",
          en: "Enlarge",
        },
        heart: {
          gr: "Μου αρέσει",
          en: "Like",
        },
        type: {
          painting: {
            gr: "Πίνακας",
            en: "Painting",
          },
          sculpture: {
            gr: "Γλυπτό",
            en: "Sculpture",
          },
        },
        rentFor: {
          gr: "Ενοικίαση",
          en: "Rent",
        },
        rentPerMonth: {
          gr: "€/μ",
          en: "€/m",
        },
        close: {
          gr: "Κλείσιμο",
          en: "Close",
        },
        error: {
          gr: "Ωχ, κάτι πήγε στραβά. Παρακαλώ προσπαθήστε αργότερα.",
          en: "Oops, something went wrong. Please reload the page later.",
        },
      },
      // Favorite Artworks
      userFavorites: [],
      // Gallery array for mobile view
      gallery: [], // [[], [], [], ...]
      // Gallery array for the desktop view
      columns: [[], [], []], // [ [[], [], []], [[], [], []], [[], [], []], ... ]
      userFollows: [],
    };
  },
  mounted() {
    if (this.$auth.user) {
      this.getUserFavorites();
      this.getUserFollows();
    }
  },
  computed: {
    ...mapGetters(["getLang"]),
  },
  methods: {
    getRefArtist(artist_id) {
      this.goToArtist = true;
      this.$db
        .getRef(artist_id)
        .then((ref) => {
          // Fetched artist's reference, go to artist's page.
          this.$router.push({ path: "/artist/" + ref });
          this.goToArtist = false;
        })
        .catch((err) => (this.goToArtist = false));
    },
    async getUserFavorites() {
      return await new Promise(async (resolve, reject) => {
        this.fetched = false;
        let favorites;
        try {
          favorites = await this.$db.getFavorites(this.$auth.user.sub);
          await Promise.all(
            favorites.map(async (favorite) => {
              let artist_name;
              try {
                artist_name = await this.$auth.getMgUser(favorite[0]);
                artist_name = artist_name.name
              } catch {
                artist_name = "";
              }
              let found;
              try {
                found = await this.$imgdb.getFavoriteArtworks([favorite]);
                if (found.total_count > 0) {
                  found.resources.forEach((resource) => {
                    // Artist
                    var title = "";
                    var rentPrice = "";
                    var salePrice = "";
                    var size = "";
                    var type = "";
                    var tags = resource.hasOwnProperty("tags")
                      ? resource.tags
                      : [];
                    if (resource.hasOwnProperty("context")) {
                      // Title
                      if (resource.context.hasOwnProperty("caption")) {
                        title = resource.context.caption;
                        title = title.toLowerCase();
                      }
                      // Rent, Sale Price
                      if (resource.context.hasOwnProperty("rent_price")) {
                        rentPrice = resource.context.rent_price;
                      }
                      if (resource.context.hasOwnProperty("sale_price")) {
                        salePrice = resource.context.sale_price;
                      }
                      if (resource.context.hasOwnProperty("type")) {
                        type = this.plainText.type[resource.context.type];
                        if (type.en.toLowerCase() === "sculpture") {
                          // it's a sculpture
                          if (
                            resource.context.hasOwnProperty("dimension") &&
                            resource.context.hasOwnProperty("height") &&
                            resource.context.hasOwnProperty("width") &&
                            resource.context.hasOwnProperty("depth")
                          ) {
                            size =
                              resource.context.height +
                              " x " +
                              resource.context.width +
                              " x " +
                              resource.context.depth +
                              " " +
                              resource.context.dimension;
                          }
                        } else if (type.en.toLowerCase() === "painting") {
                          // it's a painting
                          if (
                            resource.context.hasOwnProperty("dimension") &&
                            resource.context.hasOwnProperty("height") &&
                            resource.context.hasOwnProperty("width")
                          ) {
                            size =
                              resource.context.height +
                              " x " +
                              resource.context.width +
                              " " +
                              resource.context.dimension;
                          }
                        }
                      }
                    }

                    this.userFavorites.push({
                      public_id: resource.public_id,
                      user_id: favorite[0],
                      artist_name: artist_name,
                      url: resource.secure_url,
                      title: title,
                      type: type,
                      rentPrice: rentPrice,
                      salePrice: salePrice,
                      size: size,
                      tags: tags,
                      isProcFavorite: false,
                      likes: null,
                    });
                  });
                }
              } catch {}
            })
          );

          // Compute total pages and assign gallery arrays
          this.totalPages.desktop =
            Math.floor(
              this.userFavorites.length / this.artworksPerPage.desktop
            ) + 1;
          this.totalPages.mobile =
            Math.floor(
              this.userFavorites.length / this.artworksPerPage.mobile
            ) + 1;
          this.gallery = Array(this.totalPages.mobile);
          for (var i = 0; i < this.totalPages.mobile; i++) {
            this.gallery[i] = Array();
          }
          this.columns = Array(this.totalPages.desktop);
          for (var i = 0; i < this.totalPages.desktop; i++) {
            this.columns[i] = Array(3);
            this.columns[i][0] = Array();
            this.columns[i][1] = Array();
            this.columns[i][2] = Array();
          }
          let count = 0;
          this.userFavorites.forEach((artwork, index) => {
            this.getArtworkLikes(
              artwork.user_id,
              toPublicIdNoPath(artwork.public_id, "/approved/")
            ).then((count) => (artwork.likes = count));
            this.gallery[Math.floor(index / this.artworksPerPage.mobile)].push(
              artwork
            );
            this.columns[Math.floor(index / this.artworksPerPage.desktop)][
              count
            ].push(artwork);
            count = (count + 1) % 3;
          });
          this.fetched = true;
          resolve();
        } catch (e) {
          this.fetched = true;
          reject(e);
        }
      });
    },
    async getUserFollows() {
      return await new Promise((resolve, reject) => {
        this.$db
          .getFollows(this.$auth.user.sub)
          .then((follows) => {
            follows.forEach(async (follow) => {
              await this.$auth.getMgUser(follow[0]).then((artist) => {
                this.userFollows.push({
                  user_id: artist.user_id,
                  name: artist.name,
                });
              });
            });
            resolve();
          })
          .catch((err) => reject(err));
      });
    },
    async getArtworkLikes(artist_id, artwork_id) {
      return await new Promise((resolve, reject) => {
        this.$db
          .getArtworkLikes(artist_id, artwork_id)
          .then((count) => resolve(count))
          .catch((err) => reject(err));
      });
    },
    checkIsFavorite(public_id) {
      var isAlreadyFavorite = false;
      this.userFavorites.find((favorite) => {
        if (favorite.public_id === public_id) {
          isAlreadyFavorite = true;
        }
        return isAlreadyFavorite;
      });
      return isAlreadyFavorite;
    },
    toggleFavorite(artwork) {
      if (!this.$auth.isAuthenticated()) {
        // Not authenticated, can't like an artwork. Prompt login/signup.
        this.$auth.login();
      } else {
        var isAlreadyFavorite = false;
        var isAlreadyFavoriteIdx = -1;
        this.userFavorites.find((favorite, idx) => {
          if (favorite.public_id === artwork.public_id) {
            isAlreadyFavorite = true;
            isAlreadyFavoriteIdx = idx;
          }
          return isAlreadyFavorite;
        });
        artwork.isProcFavorite = true;
        const artwork_id = toPublicIdNoPath(artwork.public_id, "/approved/");
        var artist_id = artwork.user_id;
        if (isAlreadyFavorite) {
          // Remove
          this.$db
            .getRefFavorite(this.$auth.user.sub, artist_id, artwork_id) // get Ref of favorite first
            .then((refId) => {
              this.$db.deleteFavorite(refId).finally(() => {
                this.getUserFavorites().finally(() => {
                  this.getArtworkLikes(artist_id, artwork_id)
                    .then((count) => (artwork.likes = count))
                    .finally(() => {
                      artwork.isProcFavorite = false;
                    });
                });
              });
            })
            .catch(() => {
              artwork.isProcFavorite = false;
            });
        } else {
          // Add
          this.$db
            .addFavorite(this.$auth.user.sub, artist_id, artwork_id)
            .finally(() => {
              this.getUserFavorites().finally(() => {
                this.getArtworkLikes(artist_id, artwork_id)
                  .then((count) => (artwork.likes = count))
                  .finally(() => {
                    artwork.isProcFavorite = false;
                  });
              });
            });
        }
      }
    },
  },
  metaInfo() {
    return {
      titleTemplate:
        this.getLang === "gr"
          ? "Αγαπημένα — Artventures"
          : "Favorites — Artventures",
      meta: [{ name: "description", content: "Web Application" }],
    };
  },
};
</script>

<style scoped>
.custom-divider {
  width: 50vw;
  height: 1px;
  margin-right: 25vw;
  margin-left: 25vw;
}
</style>