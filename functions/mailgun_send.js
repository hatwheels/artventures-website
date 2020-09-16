var mailgun = require("mailgun.js")
const mg = mailgun.client({username: 'api', key: process.env.MG_PRV_KEY})

exports.handler = (event, context) => {
    const data = JSON.parse(event.body)
    let content = {
        from: data.firstname + ' ' + data.lastname + ' <' +  data.email + '>',
        to: ['pdemertzis@gmail.com', 'kmarko1385@gmail.com'],
        subject: data.subject,
        text: data.message,
    }
    mg.messages.create(process.env.MG_DOMAIN, content)
        .then(msg => {
            console.log('######## START SUCCESS ##########')
            console.log(msg)
            console.log('########  END SUCCESS  ##########')
        })
        .catch(err => {
            console.log('######## START ERROR ##########')
            console.log(err)
            console.log('########  END ERROR  ##########')
        })
}