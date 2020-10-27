<template>
    <UserLayout>
      <v-main>
        <v-container class="px-0 py-12 background-color-fafafa" fluid>
          <div
              :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
              class="pb-10 my-0 text-center"
              v-html="getLang === 'gr' ? 'Το Πορτφόλιο μου' : 'My Portfolio'"
          />

          <v-card flat height="100%" color="rgba(250, 250, 250, 1)">
            <v-tabs
              v-model="tabs.currentTab"
              class="text-capitalize px-8"
              background-color="rgba(250, 250, 250, 1)"
              color="black"
              :vertical="$vuetify.breakpoint.mobile"
            >
              <v-tab
                v-for="(title, i) in tabs.titles" :key="'tab-title-' + i"
                :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
                v-html="title[getLang]"
              />
            </v-tabs>
            <v-tabs-items
              v-model="tabs.currentTab"
              class="background-color-fafafa px-8"
              :touchless="$vuetify.breakpoint.mobile"
            >
              <v-tab-item
                v-for="(artworksInSection, i) in allArtworks"
                :key="'artworks-' + i"
                class="background-color-fafafa text-center"
              >
                <v-card v-if="artworksInSection.length === 0" height="300px" flat color="#FAFAFA">
                  <v-card-text>
                    <img
                      v-show="isFetchingImages"
                      src="../../../static/loading.svg"
                      alt="Loading"
                    />
                  </v-card-text>
                  <v-card-text
                    v-show="!isFetchingImages"
                    style="padding-top: 140px;"
                    :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
                    v-html="tabs.emptySection[getLang]"
                  />
                </v-card>
                <v-container fluid>
                  <!-- Desktop -->
                  <v-row class="hidden-sm-and-down pb-12 px-12" justify="start" align="start">
                    <v-col class="pr-6" v-for="(column, j) in columns[i]" :key="'column' + j" cols="4">
                      <v-card class="my-6 text-center" v-for="(artwork, k) in column" :key="'artwork-' + k">
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
                            <v-card-text class="raleway-18-400 text-start">
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
                            <div class="pb-2 px-4 text-end">
                              <div class="raleway-23-400" v-if="artwork.salePrice">{{ artwork.salePrice }}€</div>
                              <div class="raleway-21-400" v-if="artwork.rentPrice">
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
                  <!-- Mobile -->
                  <v-row class="hidden-md-and-up px-12" justify="center" align="center">
                    <v-col v-for="(artwork, i ) in artworksInSection" :key="'artwork-mobile-' + i" cols="12">
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
                            <v-card-text class="raleway-13-400 text-start">
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
                            <div class="pb-2 px-4 text-end">
                              <div class="raleway-16-400" v-if="artwork.salePrice">{{ artwork.salePrice }}€</div>
                              <div class="raleway-14-400" v-if="artwork.rentPrice">
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
                </v-container>
              </v-tab-item>
            </v-tabs-items>
          </v-card>

          <div
            :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
            class="pt-12 my-0 mx-1 text-center"
            v-html="getLang === 'gr' ? 'Υπόβαλε Εργο Τέχνης' : 'Submit Artwork'"
          />
          <v-row class="pt-8 pb-12" justify="center" align="center">
            <v-col cols="10" md="4">
              <form lazy-validation @submit.prevent="submit()">
                <label
                  :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                  class="color-1a1a1a text-capitalize"
                  v-html="artworkForm.type[getLang]"
                />
                <v-select
                  v-model="type"
                  class="pb-2"
                  :items="[
                    {
                      text: getLang === 'gr' ? 'Πίνακας' : 'Painting',
                      value: 'painting'
                    },
                    {
                      text: getLang === 'gr' ? 'Γλυπτό' : 'Sculpture',
                      value: 'sculpture'
                    }]"
                  required
                  background-color="#FAFAFA"
                  color="#1A1A1A"
                  :error-messages="typeErrors"
                  outlined
                  @input="delayTouch($v.type)"
                  @blur="$v.type.$touch()"
                ></v-select>
                <label
                  :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                  class="color-1a1a1a"
                  v-html="artworkForm.title[getLang]"
                />
                <v-text-field
                  v-model.trim="title"
                  class="pb-2"
                  background-color="#FAFAFA"
                  color="#1A1A1A"
                  :error-messages="titleErrors"
                  outlined
                  @input="delayTouch($v.title)"
                  @blur="$v.title.$touch()"
                ></v-text-field>
                <label class="raleway-16-600 color-1a1a1a">Tags</label>
                <v-combobox
                  v-model="tags"
                  class="pb-6"
                  background-color="#FAFAFA"
                  color="#1A1A1A"
                  :items="['oil on canvas', 'acrylics']"
                  :error-messages="tagsErrors"
                  :label="artworkForm.tags.label[getLang]"
                  :hint="artworkForm.tags.hint[getLang]"
                  persistent-hint
                  multiple
                  chips
                  clearable
                  deletable-chips
                  hide-selected
                  hide-no-data
                  counter="10"
                  @input="delayTouch($v.tags)"
                  @blur="$v.tags.$touch()"
                ></v-combobox>
                <label
                  :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                  class="color-1a1a1a"
                  v-html="artworkForm.dimensions[getLang]"
                />
                <v-row class="pt-0 pb-3">
                  <v-col cols="auto" class="pt-0">
                    <v-select
                      class="pt-0"
                      v-model="unit"
                      :items="[
                        {
                          text: 'cm',
                          value: 'cm'
                        },
                        {
                          text: 'inches',
                          value: 'in'
                        }]"
                      background-color="#FAFAFA"
                      color="#1A1A1A"
                      :hint="artworkForm.unit[getLang]"
                      persistent-hint
                    >
                    </v-select>
                  </v-col>
                  <v-col class="pt-0">
                    <v-text-field
                      v-model="width"
                      class="pt-0"
                      :disabled="!unit"
                      background-color="#FAFAFA"
                      color="#1A1A1A"
                      :error-messages="widthErrors"
                      :hint="artworkForm.width[getLang]"
                      persistent-hint
                      @input="delayTouch($v.width)"
                      @blur="$v.width.$touch()"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col class="pt-0">
                    <v-text-field
                      v-model="height"
                      class="pt-0"
                      :disabled="!unit"
                      background-color="#FAFAFA"
                      color="#1A1A1A"
                      :error-messages="heightErrors"
                      :hint="artworkForm.height[getLang]"
                      persistent-hint
                      @input="delayTouch($v.height)"
                      @blur="$v.height.$touch()"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col class="pt-0" v-if="type === 'sculpture'">
                    <v-text-field
                      v-model="depth"
                      class="pt-0"
                      :disabled="!unit"
                      background-color="#FAFAFA"
                      color="#1A1A1A"
                      :error-messages="depthErrors"
                      :hint="artworkForm.depth[getLang]"
                      persistent-hint
                      @input="delayTouch($v.depth)"
                      @blur="$v.depth.$touch()"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <label
                  :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                  class="color-1a1a1a"
                  v-html="artworkForm.salePrice[getLang]"
                />
                <v-text-field
                  v-model.trim="salePrice"
                  class="pb-2"
                  background-color="#FAFAFA"
                  color="#1A1A1A"
                  :error-messages="salePriceErrors"
                  prefix="€"
                  @input="delayTouch($v.salePrice)"
                  @blur="$v.salePrice.$touch()"
                ></v-text-field>
                <label
                  :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                  class="color-1a1a1a"
                  v-html="artworkForm.rentPrice[getLang]"
                />
                <v-text-field
                  v-model.trim="rentPrice"
                  class="pb-2"
                  background-color="#FAFAFA"
                  color="#1A1A1A"
                  :error-messages="rentPriceErrors"
                  prefix="€"
                  @input="delayTouch($v.rentPrice)"
                  @blur="$v.rentPrice.$touch()"
                ></v-text-field>
                <label
                  class="raleway-16-400 px-2 py-2 rounded"
                  for="fileInput"
                  slot="upload-label"
                  style="cursor: pointer; background-color: #333333; color: #FFFFFF"
                >
                  <v-icon color="white">mdi-image-plus</v-icon>
                  <span class="pl-1">{{ artworkForm.chooseArtwork[getLang] }}</span>
                </label>
                <image-uploader
                  :preview="false"
                  style="display: none;"
                  :maxWidth="1024"
                  :maxHeight="1024"
                  :quality="0.5"
                  accept="image/png, image/jpeg, image/bmp"
                  outputFormat="string"
                  @onUpload="imageToUploadBase64 = null; showImageLoader = true;"
                  @onComplete="showImageLoader = false;"
                  @input="getImage"
                >
                </image-uploader>
                <v-row class="py-4" justify="center" align="center">
                  <g-image v-if="imageToUploadBase64" :src="imageToUploadBase64" style="width: 20vw" alt="to-upload" />
                  <div v-else v-show="showImageLoader">
                    <v-progress-circular
                      class="py-12 my-12"
                      :size="70"
                      :width="7"
                      color="black"
                      indeterminate
                    ></v-progress-circular>
                  </div>
                </v-row>
                <!-- Alerts -->
                <v-row class="pb-2" justify="center" align="center">
                  <v-alert
                      class="mt-2"
                      type='error'
                      v-model="alertImage"
                      dismissible
                      transition="slide-x-transition"
                  >
                    {{ plainText.max30[getLang] }}
                  </v-alert>
                </v-row>
                <v-row justify="center" align="center">
                  <v-btn
                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                    class="text-capitalize white--text"
                    color="#333333"
                    type="submit"
                    :disabled="$v.$invalid || !imageToUploadBase64"
                  >
                    {{ artworkForm.submit[getLang] }}
                    <span v-show="isLoading" class="px-1 lds-ring"><div></div><div></div><div></div><div></div></span>
                  </v-btn>
                </v-row>
              </form>
            </v-col>
          </v-row>
          <v-row class="pt-12" justify="center" align="center">
            <v-col class="text-center" cols="7" md="2">
              <g-link
                :class="getLang === 'gr' ? 'noto-18-600' : 'raleway-18-600'"
                style="color: #1A1A1A;"
                to="/terms/artists/contract"
                target="_blank"
              >
                {{ terms.contract[getLang] }}
              </g-link>
            </v-col>
            <v-col class="text-center" cols="7" md="2">
              <g-link
                :class="getLang === 'gr' ? 'noto-18-600' : 'raleway-18-600'"
                style="color: #1A1A1A;"
                to="/terms/artists/submission"
                target="_blank"
              >
                {{ terms.submission[getLang] }}
              </g-link>
            </v-col>
          </v-row>
          <!-- Dialog -->
          <v-dialog v-model="dialogPortfolio.toggle" persistent max-width="290" overlay-color="transparent">
            <v-card>
                <v-card-text
                  class="px-3 pt-2 pb-4"
                  :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
                >
                  {{ dialogPortfolio.text[getLang] }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="white--text"
                        :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                        color="#333333" @click="clearDialogPortfolio()"
                    >
                      OK
                    </v-btn>
                </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Scroll to Top -->
          <scroll-to-top />

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
                  <span>{{ plainText.close[getLang] }}</span>
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

        </v-container>
      </v-main>
    </UserLayout>
</template>

<script>
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, numeric, maxLength, minLength } from "vuelidate/lib/validators";

const touchMap = new WeakMap();
const alphaNumPlus = (value) => /^[a-zA-Z0-9- ]*$/.test(value)
let timeoutSize = null;

export default {
  components: {
    ScrollToTop: () => import("~/components/ScrollToTop.vue")
  },
  mixins: [validationMixin],
  validations: {
    type: {
      required,
    },
    title: {
      minLength: minLength(3),
      maxLength: maxLength(30),
      alphaNumPlus
    },
    width: {
      numeric
    },
    height: {
      numeric
    },
    depth: {
      numeric
    },
    tags: {
      maxLength: maxLength(10),
    },
    salePrice: {
      numeric
    },
    rentPrice: {
      numeric
    },
  },
  async created () {
    await this.fetchArtistArtworks();
  },
  data () {
    return {
      overlayDesktop: false,
      overlayMobile: false,
      enlargedImg: {
        url: "",
        title: ""
      },
      alertImage: false,
      dialogPortfolio: {
        toggle: false,
        text: {
          gr: '',
          en: '',
        }
      },
      tabs: {
        currentTab: null,
        titles: [
          {
            gr: 'Σε Επεξεργασια',
            en: 'In Process'
          },
          {
            gr: 'Εγκεκριμενα',
            en: 'Approved'
          },
          {
            gr: 'Μη Εγκεκριμενα',
            en: 'Rejected'
          }
        ],
        state: [
          'inProcess',
          'approved',
          'rejected'
        ],
        emptySection: {
          gr: 'Κανένα Εργο',
          en: 'No Artwork'
        }
      },
      allArtworks: [
        // inprocess
        [],
        // approved
        [],
        // rejected
        []
      ],
      columns: [
        // inprocess
        [ [], [], [] ],
        // approved
        [ [], [], [] ],
        // rejected
        [ [], [], [] ],
      ],
      artworkForm: {
        title: {
          gr: 'Τίτλος Εργου',
          en: 'Artwork Title ',
        },
        type: {
          gr: 'είδος',
          en: 'type'
        },
        dimensions: {
          gr: 'Διαστάσεις',
          en: 'Dimensions'
        },
        unit: {
          gr: 'Μονάδα Μέτρησης',
          en: 'Measurement Unit'
        },
        height: {
          gr: 'Υψος',
          en: 'Height'
        },
        width: {
          gr: 'Πλάτος',
          en: 'Width'
        },
        depth: {
          gr: 'Βάθος',
          en: 'Depth'
        },
        tags: {
          label: {
            gr: "Τεχνική, υλικά, ...",
            en: "Technique, materials, ..."
          },
          hint: {
            gr: "Ελεύθερα, μέχρι 10 tags",
            en: "Free, up to 10 tags"
          }
        },
        salePrice: {
          gr: 'Τιμή Πώλησης',
          en: 'Sale Price'
        },
        rentPrice: {
          gr: 'Τιμή Ενοικίασης (μηνιαίως)',
          en: 'Rent Price (monthly)'
        },
        chooseArtwork: {
          gr: "Επέλεξε Εργο Τέχνης...",
          en: "Choose Artwork..."
        },
        submit: {
          gr: 'Υποβολή',
          en: 'Submit'
        },
        errors: {
          title: {
            minLength: {
              gr: "Ο Τίτλος Έργου πρέπει να' χει τουλάχιστον 3 χαρακτήρες",
              en: 'Artwork title must have at least 3 characters'
            },
            maxLength: {
              gr: "Ο Τίτλος Έργου δεν πρέπει να' χει πάνω από 30 χαρακτήρες",
              en: 'Artwork title cannot have more than 30 characters'
            },
            alphaNumPlus: {
              gr: "Δεκτοί χαρακτήρες είναι oι λατινικοί αλφαβητικοί χαρακτήρες, αριθμητικοί χαρακτήρες καθώς και το κενό και '-'.",
              en: "Valid characters are latin alphabet characters, numbers as well whitespace and '-'.",
            }
          },
          type: {
            required: {
              gr: 'Το είδος έργου τέχνης είναι υποχρεωτικό',
              en: 'The artwork type is required'
            }
          },
          width: {
            numeric: {
              gr: "Επιτρέπονται μόνο ακέραιοι αριθμοί",
              en: "Only numerical values are allowed",
            }
          },
          height: {
            numeric: {
              gr: "Επιτρέπονται μόνο ακέραιοι αριθμοί",
              en: "Only numerical values are allowed",
            }
          },
          depth: {
            numeric: {
              gr: "Επιτρέπονται μόνο ακέραιοι αριθμοί",
              en: "Only numerical values are allowed",
            }
          },
          tags: {
            maxLength: {
              gr: "Επιτρέπονται μέχρι 10 tags",
              en: "Up to 10 tags are allowed"
            }
          },
          salePrice: {
            numeric: {
              gr: 'Μόνο αριθμοί είναι δεκτοί',
              en: 'Only numbers are allowed'
            }
          },
          rentPrice: {
            numeric: {
              gr: 'Μόνο αριθμοί είναι δεκτοί',
              en: 'Only numbers are allowed'
            }
          }
        }
      },
      // Artwork upload form data
      title: null,
      type: null,
      unit: null,
      height: null,
      width: null,
      depth: null,
      tags: null,
      salePrice: null,
      rentPrice: null,

      imageToUploadBase64: null,
      currentImageCount: 0,
      showImageLoader: false,
      isLoading: false,
      isFetchingImages: false,
      terms: {
        contract: {
          gr: 'Όροι Πωλητή',
          en: 'Seller Terms',
        },
        submission: {
          gr: 'Όροι Υποβολής',
          en: 'Submission Terms',
        }
      },
      plainText: {
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
          gr: 'Ενοικιάστε με',
          en: 'Rent for'
        },
        rentPerMonth: {
          gr: '€/μή',
          en: '€/mo'
        },
        close: {
          gr: 'Κλείσιμο',
          en: 'Close'
        },
        max30: {
          gr: 'Έχετε φτάσει το όριο των 30 έργων τέχνης',
          en: 'You have reached the limit of 30 artworks'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getLang', 'getLanguages']),
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.alphaNumPlus && errors.push(this.artworkForm.errors.title.alphaNumPlus[this.getLang]);
      !this.$v.title.minLength && errors.push(this.artworkForm.errors.title.minLength[this.getLang]);
      !this.$v.title.maxLength && errors.push(this.artworkForm.errors.title.maxLength[this.getLang]);
      return errors;
    },
    typeErrors() {
      const errors = [];
      if (!this.$v.type.$dirty) return errors;
      !this.$v.type.required && errors.push(this.artworkForm.errors.type.required[this.getLang]);
      return errors;
    },
    widthErrors() {
      const errors = [];
      if (!this.$v.width.$dirty) return errors;
      !this.$v.width.numeric && errors.push(this.artworkForm.errors.width.numeric[this.getLang]);
      return errors;
    },
    heightErrors() {
      const errors = [];
      if (!this.$v.height.$dirty) return errors;
      !this.$v.height.numeric && errors.push(this.artworkForm.errors.height.numeric[this.getLang]);
      return errors;
    },
    tagsErrors() {
      const errors = [];
      if (!this.$v.tags.$dirty) return errors;
      !this.$v.tags.maxLength && errors.push(this.artworkForm.errors.tags.maxLength[this.getLang]);
      return errors;
    },
    depthErrors() {
      const errors = [];
      if (!this.$v.depth.$dirty) return errors;
      !this.$v.depth.numeric && errors.push(this.artworkForm.errors.depth.numeric[this.getLang]);
      return errors;
    },
    salePriceErrors() {
      const errors = [];
      if (!this.$v.salePrice.$dirty) return errors;
      !this.$v.salePrice.numeric && errors.push(this.artworkForm.errors.salePrice.numeric[this.getLang]);
      return errors;
    },
    rentPriceErrors() {
      const errors = [];
      if (!this.$v.rentPrice.$dirty) return errors;
      !this.$v.rentPrice.numeric && errors.push(this.artworkForm.errors.rentPrice.numeric[this.getLang]);
      return errors;
    }
  },
  methods: {
    // Fetch artworks
    async fetchArtistArtworks() {
      if (process.isClient && this.$auth.user) {
        this.isFetchingImages = true
        this.$imgdb.retrieveArtworks(this.$auth.user.sub, '*')
        .then(found => {
          this.isFetchingImages = false
          if (found.total_count > 0) {
            this.currentImageCount = found.total_count
            found.resources.forEach(resource => {
              var folder = resource.folder.replace('artwork/' + this.$auth.user.sub + '/', '');
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
              switch (folder) {
                case 'inprocess':
                  this.allArtworks[0].push({
                    url: resource.secure_url,
                    title: title,
                    type: type,
                    rentPrice: rentPrice,
                    salePrice: salePrice,
                    size: size,
                    tags: tags
                  })
                  break;
                case 'approved':
                  this.allArtworks[1].push({
                    url: resource.secure_url,
                    title: title,
                    type: type,
                    rentPrice: rentPrice,
                    salePrice: salePrice,
                    size: size,
                    tags: tags
                  })
                  break;
                case 'rejected':
                  this.allArtworks[2].push({
                    url: resource.secure_url,
                    title: title,
                    type: type,
                    rentPrice: rentPrice,
                    salePrice: salePrice,
                    size: size,
                    tags: tags
                  })
                  break;
                default:
                  break;
              }
            });
            // Iterate over each state
            this.allArtworks.forEach((state, index) => {
              // Iterate over each artwork of the current state
              var count = 0;
              state.forEach(artwork => {
                this.columns[index][count].push(artwork);
                count = (count + 1) % 3;
              })
            })
          }
        })
        .catch(err => {
          console.error(err);
          this.$router.replace({
            path: '/user/profile',
            force: true
          });
        })
      }
    },
    // Alert for image limit
    setAlertImage() {
      const that = this
      function clearAlert() {
        that.alertImage = false
      }
      this.alertImage = true;
      setTimeout(clearAlert, 4000)
    },
    clearDialogPortfolio() {
      this.dialogPortfolio.toggle = false
      this.dialogPortfolio.text.en = ""
      this.dialogPortfolio.text.gr = ""
    },
    getImage(output) {
      if (this.currentImageCount > 30) {
        // Max uploaded images (30) reached
        this.setAlertImage()
        return;
      }
      this.imageToUploadBase64 = output;
    },
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.imageToUploadBase64) {
          this.isLoading = true;

          if (process.isClient && this.$auth.user) {
            // contextual metadata
            var context = "type=" + String(this.type);
            if (this.title) {
              context += "|caption=" + String(this.title);
            }
            if (this.salePrice) {
              context += "|sale_price=" + String(this.salePrice);
            }
            if (this.rentPrice) {
              context += "|rent_price=" + String(this.rentPrice);
            }
            if (this.unit && this.width && this.height) {
              switch (this.type) {
                case 'sculpture':
                  if (this.depth) {
                    context += "|dimension=" + String(this.unit) + "|width=" + String(this.width) +
                      "|height=" + String(this.height) + "|depth=" + String(this.depth);
                  }
                  break;
                case 'painting':
                  context += "|dimension=" + String(this.unit) + "|width=" + String(this.width) +
                      "|height=" + String(this.height);
              }
            }
            // tags
            var tagsConcatStr = "";
            if (Array.isArray(this.tags) && this.tags.length) {
              this.tags.forEach(tag => {
                tagsConcatStr += tag + ",";
              })
              tagsConcatStr = tagsConcatStr.slice(0, -1);
            }

            this.$imgdb.uploadArtwork(this.$auth.user.sub, this.imageToUploadBase64, context, tagsConcatStr)
            .then(async (response) => {
              const contextObj = response.context.hasOwnProperty("custom") ? response.context.custom : response.context;
              var size = '';
              if (contextObj.type === 'painting') {
                if (contextObj.hasOwnProperty('dimension') &&
                    contextObj.hasOwnProperty('height') &&
                    contextObj.hasOwnProperty('width')) {
                  size = contextObj.height + ' x ' + contextObj.width + ' ' +
                    contextObj.dimension
                }
              } else if (contextObj.type === 'sculpture') {
                // it's a sculpture
                if (contextObj.hasOwnProperty('dimension') &&
                    contextObj.hasOwnProperty('height') &&
                    contextObj.hasOwnProperty('width') &&
                    contextObj.hasOwnProperty('depth')) {
                  size = contextObj.height + ' x ' + contextObj.width + ' x ' +
                    contextObj.depth + ' ' + contextObj.dimension
                }
              }
              // update artworks 0 (in process)
              this.allArtworks[0].push({
                url: response.secure_url,
                type: this.plainText.type[contextObj.type],
                title: contextObj.hasOwnProperty("caption") ? contextObj.caption : '',
                salePrice: contextObj.hasOwnProperty("sale_price") ? contextObj.sale_price : '',
                rentPrice: contextObj.hasOwnProperty("rent_price") ? contextObj.rent_price : '',
                size: size,
                tags: response.tags
              })
              // update column 0 (in process)
              this.columns[0] = [ [], [], [] ];
              var count = 0;
              this.allArtworks[0].forEach(artwork => {
                this.columns[0][count].push(artwork);
                count = (count + 1) % 3;
              })
              if (process.env.GRIDSOME_BUILD === "prod") {
                let message = "url: "+ response.secure_url + "\n";
                for (var key in contextObj) {
                  if (contextObj.hasOwnProperty(key)) {
                    message += key + ': ' + contextObj[key] +'\n'
                  }
                }
                this.$admin.sendEmail({
                  email: this.$auth.user.email,
                  firstname: this.$auth.user.given_name,
                  lastname: this.$auth.user.family_name,
                  subject: "Uploaded Artwork",
                  message: message,
                  to: 'all'
                });
              }
              this.type = null;
              this.title = null;
              this.unit = this.width = this.height = this.depth = null;
              this.tags = null;
              this.salePrice = this.rentPrice = null;
              this.imageToUploadBase64 = null;
              this.dialogPortfolio.text.en = "Your Artwork has been successfully uploaded. Please wait for our approval.";
              this.dialogPortfolio.text.gr = "το Έργο σας στάλθηκε επιτυχώς. Παρακαλώ περιμένετε για την έγκριση μας";
              this.dialogPortfolio.toggle = true;
              this.isLoading = false;
              this.currentImageCount++;
            })
            .catch(err => { 
              this.type = null;
              this.title = null;
              this.unit = this.width = this.height = this.depth = null;
              this.tags = null;
              this.salePrice = this.rentPrice = null;
              this.imageToUploadBase64 = null
              this.dialogPortfolio.text.en = "Unfortunately an error occured. Please try again later."
              this.dialogPortfolio.text.gr = "Δυστυχώς κάποιο σφάλμα προέκυψε. Παρακαλώ δοκιμάστε ξανά αργότερα."
              this.dialogPortfolio.toggle = true
              this.isLoading = false;
            })
          } else {
            this.type = null;
            this.title = null;
            this.unit = this.width = this.height = this.depth = null;
            this.tags = null;
            this.salePrice = this.rentPrice = null;
            this.imageToUploadBase64 = null
            this.dialogPortfolio.text.en = "Unfortunately an error occured. Please try again later."
            this.dialogPortfolio.text.gr = "Δυστυχώς κάποιο σφάλμα προέκυψε. Παρακαλώ δοκιμάστε ξανά αργότερα."
            this.dialogPortfolio.toggle = true
            this.isLoading = false;
          }
        } else {
          this.type = null;
          this.title = null;
          this.unit = this.width = this.height = this.depth = null;
          this.tags = null;
          this.salePrice = this.rentPrice = null;
          this.imageToUploadBase64 = null
        }
        this.$v.$reset();
      }
    },
    delayTouch($v) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      touchMap.set($v, setTimeout($v.$touch, 1000));
    },
    notifyArtworkUpload() {

    }
  },
  metaInfo () {
    return {
      titleTemplate: this.getLang === 'gr' ? 'Πορτφόλιο — Artventures' : 'Portfolio — Artventures',
      meta: [
        { name: 'description', content: 'Web Application' },
      ],
    }
  },
}
</script>

<style scoped>
/* Local fonts */
.raleway-28-400 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 28px !important;
  font-weight: 400 !important;
}
</style>