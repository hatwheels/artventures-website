const cloudinary = require('cloudinary').v2;
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
}

exports.handler = async (event, context) => {
    console.log("### START ###")
    try {
        const data = JSON.parse(event.body)

        // Folder must be of structure: '<profile or artwork>/<user-id>'
        if (!data.folder) {
            console.log('401: folder query parameter required.')
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

        var xpr = 'resource_type:image AND folder:' + data.folder

        return cloudinary.search.expression(xpr)
            .sort_by('public_id', 'desc')
            .with_field('context')
            .with_field('tags')
            .max_results(500)
            .execute()
            .then(res => {
                var reply = JSON.stringify(res)

                console.log('Retrieved succesfully. Remaining: ' + JSON.stringify(res.rate_limit_remaining));
                console.log("### END ###");

                return {
                    statusCode: 200,
                    body: reply
                }
            })
            .catch(err => {
                console.log(err)
                console.log('### END ###')

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