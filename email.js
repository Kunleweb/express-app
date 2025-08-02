const nodemailer = require('nodemailer');

const sendEmail = async options => {
    // create a transporter
    const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    logger: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }

    });


    const mailOptions ={
        from: 'kunle <kunki@kunki.net>',
        to: options.email,
        subject: options.subject,
        text: options.message,
    }


    await transporter.sendMail(mailOptions)



}



module.exports =sendEmail