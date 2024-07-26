import { Link } from "@remix-run/react";
import "./security.css";

export default function SecuritySection() {
  return (
    <section className="security_section">
      <div className="container">
        <h2 className="heading">
          Lorem ipsum dolor sit amet consectetur. Cras vitae felis cursus non
          tristique. Massa diam augue.
        </h2>
        <div className="row gy-4">
          <div className="col-12 col-lg-6">
            <div className="security_card">
              <h3 className="subtitle">
                Verified Suppliers for Quality Assurance
              </h3>

              <div className="imgbox">
                <img src="image/brand-logo.png" alt="" />
              </div>

              <p className="pera">
                Connect with a variety of suppliers who have
                third-party-verified credentials and capabilities. Look for the
                "Verified" logo to source from experienced suppliers your
                business can rely on.
              </p>

              <div className="button_box">
                <Link to="/" className="more">
                  Learn more
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="security_card">
              <h3 className="subtitle">
                Verified Suppliers for Quality Assurance
              </h3>

              <div className="imgbox">
                <img src="image/brand-logo.png" alt="" />
              </div>

              <p className="pera">
                Connect with a variety of suppliers who have
                third-party-verified credentials and capabilities. Look for the
                "Verified" logo to source from experienced suppliers your
                business can rely on.
              </p>

              <div className="button_box">
                <Link to="/" className="more">
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
