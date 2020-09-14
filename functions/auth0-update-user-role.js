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

        if (!data.add_role_id) {
            console.log('400: assign role ids query parameter required.')
            console.log("### END ###")

            return {
                statusCode: 400,
                headers,
                body: 'assign role id query parameter required'
            }
        }
        
        console.log("User ID: " + data.user_id)
        console.log("Role to remove: " + data.remove_role_id)
        console.log("Role to add: " + data.add_role_id)

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
                let removeRoleId = []
                let addRoleId = []
                let addRoleObject = []
                roles.forEach(role => {
                    removeRoleId.push(role.id)
                    if (role.name === data.add_role_id) {
                        addRoleId.push(role.id)
                        addRoleObject.push({ name: role.name, description: role.description })
                    }
                });
                console.log("Remove Role IDs: " + JSON.stringify(removeRoleId))
                console.log("Add Role IDs found: " + JSON.stringify(addRoleId))

                if (removeRoleId.length > 0 && addRoleId.length > 0) {
                    // first remove role to avoid having more than one
                    return auth0.removeRolesFromUser({ id: data.user_id }, { "roles": removeRoleId })
                        .then(() => {
                            console.log("Roles successfully removed")

                            // now assign new role
                            return auth0.assignRolestoUser({ id: data.user_id }, { "roles": addRoleId })
                                .then(() => {
                                    console.log("Role successfully assigned")
                                    console.log("### END ###")

                                    return {
                                        statusCode: 200,
                                        body: JSON.stringify(addRoleObject)
                                    }
                                }).catch(err => {
                                    console.log(err)
                                    console.log("### END ###")
        
                                    return {
                                        statusCode: err.statusCode,
                                        body: err.message
                                    }
                                })
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