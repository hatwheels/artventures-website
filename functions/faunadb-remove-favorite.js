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
        // Should be ref. ID (String)
        const data = event.body;

        var client = new faunadb.Client({
            secret: process.env.FAUNADB_SECRET,
            headers: headers
        });

        return await client.query(
            q.Delete(
                q.Ref(q.Collection('favorites'), data)
            )
        ).then(() => {
            console.log("OK\n### END ###");

            return {
                statusCode: 200,
                body: 'OK'
            };
        })
        .catch(err => {
            console.log(JSON.stringify(err));
            console.log("### END ###")
    
            return {
                statusCode: err.requestResult.statusCode,
                body: err.message
            };
        })
    } catch (err) {
        console.error(err);
        console.log("### END ###")

        return {
            statusCode: 500,
            body: err.toString()
        }
    }
}