import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
    const data = JSON.parse(event.body)
    return callback(null, {
        statusCode: 200,
        body: 'OK'
    })
}