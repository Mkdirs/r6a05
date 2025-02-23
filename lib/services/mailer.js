const {Service} = require("@hapipal/schmervice");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});

module.exports = class EmailService extends Service {

    send(sender, receiver, message) {
        return transporter.sendMail({
            from: sender,
            to: receiver,
            subject: message.subject,
            text: message.text,
        });
    }
}