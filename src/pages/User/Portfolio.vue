<template>
    <UserLayout>
      <v-content>
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
              :vertical="getViewSize === 'desktop' ? false : true"
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
              :touchless="getViewSize === 'desktop' ? false : true"
            >
              <v-tab-item
                v-for="(artworksInSection, i) in allArtworks"
                :key="'artworks-' + i"
                class="background-color-fafafa text-center"
                transition="fade-transition"
                reverse-transition="fade-transition"
              >
                <v-card v-if="!artworksInSection" height="300px" flat color="#FAFAFA">
                  <v-card-text
                    class="center-viewport"
                    :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
                    v-html="tabs.emptySection[getLang]"
                  />
                </v-card>
                <div v-else class="swiper-container">
                  <div v-show="getViewSize === 'desktop'" class="pt-12" v-swiper:[tabs.swipers.desktop[i]]="swiperDesktopOption">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide"
                        v-for="(artwork, i ) in artworksInSection" :key="tabs.swipers.desktop[i] + '-art-' + i">
                        <g-image :src="artwork" style="width: 100%; height: 100%" fit="contain" />
                      </div>
                    </div>
                  </div>
                  <div v-show="getViewSize === 'mobile'" class="pt-12" v-swiper:[tabs.swipers.mobile[i]]="swiperMobileOption">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide"
                        v-for="(artwork, i ) in artworksInSection" :key="tabs.swipers.mobile[i] + '-art-' + i">
                        <g-image :src="artwork" style="width: 250px" fit="contain" />
                      </div>
                    </div>
                  </div>
                </div>
              </v-tab-item>
            </v-tabs-items>
          </v-card>

          <div
            :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
            class="pt-12 my-0 text-center"
            v-html="getLang === 'gr' ? 'Υπέβαλε Εργο Τέχνης' : 'Submit Artwork'"
          />
          <v-row class="pt-8" justify="center" align="center">
            <v-col :cols='getViewSize === "desktop" ? "3" : "8"'>
              <form lazy-validation @submit.prevent="submit()">
                <label
                  :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                  class="color-1a1a1a"
                  v-html="artworkForm.title[getLang]"
                />
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
                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                    class="artwork-btn white--text text-capitalize py-1 pl-2 pr-4 text-center"
                    for="artwork-image"
                >
                    <v-icon class="white--text pr-2 pb-1">mdi-image</v-icon>{{ artworkForm.btn[getLang] }}
                </label>
                <input
                  id="artwork-image"
                  name="artwork-image"
                  style="opacity: 0"
                  accept="image/png, image/jpeg, image/bmp"
                  type="file"
                  required
                >
                <v-row justify="center" align="center">
                  <v-btn
                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                    class="text-capitalize white--text"
                    color="#333333"
                    type="submit"
                    disabled
                    v-html="artworkForm.submit[getLang]"
                  />
                </v-row>
              </form>
            </v-col>
          </v-row>

        </v-container>
      </v-content>
    </UserLayout>
</template>

<script>
import { mapGetters } from 'vuex'
import { directive } from 'vue-awesome-swiper'
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    title: { required },
  },
  mounted () {
    this.allArtworks = [
      null,
      ['https://picsum.photos/500/300?image=7', 'https://picsum.photos/500/300?image=8', 'https://picsum.photos/500/300?image=9',
        'https://picsum.photos/500/300?image=12', 'https://picsum.photos/500/300?image=11', 'https://picsum.photos/500/300?image=10'
      ],
      ['https://picsum.photos/500/300?image=13', 'https://picsum.photos/500/300?image=16', 'https://picsum.photos/500/300?image=17',
        'https://picsum.photos/500/300?image=14', 'https://picsum.photos/500/300?image=15', 'https://picsum.photos/500/300?image=18'
      ]
    ]
  },
  directives: {
    swiper: directive
  },
  data () {
    return {
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
      allArtworks: [null, null, null],
      swiperDesktopOption: {
        lazy: true,
        loop: true,
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
        btn: {
          gr: 'Επέλεξε το Εργο σου',
          en: 'Choose your Artwork'
        },
        submit: {
          gr: 'Υποβολή',
          en: 'Submit'
        },
        errors: {
          title: {
            gr: 'O Τίτλος Εργου είναι υποχρεωτικός',
            en: 'Artwork Title is required'
          }
        }
      },
      title: '',
    }
  },
  computed: {
    ...mapGetters(['getLang', 'getLanguages']),
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push(this.form.errors.firstName[this.getLang]);
      return errors;
    },
  },
  methods: {
    submit() {
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
.center-viewport {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.artwork-btn {
    border-radius: 4px;
    cursor: pointer;
    border: outset #333333;
    background-color: #333333;
}
</style>