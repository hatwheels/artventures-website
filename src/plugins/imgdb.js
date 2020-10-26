/* Image database plugin */

import axios from 'axios'
import Vue from 'vue'

let imgdb = new Vue({
    computed: {
    },
    methods: {
        updateProfilePic(user_id, img) {
            return new Promise((resolve, reject) => {
                let public_id = 'profile/' + user_id +  '/pic'

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
                        resolve(res.data.secure_url)
                    } else {
                        reject(res.status)
                    }
                }).catch(err => reject(err))
            })
        },
        uploadArtwork(user_id, img, context) {
            return new Promise((resolve, reject) => {
                let folder = 'artwork/' + user_id +  '/inprocess/'

                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/cloudinary-upload',
                    {
                        path: img,
                        folder: folder,
                        context: context
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
        retrieveArtworks(user_id, path) {
            return new Promise((resolve, reject) => {
                let folder = 'artwork/' + user_id + '/' + path;

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
    }
})

export default {
    install: function(Vue) {
        Vue.prototype.$imgdb = imgdb
    }
}