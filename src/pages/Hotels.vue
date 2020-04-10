<template>
  <Layout>
    <v-content>
      <v-container class="pa-0 background-color-fafafa" fluid>

        <!-- spacer -->
        <div class="py-10" />

        <!-- main -->
        <div class="px-12 pt-12 pb-10 background-color-fafafa pos-rel">
          <v-img width="69.84%" :src="main.img" :lazy="main.lazy" />
          <div class="hot-cross-main">
            <div
              :class="getLang === 'gr' ? 'noto-3p28vw-600-1p2em' : 'raleway-3p28vw-600-1p2em'"
              class="black--text pb-6"
              v-html="main.title[getLang]"
            />
            <div
              :class="getLang === 'gr' ? 'noto-1p312vw-400' : 'raleway-1p312vw-400'"
              class="color-rgba-0-0-0-p52 pb-12"
              v-html="main.description[getLang]"
            />
            <div class="pt-3" />
            <router-link
              :class="getLang === 'gr' ? 'noto-1p312vw-600' : 'raleway-1p312vw-600'"
              class="contact-us-btn white--text text-center text-uppercase"
              :to="{ path: '/', hash:'#contact-us' }"
              v-html="main.button[getLang]"
            />
          </div>
        </div>

        <!-- advantages -->
        <div class="pb-7">
          <v-row class="px-12 pt-12 pb-4" justify="space-between">
            <v-col class="px-4" cols="4" v-for="(advantage, i) in advantages" :key="'advantage-' + i">
              <v-row justify="space-between">
                <v-col class="px-5" cols="6">
                  <v-img contain :src="advantage.img" :lazy-src="advantage.lazy" />
                </v-col>
                <v-col class="pl-5 pr-6 color-333333" cols="6">
                  <p
                    :class="getLang === 'gr' ? 'noto-30-700-1p2' : 'playfair-30-700-1p2'"
                    v-html="advantage.title[getLang]"
                  />
                  <p
                    :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                    v-html="advantage.description[getLang]"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>

        <!-- spacer with divider -->
        <div class="pt-2 pb-5">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- testimonials -->
        <v-row class="py-6" justify="space-around" align="center">
          <v-col
            class="col-hot-testimonials-width color-1a1a1a"
            v-for="(testimonial, i) in testimonials"
            :key="'hot-testimonials-' + i"
          >
            <div
              :class="getLang === 'gr' ? 'noto-18-400-1p4em' : 'playfair-18-400-1p4em'"
              class="text-center"
              v-html="testimonial.quote[getLang]"
            />
            <div
              :class="getLang === 'gr' ? 'noto-13-600' : 'raleway-13-600'"
              class="text-center pt-2"
              v-html="testimonial.author[getLang]"
            />
          </v-col>
        </v-row>

        <!-- spacer with divider -->
        <div class="pt-5 pb-12">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- form -->
        <div class="text-center pt-12">
          <div
            :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
            class="pb-6"
            v-html="form.title[getLang]"
          />
          <div class="custom-block">
            <a
              :class="getLang === 'gr' ? 'noto-15-600' : 'raleway-15-600'"
              class="form-btn white--text text-uppercase"
              v-html="form.button[getLang]"
            />
          </div>
          <div class="py-12" />
        </div>

      </v-container>
    </v-content>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  data () {
    return {
      /* Sections */
      // main
      main: {
        img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585685621/artventures/hotels01.jpg',
        lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1585685621/artventures/hotels01.jpg',
        title: {
          gr: 'Τέχνη που κάνει τους χώρους σας να λάμπουν',
          en: 'Art that make your spaces shine',
        },
        description: {
          gr: 'Μεταμορφώστε τους χώρους σας σε μία “ανοιχτή γκαλερί” και επεκτείνετε το brand σας μέσω της Τέχνης.<br><br>Είτε είστε μικρό boutique hotel, 5* resort ή μεσιτικό γραφείο, η Artventures σας βοηθάει με την δημιουργία μιας μοναδικής συλλογής και μεγιστοποιεί τα προτερήματα της έκθεσης Τέχνης στις εγκαταστάσεις σας.',
          en: 'Transform your spaces to an “open gallery” and expand your brand narrative through Art.<br><br>Whether you’re a small boutique hotel, a 5* resort or a real estate project, Artventures will help you create a unique collection and maximize all the advantages of exhibiting Art in your premises.',
        },
        button: {
          gr: 'Επικοινωνια',
          en: 'Contact Us',
        },
      },
      // advantages
      advantages: [
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/hotels02.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/businesses02.jpg',
          title: {
            gr: 'Επιλέξτε μια καινοτόμα λύση για την ανακαίνιση',
            en: 'Take an innovative approach to renovation',
          },
          description: {
            gr: "Μπορούμε να αλλάζουμε τα έργα τέχνης στον χώρο σας όσο συχνά επιλέξετε, προσφέροντας σας έναν χαμηλού κόστους τρόπο, να ανανεώνετε περιοδικά την εμφάνιση και την αίσθηση στους χώρους σας, και φυσικά να εντυπωσιάζετε ενοίκους και επισκέπτες.",
            en: 'Change the artwork in your spaces and rooms as often as you want.<br><br>Refresh the whole atmosphere and renovate without changing anything else (or spending a fortune). Choose a different narrative for your hotel every time.',
          },
        },
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/hotels03.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/hotels03.jpg',
          title: {
            gr: 'Ανακαλύψτε την κατάλλητη τέχνη για κάθε χώρο',
            en: 'Discover the right piece of art for every room',
          },
          description: {
            gr: 'Είτε πρόκειται για installations που απλώνονται από το πάτωμα του lobby ως την οροφή μέχρι ένα τρίπτυχο χωλ, προσφέρουμε μια τεράστια γκάμα από έργα τέχνης. Θα συνεργαστείτε τετ-α-τετ με έναν εξειδικευμένο Σύμβουλο Τέχνης μας και θα ανακαλύψετε τα τελειότερα κομμάτια για κάθε χώρο που σας ενδιαφέρει.',
            en: 'From floor-to-ceiling lobby installations to hallway triptychs, we offer a full range of artworks. You’ll work one-on-one with a dedicated Art Advisor to find the perfect piece for every space.',
          },
        },
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/hotels04.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/hotels04.jpg',
          title: {
            gr: 'Αυξήστε την αξία και τα έσοδα σας',
            en: 'Get more value and even more revenue',
          },
          description: {
            gr: 'Αγοράστε ή ενοικιάστε. Πληρώνοντας εξ’ αρχής όλο το ποσό ή σταδιακά. Προσφέρουμε μια ολόκληρη σειρά από ευέλικτες λύσεις για να κερδίζετε όσο το δυνατόν περισσότερα κάθε φορά, όποιος κι αν είναι ο προϋπολογισμός σας.',
            en: 'Purchase or rent. Pay up front or over time. We offer a range of flexible options to make the most of your budget, every time. And get commissions from every sale.',
          },
        },
      ],
      // Testimonials
      testimonials: [
        {
          quote: {
            gr: "“Ήμασταν πολύ τυχεροί να συνεργαστούμε με την ομάδα της Artventures από την αρχή. Η επικοινωνία ήταν πολύ καλή απ' την αρχή. Η εξυπηρέτηση τους είναι πραγματικά καταπληκτική. Όλη η ομάδα ήταν πολύ εξυπηρετική και επαγγελματική.”",
            en: '“We were very lucky to work with the Artventures team from the very begining. Communication was great all along. They really provide a great service. The whole group was very helpful and professional.”',
          },
          author: {
            gr: '— Μιχάλης Δ., Διευθυντής Ξενοδοχείου 5*',
            en: '— Michael D., 5* Hotel Manager',
          }
        },
      ],
      // Form
      form: {
        title: {
          gr: 'Ανακαλύψτε τι μπορούμε να κάνουμε για εσάς',
          en: 'Find out what we can do for you',
        },
        button: {
          gr: 'Συμπληρωστε την φορμα',
          en: 'Complete the Form',
        },
      }
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  metaInfo () {
    return {
      titleTemplate: this.getLang === 'gr' ? 'Ξενοδοχεία — Artventures' : 'Hotels — Artventures',
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>

<style>
.custom-divider {
  width: 30vw;
  height: 1px;
  margin-right: 35vw;
  margin-left: 35vw;
}

.custom-block {
  width: 50vw;
  margin-right: 25vw;
  margin-left: 25vw;
}

.hot-cross-main {
  position: absolute;
  background-color: #F5F5F5;
  width: 42.65%;
  z-index: 100;
  right: 2.7%;
  top: 17%;
  padding: 4.737%;
}

.contact-us-btn {
  display: inline-block;
  background-color: #2B2B2B;
  text-decoration: none;
  border-radius: 8px;
  padding: 1.1vw 3.28vw;
  cursor: pointer;
}

.form-btn {
  display: inline-block;
  background-color: #4C4C4A;
  border-radius: 4px;
  padding: 21px 34px;
  cursor: pointer;
}

.col.col-hot-testimonials-width {
  width: 30%;
  max-width: 30%;
  flex-basis: 30%;
}
</style>
