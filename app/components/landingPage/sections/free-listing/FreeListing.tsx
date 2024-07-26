import { Link } from "@remix-run/react";
import "./freelisting.css";

export default function FreeListing() {
  return (
    <section className="free_listing_section">
      <div className="container">
        <div className="listing_box">
          <div className="row gy-4 align-itmes-center">
            <div className="col-12 col-md-7">
              <div className="text_box">
                <p className="pera">
                  Ready to begin? It's quick, easy, and completely free—all it
                  takes is a few minutes.
                </p>

                <Link to="/" className="btn">
                  Verify my free listing
                </Link>
              </div>
            </div>

            <div className="col-12 col-md-5">
              <div className="imgbox">
                <img src="image/ai-art.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
