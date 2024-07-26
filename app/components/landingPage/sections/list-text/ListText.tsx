import { Link } from "@remix-run/react";
import "./listtext.css";

export default function ListText() {
  return (
    <section className="list_and_text_section">
      <div className="container">
        <div className="row gy-4">
          <div className="col-12 col-lg-6">
            <div className="text_content">
              <h2 className="heading">New to Sourcing on AllinOne?</h2>
              <p className="pera">
                ship products or a partner to customize your desired product,
                we've got you covered—from ensuring quality to shipping your
                order to its final destination.
              </p>

              <Link to="/" className="btn">
                Learn more
              </Link>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="list_content">
              <ul className="list">
                <li className="item">
                  <div className="imgbox">
                    <img src="/image/list-icon.png" alt="" />
                  </div>
                  <div className="text_box">
                    <h2 className="title">Step 1</h2>
                    <p className="pera">Discover Products and Sellers</p>
                  </div>
                </li>
                <li className="item">
                  <div className="imgbox">
                    <img src="/image/list-icon.png" alt="" />
                  </div>
                  <div className="text_box">
                    <h2 className="title">Step 1</h2>
                    <p className="pera">Discover Products and Sellers</p>
                  </div>
                </li>
                <li className="item">
                  <div className="imgbox">
                    <img src="/image/list-icon.png" alt="" />
                  </div>
                  <div className="text_box">
                    <h2 className="title">Step 1</h2>
                    <p className="pera">Discover Products and Sellers</p>
                  </div>
                </li>
                <li className="item">
                  <div className="imgbox">
                    <img src="/image/list-icon.png" alt="" />
                  </div>
                  <div className="text_box">
                    <h2 className="title">Step 1</h2>
                    <p className="pera">Discover Products and Sellers</p>
                  </div>
                </li>
                <li className="item">
                  <div className="imgbox">
                    <img src="/image/list-icon.png" alt="" />
                  </div>
                  <div className="text_box">
                    <h2 className="title">Step 1</h2>
                    <p className="pera">Discover Products and Sellers</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
