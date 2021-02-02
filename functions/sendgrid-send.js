const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

// eslint-disable-next-line no-unused-vars
exports.handler = (event, context) => {
    try {
        const data = JSON.parse(event.body);

        if (!Object.prototype.hasOwnProperty.call(data, "to")) {
            return {
                statusCode: 400,
                body: 'to parameter required'
            };
        }
        if (!Object.prototype.hasOwnProperty.call(data, "subject")) {
            return {
                statusCode: 400,
                body: 'subject parameter required'
            };
        }
        if (!Object.prototype.hasOwnProperty.call(data, "message")) {
            return {
                statusCode: 400,
                body: 'message parameter required'
            };
        }
        var hasHtml = false;
        if (Object.prototype.hasOwnProperty.call(data, "html")) {
            if (data.html === true) {
                hasHtml = true;
            }
        }

        var msg = {
            to: data.to,
            from: 'Artventures <hello@artventures.me>',
            subject: data.subject,
        };
        if (hasHtml) {
            msg.html = data.message;
        } else {
            msg.text = data.message;
        }

        return sgMail.send(msg)
            .then(() => {
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
            });
    } catch (err) {
        console.log('try ... catch ... error');
        console.log('######## END ERROR ##########')

        return {
            statusCode: 500,
            body: err.toString()
        }
    }
}