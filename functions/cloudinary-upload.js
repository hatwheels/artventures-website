const cloudinary = require('cloudinary').v2;
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
}

exports.handler = async (event, context) => {
    console.log("### START ###")
    try {
        const data = JSON.parse(event.body)

        if (!data.path) {
            console.log('401: path query parameter required.')
            console.log("### END ###")

            return {
                statusCode: 401,
                headers,
                body: 'Unauthorized Request'
            }
        }

        // id structure: '<profile or artwork>/<user-id>/<name without extension>'
        if (!data.id) {
            console.log('401: id query parameter required.')
            console.log("### END ###")

            return {
                statusCode: 401,
                headers,
                body: 'Unauthorized Request'
            }
        }

        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET 
        });

        console.log("Path: " + data.path)
        console.log("Public ID: " + data.id)

        return cloudinary.uploader.upload(data.path , { public_id:  data.id })
        .then(res => {
            var reply = JSON.stringify(res)

            console.log('Success uploading: ' + reply)
            console.log("### END ###")

            return {
                statusCode: 200,
                body: res.secure_url
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
        console.log("### END ###")

        return {
            statusCode: 500,
            body: err.toString()
        }
    }
}