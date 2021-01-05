const cloudinary = require('cloudinary').v2;
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
}

exports.handler = async (event, context) => {
    console.log("### START ###")
    try {
        const data = JSON.parse(event.body)

        if (!data.access_type) {
            console.log('401: access_type query parameter required.')
            console.log("### END ###")

            return {
                statusCode: 401,
                headers,
                body: 'Unauthorized Request'
            }
        }

        switch (data.access_type) {
            case 'single':
                // Folder must be of structure: '<profile or artwork>/<user-id>'
                if (!data.public_id) {
                    console.log('401: public_id query parameter required.')
                    console.log("### END ###")

                    return {
                        statusCode: 401,
                        headers,
                        body: 'Unauthorized Request'
                    }
                }
                var xpr = 'resource_type:image AND public_id=' + data.public_id
                break;
            case 'multi':
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
                var xpr = 'resource_type:image AND folder:' + data.folder
                break;
            case 'favorites':
                if (!data.favorites) {
                    console.log('401: favorites query parameter required.')
                    console.log("### END ###")
        
                    return {
                        statusCode: 401,
                        headers,
                        body: 'Unauthorized Request'
                    }
                }
                var xpr = 'resource_type:image AND (';
                data.favorites.forEach(resource => {
                    if (resource.length < 2) {
                        console.log('401: wrong length of favorites array element.')
                        console.log("### END ###")
        
                        return {
                            statusCode: 401,
                            headers,
                            body: 'Unauthorized Request'
                        }
                    }
                    var approved = 'artwork/' + resource[0] + '/approved/' + resource[1];
                    var inprocess = 'artwork/' + resource[0] + '/inprocess/' + resource[1];
                    var rejected = 'artwork/' + resource[0] + '/rejected/' + resource[1];
                    var frozen = 'artwork/' + resource[0] + '/frozen/' + resource[1];
                    xpr += 'public_id=' + approved + ' OR public_id=' + inprocess + ' OR public_id=' + rejected + ' OR public_id=' + frozen + ' OR ';
                });
                xpr = xpr.slice(0, -4);
                xpr += ')';
                break;
            default:
                console.log('401: access_type query parameter is wrong. Must be string of values "single" or "multi"');
                console.log("### END ###");
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