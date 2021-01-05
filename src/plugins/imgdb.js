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
        // Create Artwork
        uploadArtwork(user_id, img, context, tags, watermarkObj) {
            return new Promise((resolve, reject) => {
                let folder = 'artwork/' + user_id +  '/inprocess/'

                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/cloudinary-upload',
                    {
                        path: img,
                        folder: folder,
                        context: context,
                        tags: tags,
                        watermarkObj: watermarkObj
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
        getSingleArtwork(public_id) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/cloudinary-search',
                    {
                        access_type: 'single',
                        public_id: public_id
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
        // Read ALL artworks
        getArtworks(user_id, path) {
            return new Promise((resolve, reject) => {
                let folder = 'artwork/' + user_id + '/' + path;

                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/cloudinary-search',
                    {
                        access_type: 'multi',
                        folder: folder
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
        getFavoriteArtworks(favorites) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/cloudinary-search',
                    {
                        access_type: 'favorites',
                        favorites: favorites
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
        updateArtwork(public_id, context, tags) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/cloudinary-update',
                    {
                        public_id: public_id,
                        context: context,
                        tags: tags
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(res => {
                    if (200 === res.status) {
                        resolve(res.data);
                    } else {
                        reject(res.status);
                    }
                }).catch(err => reject(err))
            })
        },
        // Delete artwork
        deleteArtwork(public_id) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/cloudinary-delete',
                    {
                        public_id: public_id
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(res => {
                    if (200 === res.status) {
                        resolve(res.data)
                    } else {
                        reject(res.status)
                    }
                }).catch(err => reject(err))
            })
        },
        // Move artwork
        moveArtwork(old_public_id, new_public_id) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/cloudinary-move',
                    {
                        old_public_id: old_public_id,
                        new_public_id: new_public_id
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(res => {
                    if (200 === res.status) {
                        resolve(res.data)
                    } else {
                        reject(res.status)
                    }
                }).catch(err => reject(err))
            })
        }
    }
})

export default {
    install: function(Vue) {
        Vue.prototype.$imgdb = imgdb
    }
}