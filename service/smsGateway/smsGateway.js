const accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; 
const authToken = 'your_auth_token';
const twilio = require('twilio');

function sendSms(options) {
    const client = new twilio(accountSid, authToken);

    client.messages.create({
        body: 'sucessfully registared'+options.name+' with '+options.phone+'',
        to: '+919830822334',
        from: options.phone
    }).then((message) => console.log(message.sid));
}

module.exports = {
    sendSms: sendSms
};

