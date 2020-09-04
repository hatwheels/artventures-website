const ManagementClient = require('auth0').ManagementClient;
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
}

exports.handler = async (event, context) => {
    console.log("### START ###")

    try {
        const data = JSON.parse(event.body)

        if (!data.token ||  data.token != process.env.GRIDSOME_AUTH0_MASTER_TOKEN) {
            console.log('401: user id query parameter required.')
            console.log("### END ###")

            return {
                statusCode: 401,
                headers,
                body: 'Unauthorized Request'
            }
        }

        if (!data.user_id) {
            console.log('400: user id query parameter required.')
            console.log("### END ###")

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
            clientSecret: process.env.AUTH0_MAPI_CLIENT_SECRET,
            headers : headers,
        });

        return await auth0.users.getRoles({ id: data.user_id })
            .then(roles => {
                let filteredRoles = []
                roles.forEach(role => {
                    filteredRoles.push({
                        name: role.name,
                        description: role.description
                    })
                })

                console.log("Success, found user's roles: " + JSON.stringify(roles))
                console.log("### END ###")

                return {
                    statusCode: 200,
                    body: JSON.stringify(filteredRoles)
                }
            })
            .catch(err => {
                console.log(err)
                console.log("### END ###")

                return {
                    statusCode: err.statusCode,
                    body: err.message
                }
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