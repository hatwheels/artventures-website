const axios = require('axios')
const apiRoot = 'https://us4.api.mailchimp.com/3.0/lists/1fd92341c5/members/'


exports.handler = async (event, context) => {
  try {
    const email = event.queryStringParameters.email
    const tag = event.queryStringParameters.tag
    if(!email) {
      return {
        statusCode: 500,
        body: 'email query paramater required'
      };
    }

    if(!tag) {
        return { 
          statusCode: 500, 
          body: 'tag query paramater required'
        };
      }

    return axios({
      method: 'put',
      url: apiRoot,
      data:{
        email_address:email,
        status:'subscribed',
        tags: [tag]
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
      console.log('returning from here', err.response.data.detail);
      return { statusCode: 500, body: JSON.stringify(err.response.data) };
    });

  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
}