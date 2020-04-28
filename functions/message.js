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

    if (!data.firstname) {
        return {
          statusCode: 500,
          headers,
          body: 'First Name query paramater required'
        };
      }

    if (!data.lastname) {
        return {
            statusCode: 500,
            headers,
            body: 'Last Name query paramater required'
        };
    }

    if (!data.subject) {
        return {
          statusCode: 500,
          headers,
          body: 'Subject query paramater required'
        };
    }

    if (!data.message) {
        return {
          statusCode: 500,
          headers,
          body: 'Message query paramater required'
        };
    }

    let response = axios({
      method: 'post',
      url: apiRoot,
      data:{
        email_address:data.email,
        status:'transactional',
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

    console.log('res: ' + response)
    return response

    // if (response.statusCode != 200 && ) {

    // } else {
    //   return response
    // }

  } catch (err) {
    console.log('try ... catch ... error :' + err)
    return {
        statusCode: 500,
        body: err.toString()
    }
  }
}