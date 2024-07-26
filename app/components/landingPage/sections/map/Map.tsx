import React, { useEffect, useState } from "react";
import "./map.css";
import { Link } from "@remix-run/react";

export default function Map() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="get_in_touch_section">
      <div className="container">
        <div className="row gy-4">
          <div className="col-12 col-md-12">
            <div className="map_wrapper">
              <div style={{ width: "100%" }}>
                {isClient && (
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=london+(My%20Business%20Name)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  >
                    <Link to="https://www.gps.ie/">gps devices</Link>
                  </iframe>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
