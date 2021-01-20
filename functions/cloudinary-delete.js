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

        if (!data.public_id) {
            console.log('401: public_id query parameter required.')
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

        console.log("public id: " + data.public_id)

        return cloudinary.uploader.destroy(data.public_id, { invalidate: true })
        .then(res => {
            var reply = JSON.stringify(res)

            console.log('Success destroying: ' + reply)
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