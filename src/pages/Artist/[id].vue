<template>
  <Layout>
    <v-main>
      <!-- OK -->
      <v-container v-if="state === 0" class="pa-0 background-color-fafafa" fluid>
        <!-- Desktop -->
        <div class="hidden-sm-and-down py-12 px-12">
          <!-- Info -->
          <v-row no-gutters justify="center" align="center">
            <v-col class="pr-1" cols="auto">
              <v-tooltip top color="black">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    :loading="artist.isProcFollow"
                    @click="toggleFollow"
                  >
                    <v-icon v-if="followerRefId !== null" color="blue lighten-2">mdi-thumb-up</v-icon>
                    <v-icon v-else>mdi-thumb-up-outline</v-icon>
                  </v-btn>
                </template>
                <span>{{ $helper.plainText.follow[getLang] }}</span>
              </v-tooltip>
            </v-col>
            <v-col cols="auto">
              <div class="raleway-30-700 text-uppercase">{{ artist.firstName + ' ' + artist.lastName }}</div>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="auto">
              <div v-if="followers !== null" class="montserrat-12-400-italic">{{ followers }} FOLLOWERS</div>
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
            {{ $helper.plainText.artworks[getLang] }}
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
                <v-row justify="space-between">
                  <v-col>
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
                    </v-card-actions>
                    <div class="pb-2 pr-4 text-end">
                      <div class="raleway-23-400 d-flex justify-end align-center" v-if="artwork.salePrice">
                        <v-tooltip left color="black">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="mr-1"
                              icon
                              height="36"
                              width="36"
                              v-bind="attrs"
                              v-on="on"
                            >
                              <v-icon size="24">mdi-basket-plus</v-icon>
                            </v-btn>
                          </template>
                          <span>{{getLang == "gr" ? "Προσθήκη στο καλάθι" : "Add to basket"}}</span>
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
        <!-- Mobile -->
        <div class="hidden-md-and-up pb-6">
          <!-- Info -->
          <v-row class="pt-12 px-12" justify="center" align="center">
            <v-col class="text-center" cols="auto">
              <div class="raleway-30-700 text-uppercase">{{ artist.firstName }}</div>
              <div class="raleway-30-700 text-uppercase">{{ artist.lastName }}</div>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="auto">
              <v-tooltip top color="black">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    small
                    :loading="artist.isProcFollow"
                    @click="toggleFollow"
                  >
                    <v-icon v-if="followerRefId !== null" size="30" color="blue lighten-2">mdi-thumb-up</v-icon>
                    <v-icon v-else>mdi-thumb-up-outline</v-icon>
                  </v-btn>
                </template>
                <span>{{ $helper.plainText.follow[getLang] }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="auto">
              <div v-if="followers !== null" class="montserrat-12-400-italic">{{ followers }} FOLLOWERS</div>
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
          <div class="py-6 text-center playfair-38-700">
            {{ $helper.plainText.artworks[getLang] }}
          </div>
          <v-row
            class="px-6"
            v-for="(artwork, i) in artist.gallery" :key="'artwork-mobile-' + i"
            justify="center" align="center"
          >
            <v-col cols="12" class="px-0 py-4">
              <v-card>
                <v-img
                  :src="artwork.url"
                  :lazy-src="artwork.url.replace('artventures/image/upload/', 'artventures/image/upload/c_thumb,w_100/')"
                  :alt="artwork.title || 'Untitled'"
                  contain
                />
                <v-row justify="space-between">
                  <v-col>
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
                  </v-col>
                  <v-col cols="auto" class="d-flex flex-column align-end">
                    <v-card-actions>
                      <v-tooltip top color="black">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
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
                    </v-card-actions>
                    <div class="pb-2 pr-4 text-end">
                      <div class="raleway-16-400 d-flex justify-end align-center" v-if="artwork.salePrice">
                        <v-tooltip left color="black">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="mr-1"
                              icon
                              v-bind="attrs"
                              v-on="on"
                              height="24"
                              width="24"
                            >
                              <v-icon size="18">mdi-basket-plus</v-icon>
                            </v-btn>
                          </template>
                          <span>{{getLang == "gr" ? "Προσθήκη στο καλάθι" : "Add to basket"}}</span>
                        </v-tooltip>
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

        <!-- Scroll to Top -->
        <scroll-to-top />

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
                      <div v-if="artist.firstName || artist.lastName"
                        class="font-italic raleway-18-400 color-757575"
                      >
                        <span v-if="artist.firstName" class="pr-1">{{ artist.firstName }}</span>
                        <span v-if="artist.lastName">{{ artist.lastName }}</span>
                      </div>
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
                    <v-tooltip bottom color="black">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="mr-1 rounded-xl"
                          fab
                          x-small
                          color="#333333"
                          v-on="on"
                          v-bind="attrs"
                          @click="enlargedArtwork = {}; overlayDesktop = false;"
                        >
                          <v-icon color="#FAFAFA">mdi-basket-plus</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ getLang == "gr" ? "Προσθήκη στο καλάθι" : "Add to basket" }}</span>
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
                      <div v-if="artist.firstName || artist.lastName"
                        class="font-italic raleway-16-400 color-757575"
                      >
                        <span v-if="artist.firstName" class="pr-1">{{ artist.firstName }}</span>
                        <span v-if="artist.lastName">{{ artist.lastName }}</span>
                      </div>
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
                    <v-tooltip bottom color="black">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="mr-1 rounded-xl"
                          fab
                          x-small
                          color="#333333"
                          v-on="on"
                          v-bind="attrs"
                          @click="enlargedArtwork = {}; overlayMobile = false;"
                        >
                          <v-icon color="#FAFAFA">mdi-basket-plus</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ getLang == "gr" ? "Προσθήκη στο καλάθι" : "Add to basket" }}</span>
                    </v-tooltip>
                    <v-tooltip bottom color="black">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-on="on"
                          v-bind="attrs"
                          color="#333333"
                          @click="enlargedArtwork = {}; overlayMobile = false;"
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
      </v-container>

      <!-- Loading -->
      <v-overlay v-else-if="state === 1" color="#FAFAFA" opacity="0.70">
        <v-progress-circular :size="120" :width="12" indeterminate color="#333333" />
      </v-overlay>

      <!-- Not found -->
      <v-container v-else-if="state === -1" class="pa-0 background-color-fafafa" fluid>
        <v-card class="center-viewport" color="#fafafa" flat>
          <v-row style="height: 100%" justify="center" align="center">
            <v-col>
              <p class="text-center" :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'">404</p>
              <p class="text-center" :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'">
                {{ $helper.plainText.error404[getLang] }}
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
                {{ $helper.plainText.error[getLang] }}
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
        columns: [[], [], []],
        isProcFollow: false
      },
      overlayDesktop: false,
      overlayMobile: false,
      enlargedArtwork: {},
      // user's favorite artworks
      userFavorites: [],
      // Reference ID in DB table 'follows' (string value if user follows artist)
      followerRefId: null,
      followers: null,
      canCopy: false,
      isSharing: {
        state: false,
        text: {
          gr: "",
          en: ""
        },
        timeoutCb: null
      }
    }
  },
  mounted () {
    if (this.$auth.isAuthenticated()) {
      // fetch user's favorite artworks
      this.getUserFavorites()
      // find out if user is following the artist
      this.getUserId(this.$route.params.id)
        .then(() => {
          this.$db.getRefFollow(this.$auth.user.sub, this.artist.userId)
            .then(res => {
              if (res.length > 0) {
                this.followerRefId = res;
              }
            })
        })
    } else {
      this.getUserId(this.$route.params.id); // $route.param.id is the reference Id to the 'users' DB table
    }
    if (process.isClient) {
      this.canCopy = !!navigator.clipboard;
    }
  },
  computed: {
    ...mapGetters(['getLang']),
    userRole () {
      if (this.$auth.userRole != null) {
        return this.$auth.userRole[0].name;
      }
      return null;
    },
  },
  methods: {
    getUserId(ref) {
      return new Promise((resolve, reject) => {
      this.$db.getUserId(ref)
        .then(id => {
          this.$auth.getMgUser(id)
            .then(artist => {
              if (Object.prototype.hasOwnProperty.call(artist, "given_name")) {
                this.artist.firstName = artist.given_name;
              } else {
                this.artist.firstName = artist.name.split(" ")[0];
              }
              if (Object.prototype.hasOwnProperty.call(artist, "family_name")) {
                this.artist.lastName = artist.family_name;
              } else {
                this.artist.lastName = artist.name.split(" ")[1];
              }
              this.artist.name = artist.name;
              this.artist.pic =
                Object.prototype.hasOwnProperty.call(artist, "picture_large") ? artist.picture_large : artist.picture;
              if (Object.prototype.hasOwnProperty.call(artist, "user_metadata") &&
                  Object.prototype.hasOwnProperty.call(artist.user_metadata, "bio")) {
                this.artist.bio = artist.user_metadata.bio;
              }
              this.artist.userId = artist.user_id;
              this.$imgdb.getArtworks(artist.user_id, 'approved')
                .then(found => {
                  if (found.total_count> 0) {
                    // found approved artworks
                    found.resources.forEach(resource => {
                      var title = '';
                      var rentPrice = '';
                      var salePrice = '';
                      var size = '';
                      var type = '';
                      var tags = Object.prototype.hasOwnProperty.call(resource, "tags") ? resource.tags : [];
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
                      }
                      this.artist.gallery.push({
                        public_id: resource.public_id,
                        url: resource.secure_url,
                        title: title,
                        type: type,
                        rentPrice: rentPrice,
                        salePrice: salePrice,
                        size: size,
                        tags: tags,
                        isProcFavorite: false,
                        likes: null
                      });
                    });
                    var count = 0;
                    this.artist.gallery.forEach(async artwork => {
                      // get likes of each artwork
                      await this.getArtworkLikes(
                          this.artist.userId,
                          this.$helper.toPublicIdNoPath(artwork.public_id, '/approved/')
                        )
                        .then(count => { // add the likes
                          artwork.likes = count;
                        })
                        .finally(() => {
                          this.artist.columns[count].push(artwork);
                          count = (count + 1) % 3;
                        });
                    });
                    this.state = 0; // OK
                  } else {
                    // Artist has no approved artworks, designate as not found
                    this.state = -1;
                  }
                  this.getArtistFollowers(this.artist.userId)
                    .then(count => this.followers = count)
                    .finally(() => resolve());
                })
                .catch(() => {
                  // Error while fetching artworks occured
                  this.state = -2;
                  reject();
                })
            })
            .catch(err => {
              if (err === 404) {
                this.state = -1; // Simple user, designate as not found
              } else {
                this.state = -2; // Error
              }
              reject();
            })
        })
        .catch(() => {
          this.state = -1; // Not found
          reject();
        })
      })
    },
    toggleFollow() {
      if (!this.$auth.isAuthenticated()) {
        // Not authenticated, can't like an artwork. Prompt login/signup.
        this.$auth.login();
      } else {
        this.artist.isProcFollow = true;
        if (this.followerRefId === null) {
          // Not followed, so add
          this.$db.addFollow(this.$auth.user.sub, this.artist.userId)
            .then(refId => {
                this.getArtistFollowers(this.artist.userId)
                  .then(count => {
                    this.followerRefId = refId;
                    this.followers = count;
                  })
                  .finally(() => this.artist.isProcFollow = false);
            })
            .catch(() => this.artist.isProcFollow = false);
        } else {
          // Followed, so remove
          this.$db.deleteFollow(this.followerRefId)
            .then(() => {
              this.getArtistFollowers(this.artist.userId)
                .then(count => {
                  this.followerRefId = null;
                  this.followers = count;
                })
                .finally(() => this.artist.isProcFollow = false);
            })
            .catch(() => this.artist.isProcFollow = false);
        }
      }
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
        this.userFavorites.find((favorite) => {
          if (favorite.public_id === artwork.public_id) {
            isAlreadyFavorite = true;
          }
          return isAlreadyFavorite;
        })
        artwork.isProcFavorite = true;
        const artwork_id = this.$helper.toPublicIdNoPath(artwork.public_id, '/approved/');
        if (isAlreadyFavorite) {
          // Remove
          this.$db.getRefFavorite(this.$auth.user.sub, this.artist.userId, artwork_id)
            .then(refId => { // get Ref of favorite first
              this.$db.deleteFavorite(refId)
                .finally(() => {
                  this.getUserFavorites()
                    .finally(() => {
                      this.getArtworkLikes(this.artist.userId, artwork_id)
                        .then(count => artwork.likes = count)
                        .finally(() => {
                          artwork.isProcFavorite = false;
                          this.$forceUpdate();
                        })
                    })
                })
            })
            .catch(() => {
              artwork.isProcFavorite = false;
              this.$forceUpdate();
            })
        } else {
          // Add
          this.$db.addFavorite(this.$auth.user.sub, this.artist.userId, artwork_id)
            .finally(() => {
              this.getUserFavorites()
                .finally(() => {
                  this.getArtworkLikes(this.artist.userId, artwork_id)
                    .then(count => artwork.likes = count)
                    .finally(() => {
                      artwork.isProcFavorite = false;
                      this.$forceUpdate();
                    })
                })
            })
        }
      }
    },
    async getArtistFollowers (artist_id) {
      return await new Promise((resolve, reject) => {
        this.$db.getArtistFollowers(artist_id)
          .then(count => resolve(count))
          .catch(err => reject(err))
      })
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
      titleTemplate: this.artist.name + " — Artventures",
      meta: [{ name: "description", content: "Artist's page" }],
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