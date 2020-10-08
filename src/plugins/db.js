/* Database plugin */

import axios from 'axios'
import Vue from 'vue'

let db = new Vue({
    methods: {
        addUserId () {

        },
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
        }
    }
})

export default {
    install: function(Vue) {
        Vue.prototype.$db = db
    }
}