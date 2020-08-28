const ManagementClient = require('auth0').ManagementClient;
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
}
const url = 'https://' + process.env.GRIDSOME_AUTH0_DOMAIN + '/api/v2/users/'

exports.handler = async (event, context) => {
    try {
        const data = JSON.parse(event.body)
        
        if (!data.user_id) {
            console.log('400: user id query parameter required.')
            return {
                statusCode: 400,
                headers,
                body: 'user id query parameter required'
            }
        }

        var auth0 = new ManagementClient({
            token: process.env.GRIDSOME_AUTH0_MANAGEMENT_API_TOKEN,
            domain: process.env.GRIDSOME_AUTH0_DOMAIN,
            clientId: process.env.AUTH0_MAPI_CLIENT_ID,
            clientSecret: process.env.AUTH0_MAPI_CLIENT_SECRET
        });

        return await auth0.users.getRoles({ id: data.user_id })
            .then(roles => {
                return {
                    statusCode: 200,
                    body: JSON.stringify(roles)
                }
            })
            .catch(err => {
            console.log(err)
            return {
                statusCode: err.statusCode,
                body: JSON.stringify(err)
            }
        })
    } catch (err) {
        return {
            statusCode: 500,
            body: err.toString()
        }
    }

}