const mailchimp = require("@mailchimp/mailchimp_marketing");
const md5 = require("md5");

exports.handler = async (event, context) => {
  try {
    console.log('######## START ##########')
    let data = JSON.parse(event.body);
    console.log(data)

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

    if (data.hasOwnProperty('new_email_adress')) {
        // Warning: when changing the email of a member, the status has to be provided
        // We hash the current email, but pass the new email in the 'email_address' field
      if (!data.hasOwnProperty('status')) {
          var error = `Changing the email of a member requires passing a status parameter`

          console.error(`error: ${error}`)
          console.log('######## END ##########');

          return {
            statusCode: 400,
            body: `${error}`
          };
      }
      data.email_address = data.new_email_address;
      delete data.new_email_address;
    }

    const run = async () => {
      const response = await mailchimp.lists.setListMember(
        process.env.MC_API_AUDIENCE_ID,
        emailHash,
        data
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