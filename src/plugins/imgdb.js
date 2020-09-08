import axios from 'axios'
import Vue from 'vue'

let imgdb = new Vue({
    computed: {
    },
    methods: {
        updateProfilePic() {

        },
        uploadArtwork(user_id, name, img) {
            return new Promise((resolve, reject) => {
                let public_id = 'artwork/' + user_id +  '/inprocess/' + name

                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/cloudinary-upload',
                    {
                        path: img,
                        id: public_id
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(res => {
                    if (200 == res.status) {
                        resolve(res.data)
                    } else {
                        reject(res.status)
                    }
                }).catch(err => reject(err))
            })
        },
        retrieveArtworks(user_id) {
            return new Promise((resolve, reject) => {
                let folder = 'artwork/' + user_id + '/*'

                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/cloudinary-search',
                    {
                        folder: folder,
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(res => {
                    if (200 == res.status) {
                        resolve(res.data)
                    } else {
                        reject(res.status)
                    }
                }).catch(err => reject(err))
            })
        },
        deleteArtwork() {

        }
    }
})

export default {
    install: function(Vue) {
        Vue.prototype.$imgdb = imgdb
    }
}