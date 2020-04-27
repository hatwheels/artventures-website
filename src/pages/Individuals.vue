<template>
  <Layout>
    <v-content class="hidden-sm-and-down">
      <v-container class="pa-0 background-color-fafafa" fluid>

        <!-- spacer -->
        <div class="py-10" />
        
        <!-- main -->
        <div class="px-12 py-12 background-color-fafafa pos-rel">
          <v-img width="69.84%" :src="main.img" :lazy="main.lazy" />
          <div class="ind-cross-main">
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

        <!-- spacer -->
        <div class="py-12" />

        <!-- advantages -->
        <div class="py-12">
          <v-row class="px-12 pb-3" justify="space-around">
            <v-col cols="4" v-for="(advantage, i) in advantages" :key="'advantage-' + i">
              <v-img contain :src="advantage.img" :lazy-src="advantage.lazy" />
            </v-col>
          </v-row>
          <v-row class="px-12 pt-3" justify="space-around">
            <v-col class="color-333333" cols="4" v-for="(advantage, i) in advantages" :key="'advantage-' + i">
              <p
                :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                v-html="advantage.title[getLang]"
              />
              <p
                :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                v-html="advantage.description[getLang]"
              />
            </v-col>
          </v-row>
        </div>

        <!-- spacer with divider -->
        <div class="py-8">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- Rent -->
        <div class="text-center custom-block">
          <div
            :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
            class="pb-6"
            v-html="rent.title[getLang]"
          />
          <div
            :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
            style="padding-bottom: 34px"
            v-html="rent.description[getLang]"
          />
          <a
            :class="getLang === 'gr' ? 'noto-15-600' : 'raleway-15-600'"
            class="personality-test-btn white--text text-uppercase"
            v-html="rent.button[getLang]"
          />
        </div>

        <!-- spacer -->
        <div style="padding: 100px 0px" />

      </v-container>
    </v-content>

    <v-content class="hidden-md-and-up">
      <v-container class="pa-0 background-color-fafafa" fluid>

        <!-- main -->
        <v-row justify="center">
          <v-col cols=11>
            <v-img contain :src="main.img" :lazy="main.lazy" />
          </v-col>
          <v-col class="background-color-f5f5f5" cols=11>
            <div
              :class="getLang === 'gr' ? 'noto-30-700' : 'raleway-30-700'"
              class="black--text pb-4"
              v-html="main.title[getLang]"
            />
            <div
              :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
              class="color-rgba-0-0-0-p52 pb-7"
              v-html="main.description[getLang]"
            />
            <router-link
              :class="getLang === 'gr' ? 'noto-13-600' : 'raleway-13-400'"
              class="contact-us-btn-small white--text text-center"
              :to="{ path: '/', hash:'#contact-us' }"
              v-html="main.button[getLang]"
            />
          </v-col>
        </v-row>

        <!-- advantages -->
        <div class="pt-6">
          <v-row justify="center" v-for="(advantage, i) in advantages" :key="'advantage-small' + i">
            <v-col cols="11">
              <v-img class="mb-4" :src="advantage.img" :lazy-src="advantage.lazy" />
              <div class="color-333333">
                <p
                  :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'"
                  v-html="advantage.title[getLang]"
                />
                <p
                  :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
                  v-html="advantage.description[getLang]"
                />
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- spacer with divider -->
        <div class="py-8">
          <div class="background-color-dddddd custom-divider" />
        </div>

        <!-- Rent -->
        <v-row justify="center">
          <v-col class="text-center" cols="11">
            <div
              :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
              class="pb-6"
              v-html="rent.title[getLang]"
            />
            <div
              :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'"
              style="padding-bottom: 34px"
              v-html="rent.description[getLang]"
            />
            <a
              :class="getLang === 'gr' ? 'noto-13-600' : 'raleway-13-600'"
              class="personality-test-btn-small white--text text-uppercase text-center"
              v-html="rent.button[getLang]"
            />
          </v-col>
        </v-row>

        <!-- spacer -->
        <div class="py-6" />

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
        img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585685621/artventures/individuals01.jpg',
        lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1585685621/artventures/individuals01.jpg',
        title: {
          gr: 'Εξερευνήστε πρωτότυπη Τέχνη χωρίς να ξοδέψετε μια περιουσία',
          en: 'Experience original Art without spending a fortune',
        },
        description: {
          gr: 'Εγγραφείτε στην Artventures. Αποκτήστε ένα έργο τέχνης στο σπίτι σας. Αλλάξτε το όποτε θέλετε.<br>Κάντε το τεστ Τέχνης. Εγγραφείτε στην Artventures. Με 50€ το μήνα, θα λαμβάνετε ένα νέο έργο τέχνης κάθε 2 ή 3 μήνες στο χώρο σας.',
          en: 'Subscribe to Artventures. Get a new Artwork in your home. Change it whenever you want.<br>Take the Art personality test. Subscribe to Artventures. With 50€ per month, you’ll get a new work of Art every 2 or 3 months delivered to your space.',
        },
        button: {
          gr: 'Επικοινωνηστε',
          en: 'Contact Us',
        },
      },
      // advantages
      advantages: [
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/individuals02.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/individuals02.jpg',
          title: {
            gr: 'Ζήστε την από κοντά',
            en: 'Experience it in person',
          },
          description: {
            gr: 'Δοκιμάστε την Τέχνη που σας εμπνέει περισσότερο, είτε αγοράζοντας την, είτε δοκιμάζοντας την στον χώρο σας. Αποκτώντας μια συνδρομή στην Artventures, θα έχετε την ευκαιρία να έχετε στον χώρο σας 4-6 διαφορετικά έργα σε έναν χρόνο, για ένα μικρό ποσό μηνιαίως. Η μεταφορά προς και από τον χώρο σας κάθε 2-3 μήνες περιλαμβάνεται στην συνδρομή, και οποιαδήποτε στιγμή θελήσετε μπορείτε να αγοράσετε το έργο που απολαμβάνετε, ή ακόμα και κάποιο άλλο του ίδιου καλλιτέχνη ή αντίστοιχου είδους.',
            en: 'Try the Art that inspires you the most, either by buying it, or by giving it a try in your space. With your subscription to Artventures you’ll have the chance to get in your space 4-6 different works of Art in a whole year, for a small amount every month. Moving to and from your place every 2-3 months is included in the subscription, and anytime you want, you can buy the artwork you enjoy, or even something by the same artist or genre.',
          },
        },
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/individuals03.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/individuals03.jpg',
          title: {
            gr: 'Η Τέχνη μιλάει για εσάς',
            en: 'Your Art speaks for you',
          },
          description: {
            gr: 'Είτε ψάχνετε κάτι που θα σας εμπνεύσει, είτε κάτι που θα εγείρει μεγάλα ερωτήματα, ή θα γίνει αφετηρία για έναν διάλογο, είτε θέλετε να προκαλέσετε, ή απλά να κάνετε εντύπωση ή μια δήλωση στον χώρο σας, η Τέχνη που επιλέγετε λέει πολλά για εσάς και το περιβάλλον σας, με διαφορετικούς, πολυεπίπεδους, δυναμικούς τρόπους.',
            en: 'Whether you’re looking to inspire, ask questions, start a conversation, make an impression, or challenge an assumption, the art you show can make the statement over and over in unique, dynamic ways.',
          },
        },
        {
          img: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto/v1585320144/artventures/individuals04.jpg',
          lazy: 'https://res.cloudinary.com/de1jgt6c5/image/upload/q_auto,fl_lossy,f_auto,dpr_auto,h_100/v1582416241/artventures/individuals04.jpg',
          title: {
            gr: 'Επενδύστε έξυπνα.',
            en: 'Invest smart',
          },
          description: {
            gr: 'Γνωρίστε νέους και ταλαντούχους καλλιτέχνες πριν ακόμα αποκτήσουν μεγάλη δημοσιότητα, βοηθήστε όσους εκτιμάτε δοκιμάζοντας ή και αγοράζοντας τα έργα τους, προωθήστε όσους πιστεύουν πως αξίζουν προσφέροντας τους την έκθεση που χρειάζονται. Ξεκινήστε ή αυξήστε την συλλογή σας και δώστε της υπεραξία, στηρίζοντας και ανακαλύπτοντας ταυτόχρονα νέους, υποσχόμενους καλλιτέχνες.',
            en: 'Get to know young and talented artists before they even gain much publicity, help those you value by trying out and / or purchasing their artworks, promote those you believe are worth more, by giving them the exposure they need. Start or increase your collection and give it good value by supporting and discovering new, promising artists at the same time.<br><br>Art Rentals for 50€ per month. Get original art in your home for a fixed monthly fee. We ship each work ready to hang. And we don’t believe in minimum terms or hidden costs, so there aren’t any.',
          },
        },
      ],
      // Rent
      rent: {
        title: {
          gr: 'Γιατί να νοικιάσετε Τέχνη;',
          en: 'Why Rent Art?',
        },
        description: {
          gr: 'Επειδή είναι ο καλύτερος τρόπος να καταλάβετε αν αυτό που αγαπάτε όντως ισχύει πραγματικά. Η ενοικίαση έργου τέχνης σας δίνει την δυνατότητα να πειραματιστείτε και να εξερευνήσετε τα γούστα σας - χωρίς ρίσκο. Ανακαλύψτε τάσεις και τεχνικές που δεν έχετε ξαναδεί ή μάθετε για νέους και ανερχόμενους καλλιτέχνες. Και φυσικά, όποιο έργο σας αρέσει μπορείτε να το αγοράσετε όποτε θέλετε.<br><br>Τι λέει η Τέχνη που σας αρέσει για σας;',
          en: 'Because that’s the best way to find out if what you love works. Or even fits. Renting a piece of art gives you a chance to road test, experiment, or explore your taste — risk free. Check trends or techniques you hadn’t seen before or learn about new and upcoming artists. And of course, whatever you like, you can buy it anytime you want.<br><br>What does the Art you like say about you?',
        },
        button: {
          gr: 'Καντε το τεστ τεχνης',
          en: 'Take the art personality test',
        },
      },
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  metaInfo () {
    return {
      titleTemplate: this.getLang === 'gr' ? 'Ιδιώτες — Artventures' : 'Individuals - Artventures',
      meta: [
        { name: 'description', content: 'Landing page' },
      ],
    }
  },
}
</script>

<style>
.contact-us-btn {
  display: inline-block;
  background-color: #2B2B2B;
  text-decoration: none;
  border-radius: 8px;
  padding: 1.1vw 3.28vw;
  cursor: pointer;
}

.contact-us-btn-small {
  display: inline-block;
  background-color: #2B2B2B;
  text-decoration: none;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
}

.personality-test-btn {
  display: inline-block;
  background-color: #4C4C4A;
  border-radius: 4px;
  padding: 21px 34px;
  cursor: pointer;
}

.personality-test-btn-small {
  display: inline-block;
  background-color: #4C4C4A;
  border-radius: 4px;
  padding: 10.5px 17px;
  cursor: pointer;
}

.ind-cross-main {
  position: absolute;
  background-color: #F5F5F5;
  width: 42.65%;
  z-index: 100;
  right: 3.3%;
  top: 24.5%;
  padding: 4.737%;
}

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
</style>