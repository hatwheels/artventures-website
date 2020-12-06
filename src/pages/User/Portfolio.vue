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
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                  <!-- Mobile -->
                  <v-row class="hidden-md-and-up px-12" justify="center" align="center">
                    <v-col v-for="(artwork, i ) in artworksInSection" :key="'artwork-mobile-' + i" cols="12">
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
                </v-container>
              </v-tab-item>
            </v-tabs-items>
          </v-card>

          <div
            :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
            class="pt-12 my-0 mx-1 text-center"
            v-html="getLang === 'gr' ? 'Υπόβαλε Εργο Τέχνης' : 'Submit Artwork'"
          />
          <v-form v-if="termsAccepted" class="pt-8 pb-12" lazy-validation @submit.prevent="submit()">
            <v-row justify="space-around" align="start">
              <v-col cols="10" md="5">
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
                  @input="delayTouch($v.title)"
                  @blur="$v.title.$touch()"
                ></v-text-field>
                <label class="raleway-16-600 color-1a1a1a">Tags</label>
                <v-combobox
                  v-model="tags"
                  class="pb-6"
                  background-color="#FAFAFA"
                  color="#1A1A1A"
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
                  append-icon=""
                  @input="delayTouch($v.tags)"
                  @blur="$v.tags.$touch()"
                ></v-combobox>
                <label
                  :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                  class="color-1a1a1a"
                  v-html="artworkForm.dimensions[getLang]"
                />
                <v-row class="pt-0 pb-3">
                  <v-col cols="12" md="auto" class="pt-0">
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
              </v-col>
              <v-col cols="10" md="5">
                <label
                  :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                  class="color-1a1a1a"
                  v-html="artworkForm.value[getLang]"
                />
                <v-text-field
                  v-model.trim="value"
                  class="pb-4"
                  background-color="#FAFAFA"
                  color="#1A1A1A"
                  :error-messages="valueErrors"
                  placeholder='1000...'
                  :hint="getLang === 'gr' ? 'Αξία έργου. Τιμή που πληρώνεστε στην πώληση.' : 'Artwork value. The price you receive when sold.'"
                  persistent-hint
                  prefix="€"
                  @input="delayTouch($v.value); updatePrices()"
                  @blur="$v.value.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model="salePrice"
                  class="pl-4 pr-12 pt-2"
                  readonly
                  outlined
                  placeholder="1818..."
                  :label="artworkForm.salePrice[getLang]"
                  background-color="#FAFAFA"
                  color="#1A1A1A"
                  prefix="€"
                ></v-text-field>
                <v-text-field
                  v-model="rentPrice"
                  class="pl-4 pr-12"
                  readonly
                  outlined
                  :label="artworkForm.rentPrice[getLang]"
                  placeholder="177..."
                  background-color="#FAFAFA"
                  color="#1A1A1A"
                  prefix="€"
                ></v-text-field>
                <label
                  :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                  class="color-1a1a1a"
                  v-html="artworkForm.watermark.title[getLang]"
                />
                <v-row class="pt-1" justify="center" align="start">
                  <v-col>
                    <div :class="getLang === 'gr' ? 'noto-14-600' : 'raleway-14-600'">
                      {{ artworkForm.watermark.enable[getLang] }}
                    </div>
                    <v-checkbox
                      v-model="watermark"
                      :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                      :label="getLang === 'gr' ? 'Ναι': 'Yes'"
                      color="black"
                      hide-details
                    ></v-checkbox>
                  </v-col>
                  <v-col>
                    <div :class="getLang === 'gr' ? 'noto-14-600' : 'raleway-14-600'">
                      {{ artworkForm.watermark.color[getLang] }}
                    </div>
                    <v-color-picker
                      v-model="watermarkColor"
                      @update:color="updateColor"
                      dot-size="25"
                      hide-inputs
                      hide-mode-switch
                      mode="rgba"
                      swatches-max-height="200"
                    ></v-color-picker>
                  </v-col>
                </v-row>
                <v-row class="pt-4" justify="center" align="center">
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
                </v-row>
              </v-col>
            </v-row>
            <v-row class="py-4" justify="center" align="center">
              <v-col offset="1" offset-md="3" cols="10" md="6">
                <div v-if="imageToUploadBase64">
                  <g-image v-show="!watermark" :src="imageToUploadBase64" style="width: 100%" alt="to-upload" />
                  <v-img v-show="watermark" :src="imageToUploadBase64" alt="to-upload">
                    <div
                      style="position: absolute; bottom: 5px; left: 5px; font-size: 8px !important;"
                      :style="'color: ' + this.watermarkConfig.fillStyle"
                    >
                      {{ watermarkConfig.content }}
                    </div>
                  </v-img>
                </div>
                <div v-else v-show="showImageLoader" class="text-center">
                  <v-progress-circular
                    class="py-12 my-12"
                    :size="70"
                    :width="7"
                    color="black"
                    indeterminate
                  ></v-progress-circular>
                </div>
              </v-col>
              <v-col />
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
                {{ plainText.maxArtworks[getLang] }}
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
          </v-form>
          <v-row v-if="!termsAccepted" class="pt-8" justify="center" align="center">
            <v-btn
              class="white--text text-capitalize"
              :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
              color="#333333" @click="termsDialog = true;"
            >
              {{ acceptTerms[getLang] }}
            </v-btn>
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

          <!-- Terms Dialog -->
          <terms-dialog
            v-if="termsDialog"
            :toggle="termsDialog"
            :width="$vuetify.breakpoint.mobile ? '100vw' : '80vw'"
            @update-toggle="onUpdateToggle"
            @accept-terms="onAcceptTerms"
          />

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
      </v-main>
    </UserLayout>
</template>

<script>
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, numeric, maxLength, minLength } from "vuelidate/lib/validators";
import TermsDialog from '../../components/TermsDialog.vue';

const touchMap = new WeakMap();
const alphaNumPlus = (value) => /^[a-zA-Z0-9- ]*$/.test(value)
let timeoutSize = null;

export default {
  components: {
    ScrollToTop: () => import("~/components/ScrollToTop.vue"),
    TermsDialog: () => import("~/components/TermsDialog.vue")
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
    value: {
      numeric
    }
  },
  async created () {
    await this.fetchArtistArtworks();
  },
  mounted () {
    this.plainText.maxArtworks.gr = 'Έχετε φτάσει το όριο των ' + this.maxImageCount + '  έργων τέχνης';
    this.plainText.maxArtworks.en = 'You have reached the limit of ' + this.maxImageCount + ' artworks';
    // Has user accepted terms?
    if (!this.$auth.hasOwnProperty('user_metadata') || !this.$auth.user_metadata.hasOwnProperty('acceptedTerms')
        || !this.$auth.user_metadata.acceptedTerms) {
      // accepted (user metadata) key does not exist or is false
      this.termsDialog = true;
      this.termsAccepted = false;
    } else {
      this.termsDialog = false;
      this.termsAccepted = true;
    }
    this.watermarkConfig.fillStyle = this.watermarkColor;
    this.watermarkConfig.content = this.$auth.user.name;
  },
  data () {
    return {
      termsDialog: false,
      termsAccepted: false,
      acceptTerms: {
        gr: 'Αποδοχη των Ορων ...',
        en: 'Accept Terms ...'
      },
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
            gr: "Ελεύθερα, γράφετε μέχρι 10 tags",
            en: "Free, fill in up to 10 tags"
          }
        },
        value: {
          gr: 'Επιθυμητή τιμή',
          en: 'Expected price'
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
        watermark: {
          title: {
            gr: 'Υδατόσημο',
            en: 'Watermark'
          },
          enable: {
            gr: 'Για λόγους πνευματικών δικαιωμάτων, πρόσθεστε υδατόσημο με το όνομα σας.',
            en: 'For copyright, you can add a watermark with your name.'
          },
          color: {
            gr: 'Χρώμα υδατόσημου',
            en: 'Watermark color'
          }
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
          value: {
            numeric: {
              gr: 'Μόνο αριθμοί είναι δεκτοί',
              en: 'Only numbers are allowed'
            }
          },
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
      value: null,
      salePrice: null,
      rentPrice: null,
      watermark: false,
      watermarkColor: '#FFFFFF',
      watermarkConfig: {
        content: '',
        fillStyle: ''
      },

      imageToUploadBase64: null,
      currentImageCount: 0,
      maxImageCount: 60,
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
        maxArtworks: {
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
    valueErrors() {
      const errors = [];
      if (!this.$v.value.$dirty) return errors;
      !this.$v.value.numeric && errors.push(this.artworkForm.errors.value.numeric[this.getLang]);
      return errors;
    },
  },
  methods: {
    updateColor(c) {
      this.watermarkConfig.content = this.$auth.user.name;
      this.watermarkConfig.fillStyle = c.hex;
    },
    onUpdateToggle(val) {
      this.termsDialog = val;
    },
    onAcceptTerms(val) {
      this.termsAccepted = val;
    },
    calcSalePrice (value /* Integer */) {
      return Math.round(value * 1.8181);
    },
    calcRentPrice (salePrice /* Integer */) {
      const val = Math.round(salePrice * 14 / 144);
      return (val > 50) ? val : 50;
    },
    updatePrices () {
      if (/^[+]?(\d+)$/.test(this.value)) {
        const val = Number(this.value);
        this.salePrice = this.calcSalePrice(val);
        this.rentPrice = this.calcRentPrice(this.salePrice);
      } else {
        this.salePrice = null;
        this.rentPrice = null;
      }
    },
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
              var value = '';
              var salePrice = '';
              var rentPrice = '';
              var size = '';
              var type = '';
              var tags = resource.hasOwnProperty('tags') ? resource.tags : [];
              if (resource.hasOwnProperty('context')) {
                // Title
                if (resource.context.hasOwnProperty('caption')) {
                  title = resource.context.caption;
                  title = title.toLowerCase();
                }
                // Value, Rent Price
                if (resource.context.hasOwnProperty('value')) {
                  value = resource.context.value;
                }
                // Sale Price
                if (resource.context.hasOwnProperty('sale_price')) {
                  salePrice = resource.context.sale_price;
                } else if (value.length) {
                  salePrice = JSON.stringify(this.calcSalePrice(parseInt(value)));
                }
                if (resource.context.hasOwnProperty('rent_price')) {
                  rentPrice = resource.context.rent_price;
                } else if (value.length) {
                  rentPrice = JSON.stringify(this.calcRentPrice(this.calcSalePrice(parseInt(value))));
                } else if (salePrice.length) {
                  rentPrice = JSON.stringify(this.calcRentPrice(parseInt(salePrice)));
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
                    value: value,
                    salePrice: salePrice,
                    rentPrice: rentPrice,
                    size: size,
                    tags: tags
                  })
                  break;
                case 'approved':
                  this.allArtworks[1].push({
                    url: resource.secure_url,
                    title: title,
                    type: type,
                    value: value,
                    salePrice: salePrice,
                    rentPrice: rentPrice,
                    size: size,
                    tags: tags
                  })
                  break;
                case 'rejected':
                  this.allArtworks[2].push({
                    url: resource.secure_url,
                    title: title,
                    type: type,
                    value: value,
                    salePrice: salePrice,
                    rentPrice: rentPrice,
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
      if (this.currentImageCount > this.maxImageCount) {
        // Max uploaded images reached
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
            if (this.value) {
              context += "|value=" + String(this.value);
              // Add sale price
              this.salePrice = this.calcSalePrice(this.value);
              context += "|sale_price=" + String(this.salePrice);
              // Add rent price
              this.rentPrice = this.calcRentPrice(this.salePrice);
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
            // watermark
            var watermarkObj = null;
            if (this.watermark) {
              watermarkObj = {
                color: this.watermarkConfig.fillStyle,
                text: this.watermarkConfig.content
              }
            }

            this.$imgdb.uploadArtwork(this.$auth.user.sub, this.imageToUploadBase64, context, tagsConcatStr, watermarkObj)
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
                value: contextObj.hasOwnProperty("value") ? contextObj.value : '',
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
              this.value = this.salePrice = this.rentPrice = null;
              this.watermark = false;
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
              this.value = this.salePrice = this.rentPrice = null;
              this.watermark = false;
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
            this.value = this.salePrice = this.rentPrice = null;
            this.watermark = false;
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
          this.value = this.salePrice = this.rentPrice = null;
          this.watermark = false;
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