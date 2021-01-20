var mailgun = require("mailgun.js")
const mg = mailgun.client({username: 'api', key: process.env.MG_PRV_KEY})

// eslint-disable-next-line no-unused-vars
exports.handler = (event, context) => {
    try {
        const data = JSON.parse(event.body)

        if (!Object.prototype.hasOwnProperty.call(data, "firstname")) {
            return {
                statusCode: 400,
                body: 'firstname parameter required'
            }
        }
        if (!Object.prototype.hasOwnProperty.call(data, "lastname")) {
            return {
                statusCode: 400,
                body: 'lastname parameter required'
            }
        }
        if (!Object.prototype.hasOwnProperty.call(data, "email")) {
            return {
                statusCode: 400,
                body: 'email parameter required'
            }
        }
        if (!Object.prototype.hasOwnProperty.call(data, "subject")) {
            return {
                statusCode: 400,
                body: 'subject parameter required'
            }
        }
        if (!Object.prototype.hasOwnProperty.call(data, "message")) {
            return {
                statusCode: 400,
                body: 'message parameter required'
            }
        }
        var to = ['mail@artventures.me', 'pdemertzis@gmail.com', 'kmarko1385@gmail.com'];
        if (Object.prototype.hasOwnProperty.call(data, "to") && data.to === 'all') {
            to.push('smakrigiorgou@gmail.com');
        }

        let content = {
            from: 'Artventures <mail@artventures.me>',
            to: to,
            subject: data.subject,
            text: 'Firstname: ' + data.firstname + '\nLast Name: ' + data.lastname + '\nEmail: ' + data.email + '\n\n' + data.message,
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