const axios = require('axios')
const apiRoot = 'https://us4.api.mailchimp.com/3.0/lists/1fd92341c5/members/'
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type"
}

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body)

    if (!data.email) {
      console.log('no email')
      return {
        statusCode: 500,
        headers,
        body: 'email query paramater required'
      };
    }

    if (!data.tag) {
        console.log('no tag')
        return {
          statusCode: 500,
          headers,
          body: 'tag query paramater required'
        };
      }

    return axios({
      method: 'put',
      url: apiRoot,
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
      return {
        statusCode:200, 
        body: JSON.stringify(res.data)
      }
    })
    .catch(err => {
      console.log('error1')
      console.log('returning from here', err.response.data.detail);
      return { statusCode: 500, body: JSON.stringify(err.response.data) };
    })

  } catch (err) {
    console.log('error')
    return { statusCode: 500, body: err.toString() };
  }
}