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

        if (!data.artist_id) {
            console.log('400: artist_id query parameter required.')
            console.log("### END ###")

            return {
                statusCode: 400,
                body: 'artist_id query parameter required'
            }
        }


        var client = new faunadb.Client({
            secret: process.env.FAUNADB_SECRET,
            headers: headers
        });

        return await client.query(
            q.Paginate(q.Match(q.Index('get_artist_followers'), data.artist_id))
          )
          .then(ret => {
            // Get Ref ID in 3rd element
            console.log(ret.data.length);
            console.log("### END ###");

            return {
                statusCode: 200,
                body: JSON.stringify(ret.data.length)
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
