const mailchimp = require("@mailchimp/mailchimp_marketing");
const md5 = require("md5");

exports.handler = async (event, context) => {
  try {
    console.log('######## START ##########')
    let data = JSON.parse(event.body);

    if (!data.email_address) {
      var error = 'email_address parameter required'

      console.error(error)
      console.log('######## END ##########')

      return {
        statusCode: 400,
        body: error
      };
    }

    mailchimp.setConfig({
      apiKey: process.env.MC_API,
      server: process.env.MC_API_PREFIX,
    });


    const emailHash = md5(data.email_address.toLowerCase());

    const run = async () => {
      const response = await mailchimp.lists.getListMember(
        process.env.MC_API_AUDIENCE_ID,
        emailHash
      );

      if (typeof(response.status) === 'string') {
        console.log(response)
        console.log('######## END ##########')

        return {
          statusCode: 200,
          body: JSON.stringify(response)
        };
      } else {
        console.error(response)
        console.log('######## END ##########')

        var error = {
          title: response.title,
          detail: response.detail
        };

        return {
          statusCode: response.status,
          body: JSON.stringify(error)
        };
      }
    };

    return run();
  } catch (err) {
    console.log('try ... catch ... error :' + err)
    console.log('######## END ##########')

    return {
        statusCode: 500,
        body: err.toString()
    }
  }
}