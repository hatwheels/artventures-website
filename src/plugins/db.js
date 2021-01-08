/* Database plugin */

import axios from 'axios'
import Vue from 'vue'

let db = new Vue({
    methods: {
        // add document with "user_id"
        addUserId (user_id) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/faunadb-add-user-id',
                    {
                        user_id: user_id
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(() => {
                    resolve();
                })
                .catch(err => {
                    reject(err);
                })
            })
        },
        // add a favorite artwork (arwork_id) from an artist (artist_id) of a user (user_id)
        addFavorite(user_id, artist_id, artwork_id) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/faunadb-add-favorite',
                    {
                        user_id: user_id,
                        artist_id: artist_id,
                        artwork_id: artwork_id
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then((reply) => resolve(reply))
                .catch(err => reject(err))
            })
        },
        // add an artist (artist_id) for a user (user_id) to follow
        addFollow(user_id, artist_id) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/faunadb-add-follow',
                    {
                        user_id: user_id,
                        artist_id: artist_id
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(reply => resolve(reply.data))
                .catch(err => reject(err))
            })
        },
        // check if document with "user_id" exists
        existsUserId (user_id) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/faunadb-exists-user-id',
                    {
                        user_id: user_id
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then((found) => {
                    resolve(found.data);
                })
                .catch(err => {
                    reject(err);
                })
            })
        },
        // get "user_id" by reference of document
        getUserId (ref) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/faunadb-get-user-id',
                    {
                        ref: ref
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err);
                })
            })
        },
        // get reference by "user_id" of document
        getRef (user_id) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/faunadb-get-ref',
                    {
                        user_id: user_id
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(res => {
                    resolve(res.data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getFavorites (user_id) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/faunadb-get-favorites',
                    {
                        user_id: user_id
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(res => resolve(res.data))
                .catch(err => reject(err));
            })
        },
        getArtworkLikes (artist_id, artwork_id) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/faunadb-get-artwork-likes',
                    {
                        artist_id: artist_id,
                        artwork_id: artwork_id
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(res => resolve(res.data))
                .catch(err => reject(err));
            })
        },
        getArtistFollowers (artist_id) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/faunadb-get-artist-followers',
                    {
                        artist_id: artist_id
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(res => resolve(res.data))
                .catch(err => reject(err));
            })
        },
        getFollows (user_id) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/faunabd-get-follows',
                    {
                        user_id: user_id
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(res => resolve(res.data))
                .catch(err => reject(err));
            })
        },
        getRefFavorite(user_id, artist_id, artwork_id) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/faunadb-get-ref-favorite',
                    {
                        user_id: user_id,
                        artist_id: artist_id,
                        artwork_id: artwork_id
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(res => resolve(res.data)).catch(err => reject(err))
            })
        },
        getRefFollow(user_id, artist_id) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/faunadb-get-ref-follow',
                    {
                        user_id: user_id,
                        artist_id: artist_id
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(res => resolve(res.data))
                .catch(err => reject(err))
            })
        },
        deleteFavorite (refId) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/faunadb-remove-favorite',
                    refId,
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then((reply) => resolve(reply))
                .catch(err => reject(err))
            }) 
        },
        deleteFollow (refId) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/faunadb-remove-follow',
                    refId,
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(reply => resolve(reply))
                .catch(err => reject(err))
            })
        }
    }
})

export default {
    install: function(Vue) {
        Vue.prototype.$db = db
    }
}