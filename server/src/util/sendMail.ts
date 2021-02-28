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
      user: "a5hmlkbb2s5qihen@ethereal.email", // generated ethereal user
      pass: "m5vKjxt4GfPvnu5754", // generated ethereal password
    },
    logger: true,
  });

  // send mail with defined transport object
  const result = await transporter.sendMail({
    to: to, // list of receivers
    subject: "Elfelejtett jelszó", // Subject line
    html,
  });
}
