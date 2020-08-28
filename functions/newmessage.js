const axios = require('axios')
const apiRoot = process.env.MC_API_ROOT + '/members'
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type"
}
var md5 = require('md5');

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body)
    if (!data.email) {
      return {
        statusCode: 400,
        headers,
        body: 'email query parameter required'
      };
    }

    if (!data.firstname) {
        return {
          statusCode: 400,
          headers,
          body: 'First Name query parameter required'
        };
      }

    if (!data.lastname) {
        return {
            statusCode: 400,
            headers,
            body: 'Last Name query parameter required'
        };
    }

    if (!data.subject) {
        return {
          statusCode: 400,
          headers,
          body: 'Subject query parameter required'
        };
    }

    if (!data.message) {
        return {
          statusCode: 400,
          headers,
          body: 'Message query paramater required'
        };
    }

    return axios({
      method: 'patch',
      url: apiRoot  + '/' + md5(data.email.toLowerCase()),
      headers: headers,
      data:{
        merge_fields: {
            'FNAME': data.firstname,
            'LNAME': data.lastname,
            'SUBJECT': data.subject,
            'MESSAGE': data.message,
        }
      },
      auth: {
        'username': 'petrosArt',
        'password': process.env.MC_API
      }
    }).then(res => {
      console.log('######## START RESPONSE ##########')
      console.log(res.data)
      console.log('########  END RESPONSE  ##########')
      return {
        statusCode: 200,
        body: JSON.stringify(res.data)
      }
    })
    .catch(err => {
      console.log('########  START  ERROR  ##########')
      console.log(err.response.data)
      console.log('########   END  ERROR   ##########')

      return {
        statusCode: err.response.data.status,
        body: JSON.stringify(err.response.data)
      }
    })
  } catch (err) {
    console.log('try ... catch ... error :' + err)
    return {
        statusCode: 500,
        body: err.toString()
    }
  }
}