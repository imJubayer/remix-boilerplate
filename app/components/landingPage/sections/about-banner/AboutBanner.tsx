import { Link } from "@remix-run/react";
import "./aboutbanner.css";

export default function AboutBanner() {
  return (
    <section className="about_banner_section">
      <div className="text_content_wrapper">
        <div className="container">
          <div className="text_content">
            <span className="badge">Lorem ipsum dolor sit</span>
            <h2 className="heading">What is AllinOne?</h2>
            <p className="pera">
              AllinOne is a premier global wholesale marketplace, leveraging 20
              years of experience to facilitate business-to-business (B2B)
              transactions worldwide.
            </p>

            <div className="button_box">
              <Link to="/" className="btn">
                Get Started
              </Link>
              <Link to="/" className="btn btn_tow">
                Contact Us
                <div className="icon_box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M4.16602 10H14.9993M10.8327 5L15.2434 9.41074C15.5689 9.73618 15.5689 10.2638 15.2434 10.5893L10.8327 15"
                      stroke="#323539"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
