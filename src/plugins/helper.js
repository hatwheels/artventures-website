/* Helper Plugin */

import Vue from 'vue';

let helper = new Vue({
  data() {
    return {
      logo: [
        'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_76,w_auto/v1583838043/artventures/artventures_logo.svg',
        'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_50,w_auto/v1583838043/artventures/artventures_logo.svg',
      ],
      routes: {
        about: {
          gr: '<div class="color-333333 text-capitalize">Αρχική</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">About</div>', // English, raw html
        },
        explore: {
          gr: '<div class="color-333333 text-capitalize">Εξερεύνησε</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">Explore</div>', // English, raw html
          routes: [
            {
              gr: '<div class="color-333333 text-capitalize">Ιδιώτες</div>',
              en: '<div class="color-333333 text-capitalize">Individuals</div>',
              route: '/individuals',
            },
            {
              gr: '<div class="color-333333 text-capitalize">Εταιρείες</div>',
              en: '<div class="color-333333 text-capitalize">Businesses</div>',
              route: '/businesses',
            },
            {
              gr: '<div class="color-333333 text-capitalize">Ξενοδοχεία</div>',
              en: '<div class="color-333333 text-capitalize">Hotels</div>',
              route: '/hotels',
            }
          ]
        },
        gallery: {
          gr: '<div class="color-333333 text-capitalize">Γκαλερί</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">Gallery</div>', // English, raw html
        },
        forArtists: {
          gr: '<div class="color-333333 text-capitalize">Για Καλλιτέχνες</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">For Artists</div>', // English, raw html
        },
        faq: {
          gr: '<div class="color-333333 text-capitalize">Ερωτήσεις</div>', // Greek, raw html
          en: '<div class="color-333333">F.A.Q.</div>', // English, raw html
        },
        contact: {
          gr: '<div class="white--text text-capitalize">Επικοινωνία</div>', // Greek, raw html
          en: '<div class="white--text text-capitalize">Contact</div>', // English, raw html
        },
        profile: {
          gr: '<div class="color-333333 text-capitalize">Προφίλ</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">Profile</div>', // English, raw html
        },
        login: {
          gr: '<div class="color-333333 text-capitalize">Σύνδεση</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">Login</div>', // English, raw html
        },
        logout: {
          gr: '<div class="color-333333 text-capitalize">Αποσύνδεση</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">Logout</div>', // English, raw html
        },
        basket: {
          gr: '<div class="text-capitalize">Καλάθι</div>', // Greek, raw html
          en: '<div class="text-capitalize">Checkout</div>', // English, raw html
        }
      },
      spa: {
        profile: {
          gr: '<div class="color-333333 text-capitalize">Προφίλ</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">Profile</div>', // English, raw html
        },
        portfolio: {
          gr: '<div class="color-333333 text-capitalize">Πορτφόλιο</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">Portfolio</div>', // English, raw html
        },
        settings: {
          gr: '<div class="color-333333 text-capitalize">Ρυθμίσεις</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">Settings</div>', // English, raw html
        },
        galleryList: {
          gr: '<div class="color-333333 text-capitalize">Πίνακας Έργων</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">Artworks Table</div>', // English, raw html
        },
        gallery: {
          gr: '<div class="color-333333 text-capitalize">Γκαλερί</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">Gallery</div>', // English, raw html
        },
        favorites: {
          gr: '<div class="color-333333 text-capitalize">Αγαπημένα</div>', // Greek, raw html
          en: '<div class="color-333333 text-capitalize">Favorites</div>', // English, raw html
        }
      },
      cookieTxt: {
        gr: 'Χρησιμοποιούμε αρχεία αναγνώρισης ("cookies") για την βελτίωση της εμπειρίας και την ανάλυση της διαδικτυακής κίνησης.',
        en: 'We use cookies to offer you a better experience and analyse traffic.',
      },
      allowCookies: {
        gr: 'Αποδέχομαι',
        en: 'Accept',
      },
      declineCookies: {
        gr: 'Αρνούμαι',
        en: 'Decline',
      },
      artworkStates: {
        inprocess: "inprocess",
        approved: "approved",
        rejected: "rejected",
        frozen: "frozen",
        names: ["inprocess", "approved", "rejected", "frozen"],
        folders: ["/inprocess/", "/approved/", "/rejected/", "/frozen/"]
      },
      plainText: {
        gallery: {
          gr: "Γκαλερί",
          en: "Gallery"
        },
        artistPage: {
          gr: "Σελίδα καλλιτέχνη",
          en: "Artist's page"
        },
        artworks: {
          gr: "Εργα Τέχνης",
          en: "Artworks"
        },
        artworkZoom: {
          gr: "Μεγέθυνση",
          en: "Enlarge"
        },
        artworkEdit: {
          gr: 'Επεξεργασία',
          en: 'Edit'
        },
        artworkFreeze: {
          gr: 'Πάγωμα',
          en: 'Freeze'
        },
        artworkDelete: {
          gr: 'Διαγραφή',
          en: 'Delete'
        },
        heart: {
          gr: "Μου αρέσει",
          en: "Like"
        },
        follow: {
          gr: 'Ακολούθησε με',
          en: 'Follow'
        },
        share: {
          gr: "Μοιράσου το",
          en: "Share"
        },
        type: {
          painting: {
            gr: "Πίνακας",
            en: "Painting"
          },
          sculpture: {
            gr: "Γλυπτό",
            en: "Sculpture"
          },
          drawing: {
            gr: "Σχέδιο",
            en: "Drawing"
          },
          photography: {
            gr: "Φωτογραφία",
            en: "Photography"
          },
          digital: {
            gr: "Ψηφιακό",
            en: "Digital"
          }
        },
        rentFor: {
          gr: "Ενοικίαση",
          en: "Rent"
        },
        rentPerMonth: {
          gr: "€/μ",
          en: "€/m"
        },
        close: {
          gr: "Κλείσιμο",
          en: "Close"
        },
        emptyFavorites: {
          gr: "Δεν έχετε αγαπημένα έργα τέχνης.",
          en: "You have no favorite artworks."
        },
        emptyFollows: {
          gr: "Δεν ακολουθείται κάπoιον καλλιτέχνη.",
          en: "You don't follow any artists."
        },
        error404: {
          gr: "Ωχ, η σελίδα δεν βρέθηκε.",
          en: "Oops, page not found."
        },
        error: {
          gr: "Ωχ, κάτι πήγε στραβά. Παρακαλώ δοκιμάστε αργότερα.",
          en: "Oops, something went wrong. Please try again later."
        },
        maxArtworks: {
          gr: "Έχετε φτάσει το όριο των 30 έργων τέχνης",
          en: "You have reached the limit of 30 artworks"
        }
      }
    }
  },
  methods: {
    toPublicIdNoPath(publicId, artworkState) {
      let c = publicId.indexOf(artworkState);
      return c === -1 ? "" : publicId.slice(c).replace(artworkState, "");
    },
    objIsEmpty(obj) {
      return obj.constructor === Object && !Object.entries(obj).length;
    }
  }
})

export default {
  install: function (Vue) {
    Vue.prototype.$helper = helper
  }
}