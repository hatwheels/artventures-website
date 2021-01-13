<template>
    <div>
    <v-dialog v-model="toggle" :width="width" persistent>
        <v-stepper v-model="slide" class="rounded-0 rounded-t" non-linear>
            <v-stepper-items>
                <v-stepper-content step="0">
                    <v-row justify="space-around" align="center">
                        <v-col class="pb-0" cols="auto">
                            <div
                                class="color-000000DE pb-6 text-uppercase"
                                :class="getLang === 'gr' ? 'noto-30-700' : 'raleway-30-700'"
                                v-html="$static.contract.edges[0].node.title[getLang]"
                            />
                            <div
                                class="color-000000DE"
                                :class="getLang === 'gr' ? 'noto-18-600' : 'raleway-18-600'"
                                v-html="$static.contract.edges[0].node.date[getLang]"
                            />
                            <div v-for="(chapter, i) in $static.contract.edges[0].node.chapters" :key="'chapter-' + i">
                                <div>
                                <div
                                    class="text-uppercase  pb-1"
                                    :class="getLang === 'gr' ? 'noto-18-600' : 'raleway-18-600'"
                                    v-html="chapter.title[getLang]"
                                >
                                </div>
                                <div
                                    :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
                                    class="text-justify"
                                    v-html="chapter.text[getLang]"
                                />
                                <br>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-stepper-content>
                <v-stepper-content step="1">
                    <v-row justify="space-around" align="center">
                        <v-col class="pb-0" cols="auto">
                            <div
                                class="pb-6 color-000000DE text-uppercase"
                                :class="getLang === 'gr' ? 'noto-30-700' : 'raleway-30-700'"
                                v-html="$static.submission.edges[0].node.title[getLang]"
                            />
                            <div
                                class="color-000000DE"
                                :class="getLang === 'gr' ? 'noto-18-600' : 'raleway-18-600'"
                                v-html="$static.submission.edges[0].node.date[getLang]"
                            />
                            <div v-for="(chapter, i) in $static.submission.edges[0].node.chapters" :key="'chapter-' + i">
                                <div>
                                <div
                                    class="text-uppercase pb-1"
                                    :class="getLang === 'gr' ? 'noto-18-600' : 'raleway-18-600'"
                                    v-html="chapter.title[getLang]"
                                >
                                </div>
                                <div
                                    :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
                                    class="text-justify"
                                    v-html="chapter.text[getLang]"
                                />
                                <br>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
        <v-card flat class="px-0 py-0 rounded-0 rounded-b">
            <v-card-actions>
                <v-btn
                    class="white--text"
                    :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                    color="#525252"
                    @click="next"
                >
                    {{ this.slide === 0 ? nextText[getLang] : prevText[getLang] }}
                </v-btn>
                <v-spacer />
                <!-- Reject, show prompt -->
                <v-btn 
                    class="black--text"
                    :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                    color="#FAFAFA"
                    @click="rejectPrompt = true;"
                >
                    {{ rejectBtnText[getLang] }}
                </v-btn>
                <!-- Accept, update acceptTerms key in $auth -->
                <v-btn
                    class="white--text"
                    :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                    color="#333333"
                    :loading="isLoading"
                    @click="acceptTerms()"
                >
                    OK
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- Reject prompt -->
    <v-dialog persistent v-model="rejectPrompt" :width="$vuetify.breakpoint.mobile ? width : widthReject">
        <v-card>
            <v-card-text
                class="pt-4"
                :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
            >
                {{ rejectPromptTxt[getLang] }}
            </v-card-text>
            <v-card-actions>
                <!-- Rejected, so close prompt and terms dialog -->
                <v-btn
                    class="black--text"
                    :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                    color="#FAFAFA"
                    @click="rejectPrompt = false; $emit('update-toggle', false);"
                >
                    {{ getLang === 'gr' ? 'Ναι' : 'Yes' }}
                </v-btn>
                <!-- close prompt -->
                <v-btn 
                    
                    class="white--text"
                    :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                    color="#333333"
                    @click="rejectPrompt = false;"
                >
                    {{ getLang === 'gr' ? 'Οχι' : 'No' }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- Error Dialog -->
    <v-dialog v-model="errorDialog" persistent :width="$vuetify.breakpoint.mobile ? width : widthReject">
        <v-card>
            <v-card-text
                class="pt-4"
                :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
            >
                {{ errorDialogText[getLang] }}
            </v-card-text>
            <v-card-actions>
                <v-btn 
                    class="white--text"
                    :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                    color="#333333"
                    @click="errorDialog = false; $emit('update-toggle', false);"
                >
                    OK
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        toggle: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String,
            default: "80vw"
        }
    },
    data () {
        return {
            title: {
                gr: 'Οροι Πωλητηή & Υποβολής',
                en: 'Seller & Submission Terms'
            },
            rejectBtnText: {
                gr: 'Απορριψη',
                en: 'Reject'
            },
            prevText: {
                gr: 'Προηγουμενο',
                en: 'Previous'
            },
            nextText: {
                gr: 'Επομενο',
                en: 'Next'
            },
            slide: 0,
            length: 2,
            widthReject: null,
            rejectPrompt: false,
            rejectPromptTxt: {
                gr: 'Είστε σίγουροι; Δεν θα μπορείτε ν\' ανεβάσετε τα έργα τέχνης σας.',
                en: 'Are you sure? You won\'t be able to upload your artworks.'
            },
            isLoading: false,
            errorDialog: false,
            errorDialogText: {
                gr: 'Κάποιο λάθος συνέβη. Παρακαλώ προσπαθήστε ξανά αργότερα.',
                en: 'An error has occured. Please try again later'
            }
        }
    },
    mounted () {
        this.widthReject = (parseInt(this.width) / 4).toString() + 'vw';
    },
    computed: {
        ...mapGetters(['getLang']),
    },
    methods: {
      async next () {
        this.slide = this.slide + 1 === this.length
          ? 0
          : this.slide + 1
      },
      async acceptTerms () {
        var success = false;
        
        this.isLoading = true;
        await this.$auth.updateUser({
                user_metadata: {
                    acceptedTerms: true
            }
        }).then(() => success = true)
        .catch(() => this.errorDialog = true)
        
        if (success) {
            this.$emit('accept-terms', true);
        }

        this.isLoading = false;
        this.$emit('update-toggle', false);
      }
    }
}
</script>

<static-query>
query {
  submission: allPages(filter: { path: { eq: "/content/pages/artists-submission/" }}) {
    edges {
      node {
        id
        path
        title {
          en
          gr
        }
        date {
          en
          gr
        }
        chapters {
          title {
            en
            gr
          }
          text {
            en
            gr
          }
        }
      }
    }
  },
  contract: allPages(filter: { path: { eq: "/content/pages/artists-contract/" }}) {
    edges {
      node {
        id
        path
        title {
          en
          gr
        }
        date {
          en
          gr
        }
        chapters {
          title {
            en
            gr
          }
          text {
            en
            gr
          }
        }
      }
    }
  }
}
</static-query>

<style scoped>
.color-000000DE {
    color: #000000DE !important;
}
</style>