var mailgun = require("mailgun.js")
const mg = mailgun.client({username: 'api', key: process.env.MG_PRV_KEY})

exports.handler = (event, context) => {
    try {
        const data = JSON.parse(event.body)
        console.log(data);

        if (!data.hasOwnProperty('firstname')) {
            return {
                statusCode: 400,
                body: 'firstname parameter required'
            }
        }
        if (!data.hasOwnProperty('lastname')) {
            return {
                statusCode: 400,
                body: 'lastname parameter required'
            }
        }
        if (!data.hasOwnProperty('email')) {
            return {
                statusCode: 400,
                body: 'email parameter required'
            }
        }
        if (!data.hasOwnProperty('subject')) {
            return {
                statusCode: 400,
                body: 'subject parameter required'
            }
        }
        if (!data.hasOwnProperty('message')) {
            return {
                statusCode: 400,
                body: 'message parameter required'
            }
        }

        let content = {
            from: data.firstname + ' ' + data.lastname + ' <' +  data.email + '>',
            to: ['pdemertzis@gmail.com', 'kmarko1385@gmail.com'],
            subject: data.subject,
            text: data.message,
        }
        return mg.messages.create(process.env.MG_DOMAIN, content)
            .then(msg => {
                console.log('######## START SUCCESS ##########')
                console.log(msg)
                console.log('########  END SUCCESS  ##########')
    
                return {
                    statusCode: 200,
                    body: 'OK'
                };
            })
            .catch(err => {
                console.log('######## START ERROR ##########')
                console.log(err)
                console.log('########  END ERROR  ##########')
    
                return {
                    statusCode: 500,
                    body: 'error'
                };
            })
    } catch (err) {
        console.log('try ... catch ... error :' + err)
        console.log('######## END ##########')
    
        return {
            statusCode: 500,
            body: err.toString()
        }
    }

}