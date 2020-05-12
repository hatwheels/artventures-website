const axios = require('axios')
const apiRoot = process.env.MC_API_ROOT + '/members'
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type"
}

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body)
    if (!data.email) {
      return {
        statusCode: 500,
        headers,
        body: 'email query paramater required'
      };
    }

    if (!data.tag) {
      return {
        statusCode: 500,
        headers,
        body: 'tag query paramater required'
      };
    }

    return axios({
      method: 'post',
      url: apiRoot,
      headers: headers,
      data:{
        email_address:data.email,
        status:'subscribed',
        tags: [data.tag]
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