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
        // folder structure: '<artwork>/<user-id>/'
        if (!data.id && !data.folder) {
            console.log('401: id or folder query parameters required.')
            console.log("### END ###")

            return {
                statusCode: 401,
                headers,
                body: 'Unauthorized Request'
            }
        }
        // Both parameters cannot be passed
        if (data.id && data.folder) {
            console.log('401: id and folder query parameters cannot both be present.')
            console.log("### END ###")
        }

        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET 
        });

        var options = {};
        if (data.id) {
            console.log("Public ID: " + data.id);
            options.public_id = data.id;
        }
        else if (data.folder) {
            console.log("Folder: " + data.folder);
            options.folder = data.folder;
        }
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

        return cloudinary.uploader.upload(data.path , options)
            .then(res => {
                console.log('Success uploading: ' + res.secure_url)
                console.log("### END ###")

                return {
                    statusCode: 200,
                    body: JSON.stringify({ secure_url: res.secure_url, context: res.context, tags: res.tags })
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