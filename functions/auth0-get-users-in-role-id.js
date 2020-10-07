const ManagementClient = require('auth0').ManagementClient;
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
}

exports.handler = async (event, context) => {
    console.log("### START ###")

    try {
        const data = JSON.parse(event.body)

        if (!data.role_id) {
            console.log('400: role id query parameter required.')
            console.log("### END ###")

            return {
                statusCode: 400,
                headers,
                body: 'role id query parameter required'
            }
        }

        const options = {
            domain: process.env.GRIDSOME_AUTH0_DOMAIN,
            clientId: process.env.AUTH0_MAPI_CLIENT_ID,
            clientSecret: process.env.AUTH0_MAPI_CLIENT_SECRET,
            headers : headers,
        }

        if (process.env.GRIDSOME_BUILD === 'dev') {
            options.token = process.env.GRIDSOME_AUTH0_MANAGEMENT_API_TOKEN
        }
        var auth0 = new ManagementClient(options);

        return await auth0.getUsersInRole({id: data.role_id})
            .then(users => {
                console.log("found users");
                console.log("### END ###");

                return {
                    statusCode: 200,
                    body: JSON.stringify(users)
                };
            })
            .catch(err => {
                console.log(err.statusCode);
                console.log("### END ###");

                return {
                    statusCode: err.statusCode,
                    body: err.message
                };
            })
    } catch (err) {
        console.log(err)
        console.log("### END ###")

        return {
            statusCode: 500,
            body: err.toString()
        }
    }
}