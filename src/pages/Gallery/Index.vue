<template>
  <Layout>
    <v-main>
        <v-container class="pa-0 background-color-fafafa" fluid>
            <div class="py-10" />
            <div id="start" class="playfair-38-700 text-center">{{ $helper.plainText.gallery[getLang] }}</div>
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
                <div v-if="approvedArtworks.length > 0">
                  <div v-for="(p, o) in columns" :key="'page-' + o">
                    <v-row v-if="page.desktop-1 === o" class="px-12 pb-6" justify="start" align="start">
                      <v-col class="pr-6" v-for="(column, j) in p" :key="'column' + j" cols="4">
                        <v-card class="my-6 text-center" v-for="(artwork, i) in column" :key="'artwork-' + i">
                          <v-img
                            :src="artwork.url"
                            :lazy-src="artwork.url.replace('artventures/image/upload/', 'artventures/image/upload/c_thumb,w_100/')"
                            :alt="artwork.title || 'Untitled'"
                            contain
                          />
                          <v-row justify="space-between">
                            <v-col>
                              <v-card-title v-if="artwork.title"
                                class="raleway-23-400 text-capitalize font-italic text-start pr-0  pb-0"
                                v-text="artwork.title" />
                              <div />
                              <v-card-subtitle v-if="artwork.artist_name"
                                class="raleway-25-400 text-capitalize text-start pr-0 pt-2"
                                v-text="artwork.artist_name" />
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
                                    class="nunito-12-400 text-capitalize text-start pr-1"
                                    cols="auto"
                                    v-for="(tag, tagId) in artwork.tags" :key="'tag-' + tagId"
                                  >
                                    {{ tag }}<span v-if="tagId !== artwork.tags.length - 1">,</span>
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
                                      <v-icon v-if="!checkIsFavorite(artwork.public_id)" size="30">mdi-heart-outline</v-icon>
                                      <v-icon v-else size="30" color="pink lighten-3">mdi-heart</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>{{ $helper.plainText.heart[getLang] }}</span>
                                </v-tooltip>
                                <v-tooltip v-if="canCopy" top color="black">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      icon
                                      large
                                      v-bind="attrs"
                                      v-on="on"
                                      @click="shareArtwork(artwork)"
                                    >
                                      <v-icon size="30">mdi-share-variant-outline</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>{{ $helper.plainText.share[getLang] }}</span>
                                </v-tooltip>
                                <v-tooltip top color="black">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      icon
                                      large
                                      v-bind="attrs"
                                      v-on="on"
                                      @click="overlayDesktop = true; enlargedArtwork = artwork;"
                                    >
                                      <v-icon size="30">mdi-fullscreen</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>{{ $helper.plainText.artworkZoom[getLang] }}</span>
                                </v-tooltip>
                                <v-tooltip top color="black">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon v-bind="attrs" v-on="on" @click="getRefArtist(artwork.user_id)">
                                      <v-icon size="30">mdi-link</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>{{ $helper.plainText.artistPage[getLang] }}</span>
                                </v-tooltip>
                              </v-card-actions>
                              <div class="pb-2 pr-4 text-end">
                                <div class="raleway-23-400 d-flex justify-end align-center" v-if="artwork.salePrice">
                                  <v-tooltip v-if="true !== $eshop.isInBasket(artwork.public_id)" left color="black">
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn
                                        class="mr-1"
                                        v-bind="attrs"
                                        v-on="on"
                                        fab
                                        height="30"
                                        width="30"
                                        color="#333333"
                                        @click="$eshop.addToBasket(artwork); $forceUpdate();"
                                      >
                                        <v-icon size="20" color="#FAFAFA">mdi-basket-plus</v-icon>
                                      </v-btn>
                                    </template>
                                    <span>{{ getLang == "gr" ? "Προσθήκη στο καλάθι" : "Add to basket" }}</span>
                                  </v-tooltip>
                                  <v-tooltip v-else left color="black">
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn
                                        class="mr-1 border-fa-btn"
                                        v-bind="attrs"
                                        v-on="on"
                                        fab
                                        color="#FAFAFA"
                                        height="30"
                                        width="30"
                                        @click="$eshop.removeFromBasket(artwork.public_id); $forceUpdate();"
                                      >
                                        <v-icon color="#333333" size="20">mdi-basket-minus</v-icon>
                                      </v-btn>
                                    </template>
                                    <span>{{ getLang == "gr" ? "Διαγραφή απο καλάθι" : "Remove from basket" }}</span>
                                  </v-tooltip>
                                  <div>{{ artwork.salePrice }}€</div>
                                </div>
                                <div class="raleway-18-400" v-if="artwork.rentPrice">
                                  <span class="pr-1">{{ $helper.plainText.rentFor[getLang] }}</span>
                                  {{ artwork.rentPrice }}
                                  <span>{{ $helper.plainText.rentPerMonth[getLang] }}</span>
                                </div>
                              </div>
                              <div v-if="artwork.likes !== null"
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
                </div>
                <div v-else class="center-viewport">
                  <v-row style="height: 100%;" justify="center" align="center">
                    <v-col>
                      <p
                        class="text-center"
                        :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                      >
                        {{ $helper.plainText.error[getLang]}}
                      </p>
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
                  <v-row class="px-4" justify="center" align="center">
                    <v-col cols="3"><v-skeleton-loader type="actions" /></v-col>
                  </v-row>
              </div>
              <div v-else>
                <div v-if="approvedArtworks.length > 0">
                  <div v-for="(p, o) in gallery" :key="'page-mobile-' + o">
                    <div class="pb-3" v-if="page.mobile-1 === o">
                      <v-row class="px-6" v-for="(artwork, i) in p" :key="'artwork-mobile-' + i" justify="center" align="center">
                        <v-col cols="12" class="px-0">
                          <v-card>
                            <v-img
                              :src="artwork.url"
                              :lazy-src="artwork.url.replace('artventures/image/upload/', 'artventures/image/upload/c_thumb,w_100/')"
                              :alt="artwork.title || 'Untitled'"
                              contain
                            />
                            <v-row justify="space-between" no-gutters>
                              <v-col>
                                <v-card-title v-if="artwork.title"
                                  class="raleway-16-400 text-capitalize font-italic text-start pr-0 pb-0"
                                  v-text="artwork.title" />
                                <div />
                                <v-card-subtitle v-if="artwork.artist_name"
                                  class="raleway-18-400 text-capitalize text-start pr-0"
                                  :class="artwork.title ? 'pt-2' : ''"
                                  v-text="artwork.artist_name" />
                                <v-card-text class="raleway-13-400 text-start pr-0">
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
                                      class="nunito-12-400 text-capitalize text-start pr-1"
                                      cols="auto"
                                      v-for="(tag, i) in artwork.tags" :key="'tag-mobile-' + i"
                                    >
                                      {{ tag }}<span v-if="i !== artwork.tags.length - 1">,</span>
                                    </v-col>
                                  </v-row>
                                </v-card-text>
                              </v-col>
                              <v-col cols="auto" class="d-flex flex-column align-end">
                                <v-card-actions>
                                  <v-tooltip top color="black">
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn
                                        class="px-0"
                                        icon
                                        height="24"
                                        width="24"
                                        v-bind="attrs"
                                        v-on="on"
                                        :loading="artwork.isProcFavorite"
                                        @click="toggleFavorite(artwork)"
                                      >
                                        <v-icon v-if="!checkIsFavorite(artwork.public_id)" size="20">mdi-heart-outline</v-icon>
                                        <v-icon v-else color="pink lighten-3" size="20">mdi-heart</v-icon>
                                      </v-btn>
                                    </template>
                                    <span>{{ $helper.plainText.heart[getLang] }}</span>
                                  </v-tooltip>
                                  <v-tooltip v-if="canCopy" top color="black">
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn
                                        class="px-0"
                                        icon
                                        height="24"
                                        width="24"
                                        v-bind="attrs"
                                        v-on="on"
                                        @click="shareArtwork(artwork)"
                                      >
                                        <v-icon size="20">mdi-share-variant-outline</v-icon>
                                      </v-btn>
                                    </template>
                                    <span>{{ $helper.plainText.share[getLang] }}</span>
                                  </v-tooltip>
                                  <v-tooltip top color="black">
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn
                                        class="px-0"
                                        icon
                                        height="24"
                                        width="24"
                                        v-bind="attrs"
                                        v-on="on"
                                        @click="overlayMobile = true; enlargedArtwork = artwork;"
                                      >
                                        <v-icon size="20">mdi-fullscreen</v-icon>
                                      </v-btn>
                                    </template>
                                    <span>{{ $helper.plainText.artworkZoom[getLang] }}</span>
                                  </v-tooltip>
                                  <v-tooltip top color="black">
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn
                                        class="px-0"
                                        icon
                                        height="24"
                                        width="24"
                                        v-bind="attrs"
                                        v-on="on"
                                        @click="getRefArtist(artwork.user_id)"
                                      >
                                        <v-icon size="20">mdi-link</v-icon>
                                      </v-btn>
                                    </template>
                                    <span>{{ $helper.plainText.artistPage[getLang] }}</span>
                                  </v-tooltip>
                                </v-card-actions>
                                <div class="pb-2 pr-4 text-end">
                                  <div class="raleway-16-400 d-flex justify-end align-center" v-if="artwork.salePrice">
                                    <v-btn
                                      v-if="true !== $eshop.isInBasket(artwork.public_id)"
                                      class="mr-1"
                                      fab
                                      height="20"
                                      width="20"
                                      color="#333333"
                                      @click="$eshop.addToBasket(artwork); $forceUpdate();"
                                    >
                                      <v-icon color="#FAFAFA" size="14">mdi-basket-plus</v-icon>
                                    </v-btn>
                                    <v-btn
                                      v-else
                                      class="mr-1 border-fa-btn"
                                      fab
                                      height="20"
                                      width="20"
                                      color="#FAFAFA"
                                      @click="$eshop.removeFromBasket(artwork.public_id); $forceUpdate();"
                                    >
                                      <v-icon color="#333333" size="14">mdi-basket-minus</v-icon>
                                    </v-btn>
                                    <div>{{ artwork.salePrice }}€</div>
                                  </div>
                                  <div class="raleway-12-400" v-if="artwork.rentPrice">
                                    <span class="pr-1">{{ $helper.plainText.rentFor[getLang] }}</span>
                                    {{ artwork.rentPrice }}
                                    <span>{{ $helper.plainText.rentPerMonth[getLang] }}</span>
                                  </div>
                                </div>
                                <div v-if="artwork.likes !== null"
                                  class="pr-4 mt-auto montserrat-10-400-italic"
                                >
                                  {{ artwork.likes }} LIKES
                                </div>
                              </v-col>
                            </v-row>
                          </v-card>
                        </v-col>
                      </v-row>
                    </div>
                  </div>
                </div>
                <div v-else class="center-viewport">
                  <v-row style="height: 100%;" justify="center" align="center">
                    <v-col>
                      <p
                        class="text-center"
                        :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                      >
                        {{ $helper.plainText.error[getLang]}}
                      </p>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </div>
            <!-- Pagination Desktop -->
            <v-row
              v-if="totalPages.desktop > 0"
              class="hidden-sm-and-down"
              align="center"
              justify="center"
              no-gutters
            >
              <v-col cols="6">
                <v-pagination
                  :value="page.desktop"
                  :length="totalPages.desktop"
                  color="#333333"
                  @input="paginateDesktop"
                  @next="nextPageDesktop"
                  @previous="prevPageDesktop"
                >
                </v-pagination>
              </v-col>
            </v-row>
            <!-- Pagination Mobile -->
            <v-row
              v-if="totalPages.mobile > 0"
              class="hidden-md-and-up"
              align="center"
              justify="center"
              no-gutters
            >
              <v-col cols="10">
                <v-pagination
                  :value="page.mobile"
                  :length="totalPages.mobile"
                  color="#333333"
                  @input="paginateMobile"
                  @next="nextPageMobile"
                  @previous="prevPageMobile"
                >
                </v-pagination>
              </v-col>
            </v-row>
            <div class="py-4" />
            <!-- Scroll to Top -->
            <scroll-to-top />
        </v-container>
        <!-- Desktop Overlay -->
        <v-overlay class="hidden-sm-and-down" :value="overlayDesktop">
          <v-row class="background-color-dddddd rounded" no-gutters>
            <v-col cols="auto">
              <v-img
                v-if="!$helper.objIsEmpty(enlargedArtwork)"
                class="rounded"
                :src="enlargedArtwork.url"
                :lazy-src="enlargedArtwork.url.replace('artventures/image/upload/', 'artventures/image/upload/c_thumb,w_100/')"
                :alt="enlargedArtwork.title || 'Untitled'"
                max-height="98vh"
                max-width="95vw"
                position="top"
                contain
              >
                <v-row class="white px-1 py-1" no-gutters justify="space-between" align="center">
                  <v-col cols="auto" class="text-capitalize">
                    <div class="d-flex justify-center align-center">
                      <div v-if="enlargedArtwork.title" class="px-2 raleway-16-400 color-333333">
                        {{ enlargedArtwork.title }}</div>
                      <div v-if="enlargedArtwork.artist_name" class="raleway-18-400 font-italic color-757575">
                        {{ enlargedArtwork.artist_name }}</div>
                    </div>
                  </v-col>
                  <v-col cols="auto" class="raleway-18-400 color-333333 text-center">
                    <span v-if="enlargedArtwork.salePrice">{{ enlargedArtwork.salePrice }}€</span>
                    <span v-if="enlargedArtwork.salePrice && enlargedArtwork.rentPrice"> - </span>
                    <span v-if="enlargedArtwork.rentPrice"> 
                      <span>{{ enlargedArtwork.rentPrice }}</span>
                      <span>{{ $helper.plainText.rentPerMonth[getLang] }}</span>
                    </span>
                  </v-col>
                  <v-col cols="auto" class="text-end">
                    <v-tooltip v-if="true !== $eshop.isInBasket(enlargedArtwork.public_id)" bottom color="black">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="mr-1"
                          v-on="on"
                          v-bind="attrs"
                          fab
                          x-small
                          color="#333333"
                          @click="$eshop.addToBasket(enlargedArtwork); $forceUpdate();"
                        >
                          <v-icon color="#FAFAFA">mdi-basket-plus</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ getLang == "gr" ? "Προσθήκη στο καλάθι" : "Add to basket" }}</span>
                    </v-tooltip>
                    <v-tooltip v-else bottom color="black">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="mr-1 border-fa-btn"
                          v-on="on"
                          v-bind="attrs"
                          fab
                          x-small
                          color="#FAFAFA"
                          @click="$eshop.removeFromBasket(enlargedArtwork.public_id); $forceUpdate();"
                        >
                          <v-icon color="#333333">mdi-basket-minus</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ getLang == "gr" ? "Διαγραφή απο καλάθι" : "Remove from basket" }}</span>
                    </v-tooltip>
                    <v-tooltip bottom color="black">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-on="on"
                          v-bind="attrs"
                          color="#333333"
                          @click="enlargedArtwork = {}; overlayDesktop = false;"
                        >
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ $helper.plainText.close[getLang] }}</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-img>
            </v-col>
          </v-row>
        </v-overlay>
        <!-- Mobile Overlay -->
        <v-dialog v-model="overlayMobile"
          class="hidden-md-and-up"
          fullscreen
          persistent
          no-click-animation
          transition="scroll-x-transition"
        >
          <v-row
            class="rounded"
            style="height: 100% !important; width: 100% !important;"
            no-gutters align="center" justify="center"
          >
            <v-col cols="auto">
              <v-img
                v-if="!$helper.objIsEmpty(enlargedArtwork)"
                class="rounded"
                :src="enlargedArtwork.url"
                :lazy-src="enlargedArtwork.url.replace('artventures/image/upload/', 'artventures/image/upload/c_thumb,w_100/')"
                :alt="enlargedArtwork.title || 'Untitled'"
                contain
                position="top"
                @click="enlargedArtwork = {}; overlayMobile = false;"
              >
                <v-row class="white px-1 py-1" no-gutters justify="space-between" align="center">
                  <v-col cols="auto" class="text-capitalize">
                    <div class="d-flex flex-column justify-center align-start">
                      <div v-if="enlargedArtwork.title" class="raleway-13-400 color-333333">
                        {{ enlargedArtwork.title }}</div>
                      <div v-if="enlargedArtwork.artist_name" class="raleway-16-400 font-italic color-757575">
                        {{ enlargedArtwork.artist_name }}</div>
                    </div>
                  </v-col>
                  <v-col cols="auto" class="raleway-16-400 color-333333 text-center">
                    <div class="d-flex flex-column justify-center align-start">
                      <div v-if="enlargedArtwork.salePrice">{{ enlargedArtwork.salePrice }}€</div>
                      <div v-if="enlargedArtwork.rentPrice">
                        <span>{{ enlargedArtwork.rentPrice }}</span>
                        <span>{{ $helper.plainText.rentPerMonth[getLang] }}</span>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="auto" class="text-end">
                    <v-btn
                      v-if="true !== $eshop.isInBasket(enlargedArtwork.public_id)"
                      class="mr-1 border-fa-btn"
                      fab
                      x-small
                      color="#333333"
                      @click="$eshop.addToBasket(enlargedArtwork); $forceUpdate();"
                    >
                      <v-icon color="#FAFAFA">mdi-basket-plus</v-icon>
                    </v-btn>
                    <v-btn
                      v-else
                      class="mr-1 border-fa-btn"
                      fab
                      x-small
                      color="#FAFAFA"
                      @click="$eshop.removeFromBasket(enlargedArtwork.public_id); $forceUpdate();"
                    >
                      <v-icon color="#333333">mdi-basket-minus</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      color="#333333"
                      @click="enlargedArtwork = {}; overlayMobile = false;"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-img>
            </v-col>
          </v-row>
        </v-dialog>
        <!-- Share Dialog -->
        <v-dialog v-model="isSharing.state" width="auto">
          <v-card>
            <v-card-title :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'">
              {{ isSharing.text[getLang] }}
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="white--text"
                :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                color="#333333" @click="() => clearSharingDialog(true)"
              >
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Wait routing to artist's page -->
        <v-overlay :value="goToArtist" color="#FAFAFA" opacity="0.70">
          <v-progress-circular :size="120" :width="12" indeterminate color="#333333" />
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
        this.$imgdb.getArtworks('*', '')
          .then(found => {
            if (found.total_count > 0) {
              let approvedArtworks = [];
              found.resources.forEach(async resource => {
              if (resource.folder.indexOf('approved') !== -1 &&
                  resource.folder.indexOf('google-oauth2|104266192030226467336') === -1 &&
                  resource.folder.indexOf('google-oauth2|108119525360718636347') === -1 &&
                  resource.folder.indexOf('google-oauth2|108119525360718636347') === -1 &&
                  resource.folder.indexOf('facebook|10220098526787758') === -1 &&
                  resource.folder.indexOf('facebook|3306299589452085') === -1 &&
                  resource.folder.indexOf('auth0|5f5bd27a52581200703b8b00') === -1) {
                    // approved and no dummy and admin accounts
                    var artist = null;
                    artists.every(a => {
                      if (resource.public_id.indexOf(a.user_id) !== -1) {
                        // Is an artist
                        artist = a;
                        return false;
                      }
                      return true;
                    })
                    if (artist !== null) {
                      // Artist
                      var title = '';
                      var rentPrice = '';
                      var salePrice = '';
                      var size = '';
                      var type = '';
                      var tags = Object.prototype.hasOwnProperty.call(resource, "tags") ? resource.tags : [];
                      var prio = 0;
                      if (Object.prototype.hasOwnProperty.call(resource, "context")) {
                        // Title
                        if (Object.prototype.hasOwnProperty.call(resource.context, "caption")) {
                          title = resource.context.caption;
                          title = title.toLowerCase();
                        }
                        // Rent, Sale Price
                        if (Object.prototype.hasOwnProperty.call(resource.context, "rent_price")) {
                          rentPrice = resource.context.rent_price
                        }
                        if (Object.prototype.hasOwnProperty.call(resource.context, "sale_price")) {
                          salePrice = resource.context.sale_price
                        }
                        if (Object.prototype.hasOwnProperty.call(resource.context, "type")) {
                          type = this.$helper.plainText.type[resource.context.type];
                          if (type.en.toLowerCase() === 'sculpture') {
                            // it's a sculpture
                            if (Object.prototype.hasOwnProperty.call(resource.context, "dimension") &&
                                Object.prototype.hasOwnProperty.call(resource.context, "height") &&
                                Object.prototype.hasOwnProperty.call(resource.context, "width") &&
                                Object.prototype.hasOwnProperty.call(resource.context, "depth")) {
                              size = resource.context.height + ' x ' + resource.context.width + ' x ' +
                                resource.context.depth + ' ' + resource.context.dimension
                            }
                          } else if (
                            type.en.toLowerCase() === 'painting' ||
                            type.en.toLowerCase() === 'drawing' ||
                            type.en.toLowerCase() === 'photography' ||
                            type.en.toLowerCase() === 'digital'
                          ) {
                            // it's a painting/drawing/photography/digital
                            if (Object.prototype.hasOwnProperty.call(resource.context, "dimension") &&
                                Object.prototype.hasOwnProperty.call(resource.context, "height") &&
                                Object.prototype.hasOwnProperty.call(resource.context, "width")) {
                              size = resource.context.height + ' x ' + resource.context.width + ' ' +
                                resource.context.dimension
                            }
                          }
                        }
                        if (Object.prototype.hasOwnProperty.call(resource.context, "prio")) {
                          prio = parseInt(resource.context.prio);
                        }
                      }
                      approvedArtworks.push({
                        prio: prio,
                        public_id: resource.public_id,
                        user_id: artist.user_id,
                        artist_name: artist.name,
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
                    }
                }
              });
              // block, so that helper approved artworks Object local to block
              {
                let helperObj = {};
                approvedArtworks.forEach(artwork => {
                  if (typeof helperObj[artwork.artist_name] !== 'object') {
                    helperObj[artwork.artist_name] = {};
                  }
                  if (!Array.isArray(helperObj[artwork.artist_name][artwork.prio])) {
                    helperObj[artwork.artist_name][artwork.prio] = [];
                  }
                  helperObj[artwork.artist_name][artwork.prio].push(artwork);
                });
                for (let i = 10; i >= 0;) {
                  let decrement = true;
                  // eslint-disable-next-line no-unused-vars
                  for (let [key, value] of Object.entries(helperObj)) {
                    if (value[i] && value[i].length > 0) {
                      this.approvedArtworks.push(value[i].pop());
                      decrement = false;
                    }
                  }
                  if (decrement) i--;
                }
              }

              // Compute total pages and assign gallery arrays
              this.totalPages.desktop = Math.floor(this.approvedArtworks.length / this.artworksPerPage.desktop) + 1;
              this.totalPages.mobile = Math.floor(this.approvedArtworks.length / this.artworksPerPage.mobile) + 1;
              this.gallery = Array(this.totalPages.mobile);
              for (let i = 0; i < this.totalPages.mobile; i++) {
                this.gallery[i] = Array();
              }
              this.columns = Array(this.totalPages.desktop);
              for (let i = 0; i < this.totalPages.desktop; i++) {
                this.columns[i] = Array(3);
                this.columns[i][0] = Array();
                this.columns[i][1] = Array();
                this.columns[i][2] = Array();
              }
              let count = 0;
              this.approvedArtworks.forEach((artwork, index) => {
                this.getArtworkLikes(
                    artwork.user_id,
                    this.$helper.toPublicIdNoPath(artwork.public_id, '/approved/')
                  )
                  .then(count => artwork.likes = count);
                this.gallery[Math.floor(index / this.artworksPerPage.mobile)].push(artwork);
                this.columns[Math.floor(index / this.artworksPerPage.desktop)][count].push(artwork);
                count = (count + 1) % 3;
              });
            }
            this.fetched = true;
          })
          .catch(() => this.fetched = true)
        })
        .catch(() => this.fetched = true)
  },
  mounted () {
    if (process.isClient) {
      this.canCopy = !!navigator.clipboard;
    }
    if (this.$auth.isAuthenticated()) {
      // fetch user's favorite artworks
      this.getUserFavorites()
    }
  },
  data () {
      return {
        fetched: false,
        page: {
          desktop: 1,
          mobile: 1
        },
        totalPages: {
          desktop: 0,
          mobile: 0
        },
        artworksPerPage: {
          desktop: 24,
          mobile: 12
        },
        // Fetched approved artworks (raw)
        approvedArtworks: [],
        // Gallery array for mobile view
        gallery: [], // [[], [], [], ...]
        // Gallery array for the desktop view
        columns: [[], [], []], // [ [[], [], []], [[], [], []], [[], [], []], ... ]
        canCopy: false,
        isSharing: {
          state: false,
          text: {
            gr: "",
            en: ""
          },
          timeoutCb: null
        },
        overlayDesktop: false,
        overlayMobile: false,
        enlargedArtwork: {},
        goToArtist: false,
        // user's favorite artworks
        userFavorites: []
      }
  },
  computed: {
    ...mapGetters(['getLang']),
    userRole () {
      if (this.$auth.userRole != null) {
        return this.$auth.userRole[0].name
      }
      return null
    },
  },
  methods: {
    async paginateDesktop(e) {
      if (this.page.desktop !== e) {
        await this.$vuetify.goTo('#start');
        this.page.desktop = e;
      }
    },
    async nextPageDesktop() {
      if (this.page.desktop > this.totalPages.desktop) {
        await this.$vuetify.goTo('#start');
      } else if (this.page.desktop < this.totalPages.desktop) {
        await this.$vuetify.goTo('#start');
      }
    },
    async prevPageDesktop() {
      if (this.page.desktop < 1) {
        await this.$vuetify.goTo('#start');
      } else if (this.page.desktop > 1) {
        await this.$vuetify.goTo('#start');
      }
    },
    async paginateMobile(e) {
      if (this.page.mobile !== e) {
        await this.$vuetify.goTo('#start');
        this.page.mobile = e;
      }
    },
    async nextPageMobile() {
      if (this.page.mobile > this.totalPages.mobile) {
        await this.$vuetify.goTo('#start');
      } else if (this.page.mobile < this.totalPages.mobile) {
        await this.$vuetify.goTo('#start');
      }
    },
    async prevPageMobile() {
      if (this.page.mobile < 1) {
        await this.$vuetify.goTo('#start');
      } else if (this.page.mobile > 1) {
        await this.$vuetify.goTo('#start');
      }
    },
    getRefArtist(user_id) {
      this.goToArtist = true;
      this.$db.getRef(user_id)
        .then(ref => {
          // Fetched artist's reference, go to artist's page.
          this.$router.push({ path: '/artist/' + ref });
          this.goToArtist = false;
        })
        .catch(() => {
          this.goToArtist = false;
        })
    },
    getUserFavorites() {
      return new Promise((resolve, reject) => {
        this.$db.getFavorites(this.$auth.user.sub)
          .then(favorites => {
            if (favorites.length > 0) {
              this.$imgdb.getFavoriteArtworks(favorites)
                .then(res => {
                  this.userFavorites = [];
                  res.resources.forEach(resource => {
                    this.userFavorites.push(resource);
                  })
                  resolve();
                })
                .catch(err => reject(err));
            } else { this.userFavorites = []; }
          })
          .catch(err => reject(err));
      })
    },
    checkIsFavorite(public_id) {
      var isAlreadyFavorite = false;
      this.userFavorites.find((favorite) => {
        if (favorite.public_id === public_id) {
          isAlreadyFavorite = true;
        }
        return isAlreadyFavorite;
      })
      return isAlreadyFavorite;
    },
    toggleFavorite(artwork) {
      if (!this.$auth.isAuthenticated()) {
        // Not authenticated, can't like an artwork. Prompt login/signup.
        this.$auth.login();
      } else {
        var isAlreadyFavorite = false;
        this.userFavorites.find(favorite => {
          if (favorite.public_id === artwork.public_id) {
            isAlreadyFavorite = true;
          }
          return isAlreadyFavorite;
        })
        artwork.isProcFavorite = true;
        const artwork_id = this.$helper.toPublicIdNoPath(artwork.public_id, '/approved/');
        var artist_id = artwork.user_id;
        if (isAlreadyFavorite) {
          // Remove
          this.$db.getRefFavorite(this.$auth.user.sub, artist_id, artwork_id) // get Ref of favorite first
            .then(refId => {
              this.$db.deleteFavorite(refId)
                .finally(() => {
                  this.getUserFavorites()
                    .finally(() => {
                      this.getArtworkLikes(artist_id, artwork_id)
                        .then(count => artwork.likes = count)
                        .finally(() => {
                            artwork.isProcFavorite = false;
                        })
                    })
                })
            })
            .catch(() => {
              artwork.isProcFavorite = false;
            })
        } else {
          // Add
          this.$db.addFavorite(this.$auth.user.sub, artist_id, artwork_id)
            .finally(() => {
              this.getUserFavorites()
                .finally(() => {
                  this.getArtworkLikes(artist_id, artwork_id)
                    .then(count => artwork.likes = count)
                    .finally(() => {
                      artwork.isProcFavorite = false;
                    })
                })
            })
        }
      }
    },
    async getArtworkLikes (artist_id, artwork_id) {
      return await new Promise((resolve, reject) => {
        this.$db.getArtworkLikes(artist_id, artwork_id)
          .then(count => resolve(count))
          .catch(err => reject(err))
      })
    },
    shareArtwork(artwork) {
      if (process.isClient) {
        navigator.clipboard.writeText(artwork.url)
          .then(() => {
            this.isSharing.text.gr = "Η διεύθυνση της εικόνας αντιγράφτηκε επιτυχώς!";
            this.isSharing.text.en = "Image URL successfully copied!";
          }) // copied
          .catch(() => {
            this.isSharing.text.gr = "Η αντιγραφή της διεύθυνσης της εικόνας απέτυχε.";
            this.isSharing.text.en = "Failed to copy image URL.";
          })  // not copied
          .finally(() => {
            this.isSharing.state = true;
            this.isSharing.timeoutCb = setTimeout(() => this.clearSharingDialog(), 3000);
          });
      }
    },
    clearSharingDialog(clear=false) {
      this.isSharing.state = false;
      if (clear) {
        clearTimeout(this.isSharing.timeoutCb);
      }
      this.isSharing.text.gr = "";
      this.isSharing.text.en = "";
    }
  },
  metaInfo() {
    return {
      titleTemplate:
        this.getLang === "gr"
          ? "Γκαλερί — Artventures"
          : "Gallery — Artventures",
      meta: [{ name: "description", content: "Gallery" }],
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
.border-fa-btn {
  border: thin solid #333333 !important;
}

</style>