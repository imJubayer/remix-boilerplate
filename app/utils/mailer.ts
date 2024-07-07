import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
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
  text,
  html,
}: SendMailOptions): Promise<void> => {
  await transporter.sendMail({
    from: "allin@gmail.com",
    to,
    subject,
    text,
    html,
  });
};

export default sendMail;
