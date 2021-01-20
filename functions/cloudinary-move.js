const cloudinary = require('cloudinary').v2;
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
}

// eslint-disable-next-line no-unused-vars
exports.handler = async (event, context) => {
    console.log("### START ###")
    try {
        const data = JSON.parse(event.body)
        console.log(data);

        if (!data.old_public_id) {
            console.log('401: old_public_id query parameter required.')
            console.log("### END ###")

            return {
                statusCode: 401,
                headers,
                body: 'Unauthorized Request'
            }
        }

        if (!data.new_public_id) {
            console.log('401: new_public_id query parameter required.')
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

        console.log("old public id: " + data.old_public_id)
        console.log("new public id: " + data.new_public_id)

        return cloudinary.uploader.rename(data.old_public_id, data.new_public_id, { invalidate: true })
        .then(res => {
            var reply = JSON.stringify(res)

            console.log('Success moving: ' + reply)
            console.log("### END ###")

            return {
                statusCode: 200,
                body: reply
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