const cloudinary = require('cloudinary').v2;
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
}

exports.handler = async (event, context) => {
    console.log("### START ###")
    try {
        const data = JSON.parse(event.body)

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

        console.log("Public ID: " + data.public_id);

        var options = { type: "upload" };
        // Has contextual metadata?
        if (data.context) {
            console.log("Contextual Metadata: " + data.context);
            options.context = data.context;
        }
        // Has tags?
        if (data.tags) {
            console.log("Tags: " + data.tags);
            options.tags = data.tags;
        }

        return cloudinary.uploader.explicit(data.public_id , options)
            .then(res => {
                console.log('Success ');
                console.log("### END ###");

                return {
                    statusCode: 200,
                    body: JSON.stringify(res)
                }
            })
            .catch(err => {
                console.log(err.message)
                console.log("### END ###")

                return {
                    statusCode: err.statusCode,
                    body: JSON.stringify(err.message)
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