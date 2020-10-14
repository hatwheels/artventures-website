<template>
    <Layout>
        <v-main>
            <v-container class="background-color-fafafa" fluid>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-text-field v-model="title"></v-text-field>
                <v-btn v-if="title" @click="open">Upload</v-btn>
            </v-container>
        </v-main>
    </Layout>
</template>

<script>

let myCropWidget;

export default {
    data () {
        return {
            title: ''
        }
    },
    mounted () {
        window.addEventListener("load", function() {
            myCropWidget = cloudinary.createUploadWidget({
                    cloudName: 'artventures',
                    uploadPreset: 'ml_default',
                    folder: 'test',
                    cropping: true,
                    multiple: false,
                    resourceType: 'image',
                    maxImageWidth: 1024,
                    maxImageHeight: 1024,
                    showPoweredBy: false,

                    styles:{
                        palette: {
                            window: "#FAFAFA",
                            sourceBg: "#DDDDDD",
                            windowBorder: "#525252",
                            tabIcon: "#000000",
                            menuIcons: "#525252",
                            inactiveTabIcon: "#525252",
                            link:  "#333333",
                            action:  "#000000",
                            inProgress: "#000000",
                            complete: "#20B832",
                            error: "#F44235",
                            textDark: "#000000",
                            textLight: "#FFFFFF",
                        },
                        fonts: {
                            "'Raleway', sans-serif": "https://fonts.googleapis.com/css?family=Raleway",
                        }
                    }
                }, 
                (error, result) => {
                    console.error(error);
                    console.log(result);
                })
        });
  },
  methods: {
      open() {
        myCropWidget.update({publicId: this.title});
        myCropWidget.open();
      }
  },
  metaInfo: {
    script: [
      {
        src: 'https://widget.cloudinary.com/v2.0/global/all.js'
      }
    ]
    
  }
}
</script>