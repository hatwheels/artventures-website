const ManagementClient = require('auth0').ManagementClient;
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
}

// eslint-disable-next-line no-unused-vars
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
        delete data.token

        if (!data.user_id) {
            console.log('400: user id query parameter required.')
            console.log("### END ###")

            return {
                statusCode: 400,
                headers,
                body: 'user id query parameter required'
            }
        }
        const user_id = data.user_id
        delete data.user_id

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

        return await auth0.updateUser({ id: user_id }, data)
            .then(user => {
                console.log("User successfully updated")

                const filteredUser = {}
                var nameUpdate = false
                if (Object.prototype.hasOwnProperty.call(data, "given_name")) {
                    filteredUser.given_name = user.given_name
                    nameUpdate = true
                }
                if (Object.prototype.hasOwnProperty.call(data, "family_name")) {
                    filteredUser.family_name = user.family_name
                    nameUpdate = true
                }
                if (nameUpdate) {
                    filteredUser.name = user.name
                }
                if (Object.prototype.hasOwnProperty.call(data, "nickname")) {
                    filteredUser.nickname = user.nickname
                }
                if (Object.prototype.hasOwnProperty.call(data, "email")) {
                    filteredUser.email = user.email
                    filteredUser.email_verified = user.email_verified
                    filteredUser.verify_email = user.verify_email
                }
                if (Object.prototype.hasOwnProperty.call(data, "picture")) {
                    filteredUser.picture = user.picture
                }
                if (Object.prototype.hasOwnProperty.call(data, "user_metadata")) {
                    filteredUser.user_metadata = user.user_metadata
                }

                console.log(filteredUser)
                console.log("### END ###")

                return {
                    statusCode: 200,
                    body: JSON.stringify(filteredUser)
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