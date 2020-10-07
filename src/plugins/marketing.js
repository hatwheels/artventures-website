/* Marketing service plugin */

import axios from 'axios'
import Vue from 'vue'

let marketing = new Vue({
    methods: {
        async createOrUpdateMember(data) {
            return await axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/mailchimp-put-user',
                data,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
        },
        async getMember(data) {
            return await axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/mailchimp-get-user',
                data,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
        },
        async subscribe(data) {
            return await axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/mailchimp-put-user',
                data,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
        },
        async sendMsg(data) {
            return await axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/mailchimp-put-user',
                data,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
        },
    }
})

export default {
    install: function(Vue) {
        Vue.prototype.$marketing = marketing
    }
}