const axios = require('axios')
const apiRoot = process.env.RECAPTCHA_GOOGLE_URL + '/recaptcha/validate'

exports.handler = async(event, context) => {
    const params = JSON.parse(event.body)

    if (!params.Response) {
        return {
            statusCode: 500,
            headers,
            body: 'no response'
          };
    }

    return axios({
        method: 'post',
        url: apiRoot,
        data: params
    }).then(res => {
        if (res.data.hasErrors) {
            return {
                statusCode: 200,
                body: res.data.message
            }
        } else {
            return {
                statusCode: 500,
                body: res.data
            }
        }
    }).catch(err => {
        if (err.response.data.hasOwnProperty('hasErrors')) {
            return {
                statusCode: 500,
                body: err.response.data.message
            }
        } else {
            return {
                statusCode: 500,
                body: err.message
            }
        }
    })
}