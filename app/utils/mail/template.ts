import { getMediaPath } from "../helper";
export interface ContactUsEmailType {
  name: string;
  email: string;
  number: string;
  method: string;
  message: string;
}
export function generateContactUsEmailHtml({
  name,
  email,
  number,
  method,
  message,
}: ContactUsEmailType) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Us</title>
        <style>
            body {
                font-family: 'Arial, sans-serif';
                background-color: #f2f3f8;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border: 1px solid #dcdcdc;
                border-radius: 10px;
            }
            .header {
                text-align: center;
                padding: 20px 0;
                border-bottom: 1px solid #dcdcdc;
            }
            .header img {
                max-width: 150px;
            }
            .content {
                padding: 20px;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 12px;
                color: #888888;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <img src="${getMediaPath("/logos/logo.svg")}" alt="Logo">
            </div>
            <div class="content">
                <h1>New Contact Form Submission</h1>
                <p>Dear Admin,</p>
                <p>You have received a new message from the contact form on your website. Here are the details:</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone Number:</strong> ${number}</p>
                <p><strong>Preferred Contact Method:</strong> ${method}</p>
                <p><strong>Message:</strong> ${message}</p>
                <p>Best regards,</p>
                <p>ALLINONE Website</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} ALLINONE. All rights reserved.</p>
                <p>Leicester, LE2 5RN, United Kingdom</p>
            </div>
        </div>
    </body>
    </html>
  `;
}
