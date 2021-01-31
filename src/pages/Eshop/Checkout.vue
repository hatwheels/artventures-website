<template>
  <Layout>
    <v-main class="main-padding background-color-fafafa">
      <v-container class="pa-0" fluid>
        <!-- Basket has items -->
        <v-card v-if="$eshop.basketValue.length !== 0" class="pb-4 pt-10" flat color="fafafa">
          <v-card-title>
            <div
              class="text-center width-100pc"
              :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
            >
              {{ title[getLang] }}
            </div>
          </v-card-title>
          <v-card-text class="px-16 py-6">
            <div class="px-16">
              <!-- Headers -->
              <v-row class="py-2" no-gutters justify="center" align="center">
                <v-col cols="3" class="border-bottom-333333">
                  <div class="playfair-30-700 text-center">
                    {{ headers[0][getLang] }}
                  </div>
                </v-col>
                <v-col cols="3" class="pl-4 pr-2 border-bottom-333333">
                  <div class="playfair-30-700">
                    {{ headers[1][getLang] }}
                  </div>
                </v-col>
                <v-col cols="2" class="px-2 border-bottom-333333">
                  <div class="playfair-30-700">
                    {{ headers[2][getLang] }}
                  </div>
                </v-col>
                <v-col cols="2" class="px-2 border-bottom-333333">
                  <div class="playfair-30-700">
                    {{ headers[3][getLang] }}
                  </div>
                </v-col>
                <v-col cols="2" class="pl-2 border-bottom-333333">
                  <div style="height: 33px;"></div>
                </v-col>
              </v-row>
              <!-- Content -->
              <v-row
                class="pt-2"
                v-for="(item, i) in $eshop.basketValue" :key="'item-' + i"
                no-gutters justify="center" align="stretch"
              >
                <v-col cols="3">
                  <v-img
                    :src="item.url"
                    :lazy-src="
                    item.url.replace(
                        'artventures/image/upload/',
                        'artventures/image/upload/c_thumb,w_100/'
                      )
                    "
                    :alt="item.title || 'Untitled'"
                    contain
                  />
                </v-col>
                <v-col cols="3" class="pl-4 pr-2 border-bottom-dddddd">
                  <div class="d-flex flex-column justify-center height-100pc">
                    <div class="text-capitalize raleway-25-400">{{ item.artist_name }}</div>
                    <div class="text-capitalize raleway-23-400 font-italic">{{ item.title }}</div>
                    <div class="pt-2 raleway-18-400">{{ item.type[getLang] }}
                      <span v-if="item.size" class="text-lowercase">- {{ item.size }}</span>
                    </div>
                    <div v-if="item.tags.length > 0" class="pt-1" no-gutters>
                      <div
                        class="nunito-12-400 text-capitalize text-start pr-1"
                        cols="auto"
                        v-for="(tag, tagId) in item.tags"
                        :key="'tag-' + tagId"
                      >
                        {{ tag }}<span v-if="tagId !== item.tags.length - 1">,</span>
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-col cols="2" class="px-2 raleway-25-400 border-bottom-dddddd">
                  <div v-if="item.rentPrice" class="d-flex flex-column justify-center height-100pc">
                    <div>{{ item.rentPrice }}{{ $helper.plainText.rentPerMonth[getLang] }}</div>
                  </div>
                </v-col>
                <v-col cols="2" class="px-2 raleway-25-400  border-bottom-dddddd">
                  <div v-if="item.salePrice" class="d-flex flex-column justify-center height-100pc">
                    <div>{{ item.salePrice }}€</div>
                  </div>
                </v-col>
                <v-col cols="2" class="p-2 raleway-25-400  border-bottom-dddddd">
                  <div v-if="item.salePrice" class="d-flex flex-column justify-center height-100pc">
                    <div class="d-flex justify-center align-center">
                      <v-btn color="#000000DE" class="pa-auto" outlined>{{ removeBtn.single[getLang] }}</v-btn>
                      <v-checkbox class="pl-4" color="#000000DE"></v-checkbox>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <!-- Footer -->
              <v-row no-gutters class="pt-6 raleway-25-400" justify="center" align="center">
                <v-col cols="3"  class="px-2" />
                <v-col cols="3"  class="px-2" />
                <v-col cols="2"  class="px-2">
                  <div v-if="$eshop.allRentPricesValid">
                    <div class="font-weight-bold">{{ total[getLang] }}</div>
                    <div>{{ $eshop.totalRentPrice }}{{ $helper.plainText.rentPerMonth[getLang] }}</div>
                  </div>
                </v-col>
                <v-col cols="2" class="px-2">
                  <div v-if="$eshop.allSalePricesValid">
                    <div class="font-weight-bold">{{ total[getLang] }}</div>
                    <div>{{ $eshop.totalSalePrice }}€</div>
                  </div>
                </v-col>
                <v-col class="pr-2" cols="2">
                  <div style="height: 60px !important;" class="d-flex justify-center align-center">
                    <v-btn
                      class="pa-auto ma-auto height-100pc"
                      color="#000000DE"
                      outlined
                      v-html="removeBtn.selected[getLang]"
                    />
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-row no-gutters justify="center" align="center">
              <v-col class="text-center">
                <v-btn class="mx-auto pa-auto" dark color="#333333">{{ buyBtn[getLang] }}</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
        <!-- Basket is empty -->
        <v-card
          v-else
          flat
          height="100%"
          class="background-color-fafafa center-viewport"
          :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
        >
          <v-row class="height-100pc" justify="center" align="center">
            <v-col>
              <div class="text-center">{{ basketEmptyTxt[getLang] }}</div>
            </v-col>
          </v-row>
        </v-card>

        <!-- Scroll to Top -->
        <scroll-to-top />
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
  data() {
    return {
      headers: [
        {
          gr: 'Εργο Τέχνης',
          en: 'Artwork'
        },
        {
          gr: 'Περιγραφή',
          en: 'Description'
        },
        {
          gr: 'Τιμή Ενοικίασης',
          en: 'Rent Price'
        },
        {
          gr: 'Τιμή Πώλησης',
          en: 'Sale Price'
        },
        {
          gr: '',
          en: ''
        }
      ],
      title: {
        gr: 'Πληρωμή',
        en: 'Checkout'
      },
      basketEmptyTxt: {
        gr: 'To καλάθι σας είναι άδειο',
        en: 'You basket is empty'
      },
      total: {
        gr: 'Σύνολο',
        en: 'Total'
      },
      buyBtn: {
        gr: 'Αγορα',
        en: 'Buy'
      },
      removeBtn: {
        single: {
          gr: 'Αφαιρεση',
          en: 'Remove'
        },
        selected: {
          gr: 'Αφαιρεση<br>επιλεγμενων',
          en: 'Remove<br>selected'
        }
      }
    }
  },
  computed: {
    ...mapGetters(["getLang"])
  },
  metaInfo() {
    return {
      titleTemplate: "Checkout — Artventures",
      meta: [{ name: "description", content: "Eshop" }],
    };
  }
}
</script>

<style scoped>
.main-padding {
  padding: 76px 0px 165px 0px !important;
}

.width-100pc {
  width: 100% !important;
}

.height-100pc {
  height: 100% !important
}

.border-bottom-333333 {
  border-bottom: thin solid #333333;
}

.border-bottom-dddddd {
  border-bottom: thin solid #DDDDDD;
}

@media (max-width: 1264px ) {
  @media (max-height: 1264px) {
    .main-padding {
      padding: 50px 0px !important;
    }
  }
}
@media (max-height: 1264px) {
  @media (max-width: 1264px ) {
    .main-padding {
      padding: 50px 0px !important;
    }
  }
}

.v-card__text {
  color: #000000DE !important;
}
</style>>