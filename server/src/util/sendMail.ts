"use strict";
import nodemailer from "nodemailer";
import { mailerPass, mailerUser } from "./env";

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
    service: "gmail",
    auth: {
      user: mailerUser, // generated ethereal user
      pass: mailerPass, // generated ethereal password
    },
    logger: true,
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: "noreply@avmarket.hu",
    to: to, // list of receivers
    subject: "Elfelejtett jelszó", // Subject line
    html,
  });
}
