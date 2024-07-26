import { useState } from "react";
import "./home_banner.css";
import Modal from "../../layouts/Modal";
import { Link } from "@remix-run/react";

export default function HomeBanner() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [seacrhValue, setSeacrhValue] = useState("");
  const [isModalActive, setIsModalActive] = useState(false);
  
  return (
    <section className="home_banner_section">
      <div className="content_wrapper">
        <div className="container">
          <h3 className="subheading" onClick={()=>setIsModalActive(true)}>
            <div className="icon_box">
              <svg
                width="54"
                height="54"
                viewBox="0 0 54 54"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="26.6875" cy="27.3359" r="26.5" fill="#F6F6F6" />
                <path
                  d="M34.2721 23.0045C37.6055 24.929 37.6055 29.7402 34.2721 31.6647L26.6452 36.0681C23.3119 37.9927 19.1452 35.587 19.1452 31.738L19.1452 22.9312C19.1452 19.0822 23.3119 16.6766 26.6452 18.6011L34.2721 23.0045Z"
                  fill="#3C4242"
                />
              </svg>
            </div>
            Learn about ALL IN ONE
          </h3>

          <h2 className="heading">
            The top B2B ecommerce site for international business.
          </h2>

          <div className="input_box">
            <input
              type="text"
              placeholder="Electronics"
              onChange={(e) => setSeacrhValue(e.target.value)}
            />
            <button onClick={() => setIsSearchActive(!isSearchActive)}>
              <div className="icon_box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <path
                    d="M9.58203 2.85156C10.7148 2.85156 11.763 3.14453 12.7266 3.73047C13.6771 4.27734 14.4258 5.03255 14.9727 5.99609C15.5326 6.97266 15.8125 8.03385 15.8125 9.17969C15.8125 9.88281 15.7051 10.5632 15.4902 11.2207C15.2754 11.8783 14.9596 12.4805 14.543 13.0273L17.6484 16.1914L16.6914 17.1484L13.625 14.0234C13.0651 14.5052 12.4368 14.873 11.7402 15.127C11.0436 15.3809 10.3242 15.5078 9.58203 15.5078C8.46224 15.5078 7.41406 15.2214 6.4375 14.6484C5.5 14.0885 4.75781 13.3333 4.21094 12.3828C3.63802 11.3932 3.35156 10.3255 3.35156 9.17969C3.35156 8.03385 3.63802 6.97266 4.21094 5.99609C4.75781 5.03255 5.5 4.27734 6.4375 3.73047C7.41406 3.14453 8.46224 2.85156 9.58203 2.85156ZM9.58203 4.21875C8.69661 4.21875 7.87956 4.4401 7.13086 4.88281C6.38216 5.32552 5.78971 5.92773 5.35352 6.68945C4.91732 7.45117 4.69922 8.2845 4.69922 9.18945C4.69922 10.0944 4.91732 10.9277 5.35352 11.6895C5.78971 12.4512 6.38216 13.0534 7.13086 13.4961C7.87956 13.9388 8.69661 14.1602 9.58203 14.1602C10.4674 14.1602 11.2878 13.9388 12.043 13.4961C12.7982 13.0534 13.3939 12.4512 13.8301 11.6895C14.2663 10.9277 14.4844 10.0944 14.4844 9.18945C14.4844 8.2845 14.2663 7.45117 13.8301 6.68945C13.3939 5.92773 12.7982 5.32552 12.043 4.88281C11.2878 4.4401 10.4674 4.21875 9.58203 4.21875Z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="text">
                {isSearchActive && seacrhValue !== "" ? "Close" : "Search"}
              </span>
            </button>

            <div
              className={`search_result_wrapper ${isSearchActive && seacrhValue !== "" && "active"}`}
            >
              <ul className="search_list">
                <li>
                  <Link to="/">Electronics</Link>
                </li>
                <li>
                  <Link to="/">Electronics</Link>
                </li>
                <li>
                  <Link to="/">Electronics</Link>
                </li>
                <li>
                  <Link to="/">Electronics</Link>
                </li>
                <li>
                  <Link to="/">Electronics</Link>
                </li>
                <li>
                  <Link to="/">Electronics</Link>
                </li>
                <li>
                  <Link to="/">Electronics</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="tag_box">
            <h2 className="title">Frequently searched:</h2>

            <ul className="tags">
              <li>
                <Link to="/">Electronics</Link>
              </li>
              <li>
                <Link to="/">Electronics</Link>
              </li>
              <li>
                <Link to="/">Electronics</Link>
              </li>
              <li>
                <Link to="/">Electronics</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Modal
        isActive={isModalActive}
        close={()=> setIsModalActive(false)}
      >
        <video src="/image/video.mp4" controls></video>
      </Modal>
    </section>
  );
}
