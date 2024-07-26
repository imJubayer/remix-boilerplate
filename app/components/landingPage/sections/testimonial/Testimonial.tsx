import "./testimonial.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Testimonial() {
  return (
    <section className="testimonial_section">
      <div className="container">
        <h2 className="heading">
          Unlock tailored discounts, services, and tools tailored to your
          business stage with AllinOne
        </h2>

        <Slider className="testimonial_slider" {...sliderSettings}>
          <div className="swiper-slide">
            <div className="testimonial_card">
              <div className="profile_box">
                <div className="imgbox">
                  <img src="/image/profile.png" alt="" />
                </div>
                <div className="text_box">
                  <h2 className="title">Eva Jane</h2>
                  <h3 className="subtitle">Founder of ABC</h3>
                </div>
              </div>

              <div className="testimonial_text">
                <p className="pera">
                  As an entrepreneur deeply immersed in the beauty industry,
                  I've dedicated myself to creating original products.
                  allinonebusiness.co.uk has been my trusted partner throughout this
                  journey.
                </p>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="testimonial_card">
              <div className="profile_box">
                <div className="imgbox">
                  <img src="/image/profile.png" alt="" />
                </div>
                <div className="text_box">
                  <h2 className="title">Eva Jane</h2>
                  <h3 className="subtitle">Founder of ABC</h3>
                </div>
              </div>

              <div className="testimonial_text">
                <p className="pera">
                  As an entrepreneur deeply immersed in the beauty industry,
                  I've dedicated myself to creating original products.
                  allinonebusiness.co.uk has been my trusted partner throughout this
                  journey.
                </p>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="testimonial_card">
              <div className="profile_box">
                <div className="imgbox">
                  <img src="/image/profile.png" alt="" />
                </div>
                <div className="text_box">
                  <h2 className="title">Eva Jane</h2>
                  <h3 className="subtitle">Founder of ABC</h3>
                </div>
              </div>

              <div className="testimonial_text">
                <p className="pera">
                  As an entrepreneur deeply immersed in the beauty industry,
                  I've dedicated myself to creating original products.
                  allinonebusiness.co.uk has been my trusted partner throughout this
                  journey.
                </p>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="testimonial_card">
              <div className="profile_box">
                <div className="imgbox">
                  <img src="/image/profile.png" alt="" />
                </div>
                <div className="text_box">
                  <h2 className="title">Eva Jane</h2>
                  <h3 className="subtitle">Founder of ABC</h3>
                </div>
              </div>

              <div className="testimonial_text">
                <p className="pera">
                  As an entrepreneur deeply immersed in the beauty industry,
                  I've dedicated myself to creating original products.
                  allinonebusiness.co.uk has been my trusted partner throughout this
                  journey.
                </p>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
}
