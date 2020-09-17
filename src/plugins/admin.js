import axios from 'axios'
import Vue from 'vue'

let admin = new Vue({
    methods: {
        async sendEmail(data) {
            return await axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/mailgun-send', data)
        },
    }
})

export default {
    install: function(Vue) {
        Vue.prototype.$admin = admin
    }
}



