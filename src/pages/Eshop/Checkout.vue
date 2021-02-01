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
              <!-- <v-row class="py-2" no-gutters justify="center" align="center">
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
              </v-row> -->
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
                    <div class="font-italic">{{ getLang === 'gr' ? 'Ενοικίαση με' : 'Rent for' }}</div>
                    <div>{{ item.rentPrice }}{{ $helper.plainText.rentPerMonth[getLang] }}</div>
                  </div>
                </v-col>
                <v-col cols="2" class="px-2 raleway-25-400  border-bottom-dddddd">
                  <div v-if="item.salePrice" class="d-flex flex-column justify-center height-100pc">
                    <div class="font-italic">{{ getLang === 'gr' ? 'Αγορά με' : 'Buy for' }}</div>
                    <div>{{ item.salePrice }}€</div>
                  </div>
                </v-col>
                <v-col cols="2" class="p-2 raleway-25-400  border-bottom-dddddd">
                  <div v-if="item.salePrice" class="d-flex flex-column justify-center height-100pc">
                      <div class="d-flex justify-center align-center">
                        <v-select
                          v-if="item.rentPrice.length"
                          class="px-16"
                          v-model="item.choice"
                          :items="choices"
                          color="black"
                          :label="getLang === 'gr' ? 'Αγορά ή πώλληση;' : 'Buy or Rent?'"
                        ></v-select>
                        <v-select
                          v-else
                          v-model="item.choice"
                          :items="[choices[0]]"
                          color="black"
                          :label="getLang === 'gr' ? 'Αγορά ή πώλληση;' : 'Buy or Rent?'"
                        ></v-select>
                      </div>
                      <div class="d-flex justify-center align-center">
                        <v-btn
                          color="#000000DE"
                          class="pa-auto"
                          outlined
                          @click="$eshop.removeFromBasket(item.public_id)"
                        >
                          {{ removeBtn.single[getLang] }}
                        </v-btn>
                        <v-checkbox v-model="item.selected" class="pl-4" color="#000000DE"></v-checkbox>
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
                      :disabled="$eshop.basketValue.every(item => item.selected === false)"
                      @click="$eshop.removeSelectedFromBasket()"
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
                <v-btn
                  class="mx-auto pa-auto"
                  dark
                  large
                  color="#333333"
                  @click="!isAuthenticated ? loginDialog = true : confirmOrderDialog = true;"
                >
                  {{ buyBtn[getLang] }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
        <!-- Basket is empty -->
        <v-card
          v-else
          flat
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

      <!-- Login Dialog -->
      <v-dialog v-model="loginDialog" persistent max-width="290" hide-overlay no-click-animation>
        <v-card>
          <v-card-text :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'" class="text-justify pt-5">
            {{ loginDialogTxt[getLang] }}
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              class="color-333333"
              :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
              color="white"
              @click="loginDialog = false;"
            >
              {{ confirmOrder.cancelBtn[getLang] }}
            </v-btn>
            <v-btn
              class="white--text"
              :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
              color="#333333"
              @click="login()"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Confirm order Dialog -->
      <v-dialog v-model="confirmOrderDialog" persistent max-width="290px" hide-overlay no-click-animation>
        <v-card>
          <v-card-title :class="getLang === 'gr' ? 'noto-18-600' : 'raleway-18-600'">
            {{ confirmOrder.title[getLang] }}
          </v-card-title>
          <v-card-text :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'" class="text-justify">
            {{ confirmOrder.text[getLang] }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="color-333333"
              :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
              color="white"
              @click="confirmOrderDialog = false;"
            >
              {{ confirmOrder.cancelBtn[getLang] }}
            </v-btn>
            <v-btn
              class="white--text"
              :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
              color="#333333"
              @click="sendOrder()"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Order Sent Dialog -->
      <v-dialog v-model="orderSentDialog" persistent max-width="290px" hide-overlay no-click-animation>
        <v-card>
          <v-card-title :class="getLang === 'gr' ? 'noto-18-600' : 'raleway-18-600'">
            {{ orderSent.title[getLang] }}
          </v-card-title>
          <v-card-text :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'" class="text-justify">
            {{ orderSent.text[getLang] }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="white--text"
              :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
              color="#333333"
              @click="$eshop.basket = []; orderSentDialog = false;"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      isAuthenticated: false,
      confirmOrderDialog: false,
      orderSentDialog: false,
      loginDialog: false,
      // headers: [
      //   {
      //     gr: 'Εργο Τέχνης',
      //     en: 'Artwork'
      //   },
      //   {
      //     gr: 'Περιγραφή',
      //     en: 'Description'
      //   },
      //   {
      //     gr: 'Τιμή Ενοικίασης',
      //     en: 'Rent Price'
      //   },
      //   {
      //     gr: 'Τιμή Πώλησης',
      //     en: 'Sale Price'
      //   },
      //   {
      //     gr: '',
      //     en: ''
      //   }
      // ],
      choices: [
        {
          text: "Sale",
          value: "sale"
        },
        {
          text: "Rent",
          value: "rent"
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
        gr: 'Υποβολη Παραγγελιας',
        en: 'Submit Order'
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
      },
      loginDialogTxt: {
        gr: "Πριν επιβεβαιώσετε την παραγγελία σας, θα σας ζητηθεί να εγγραφείτε ή να συνδεθείτε.",
        en: "Before confirming your order, you'll be asked to signup or login."
      },
      confirmOrder: {
        title: {
          gr: "Επιβεβαίωση Παραγγελίας",
          en: "Confirm Order"
        },
        text: {
          gr: "Δεν υποστηρίζουμε ακόμα ηλεκτρονικές πληρωμές. Επιβεβαιώνοντας την παραγγελία σας, θα την επεξεργαστούμε και θα σας ενημερώσουμε για τις λεπτομέρειες πληρωμής.",
          en: "We don't support online payments yet. As such by confirming your order we will process it and inform you about the payment details."
        },
        cancelBtn: {
          gr: "Ακυρωση",
          en: "Cancel"
        }
      },
      orderSent: {
        title: {
          gr: "Ευχαριστούμε για την παραγγελία σας!",
          en: "Thank you for your order!"
        },
        text: {
          gr: "Λάβαμε την παραγγελία σας. Σύντομα θα επικοινωνήσουμε μαζί σας μέσω email.",
          en: "Your order has been sent. We will contact via email soon."
        },
      }
    }
  },
  mounted() {
    this.isAuthenticated = this.$auth.isAuthenticated();
    // Reset selected items to be removed
    this.$eshop.basketValue.forEach(item => item.selected = false);
  },
  computed: {
    ...mapGetters(["getLang"])
  },
  methods: {
    login() {
      this.loginDialog = false;
      this.$eshop.redirectInCheckout = true;
      this.$auth.login();
    },
    sendOrder() {
      // Notify us
      let message = "";
      this.$eshop.basketValue.forEach(item => {
        message += "\n1. ";
        message += item.artist_name;
        if (item.title.length) {
          message += ", " + item.title;
        }
        if (item.type.length) {
          message += ", " + item.type;
        }
        if (item.size.length) {
          message += ", " + item.size;
        }
        message += ", " + item.choice + ": " + (item.choice === "sale") ? item.salePrice : item.rentPrice;
      });
      message += "\nTotal Sale Price: " + this.$eshop.totalSalePrice;
      message += "\nTotal Rent Price: " + + this.$eshop.totalRentPrice;
        this.$admin.sendEmail({
        email: this.$auth.user.email || '',
        firstname: this.$auth.user.given_name || '',
        lastname: this.$auth.user.family_name || '',
        subject: "New Order",
        message: message,
        to: 'all'
      });
      this.confirmOrderDialog = false;
      this.orderSentDialog = true;
    }
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

.center-viewport {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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