<template>
  <Layout>

    <v-main>
      <v-container class="pa-0 background-color-fafafa" fluid>
        <v-card class="center-viewport" color="#fafafa" flat>
          <v-row style="height: 100%" justify="center" align="center">
            <v-col>
              <p class="text-center" :class="getLang === 'gr' ? 'noto-30-700' : 'playfair-30-700'">404</p>
              <p class="text-center" :class="getLang === 'gr' ? 'noto-16-400-1p6em' : 'raleway-16-400-1p6em'">{{ msg[getLang] }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-main>

  </Layout>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  data () {
    return {
      msg: {
        en: 'Oops, page not found.',
        gr:  'Ωχ, η σελίδα δεν βρέθηκε.'
      }
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  }
}
</script>

<style scoped>
.center-viewport {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>