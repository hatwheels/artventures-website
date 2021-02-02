/* Notification plugin */

import axios from 'axios'
import Vue from 'vue'

let notify = new Vue({
  methods: {
    async sendEmail(data) {
      return await axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/sendgrid-send', data)
    },
  }
})

export default {
  install: function (Vue) {
    Vue.prototype.$notify = notify
  }
}



