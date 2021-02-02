const faunadb = require('faunadb'),
  q = faunadb.query

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
}

// eslint-disable-next-line no-unused-vars
exports.handler = async (event, context) => {
    console.log("### START ###")

    try {
        const data = JSON.parse(event.body);

        if (!data.user_id) {
            console.log('400: user_id query parameter required.')
            console.log("### END ###")

            return {
                statusCode: 400,
                body: 'user_id query parameter required'
            }
        }

        if (!data.artist_id) {
            console.log('400: artist_id query parameter required.')
            console.log("### END ###")

            return {
                statusCode: 400,
                body: 'artist_id query parameter required'
            }
        }

        if (!data.artwork_id) {
            console.log('400: artwork_id query parameter required.')
            console.log("### END ###")

            return {
                statusCode: 400,
                body: 'artwork_id query parameter required'
            }
        }

        var client = new faunadb.Client({
            secret: process.env.FAUNADB_SECRET,
            headers: headers
        });

        return await client.query(
            q.Create(
                q.Collection('favorites'),
                {
                    data: {
                        user_id: data.user_id,
                        artist_id: data.artist_id,
                        artwork_id: data.artwork_id
                    }
                }
            )
        ).then(() => {
            console.log("Added successfully");
            console.log("### END ###");

            return {
                statusCode: 200,
                body: 'OK'
            };
        })
        .catch(err => {
            console.error(JSON.stringify(err));
            console.log("### END ###");

            return {
                statusCode: err.requestResult.statusCode,
                body: err.message
            };
        })
    } catch (err) {
        console.log("### END ###")

        return {
            statusCode: 500,
            body: err.toString()
        }
    }
}