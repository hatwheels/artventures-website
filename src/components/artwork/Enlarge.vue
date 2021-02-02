<template>
  <div>
    <!-- Desktop Overlay -->
    <v-overlay class="hidden-sm-and-down" :value="overlayDesktop">
      <v-row class="background-color-fafafa rounded" no-gutters>
        <v-col cols="auto">
          <v-img
            v-if="!$helper.objIsEmpty(enlargedArtwork)"
            class="rounded"
            :src="enlargedArtwork.url"
            :lazy-src="enlargedArtwork.url.replace('artventures/image/upload/', 'artventures/image/upload/c_thumb,w_100/')"
            :alt="enlargedArtwork.title || 'Untitled'"
            max-height="99vh"
            max-width="99vw"
            position="top"
            contain
          >
            <v-row class="background-color-fafafa px-1 py-1" no-gutters justify="space-between" align="center">
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
                <div class="d-flex justify-center align-center">
                  <div v-if="enlargedArtwork.salePrice && ($auth.user.sub !== enlargedArtwork.user_id)">
                    <v-tooltip v-if="true !== $eshop.isInBasket(enlargedArtwork.public_id)" bottom color="black">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="mr-1"
                          v-on="on"
                          v-bind="attrs"
                          fab
                          light
                          elevation="2"
                          height="30"
                          width="30"
                          color="#333333"
                          @click="$eshop.addToBasket(enlargedArtwork); $forceUpdate();"
                        >
                          <v-icon size="20" color="#FAFAFA">mdi-basket-plus</v-icon>
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
                          dark
                          elevation="2"
                          height="30"
                          width="30"
                          color="#FAFAFA"
                          @click="$eshop.removeFromBasket(enlargedArtwork.public_id); $forceUpdate();"
                        >
                          <v-icon size="20" color="#333333">mdi-basket-minus</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ getLang == "gr" ? "Διαγραφή απο καλάθι" : "Remove from basket" }}</span>
                    </v-tooltip>
                  </div>
                  <v-tooltip bottom color="black">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-on="on"
                        v-bind="attrs"
                        color="#333333"
                        @click="
                          $emit('update-enlarged-artwork', {});
                          $emit('update-overlay-desktop', false);
                          $emit('update-overlay-mobile', false);
                        "
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $helper.plainText.close[getLang] }}</span>
                  </v-tooltip>
                </div>
              </v-col>
            </v-row>
          </v-img>
        </v-col>
      </v-row>
    </v-overlay>
    <!-- Mobile Overlay -->
    <v-dialog :value="overlayMobile"
      class="hidden-md-and-up"
      fullscreen
      persistent
      no-click-animation
      transition="scroll-x-transition"
    >
      <v-row
        class="rounded background-color-fafafa"
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
          >
            <v-row class="background-color-fafafa px-1 py-1" no-gutters justify="space-between" align="center">
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
                <v-row no-gutters justify="end" align="center">
                  <v-col v-if="enlargedArtwork.salePrice && ($auth.user.sub !== enlargedArtwork.user_id)">
                    <v-btn
                      v-if="true !== $eshop.isInBasket(enlargedArtwork.public_id)"
                      class="border-fa-btn"
                      fab
                      light
                      elevation="2"
                      height="26"
                      width="26"
                      color="#333333"
                      @click="$eshop.addToBasket(enlargedArtwork); $forceUpdate();"
                    >
                      <v-icon color="#FAFAFA" size="16">mdi-basket-plus</v-icon>
                    </v-btn>
                    <v-btn
                      v-else
                      class="border-fa-btn"
                      fab
                      dark
                      elevation="2"
                      height="26"
                      width="26"
                      color="#FAFAFA"
                      @click="$eshop.removeFromBasket(enlargedArtwork.public_id); $forceUpdate();"
                    >
                      <v-icon color="#333333" size="16">mdi-basket-minus</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      icon
                      small
                      color="#333333"
                      @click="
                        $emit('update-enlarged-artwork', {});
                        $emit('update-overlay-desktop', false);
                        $emit('update-overlay-mobile', false);
                      "
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-img>
        </v-col>
      </v-row>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  updated () {
    console.log(this.enlargedArtwork)
    console.log(this.$auth.user.sub)
  },
  props: {
    overlayDesktop: {
      type: Boolean,
      default: false
    },
    overlayMobile: {
      type: Boolean,
      default: false
    },
    enlargedArtwork: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  computed: {
    ...mapGetters(['getLang'])
  }
};
</script>
