import nodemailer from "nodemailer";
import { IMailOptions } from "../interfaces/mailOptions.interface";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import "dotenv/config";
import { otpHtml } from "../templates/optHtml";

class EmailService {
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  private from: string;
  constructor() {
    this.from = process.env.MAIL_FROM;
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }
  async sendMail({ to, html, subject, text }: IMailOptions) {
    let mailOptions = {
      from: this.from,
      text,
      to,
      html,
      subject,
    };
    return await this.transporter.sendMail(mailOptions);
  }

  async sendOtp( otp: number, user:string, id:string, expiresIn: Date, first: boolean) {
    this.sendMail({
      to: user,
      subject: 'Confirm Your account',
      text: otp.toString(),
      html: otpHtml(otp.toString()),
      from: process.env.MAIL_HOST!,
    }).catch((error)=> {
      if(first) {
        //failedLogService.create({ code: otp, user: id, expiresIn: expiresIn})
      }
    })
  }
}

export default new EmailService();
