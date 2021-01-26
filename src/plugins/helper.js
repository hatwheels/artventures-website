import Vue from 'vue';

let helper = new Vue({
    data() {
        return {
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