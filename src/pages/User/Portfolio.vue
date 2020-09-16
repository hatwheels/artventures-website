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
                transition="fade-transition"
                reverse-transition="fade-transition"
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
                <div v-else class="swiper-container">
                  <!-- Desktop -->
                  <div v-show="!$vuetify.breakpoint.mobile" class="pt-12" v-swiper:[tabs.swipers.desktop[i]]="swiperDesktopOption">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide"
                        v-for="(artwork, i ) in artworksInSection" :key="tabs.swipers.desktop[i] + '-art-' + i">
                        <g-image :src="artwork.img" style="width: 100%" fit="contain" />
                        <div class="raleway-28-400">{{ artwork.title }}</div>
                      </div>
                    </div>
                  </div>
                  <!-- Mobile -->
                  <div v-show="$vuetify.breakpoint.mobile" class="pt-12" v-swiper:[tabs.swipers.mobile[i]]="swiperMobileOption">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide"
                        v-for="(artwork, i ) in artworksInSection" :key="tabs.swipers.mobile[i] + '-art-' + i">
                        <g-image :src="artwork.img" style="width: 250px" fit="contain" />
                        <div class="raleway-28-400">{{ artwork.title }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </v-tab-item>
            </v-tabs-items>
          </v-card>

          <div
            :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
            class="pt-12 my-0 mx-1 text-center"
            v-html="getLang === 'gr' ? 'Υπέβαλε Εργο Τέχνης' : 'Submit Artwork'"
          />
          <v-row class="pt-8 pb-12" justify="center" align="center">
            <v-col :cols='$vuetify.breakpoint.mobile ? "8" : "3"'>
              <form lazy-validation @submit.prevent="submit()">
                <label
                  :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                  class="color-1a1a1a"
                  v-html="artworkForm.title[getLang]"
                />
                <div class="d-flex">
                  <v-text-field
                      v-model.trim="title"
                      background-color="#FAFAFA"
                      color="#1A1A1A"
                      :error-messages="titleErrors"
                      outlined
                      required
                      @input="delayTouch($v.title)"
                      @blur="$v.title.$touch()"
                  ></v-text-field>
                  <label
                    for="artwork-image"
                    class="pl-2"
                    style="cursor: pointer"
                  >
                    <v-icon  class="mt-2" x-large color="#333333">mdi-image-plus</v-icon>
                  </label>
                </div>
                <input
                  id="artwork-image"
                  ref="artworkImage"
                  name="artwork-image"
                  style="opacity: 0"
                  accept="image/png, image/jpeg, image/bmp"
                  type="file"
                  required
                  @change="getImage"
                >
                <v-row class="pb-2" justify="center" align="center">
                  <g-image v-if="imageToUploadBase64" :src="imageToUploadBase64" style="width: 20vw" />
                  <div v-else>
                    <img v-show="showImageLoader" src="../../../static/loading.svg" width="300vw" alt="Loading">
                  </div>
                </v-row>
                <!-- Alerts -->
                <v-row class="pb-2" justify="center" align="center">
                  <v-alert
                      class="mt-2"
                      type='error'
                      v-model="alert"
                      dismissible
                      transition="slide-x-transition"
                  >
                    {{ getLang == 'gr' ? 'Το μέγεθος της εικόνας είναι πάνω από 10 MB' : 'Image size is over 10 MB' }}
                  </v-alert>
                  <v-alert
                      class="mt-2"
                      type='error'
                      v-model="alertImage"
                      dismissible
                      transition="slide-x-transition"
                  >
                    {{ getLang == 'gr' ? 'Έχετε φτάσει το όριο των 30 έργων τέχνης' : 'You have reached the limit of 30 artworks' }}
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
            <v-col class="text-center" :cols='$vuetify.breakpoint.mobile ? "7" : "2"'>
              <g-link
                :class="getLang === 'gr' ? 'noto-18-600' : 'raleway-18-600'"
                style="color: #1A1A1A;"
                to="/terms/artists/contract"
                target="_blank"
              >
                {{ terms.contract[getLang] }}
              </g-link>
            </v-col>
            <v-col class="text-center" :cols='$vuetify.breakpoint.mobile ? "7" : "2"'>
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
        </v-container>
      </v-main>
    </UserLayout>
</template>

<script>
import { mapGetters } from 'vuex'
import { directive } from 'vue-awesome-swiper'
import { validationMixin } from "vuelidate";
import { required, maxLength, minLength } from "vuelidate/lib/validators";

const touchMap = new WeakMap();
let timeoutSize = null;

export default {
  mixins: [validationMixin],
  validations: {
    title: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30)
    },
  },
  created () {
    if (process.isClient && this.$auth.user) {
      this.isFetchingImages = true
      this.$imgdb.retrieveArtworks(this.$auth.user.sub)
      .then(found => {
        this.isFetchingImages = false
        if (found.total_count > 0) {
          this.currentImageCount = found.total_count
          found.resources.forEach(resource => {
            var folder = resource.folder.replace('artwork/' + this.$auth.user.sub + '/', '')
            switch (folder) {
              case 'inprocess':
                this.allArtworks[0].push( { title: resource.filename.replace('_', ' '), img: resource.secure_url } )
                break;
              case 'approved':
                this.allArtworks[1].push( { title: resource.filename.replace('_', ' '), img: resource.secure_url } )
                break;
              case 'rejected':
                this.allArtworks[2].push( { title: resource.filename.replace('_', ' '), img: resource.secure_url } )
                break;
              default:
                break;
            }
          });
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
  directives: {
    swiper: directive
  },
  data () {
    return {
      alert: false,
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
        swipers: {
          desktop: [
            'swiperDesktopInProcess',
            'swiperDesktopApproved',
            'swiperDesktopRejected'
          ],
          mobile: [
            'swiperMobileInProcess',
            'swiperMobileApproved',
            'swiperMobileRejected'
          ]
        },
        emptySection: {
          gr: 'Κανένα Εργο',
          en: 'No Artwork'
        }
      },
      allArtworks: [[], [], []],
      swiperDesktopOption: {
        lazy: true,
        loop: false,
        slidesPerView: 3,
        spaceBetween: 30,
        setWrapperSize: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      },
      swiperMobileOption: {
        lazy: true,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        setWrapperSize: true,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      },
      artworkForm: {
        title: {
          gr: 'Τίτλος Εργου',
          en: 'Artwork Title ',
        },
        submit: {
          gr: 'Υποβολή',
          en: 'Submit'
        },
        errors: {
          title: {
            gr: 'O Τίτλος Έργου είναι υποχρεωτικός',
            en: 'Artwork Title is required'
          },
          minLength: {
            gr: "Ο Τίτλος Έργου πρέπει να' χει τουλάχιστον 3 χαρακτήρες",
            en: 'Artwork title must have at least 3 characters'
          },
          maxLength: {
            gr: "Ο Τίτλος Έργου δεν πρέπει να' χει πάνω από 30 χαρακτήρες",
            en: 'Artwork title cannot have more than 30 characters'
          },
        }
      },
      title: null,
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
      }
    }
  },
  computed: {
    ...mapGetters(['getLang', 'getLanguages']),
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push(this.artworkForm.errors.title[this.getLang]);
      !this.$v.title.minLength && errors.push(this.artworkForm.errors.minLength[this.getLang]);
      !this.$v.title.maxLength && errors.push(this.artworkForm.errors.maxLength[this.getLang]);
      return errors;
    },
  },
  methods: {
  // Alert for image size
  setAlert() {
    const that = this
    function clearAlert() {
      that.alert = false
    }
    this.alert = true;
    setTimeout(clearAlert, 4000)
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
  getImage(e) {
    this.imageToUploadBase64 = null
      if (this.currentImageCount > 30) {
        // Max uploaded images (30) reached
        this.setAlertImage()
        this.$refs.artworkImage.value = ''
        return
      }
      const file = e.target.files[0]
      if (file) {
        if (file.size > 10 * 1024 * 1024) {
          // Size is bigger than 5 MB
          this.setAlert()
          // clear input
          this.$refs.artworkImage.value = ''
          return
        }
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.readAsDataURL(file);
        this.showImageLoader = true
        reader.onload = (e) => {
            // Note: arrow function used here, so that "this.this.imageToUploadBase64" refers to the this.imageToUploadBase64 of Vue component
            // Read image as base64 and set to this.imageToUploadBase64
            this.imageToUploadBase64 = e.target.result
            this.showImageLoader = false
        }
      }
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        var trimmedTitle = this.title.replace(/ /g,"_")
        if (this.imageToUploadBase64) {
          this.isLoading = true;

          if (process.isClient && this.$auth.user) {
            this.$imgdb.uploadArtwork(this.$auth.user.sub, trimmedTitle, this.imageToUploadBase64)
            .then(secureUrl => {
              this.allArtworks[0].push({ title: this.title, img: secureUrl })
              this.title = null
              this.imageToUploadBase64 = null
              this.dialogPortfolio.text.en = "Your Artwork has been successfully uploaded. Please wait for our approval."
              this.dialogPortfolio.text.gr = "το Έργο σας στάλθηκε επιτυχώς. Παρακαλώ περιμένετε για την έγκριση μας"
              this.dialogPortfolio.toggle = true
              this.isLoading = false
              this.currentImageCount++
              this.$refs.artworkImage.value = ''
            })
            .catch(err => { 
              this.title = null
              this.imageToUploadBase64 = null
              this.dialogPortfolio.text.en = "Unfortunately an error occured. Please try again later."
              this.dialogPortfolio.text.gr = "Δυστηχώς κάποιο σφάλμα προέκυψε. Παρακαλώ δοκιμάστε ξανά αργότερα."
              this.dialogPortfolio.toggle = true
              this.isLoading = false;
              this.$refs.artworkImage.value = ''
            })
          } else {
            this.title = null
            this.imageToUploadBase64 = null
            this.dialogPortfolio.text.en = "Unfortunately an error occured. Please try again later."
            this.dialogPortfolio.text.gr = "Δυστηχώς κάποιο σφάλμα προέκυψε. Παρακαλώ δοκιμάστε ξανά αργότερα."
            this.dialogPortfolio.toggle = true
            this.isLoading = false;
            this.$refs.artworkImage.value = ''
          }
        } else {
          this.title = null
          this.imageToUploadBase64 = null
          this.$refs.artworkImage.value = ''
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

<style>
.portfolio-alert-block {
  width: 40vw;
  margin-right: 30vw;
  margin-left: 30vw;
}
.swiper-slide {
  height: auto;
}
/* Local fonts */
.raleway-28-400 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 28px !important;
  font-weight: 400 !important;
}
</style>