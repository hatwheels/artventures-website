const faunadb = require('faunadb'),
  q = faunadb.query

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
}

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

        var client = new faunadb.Client({
            secret: process.env.FAUNADB_SECRET,
            headers: headers
        });

        return await client.query(
            q.Create(
                q.Collection('users'),
                {
                    data: { user_id: data.user_id }
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