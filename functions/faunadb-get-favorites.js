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

        var client = new faunadb.Client({
            secret: process.env.FAUNADB_SECRET,
            headers: headers
        });

        return await client.query(
            q.Paginate(q.Match(q.Index('find_favorites'), data.user_id))
          )
          .then(ret => {
            // Get Ref ID in 3rd element
            ret.data.forEach(item => item[2] = item[2].id);
            console.log("Found successfully");
            console.log("### END ###");

            return {
                statusCode: 200,
                body: JSON.stringify(ret.data)
            };
      })
      .catch(err => {
        console.log(JSON.stringify(err));
        console.log("### END ###");

        return {
            statusCode: err,
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
