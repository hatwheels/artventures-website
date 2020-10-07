const ManagementClient = require('auth0').ManagementClient;
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
}

exports.handler = async (event, context) => {
    console.log("### START ###")

    try {
        const data = JSON.parse(event.body)

        if (!data.role_name) {
            console.log('400: role name query parameter required.')
            console.log("### END ###")

            return {
                statusCode: 400,
                headers,
                body: 'role name query parameter required'
            }
        }

        console.log("Role to get ID: " + data.role_name)

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

        return await auth0.getRoles()
            .then(roles => {
                let found = false;
                let roleId = '';
                roles.forEach(role => {
                    if (role.name === data.role_name) {
                        found = true;
                        roleId = role.id;
                    }
                })
                if (true === found) {
                    console.log("Found role id: " + roleId);
                    console.log("### END ###");

                    return {
                        statusCode: 200,
                        body: roleId
                    };
                } else {
                    // Role id for role name not found!
                    console.log("Role id not found!");
                    console.log("### END ###");

                    return {
                        statusCode: 404,
                        body: 'Role ID not found!'
                    };
                }
            })
            .catch(err => {
                console.log(err);
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