import { Link } from "@remix-run/react";
import "./source.css";

export default function Source() {
  return (
    <section className="source_section">
      <div className="container">
        <h2 className="heading">Source direct-from-factory</h2>
        <div className="row gy-4">
          <div className="col-12 col-lg-4">
            <div className="source_card">
              <div className="imgbox_full">
                <img src="image/source.png" alt="" />
              </div>

              <Link to="/" className="view">
                View LIVE
              </Link>

              <span className="badge">
                <div className="imgbox">
                  <img src="image/music.png" alt="" />
                </div>
                Lorem ipsum dolor sit
              </span>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="source_card">
              <div className="imgbox_full">
                <img src="image/source.png" alt="" />
              </div>

              <Link to="/" className="view">
                View LIVE
              </Link>

              <span className="badge">
                <div className="imgbox">
                  <img src="image/music.png" alt="" />
                </div>
                Lorem ipsum dolor sit
              </span>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="source_card">
              <div className="imgbox_full">
                <img src="image/source.png" alt="" />
              </div>

              <Link to="/" className="view">
                View LIVE
              </Link>

              <span className="badge">
                <div className="imgbox">
                  <img src="image/music.png" alt="" />
                </div>
                Lorem ipsum dolor sit
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
