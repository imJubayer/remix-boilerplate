import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

interface SendMailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

const sendMail = async ({
  to,
  subject,
  html,
  text = "",
}: SendMailOptions): Promise<void> => {
  await transporter.sendMail({
    from: "allin@gmail.com",
    to,
    subject,
    html,
    text,
  });
};

export default sendMail;
