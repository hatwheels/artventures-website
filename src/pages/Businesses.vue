<template>
  <Layout>
    <v-content>
      <v-container class="pa-0 background-color-fafafa" fluid>

        <!-- spacer -->
        <div class="py-10" />

        <!-- main -->
        <div class="px-12 pt-12 pb-10 background-color-fafafa pos-rel">
          <v-img width="69.84%" :src="main.img" :lazy="main.lazy" />
          <div class="biz-cross-main">
            <div class="black--text raleway-3p28vw-600-1p2em pb-6" v-html="main.title[getLang]" />
            <div class="raleway-1p312vw-400 color-rgba-0-0-0-p52 pb-12" v-html="main.description[getLang]" />
            <div class="pt-3" />
            <router-link
              class="contact-us-btn raleway-1p312vw-600 white--text text-center text-uppercase"
              :to="{ path: '/', hash:'#contact-us' }"
              v-html="main.button[getLang]"
            />
          </div>
        </div>

        <!-- advantages -->
        <div class="pb-7">
          <v-row class="px-12 pt-12 pb-4" justify="space-between">
            <v-col class="px-4" cols="4" v-for="(advantage, i) in advantages.content" :key="'advantage-' + i">
              <v-row justify="space-between" align="center">
                <v-col class="px-5" cols="6">
                  <v-img contain :src="advantage.img" :lazy-src="advantage.lazy" />
                </v-col>
                <v-col class="pl-5 pr-6 color-333333" cols="6">
                  <p class="playfair-30-700" v-html="advantage.title[getLang]" />
                  <p class="raleway-16-400-1p6em" v-html="advantage.description[getLang]" />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <div class="text-center custom-block">
            <a
              class="learn-more-btn raleway-15-600 white--text text-uppercase"
              v-html="advantages.button[getLang]"
            />
          </div>
        </div>

        <!-- spacer with divider -->
        <div class="py-2">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- testimonials -->
        <v-row class="py-6" justify="space-around" align="center">
          <v-col
            class="col-biz-testimonials-width color-1a1a1a"
            v-for="(testimonial, i) in testimonials"
            :key="'biz-testimonials-' + i"
          >
            <div class="playfair-18-400-1p4em text-center" v-html="testimonial.quote[getLang]" />
            <div class="raleway-13-600 text-center pt-2" v-html="testimonial.author[getLang]" />
          </v-col>
        </v-row>

        <!-- spacer -->
        <div class="pb-12" />

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
        img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585685621/artventures/businesses01.jpg',
        lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1585685621/artventures/businesses01.jpg',
        title: {
          gr: 'Τέχνη που δουλεύει για την επιχείρηση σας',
          en: 'Art that works for your business',
        },
        description: {
          gr: 'Είτε είσαστε γιατρός, δικηγόρος, μικρό γραφείο ή εταιρία με εκατοντάδες υπαλλήλους, είμαστε εδώ για να σας βοηθήσουμε να ζήσετε την Τέχνη στο χώρο σας.',
          en: 'Whether you’re a doctor, a lawyer, a small office or a company with hundreds of employees, we’re here to help you experience Art in your spaces.',
        },
        button: {
          gr: 'Επικοινωνια',
          en: 'Contact Us',
        },
      },
      // advantages
      advantages: {
        button: {
          gr: 'Μαθετε περισσοτερα',
          en: 'Learn more',
        },
        content: [
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/businesses02.jpg',
            lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/businesses02.jpg',
            title: {
              gr: 'Χωρίς να κουνήσετε ένα δάχτυλο',
              en: 'Don’t lift a finger',
            },
            description: {
              gr: 'H ομάδα μας αναλαμβάνει κάθε λεπτομέρεια, από τον σχεδιασμό και την επιμέλεια της συλλογής που σας ταιριάζει μέχρι την μεταφορά και την εγκατάσταση, χωρίς εσείς να χρειαστεί να κουνήσετε ούτε ένα δάχτυλο.',
              en: 'Our team takes care of every detail, from design and curation to installation and rotation, so you don’t need to lift a finger.',
            },
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/businesses03.jpg',
            lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/businesses03.jpg',
            title: {
              gr: 'Υποστηρίξτε τοπικούς καλλιτέχνες',
              en: 'Support local artists',
            },
            description: {
              gr: 'Εκθέστε Τέχνη που αντιπροσωπεύει την κοινότητα σας και υποστηρίξτε τους καλλιτέχνες που το μοιράζονται μαζί σας. Είτε νοικιάζετε, είτε αγοράζετε τέχνη, ένα σημαντικό ποσοστό από κάθε ευρώ που επενδύετε μέσω της Artventures πάει απευθείας στους καλλιτέχνες των οποίων την δουλειά απολαμβάνετε.',
              en: 'Exhibit artwork that represents your community and support the artists who share it with you. Whether you are renting or buying artwork, a percentage of every Euro you spend with Artventures is paid directly to the artists whose work you enjoy.',
            },
          },
          {
            img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/businesses04.jpg',
            lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/businesses04.jpg',
            title: {
              gr: 'Κάντε το σαν ομάδα',
              en: 'Get your team involved',
            },
            description: {
              gr: 'Θα συνεργαστείτε άμεσα με έμναν από τους Επιμελητές Τέχνης μας, εξερευνώντας τον κατάλογο μας και διαλέγοντας ανάμεσα σε αρκετές χιλιάδες έργα τέχνης. Οι τελικές επιλογές μπορούν να γίνουν ακόμα και μέσω ψηφοφορίας ανάμεσα στους εργαζόμενους σας, ώστε να ενδυναμώσετε ακόμα περισσότερο το χτίσιμο της εταιρικής σας κουλτούρας.',
              en: 'You will work directly with one of our Art Advisors to explore our constantly expanding catalog. Final selections can be made through our community voting tool to engage your employees and build company culture.',
            },
          },
        ]
      },
      // Testimonials
      testimonials: [
        {
          quote: {
            gr: "“Εξαιρετική εμπειρία. Η Artventures ήταν πολύ πικοινωνιακή από την πρώτη στιγμή εως την άφιξη. Η αντιμετώπιση ήταν ευχάριστη και μ χαρά θα αγοράσω ξανά απ' αυτους.”",
            en: '“Wonderful experience. Artventures was very communicative from the first moment to arrival and everything in between. Lovely to deal with and I will happily purchase from them again.”',
          },
          author: {
            gr: '— Δρ. Νικόλας P.',
            en: '— Dr. Nickolas P.',
          }
        },
        {
          quote: {
            gr: "“Τρομερή φροντίδα και προσοχή στην παραγγελία από την ομάδα της Artventures. Έκαναν ό,τι περνούσε από το χέρι τους για να φτάσει η παραγγελία μου νωρίτερα απ' το αναμενόμενο και έτσι έφτασε εγκαίρως για τα εγκάινια του γραφείου. Η επικοινωνία ήταν τέλεια. Δε θα μπορούσα να ζητήσω κάτι παραπάνω!”",
            en: '“Amazing care and attention with my order from the Artventures team. Went above and beyond to make sure my order arrived sooner than estimated so was in time for our office opening. Communication was excellent. Could not have asked for more!”',
          },
          author: {
            gr: '— Μαρία K., Δικηγόρος',
            en: '— Maria K., Lawyer',
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  metaInfo () {
    return {
      titleTemplate: this.getLang === 'gr' ? 'Επιχειρήσεις — Artventures' : 'Businesses — Artventures',
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>

<style>
.custom-divider {
  width: 50vw;
  height: 1px;
  margin-right: 25vw;
  margin-left: 25vw;
}

.custom-block {
  width: 50vw;
  margin-right: 25vw;
  margin-left: 25vw;
}

.biz-cross-main {
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

.learn-more-btn {
  display: inline-block;
  background-color: #4C4C4A;
  border-radius: 4px;
  padding: 21px 34px;
  cursor: pointer;
}

.col.col-biz-testimonials-width {
  width: 45%;
  max-width: 45%;
  flex-basis: 45%;
}
</style>