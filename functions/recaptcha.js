const axios = require('axios')
const apiRoot = process.env.RECAPTCHA_GOOGLE_URL + '/recaptcha/validate'

exports.handler = async(event, context) => {
    return axios({
        method: 'post',
        url: apiRoot,
        data: params
    }).then(res => {

    }).catch(err => {
        
    })
}