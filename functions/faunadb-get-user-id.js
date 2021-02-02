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

        if (!data.ref) {
            console.log('400: ref query parameter required.')
            console.log("### END ###")

            return {
                statusCode: 400,
                body: 'ref query parameter required'
            }
        }

        var client = new faunadb.Client({
            secret: process.env.FAUNADB_SECRET,
            headers: headers
        });

        return await client.query(
            q.Get(q.Ref(q.Collection('users'), data.ref))
          )
          .then(ret => {
                console.log(JSON.stringify(ret));
                console.log("### END ###")

                return {
                    statusCode: 200,
                    body: ret.data.user_id
                };
          })
          .catch(err => {
            console.log(err);
            console.log("### END ###")

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
