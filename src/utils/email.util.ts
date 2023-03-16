import nodemailer from "nodemailer";
import "dotenv/config"

interface IMailOptions {
  to: string;
  subject: string;
  text: string;
  from: string;
  html?: string;
}

const sendMail = async ({ to, subject, text, from, html }: IMailOptions) => {
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST, 
    port: process.env.MAIL_PORT, 
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    },
  });
  let mailOptions = {
    from,
    text,
    to,
    html,
    subject,
  };
  await transport.sendMail(mailOptions);
};

export default sendMail