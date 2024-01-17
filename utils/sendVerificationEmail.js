const config = require("../utils/config");
const nodemailer = require("nodemailer");
const emailMessage = require("./message");

async function sendVerificationEmail(user) {
  try {
    let URL = `${config.FRONTEND_BASEURI}password-reset/${user._id}/verify/${user.resetToken}`;
    const transporter = nodemailer.createTransport({
      host: config.EMAIL_HOST,
      port: config.EMAIL_PORT,
      secure: config.EMAIL_SECURE, // use SSL
      auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS,
      },
    });

    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to send verification email");
      }
    });

    const message = {
      from: config.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Verification Link",
      text: `
            
Hi ${user.username},

There was a request to change your password!

If you did not make this request then please ignore this email.

Otherwise, please click this link to change your password: ${URL}
            `,
      html: emailMessage(URL, user.username),
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log("Email Sent failed", error);
        return error;
      } else {
        console.log("Email sent sucessfully");
        return info;
      }
    });
  } catch (error) {
    console.log("Email not sent");
    console.log(error);
  }
}

module.exports = sendVerificationEmail;
