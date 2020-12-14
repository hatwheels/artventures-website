<template>
  <v-card class="white py-2" height="80vh">
    <v-card-title
      :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
      class="text-center"
    >
      <v-row justify="center" no-gutters>
        <v-col cols="auto">
          {{ getLang === 'gr' ? 'Επεξεργασία Εργου Τέχνης' : 'Edit Artwork' }}
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-container fluid>
        <v-row justify="space-around" align="start">
          <v-col cols="10">
            <label
              :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
              class="color-1a1a1a text-capitalize"
              v-html="artworkForm.type[getLang]"
            />
            <v-select
              v-model="type"
              class="pb-2"
              :items="artworkTypes"
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
                  :items="artworkUnits"
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
              placeholder="1000..."
              :hint="
                getLang === 'gr'
                  ? 'Αξία έργου. Τιμή που πληρώνεστε στην πώληση.'
                  : 'Artwork value. The price you receive when sold.'
              "
              persistent-hint
              prefix="€"
              @input="
                delayTouch($v.value);
                updatePrices();
              "
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
              placeholder="175..."
              background-color="#FAFAFA"
              color="#1A1A1A"
              prefix="€"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <!-- Alerts -->
    <v-card-actions>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn
            :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
            class="text-capitalize white--text"
            color="#333333"
          >
            {{ artworkForm.submit[getLang] }}
            <!-- <span v-show="isLoading" class="px-1 lds-ring"><div></div><div></div><div></div><div></div> -->
            <!-- </span> -->
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn
            :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
            class="text-capitalize black--text"
            color="#FFFFFF"
            @click="$emit('close-edit-dialog', false);"
          >
            {{ getLang === 'gr' ? 'Ακύρωση' : 'Cancel' }}
            <!-- <span v-show="isLoading" class="px-1 lds-ring"><div></div><div></div><div></div><div></div> -->
            <!-- </span> -->
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
    </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import {
  required,
  numeric,
  maxLength,
  minLength,
} from "vuelidate/lib/validators";

const alphaNumPlus = (value) => /^[a-zA-Z0-9- ]*$/.test(value);
const touchMap = new WeakMap();

export default {
  props: {
    artworkData: {
      type: Object,
      default: {},
    },
    artworkForm: {
        type: Object,
        default: {},
    },
    artworkTypes: {
        type: Array,
        default: []
    },
    artworkUnits: {
        type: Array,
        default: []
    }
  },
  mixins: [validationMixin],
  validations: {
    type: {
      required,
    },
    title: {
      minLength: minLength(3),
      maxLength: maxLength(30),
      alphaNumPlus,
    },
    width: {
      numeric,
    },
    height: {
      numeric,
    },
    depth: {
      numeric,
    },
    tags: {
      maxLength: maxLength(10),
    },
    value: {
      numeric,
    },
  },
  created() {
    console.log(this.artworkData)
  },
  data () {
    return {
      // Artwork upload form data
      title: this.artworkData.title || null,
      type: this.artworkData.type['en'].toLowerCase() || null,
      unit: this.artworkData.dimension || null,
      height: this.artworkData.height || null,
      width: this.artworkData.width || null,
      depth: this.artworkData.depth || null,
      tags: this.artworkData.tags || null,
      value: this.artworkData.value || null,
      salePrice: this.artworkData.salePrice || null,
      rentPrice: this.artworkData.rentPrice || null,
    }
  },
  computed: {
    ...mapGetters(["getLang", "getLanguages"]),
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.alphaNumPlus &&
        errors.push(this.artworkForm.errors.title.alphaNumPlus[this.getLang]);
      !this.$v.title.minLength &&
        errors.push(this.artworkForm.errors.title.minLength[this.getLang]);
      !this.$v.title.maxLength &&
        errors.push(this.artworkForm.errors.title.maxLength[this.getLang]);
      return errors;
    },
    typeErrors() {
      const errors = [];
      if (!this.$v.type.$dirty) return errors;
      !this.$v.type.required &&
        errors.push(this.artworkForm.errors.type.required[this.getLang]);
      return errors;
    },
    widthErrors() {
      const errors = [];
      if (!this.$v.width.$dirty) return errors;
      !this.$v.width.numeric &&
        errors.push(this.artworkForm.errors.width.numeric[this.getLang]);
      return errors;
    },
    heightErrors() {
      const errors = [];
      if (!this.$v.height.$dirty) return errors;
      !this.$v.height.numeric &&
        errors.push(this.artworkForm.errors.height.numeric[this.getLang]);
      return errors;
    },
    tagsErrors() {
      const errors = [];
      if (!this.$v.tags.$dirty) return errors;
      !this.$v.tags.maxLength &&
        errors.push(this.artworkForm.errors.tags.maxLength[this.getLang]);
      return errors;
    },
    depthErrors() {
      const errors = [];
      if (!this.$v.depth.$dirty) return errors;
      !this.$v.depth.numeric &&
        errors.push(this.artworkForm.errors.depth.numeric[this.getLang]);
      return errors;
    },
    valueErrors() {
      const errors = [];
      if (!this.$v.value.$dirty) return errors;
      !this.$v.value.numeric &&
        errors.push(this.artworkForm.errors.value.numeric[this.getLang]);
      return errors;
    },
  },
  methods: {
    calcSalePrice (value /* Integer */) {
      return Math.round(value * 1.8181);
    },
    calcRentPrice (salePrice /* Integer */) {
      let val = Math.round(salePrice * 14 / 144);
      let roundToNearest5 = Math.round(val / 5) * 5;
      return (roundToNearest5 > 50) ? roundToNearest5 : 50;
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
  }
};
</script>
