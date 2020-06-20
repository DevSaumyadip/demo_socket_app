const nodemailer = require('nodemailer');

async function sendMail(options) {
    if (options) {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "xyz",
                pass: "xyz"
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: "xyz", 
            to: "debottam.bhatt@webspiders.com",
            subject: "email notification",
            html: '<b> "sucessfully registared'+options.name+' with '+options.to+'" </b>',
        }).catch(console.error);

        console.log("Message sent: %s", info.messageId);
    }
}

module.exports = {
    sendMail: sendMail
};