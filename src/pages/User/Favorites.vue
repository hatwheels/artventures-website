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
          <div v-if="fetchedFavorites === 0">
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
          <div v-else-if="fetchedFavorites === 1">
            <div v-if="userFavorites.length > 0">
              <v-row class="px-12" justify="start" align="start">
                <v-col
                  class="pr-6"
                  v-for="(column, j) in columns[pageFavorites.desktop - 1]"
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
                        artwork.url.replace('artventures/image/upload/', 'artventures/image/upload/c_thumb,w_100/')"
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
                                <v-icon v-if="!artwork.favorite" size="30">mdi-heart-outline</v-icon>
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
                                @click="
                                  overlayDesktop = true;
                                  enlargedImg.url = artwork.url;
                                  enlargedImg.title = artwork.title;
                                "
                              >
                                <v-icon size="30">mdi-fullscreen</v-icon>
                              </v-btn>
                            </template>
                            <span>{{ $helper.plainText.artworkZoom[getLang] }}</span>
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
                            <span>{{ $helper.plainText.artistPage[getLang] }}</span>
                          </v-tooltip>
                        </v-card-actions>
                        <div class="pb-2 pr-4 text-end">
                          <div class="raleway-23-400" v-if="artwork.salePrice">
                            {{ artwork.salePrice }}€
                          </div>
                          <div class="raleway-18-400" v-if="artwork.rentPrice">
                            <span class="pr-1">{{ $helper.plainText.rentFor[getLang] }}</span>
                            {{ artwork.rentPrice }}
                            <span>{{ $helper.plainText.rentPerMonth[getLang] }}</span>
                          </div>
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
            <!-- Empty (userFavorites.length === 0) -->
            <div v-else class="center-viewport">
              <v-row style="height: 100%" justify="center" align="center">
                <v-col>
                  <p
                    class="text-center"
                    :class="
                      getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                  >
                    {{ $helper.plainText.emptyFavorites[getLang] }}
                  </p>
                </v-col>
              </v-row>
            </div>
          </div>
          <!-- Error (fetchedFavorites === -1) -->
          <div v-else class="center-viewport">
            <v-row style="height: 100%" justify="center" align="center">
              <v-col>
                <p
                  class="text-center"
                  :class="
                    getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                >
                  {{ $helper.plainText.error[getLang] }}
                </p>
              </v-col>
            </v-row>
          </div>
        </div>
        <!-- Mobile -->
        <div class="hidden-md-and-up py-4">
          <div v-if="fetchedFavorites === 0">
            <v-row class="px-4" justify="center" align="center">
              <v-col><v-skeleton-loader type="card" /></v-col>
            </v-row>
            <v-row class="px-4" justify="center" align="center">
              <v-col><v-skeleton-loader type="card" /></v-col>
            </v-row>
            <v-row class="px-4" justify="center" align="center">
              <v-col cols="3"><v-skeleton-loader type="actions" /></v-col>
            </v-row>
          </div>
          <div v-else-if="fetchedFavorites === 1">
            <div v-if="userFavorites.length > 0">
              <v-row
                class="px-6"
                v-for="(artwork, i) in gallery[pageFavorites.mobile - 1]"
                :key="'artwork-mobile-' + i"
                justify="center"
                align="center"
              >
                <v-col cols="12" class="px-0">
                  <v-card>
                    <v-img
                      :src="artwork.url"
                      :lazy-src="
                        artwork.url.replace('artventures/image/upload/', 'artventures/image/upload/c_thumb,w_100/')"
                      :alt="artwork.title || 'Untitled'"
                      contain
                    />
                    <v-row justify="space-between">
                      <v-col>
                        <v-card-title
                          v-if="artwork.title"
                          class="raleway-16-400 text-capitalize font-italic text-start pr-0 pb-0"
                          v-text="artwork.title"
                        />
                        <div />
                        <v-card-subtitle
                          v-if="artwork.artist_name"
                          class="raleway-18-400 text-capitalize text-start pr-0"
                          :class="artwork.title ? 'pt-2' : ''"
                          v-text="artwork.artist_name"
                        />
                        <v-card-text class="raleway-13-400 text-start pr-0">
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
                              v-for="(tag, i) in artwork.tags"
                              :key="'tag-mobile-' + i"
                            >
                              {{ tag }}
                              <span v-if="i !== artwork.tags.length - 1">,</span
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
                                v-bind="attrs"
                                v-on="on"
                                :loading="artwork.isProcFavorite"
                                @click="toggleFavorite(artwork)"
                              >
                                <v-icon v-if="!artwork.favorite">mdi-heart-outline</v-icon>
                                <v-icon v-else color="pink lighten-3">mdi-heart</v-icon>
                              </v-btn>
                            </template>
                            <span>{{ $helper.plainText.heart[getLang] }}</span>
                          </v-tooltip>
                          <v-tooltip v-if="canCopy" top color="black">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                v-bind="attrs"
                                v-on="on"
                                @click="shareArtwork(artwork)"
                              >
                                <v-icon>mdi-share-variant-outline</v-icon>
                              </v-btn>
                            </template>
                            <span>{{ $helper.plainText.share[getLang] }}</span>
                          </v-tooltip>
                          <v-tooltip top color="black">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                v-bind="attrs"
                                v-on="on"
                                @click="
                                  overlayMobile = true;
                                  enlargedImg.url = artwork.url;
                                  enlargedImg.title = artwork.title;
                                "
                              >
                                <v-icon>mdi-fullscreen</v-icon>
                              </v-btn>
                            </template>
                            <span>{{ $helper.plainText.artworkZoom[getLang] }}</span>
                          </v-tooltip>
                          <v-tooltip top color="black">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                v-bind="attrs"
                                v-on="on"
                                @click="getRefArtist(artwork.user_id)"
                              >
                                <v-icon>mdi-link</v-icon>
                              </v-btn>
                            </template>
                            <span>{{ $helper.plainText.artistPage[getLang] }}</span>
                          </v-tooltip>
                        </v-card-actions>
                        <div class="pb-2 pr-4 text-end">
                          <div class="raleway-16-400" v-if="artwork.salePrice">
                            {{ artwork.salePrice }}€
                          </div>
                          <div class="raleway-12-400" v-if="artwork.rentPrice">
                            <span class="pr-1">{{ $helper.plainText.rentFor[getLang] }}</span>
                             {{ artwork.rentPrice }}
                             <span>{{ $helper.plainText.rentPerMonth[getLang] }}</span>
                          </div>
                        </div>
                        <div
                          v-if="artwork.likes !== null"
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
            <!-- Empty (userFavorites.length === 0) -->
            <div v-else class="center-viewport">
              <v-row style="height: 100%" justify="center" align="center">
                <v-col>
                  <p
                    class="text-center"
                    :class="getLang === 'gr'? 'noto-16-400-1p6em': 'raleway-16-400-1p6em'"
                  >
                    {{ $helper.plainText.emptyFavorites[getLang] }}
                  </p>
                </v-col>
              </v-row>
            </div>
          </div>
          <!-- Error fetchedFavorites === -1 -->
          <div v-else class="center-viewport"> 
            <v-row style="height: 100%" justify="center" align="center">
              <v-col>
                <p
                  class="text-center"
                  :class="
                    getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                >
                  {{ $helper.plainText.error[getLang] }}
                </p>
              </v-col>
            </v-row>
          </div>
        </div>
        <!-- Pagination Desktop -->
        <v-row
          v-if="totalPagesFavorites.desktop > 1"
          class="hidden-sm-and-down"
          align="center"
          justify="center"
          no-gutters
        >
          <v-col cols="6">
            <v-pagination
              :value="pageFavorites.desktop"
              :length="totalPagesFavorites.desktop"
              color="#333333"
              @input="paginateDesktop($event, pageFavorites, '#favorite')"
              @next="nextPageDesktop(pageFavorites, totalPagesFavorites, '#favorite')"
              @previous="prevPageDesktop(pageFavorites, '#favorite')"
            >
            </v-pagination>
          </v-col>
        </v-row>
        <!-- Pagination Mobile -->
        <v-row
          v-if="totalPagesFavorites.mobile > 1"
          class="hidden-md-and-up"
          align="center"
          justify="center"
          no-gutters
        >
          <v-col cols="10">
            <v-pagination
              :value="pageFavorites.mobile"
              :length="totalPagesFavorites.mobile"
              color="#333333"
              @input="paginateMobile($event, pageFavorites, '#favorite')"
              @next="nextPageMobile(pageFavorites, totalPagesFavorites, '#favorite')"
              @previous="prevPageMobile(pageFavorites, '#favorite')"
            >
            </v-pagination>
          </v-col>
        </v-row>

        <div class="py-8" />
        <!-- Following Artists -->
        <div class="background-color-dddddd custom-divider"></div>
        <div class="py-8" />

        <div
          id="follow"
          class="my-0 text-center"
          :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
          v-html="getLang === 'gr' ? 'Ακολουθίες μου' : 'My Follows'"
        />
        <div class="py-4" />
        <!-- Desktop -->
        <div class="hidden-sm-and-down">
          <div v-if="fetchedFollows === 0">
            <v-row class="px-12 mx-12" justify="center" align="center">
              <v-col><v-skeleton-loader type="list-item" /></v-col>
              <v-col><v-skeleton-loader type="list-item" /></v-col>
              <v-col><v-skeleton-loader type="list-item" /></v-col>
            </v-row>
            <v-row class="px-12 mx-12" justify="center" align="center">
              <v-col><v-skeleton-loader type="list-item" /></v-col>
              <v-col><v-skeleton-loader type="list-item" /></v-col>
              <v-col><v-skeleton-loader type="list-item" /></v-col>
            </v-row>
            <v-row class="px-12 mx-12" justify="center" align="center">
              <v-col cols="2"><v-skeleton-loader type="actions" /></v-col>
            </v-row>
          </div>
          <div v-else-if="fetchedFollows === 1">
            <div v-if="userFollows.length > 0">
              <v-row class="px-12" justify="space-around" align="center">
                <v-col
                  class="pr-6"
                  v-for="(artistDesktop, j) in artistsDesktop[pageFollows.desktop - 1]"
                  :key="'artist-desktop-' + j"
                  cols="auto"
                >
                  <div
                    class="my-6"
                    v-for="(artist, i) in artistDesktop"
                    :key="'artist-' + i"
                  >
                    <div class="d-flex">
                      <div
                        v-if="artist.name"
                        class="raleway-25-400 text-capitalize text-center font-weight-bold"
                        v-text="artist.name"
                      />
                      <v-tooltip top color="black">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            class="ml-1"
                            icon
                            v-bind="attrs"
                            v-on="on"
                            :loading="artist.isProcFollow"
                            @click="toggleFollow(artist)"
                          >
                            <v-icon v-if="artist.followerRefId !== null" size="30" color="blue lighten-2">mdi-thumb-up</v-icon>
                            <v-icon v-else size="30">mdi-thumb-up-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $helper.plainText.follow[getLang] }}</span>
                      </v-tooltip>
                      <v-tooltip top color="black">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            class="ml-1"
                            icon
                            v-bind="attrs"
                            v-on="on"
                            @click="getRefArtist(artist.user_id)"
                          >
                            <v-icon size="30">mdi-link</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $helper.plainText.artistPage[getLang] }}</span>
                      </v-tooltip>
                    </div>
                    <div v-if="artist.followers !== null"
                      class="montserrat-12-400-italic text-center"
                    >
                      {{ artist.followers }} FOLLOWERS
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
            <!-- Empty (userFollows.length === 0) -->
            <div v-else class="center-viewport">
              <v-row style="height: 100%" justify="center" align="center">
                <v-col>
                  <p
                    class="text-center"
                    :class="
                      getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                  >
                    {{ $helper.plainText.emptyFollows[getLang] }}
                  </p>
                </v-col>
              </v-row>
            </div>
          </div>
          <!-- Error (fetchedFollows === -1) -->
          <div v-else class="center-viewport">
            <v-row style="height: 100%" justify="center" align="center">
              <v-col>
                <p
                  class="text-center"
                  :class="
                    getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                >
                  {{ $helper.plainText.error[getLang] }}
                </p>
              </v-col>
            </v-row>
          </div>
        </div>
        <!-- Mobile -->
        <div class="hidden-md-and-up py-4">
          <div v-if="fetchedFollows === 0">
            <v-row class="px-4" justify="center" align="center">
              <v-col><v-skeleton-loader type="list-item" /></v-col>
            </v-row>
            <v-row class="px-4" justify="center" align="center">
              <v-col><v-skeleton-loader type="list-item" /></v-col>
            </v-row>
            <v-row class="px-4" justify="center" align="center">
              <v-col cols="3"><v-skeleton-loader type="actions" /></v-col>
            </v-row>
          </div>
          <div v-else-if="fetchedFollows === 1">
            <div v-if="userFollows.length > 0">
              <v-row
                v-for="(artist, i) in artistsMobile[pageFollows.mobile - 1]"
                :key="'artist-mobile-' + i"
                justify="center"
                align="center"
              >
                <v-col cols="auto">
                  <div class="d-flex align-center">
                    <div
                      v-if="artist.name"
                      class="raleway-16-400 text-capitalize text-center font-weight-bold"
                      v-text="artist.name"
                    />
                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="ml-1"
                          icon
                          v-bind="attrs"
                          v-on="on"
                          :loading="artist.isProcFollow"
                          @click="toggleFollow(artist)"
                        >
                          <v-icon v-if="artist.followerRefId !== null" color="blue lighten-2">mdi-thumb-up</v-icon>
                          <v-icon v-else>mdi-thumb-up-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ $helper.plainText.follow[getLang] }}</span>
                    </v-tooltip>
                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="ml-1"
                          icon
                          v-bind="attrs"
                          v-on="on"
                          @click="getRefArtist(artist.user_id)"
                        >
                          <v-icon>mdi-link</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ $helper.plainText.artistPage[getLang] }}</span>
                    </v-tooltip>
                  </div>
                  <div v-if="artist.followers !== null"
                    class="montserrat-12-400-italic text-center"
                  >
                    {{ artist.followers }} FOLLOWERS
                  </div>
                </v-col>
              </v-row>
            </div>
            <!-- Empty (userFollows.length === 0) -->
            <div v-else class="center-viewport">
              <v-row style="height: 100%" justify="center" align="center">
                <v-col>
                  <p
                    class="text-center"
                    :class="
                      getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                  >
                    {{ $helper.plainText.emptyFollows[getLang] }}
                  </p>
                </v-col>
              </v-row>
            </div>
          </div>
          <!-- Error (fetchedFollows === -1) -->
          <div v-else class="center-viewport">
            <v-row style="height: 100%" justify="center" align="center">
              <v-col>
                <p
                  class="text-center"
                  :class="
                    getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                >
                  {{ $helper.plainText.error[getLang] }}
                </p>
              </v-col>
            </v-row>
          </div>
        </div>
        <!-- Pagination Desktop -->
        <v-row
          v-if="totalPagesFollows.desktop > 1"
          class="hidden-sm-and-down"
          align="center"
          justify="center"
          no-gutters
        >
          <v-col cols="6">
            <v-pagination
              v-model="pageFollows.desktop"
              :length="totalPagesFollows.desktop"
              color="#333333"
              @input="paginateDesktop($event, pageFollows, '#follow')"
              @next="nextPageDesktop(pageFollows, totalPagesFollows, '#follow')"
              @previous="prevPageDesktop(pageFollows, '#follow')"
            >
            </v-pagination>
          </v-col>
        </v-row>
        <!-- Pagination Mobile -->
        <v-row
          v-if="totalPagesFollows.mobile > 1"
          class="hidden-md-and-up"
          align="center"
          justify="center"
          no-gutters
        >
          <v-col cols="10">
            <v-pagination
              v-model="pageFollows.mobile"
              :length="totalPagesFollows.mobile"
              color="#333333"
              @input="paginateMobile($event, pageFollows, '#follow')"
              @next="nextPageMobile(pageFollows, totalPagesFollows, '#follow')"
              @previous="prevPageMobile(pageFollows, '#follow')"
            >
            </v-pagination>
          </v-col>
        </v-row>
        <div class="py-8" />
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
                  @click="
                    enlargedImg.url = '';
                    enlargedImg.title = '';
                    overlayDesktop = false;
                  "
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
              <span>{{ $helper.plainText.close[getLang] }}</span>
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
              enlargedImg.url.replace('artventures/image/upload/', 'artventures/image/upload/c_thumb,w_100/')"
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
  </UserLayout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {
    ScrollToTop: () => import("~/components/ScrollToTop.vue"),
  },
  data() {
    return {
      fetchedFavorites: 0,
      fetchedFollows: 0,
      pageFavorites: {
        desktop: 1,
        mobile: 1,
      },
      pageFollows: {
        desktop: 1,
        mobile: 1,
      },
      totalPagesFavorites: {
        desktop: 0,
        mobile: 0,
      },
      totalPagesFollows: {
        desktop: 0,
        mobile: 0,
      },
      artworksPerPageFavorites: {
        desktop: 12,
        mobile: 6,
      },
      artworksPerPageFollows: {
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
      // Favorite Artworks
      userFavorites: [],
      // Gallery array for mobile view
      gallery: [], // [[], [], [], ...]
      // Gallery array for the desktop view
      columns: [[], [], []], // [ [[], [], []], [[], [], []], [[], [], []], ... ]
      // Followed Artists
      userFollows: [],
      // Followed Artists array for mobile view
      artistsMobile: [], // [[], [], [], ...]
      // Followed Artists array for desktop view
      artistsDesktop: [[], [], []], // [ [[], [], []], [[], [], []], [[], [], []], ... ]
      canCopy: false,
      isSharing: {
        state: false,
        text: {
          gr: "",
          en: ""
        },
        timeoutCb: null
      }
    };
  },
  mounted() {
    if (process.isClient) {
      this.canCopy = !!navigator.clipboard;
    }
    if (this.$auth.isAuthenticated()) {
      this.getUserFavorites();
      this.getUserFollows();
    }
  },
  computed: {
    ...mapGetters(["getLang"]),
  },
  methods: {
    async paginateDesktop(e, page, tag) {
      if (page.desktop !== e) {
        await this.$vuetify.goTo(tag);
        page.desktop = e;
      }
    },
    async nextPageDesktop(page, totalPages, tag) {
      if (page.desktop > totalPages.desktop) {
        await this.$vuetify.goTo(tag);
      } else if (page.desktop < totalPages.desktop) {
        await this.$vuetify.goTo(tag);
      }
    },
    async prevPageDesktop(page, tag) {
      if (page.desktop < 1) {
        await this.$vuetify.goTo(tag);
      } else if (page.desktop > 1) {
        await this.$vuetify.goTo(tag);
      }
    },
    async paginateMobile(e, page, tag) {
      if (page.mobile !== e) {
        await this.$vuetify.goTo(tag);
        page.mobile = e;
      }
    },
    async nextPageMobile(page, totalPages, tag) {
      if (page.mobile > totalPages.mobile) {
        await this.$vuetify.goTo(tag);
      } else if (page.mobile < totalPages.mobile) {
        await this.$vuetify.goTo(tag);
      }
    },
    async prevPageMobile(page) {
      if (page.mobile < 1) {
        await this.$vuetify.goTo('#start');
      } else if (page.mobile > 1) {
        await this.$vuetify.goTo('#start');
      }
    },
    getRefArtist(artist_id) {
      this.goToArtist = true;
      this.$db
        .getRef(artist_id)
        .then((ref) => {
          // Fetched artist's reference, go to artist's page.
          this.$router.push({ path: "/artist/" + ref });
          this.goToArtist = false;
        })
        .catch(() => (this.goToArtist = false));
    },
    async getUserFavorites() {
      this.fetchedFavorites = 0;
      let favorites;
      try {
        favorites = await this.$db.getFavorites(this.$auth.user.sub);
        // Find for each favorite artwork the artist name.
        await Promise.all(favorites.map(async favorite => {
          let artist_name;
          try {
            artist_name = await this.$auth.getMgUser(favorite[0]);
            favorite.push(artist_name.name); // index 3
          } catch {
            favorite.push(''); // index 3
          }
        }));
        let found;
        if (favorites.length > 0) {
          try {
            found = await this.$imgdb.getFavoriteArtworks(favorites);
            if (found.total_count > 0) {
              found.resources.forEach(resource => {
                // Artist
                var title = "";
                var rentPrice = "";
                var salePrice = "";
                var size = "";
                var type = "";
                var tags = Object.prototype.hasOwnProperty.call(resource, "tags") ? resource.tags : [];
                if (Object.prototype.hasOwnProperty.call(resource, "context")) {
                  // Title
                  if (Object.prototype.hasOwnProperty.call(resource.context, "caption")) {
                    title = resource.context.caption;
                    title = title.toLowerCase();
                  }
                  // Rent, Sale Price
                  if (Object.prototype.hasOwnProperty.call(resource.context, "rent_price")) {
                    rentPrice = resource.context.rent_price;
                  }
                  if (Object.prototype.hasOwnProperty.call(resource.context, "sale_price")) {
                    salePrice = resource.context.sale_price;
                  }
                  if (Object.prototype.hasOwnProperty.call(resource.context, "type")) {
                    type = this.$helper.plainText.type[resource.context.type];
                    if (type.en.toLowerCase() === "sculpture") {
                      // it's a sculpture
                      if (
                        Object.prototype.hasOwnProperty.call(resource.context, "dimension") &&
                        Object.prototype.hasOwnProperty.call(resource.context, "height") &&
                        Object.prototype.hasOwnProperty.call(resource.context, "width") &&
                        Object.prototype.hasOwnProperty.call(resource.context, "depth")
                      ) {
                        size = resource.context.height + " x " + resource.context.width + " x " + resource.context.depth + " " + resource.context.dimension;
                      }
                    } else if (
                      type.en.toLowerCase() === "painting" ||
                      type.en.toLowerCase() === "drawing" ||
                      type.en.toLowerCase() === "photography" ||
                      type.en.toLowerCase() === "digital"
                    ) {
                      // it's a painting/drawing/photography/digital
                      if (
                        Object.prototype.hasOwnProperty.call(resource.context, "dimension") &&
                        Object.prototype.hasOwnProperty.call(resource.context, "height") &&
                        Object.prototype.hasOwnProperty.call(resource.context, "width")
                      ) {
                        size = resource.context.height + " x " + resource.context.width + " " + resource.context.dimension;
                      }
                    }
                  }
                }
                // check that favorite artwork exists and if it does add artist's name. 
                let artist_id = resource.public_id.replace('artwork/', '');
                let c = artist_id.indexOf('/');
                artist_id = artist_id.substring(0, c);
                favorites.find(favorite => { // [ artist_id, refId, name ]
                  if (favorite[0] === artist_id) {
                    this.userFavorites.push({
                      public_id: resource.public_id,
                      user_id: favorite[0],
                      artist_name: favorite[3],
                      url: resource.secure_url,
                      title: title,
                      type: type,
                      rentPrice: rentPrice,
                      salePrice: salePrice,
                      size: size,
                      tags: tags,
                      isProcFavorite: false,
                      likes: null,
                      favorite: true,
                    });
                    return true;
                  }
                  return false;
                });
              });
            }
            // Resolve non-existing favorites
            if (found.total_count < favorites.length) {
              let favoritesNonExisting = [];
              this.userFavorites.forEach(favorite => {
                let match = false;
                found.find(resource => {
                  match = resource.public_id === favorite.public_id ? true : false;
                  return match;
                });
                if (!match) {
                  let artwork_id = "";
                  this.$helper.artworkStates.folders.find(item => {
                    artwork_id = this.$helper.toPublicIdNoPath(favorite.public_id, item);
                    return artwork_id !== "" ? true : false;
                  });
                  this.favoritesNonExisting.push({
                    artwork_id: artwork_id,
                    artist_id: favorite.user_id
                  });
                }
              });
              if (favoritesNonExisting.length > 0) {
                await Promise.all(favoritesNonExisting.map(async favoriteNonExisting => {
                  this.$db
                    .getRefFavorite(this.$auth.user.sub, favoriteNonExisting.artist_id, favoriteNonExisting.artwork_id)
                    .then(refId => this.$db.deleteFavorite(refId))
                }));
              }
            }
          } catch {
            // empty
          }
        }
        // Compute total pages and assign gallery arrays
        this.totalPagesFavorites.desktop =
          Math.floor(this.userFavorites.length / this.artworksPerPageFavorites.desktop) + 1;
        this.totalPagesFavorites.mobile =
          Math.floor(this.userFavorites.length / this.artworksPerPageFavorites.mobile) + 1;
        this.gallery = Array(this.totalPagesFavorites.mobile);
        for (var i = 0; i < this.totalPagesFavorites.mobile; i++) {
          this.gallery[i] = Array();
        }
        this.columns = Array(this.totalPagesFavorites.desktop);
        for (i = 0; i < this.totalPagesFavorites.desktop; i++) {
          this.columns[i] = Array(3);
          this.columns[i][0] = Array();
          this.columns[i][1] = Array();
          this.columns[i][2] = Array();
        }
        let count = 0;
        let artwork_id = "";
        this.userFavorites.forEach((artwork, index) => {
          this.$helper.artworkStates.folders.find(item => {
            artwork_id = this.$helper.toPublicIdNoPath(artwork.public_id, item);
            return artwork_id !== "" ? true : false;
          });
          if (artwork_id !== "") {
            this.getArtworkLikes(artwork.user_id, artwork_id).then(likesCount => artwork.likes = likesCount);
          }
          this.gallery[Math.floor(index / this.artworksPerPageFavorites.mobile)].push(artwork);
          this.columns[Math.floor(index / this.artworksPerPageFavorites.desktop)][count].push(artwork);
          count = (count + 1) % 3;
        });
        this.fetchedFavorites = 1;
      } catch {
        this.fetchedFavorites = -1;
      }
    },
    async getUserFollows() {
      let follows;
      try {
        follows = await this.$db.getFollows(this.$auth.user.sub);
        await Promise.all(
          follows.map(async (follow) => {
            let foundArtist;
            try {
              foundArtist = await this.$auth.getMgUser(follow[0]);
              this.userFollows.push({
                user_id: foundArtist.user_id,
                name: foundArtist.name,
                isProcFollow: false,
                followerRefId: follow[1],
                followers: null
              });
            } catch {
              // empty
            }
          })
        );
        // Compute total pages and assign artists arrays
        this.totalPagesFollows.desktop = Math.floor(this.userFollows.length / this.artworksPerPageFollows.desktop) + 1;
        this.totalPagesFollows.mobile = Math.floor(this.userFollows.length / this.artworksPerPageFollows.mobile) + 1;
        this.artistsMobile = Array(this.totalPagesFollows.mobile);
        for (var i = 0; i < this.totalPagesFollows.mobile; i++) {
          this.artistsMobile[i] = Array();
        }
        this.artistsDesktop = Array(this.totalPagesFollows.desktop);
        for (i = 0; i < this.totalPagesFollows.desktop; i++) {
          this.artistsDesktop[i] = Array(3);
          this.artistsDesktop[i][0] = Array();
          this.artistsDesktop[i][1] = Array();
          this.artistsDesktop[i][2] = Array();
        }
        let count = 0;
        await Promise.all(this.userFollows.map(async (artist, index) => {
          let followCounts;
          try {
            followCounts = await this.getArtistFollowers(artist.user_id);
            artist.followers = followCounts;
          } catch {
            // empty
          }
          this.artistsMobile[Math.floor(index / this.artworksPerPageFollows.mobile)].push(artist);
          this.artistsDesktop[Math.floor(index / this.artworksPerPageFollows.desktop)][count].push(artist);
          count = (count + 1) % 3;
        }));
        this.fetchedFollows = 1;
      } catch {
        this.fetchedFollows = -1;
      }
    },
    async getArtworkLikes(artist_id, artwork_id) {
      return await new Promise((resolve, reject) => {
        this.$db.getArtworkLikes(artist_id, artwork_id)
          .then((count) => resolve(count))
          .catch((err) => reject(err));
      });
    },
    async getArtistFollowers (artist_id) {
      return await new Promise((resolve, reject) => {
        this.$db.getArtistFollowers(artist_id)
          .then(count => resolve(count))
          .catch(err => reject(err))
      })
    },
    toggleFavorite(artwork) {
      if (!this.$auth.isAuthenticated()) {
        // Not authenticated, can't like an artwork. Prompt login/signup.
        this.$auth.login();
      } else {
        artwork.isProcFavorite = true;
        let artwork_id = "";
        this.$helper.artworkStates.folders.find(item => {
          artwork_id = this.$helper.toPublicIdNoPath(artwork.public_id, item);
          if (artwork_id !== "") {
            return true;
          }
          return false;
        });
        var artist_id = artwork.user_id;
        if (artwork.favorite) {
          // Remove
          this.$db.getRefFavorite(this.$auth.user.sub, artist_id, artwork_id) // get Ref of favorite first
            .then((refId) => {
              this.$db.deleteFavorite(refId).finally(() => {
                this.getArtworkLikes(artist_id, artwork_id)
                  .then((count) => (artwork.likes = count))
                  .finally(() => {
                    artwork.favorite = false;
                    artwork.isProcFavorite = false;
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
              this.getArtworkLikes(artist_id, artwork_id)
                .then((count) => (artwork.likes = count))
                .finally(() => {
                  artwork.favorite = true;
                  artwork.isProcFavorite = false;
                });
            });
        }
      }
    },
    toggleFollow(artist) {
      if (!this.$auth.isAuthenticated()) {
        // Not authenticated, can't like an artwork. Prompt login/signup.
        this.$auth.login();
      } else {
        artist.isProcFollow = true;
        if (artist.followerRefId === null) {
          // Not followed, so add
          this.$db.addFollow(this.$auth.user.sub, artist.user_id)
            .then(refId => {
                this.getArtistFollowers(artist.user_id)
                  .then(count => {
                    artist.followerRefId = refId;
                    artist.followers = count;
                  })
                  .finally(() => artist.isProcFollow = false);
            })
            .catch(() => artist.isProcFollow = false);
        } else {
          // Followed, so remove
          this.$db.deleteFollow(artist.followerRefId)
            .then(() => {
              this.getArtistFollowers(artist.user_id)
                .then(count => {
                  artist.followerRefId = null;
                  artist.followers = count;
                })
                .finally(() => artist.isProcFollow = false);
            })
            .catch(() => artist.isProcFollow = false);
        }
      }
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