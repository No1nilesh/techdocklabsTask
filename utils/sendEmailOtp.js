"use server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  host: "smtp.gmail.com",
  port: 465,
});

export async function sendEmailOtp(userEmail, otp) {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.SMTP_MAIL, // sender address
      to: userEmail, // list of receivers
      subject: "Task Login Otp", // Subject line
      text: `Your One Time Password is ${otp} `, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  } catch (error) {
    console.log(error);
  }
}
