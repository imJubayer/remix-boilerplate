import "./contactform.css";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import { Form, useSubmit } from "@remix-run/react";
import { handleSuccessToast } from "~/utils";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  number: Yup.string().required("Phone number is required"),
  method: Yup.string().required("Contact method is required"),
  message: Yup.string().required("Message is required"),
});

export default function ContactForm() {
  const submit = useSubmit();
  return (
    <section className="contact_form_section">
      <div className="container">
        <h2 className="heading">Get in Touch with Us</h2>
        <p className="paragraph">
          Reach out to us with any question or inquiry you have and we'll do our
          best to get back to you as soon as possible.
        </p>
        <div className="row gy-4">
          <div className="col-12 col-md-7">
            <Formik
              initialValues={{
                name: "",
                email: "",
                number: "",
                method: "",
                message: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                submit(values, { method: "post" });
                handleSuccessToast(
                  "Thank you for getting in touch with us. We have successfully received your message and our team will be reviewing it shortly.",
                );
                setSubmitting(false);
                resetForm();
              }}
            >
              {({ handleSubmit, isSubmitting }) => (
                <Form
                  method="post"
                  className="form_wrapper"
                  onSubmit={handleSubmit}
                >
                  <div className="input_box half_width">
                    <label>Name</label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="input_box half_width">
                    <label>Email Address</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="input_box half_width">
                    <label>Phone Number</label>
                    <Field
                      type="tel"
                      name="number"
                      placeholder="Enter your phone number"
                    />
                    <ErrorMessage
                      name="number"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="input_box half_width">
                    <label>Contact method</label>
                    <Field as="select" name="method">
                      <option value="">Choose method</option>
                      <option value="phone">Phone</option>
                      <option value="email">Email</option>
                    </Field>
                    <ErrorMessage
                      name="method"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="input_box">
                    <label>Message</label>
                    <Field
                      as="textarea"
                      name="message"
                      placeholder="Hi! We are Lookscout..."
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <button
                    className="submit_btn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <div className="col-12 col-md-5">
            <div className="info_wrapper">
              <div className="get_in_touch">
                <h2 className="heading">Get in touch</h2>
                <p className="para">
                  Perferendis est inventore ratione. Et numquam cupiditate ut id
                  delectus aut et. Aliquam ipsa ut beatae provident
                </p>
                <a href="/" className="link">
                  Read more
                  <div className="icon_box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <path
                        d="M4.1665 10.8359H14.9998M10.8332 5.83594L15.2439 10.2467C15.5694 10.5721 15.5694 11.0998 15.2439 11.4252L10.8332 15.8359"
                        stroke="#0B124C"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </a>
              </div>

              <div className="address">
                <h2 className="heading">Address</h2>
                <p className="para">
                   Leicester, LE2 5RN, United Kingdom
                </p>
                <a href="tel:+44 778 6121224" className="link">
                  <div className="icon_box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <path
                        d="M7.48371 8.96393C8.01366 10.0677 8.73609 11.1022 9.65101 12.0171C10.5659 12.932 11.6004 13.6545 12.7042 14.1844C12.7991 14.23 12.8466 14.2528 12.9067 14.2703C13.1202 14.3325 13.3823 14.2878 13.5631 14.1584C13.6139 14.122 13.6575 14.0784 13.7445 13.9914C14.0107 13.7252 14.1438 13.5921 14.2776 13.5051C14.7824 13.1769 15.4331 13.1769 15.9378 13.5051C16.0717 13.5921 16.2048 13.7252 16.471 13.9914L16.6193 14.1398C17.024 14.5444 17.2263 14.7468 17.3362 14.9641C17.5548 15.3962 17.5548 15.9066 17.3362 16.3387C17.2263 16.556 17.024 16.7583 16.6193 17.163L16.4993 17.283C16.096 17.6863 15.8944 17.8879 15.6203 18.0419C15.3161 18.2128 14.8436 18.3357 14.4947 18.3346C14.1803 18.3337 13.9654 18.2727 13.5356 18.1507C11.2259 17.4952 9.04643 16.2582 7.22817 14.44C5.4099 12.6217 4.17298 10.4422 3.51742 8.13252C3.39543 7.70273 3.33444 7.48784 3.3335 7.17341C3.33246 6.82451 3.45533 6.35205 3.62621 6.04786C3.78021 5.77372 3.98184 5.57209 4.38511 5.16882L4.50514 5.04879C4.90979 4.64414 5.11212 4.44181 5.32941 4.33191C5.76157 4.11332 6.27192 4.11332 6.70408 4.33191C6.92138 4.44181 7.1237 4.64414 7.52836 5.04879L7.67673 5.19717C7.94293 5.46337 8.07603 5.59647 8.16305 5.73031C8.49122 6.23505 8.49122 6.88575 8.16305 7.3905C8.07603 7.52434 7.94293 7.65744 7.67674 7.92364C7.5897 8.01068 7.54618 8.0542 7.50975 8.10507C7.3803 8.28585 7.3356 8.54798 7.39783 8.76145C7.41534 8.82152 7.43813 8.86899 7.48371 8.96393Z"
                        stroke="#0B124C"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  Make a phone call
                </a>
              </div>

              <div className="social_media">
                <h2 className="heading">Social media</h2>

                <ul className="links">
                  <li>
                    <a href="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8.615v-6.96h-2.338v-2.725h2.338v-2c0-2.325 1.42-3.592 3.5-3.592.699-.002 1.399.034 2.095.107v2.42h-1.435c-1.128 0-1.348.538-1.348 1.325v1.735h2.697l-.35 2.725h-2.348V21H20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                        <circle cx="16.806" cy="7.207" r="1.078"></circle>
                        <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
