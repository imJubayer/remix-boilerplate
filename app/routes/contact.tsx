import {
  ActionFunction,
  json,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import React from "react";
import Layout from "~/components/landingPage/layouts/Layout";
import ContactBanner from "~/components/landingPage/sections/contact-banner/ContactBanner";
import ContactForm from "~/components/landingPage/sections/contact-form/ContactForm";
import Map from "~/components/landingPage/sections/map/Map";
import { adminEmail } from "~/utils/constant";
import {
  ContactUsEmailType,
  generateContactUsEmailHtml,
} from "~/utils/mail/template";
import sendMail from "~/utils/mailer";

export const meta: MetaFunction = () => [{ title: "ALL IN ONE | Contact Us" }];

export const action: ActionFunction = async ({ request }) => {
  // const formData = await request.formData();
  const formData = await request.formData();
  // @ts-ignore
  const formDataObject = Object.fromEntries(
    formData.entries(),
  ) as ContactUsEmailType;

  sendMail({
    to: `${adminEmail}`,
    subject: "New Contact Form Submission - ALLINONE",
    text: `
        You have received a new message from the contact form on your website.
        
        Name: ${formDataObject.name}
        Email: ${formDataObject.email}
        Phone Number: ${formDataObject.number}
        Preferred Contact Method: ${formDataObject.method}
        Message: ${formDataObject.message}
        
        Best regards,
        ALLINONE Website
      `,
    html: generateContactUsEmailHtml(formDataObject),
  }).catch((error) => {
    console.error("Error sending email:", error);
  });
  return json({ success: true, msg: "Mail has been sent." });
};

export default function Contact() {
  return (
    <Layout>
      <ContactBanner />
      <ContactForm />
      <Map />
    </Layout>
  );
}
