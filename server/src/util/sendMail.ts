"use strict";
import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  //DEFAULT
  // create reusable transporter object using the default SMTP transport
  //   let transporter = nodemailer.createTransport({
  //     host: "smtp.ethereal.email",
  //     port: 587,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: "cvo6z2mo2ndpav5j@ethereal.email", // generated ethereal user
  //       pass: "c3dS7hWpF7yCVQgkmv", // generated ethereal password
  //     },
  //   });

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "toni.west@ethereal.email",
      pass: "wzfanC61ZcjktxdMH2",
    },
  });

  // send mail with defined transport object
  const result = await transporter.sendMail({
    from: '"AV Market" <avmarket@noreply.com>', // sender address
    to: to, // list of receivers
    subject: "Elfelejtett jelszó", // Subject line
    html,
  });

  console.log(result);
}
