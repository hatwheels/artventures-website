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
            console.log('401: token query parameter required.')
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

        if (!data.role_id) {
            console.log('400: role ids query parameter required.')
            console.log("### END ###")

            return {
                statusCode: 400,
                headers,
                body: 'role id query parameter required'
            }
        }
        
        console.log("User ID: " + data.user_id)
        console.log("Role: " + data.role_id)

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

        // find role id of role to assign
        return await auth0.getRoles()
            .then(roles => {
                let roleId = []
                let roleObj = []
                roles.forEach(role => {
                    if (role.name == data.role_id) {
                        roleId.push(role.id)
                        roleObj.push({ name: role.name, description: role.description })
                    }
                });

                console.log("Role IDs found: " + JSON.stringify(roleId))

                if (roleId.length > 0) {
                    // assign found role id
                    return auth0.assignRolestoUser({ id: data.user_id }, { "roles": roleId })
                        .then(() => {
                            console.log("Role successfully assigned")
                            console.log("### END ###")

                            return {
                                statusCode: 200,
                                body: JSON.stringify(roleObj)
                            }
                        }).catch(err => {
                            console.log(err)
                            console.log("### END ###")

                            return {
                                statusCode: err.statusCode,
                                body: err.message
                            }
                        })
                } else {
                    // else
                    console.log("No Role ID found")
                    console.log("### END ###")

                    return {
                        statusCode: 404,
                        body: "Role ID not found for requested Role"
                    }
                }
            }).catch(err => {
                console.log(err)
                console.log("### END ###")

                return {
                    statusCode: err.statusCode,
                    body: err.message
                }
            })
    } catch (err) {
        console.log("### END ###")
        return {
            statusCode: 500,
            body: err.toString()
        }
    }
}