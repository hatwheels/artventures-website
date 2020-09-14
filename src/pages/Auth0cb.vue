<template>
  <VoidLayout>
    <div class="spinner">
      <img src="../../static/loading.svg" width="300vw" alt="Loading">
    </div>
    <v-dialog v-model="dialog" max-width="290" overlay-color="transparent">
      <v-card>
        <v-card-text
          class="px-3 pt-2 pb-4"
          :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'">
          {{ dialogText[getLang] }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
            color="#333333" @click="createRoleForUser('artist')"
          >
            {{ getLang === 'gr' ? 'Ναι' : 'Yes' }}
          </v-btn>
          <v-btn
            class="black--text"
            :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
            color="#FAFAFA" @click="createRoleForUser('user')"
          >
            {{ getLang === 'gr' ? 'Όχι' : 'Νο' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </VoidLayout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data () {
    return {
      dialog: false,
      dialogText: {
        gr: 'Είσαστε Καλλιτέχνης;',
        en: 'Are you an Artist?',
      },
    }
  },
  created() {
    this.$auth.handleAuthentication().then((data) => {
      this.$auth.getUserRole()
        .then((roleObj) => {
          if (roleObj == null) {
            this.dialog = true
          } else {
            this.$auth.getUser()
            .then(() => {
              if (roleObj[0].name == 'artist')
                this.$router.push({ path: '/user/portfolio' })
              else
                this.$router.push({ path: '/user/profile' })
            })
            .catch(err => this.$auth.logout())
          }
        })
        .catch(err => this.$auth.logout())
    }).catch(err => {})
  },
  computed: {
    ...mapGetters(["getLang"]),
  },
  methods: {
    createRoleForUser(role) {
      this.$auth.assignUserRole(role)
      .then((roleObj) => {
        this.$auth.getUser()
        .then(() => {
          if (roleObj[0].name == 'artist')
            this.$router.push({ path: '/user/portfolio' })
          else
            this.$router.push({ path: '/user/profile' })
        })
        .catch(err => {
          this.$auth.logout()
        })
      })
      .catch(err => this.$auth.logout())
    }
  }
}
</script>

<style scoped>
.spinner {
  position: absolute;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: transparent;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.noto-13-400 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 13px !important;
  font-weight: 400 !important;
}
.noto-16-400 {
  font-family: 'Noto Sans', sans-serif !important;
  font-size: 16px !important;
  font-weight: 400 !important;
}
.raleway-13-400 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 13px !important;
  font-weight: 400 !important;
}
.raleway-16-400 {
  font-family: 'Raleway', sans-serif !important;
  font-size: 16px !important;
  font-weight: 400 !important;
}
</style>