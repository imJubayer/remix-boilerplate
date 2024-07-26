import React from "react";
import "./imagetext.css";
import { Link } from "@remix-run/react";

const listItems = [
  "Experience Enterprise-Grade Security",
  "Experience Enterprise-Grade Security",
  "Experience Enterprise-Grade Security",
  "Experience Enterprise-Grade Security",
];

export default function ImageText() {
  return (
    <section className="text_and_image_section">
      <div className="container">
        <div className="row align-items-center gy-4">
          <div className="col-12 col-lg-6">
            <div className="text_content">
              <h2 className="heading">Think Outside the Box with AllinOne</h2>
              <p className="pera">
                Keep informed with the newest features, enhancements, and fixes.
                Gain valuable insights and make informed decisions based on
                data. Customize the SaaS product to align perfectly with your
                business processes.
              </p>
              <ul className="list">
                {listItems.map((item, index) => (
                  <li className="item" key={index}>
                    <div className="imgbox">
                      <img src="/image/list-icon.png" alt="List icon" />
                    </div>
                    <div className="text_box">
                      <h2 className="title">{item}</h2>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/" className="btn btn_tow">
                Start now
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
          <div className="col-12 col-lg-6">
            <div className="imgbox">
              <img
                src="/image/image.png"
                alt="Descriptive alt text for image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
