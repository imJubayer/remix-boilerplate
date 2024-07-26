import "./options.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      }
    },
  ]
};

export default function Options() {
  return (
    <section className="options_section">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-7">
            <h2 className="heading">
              Discover millions of options customized for your business needs.
            </h2>
          </div>
          <div className="col-12 col-md-5">
            <ul className="count_list">
              <li>
                <h2 className="title">200M+</h2>
                <h3 className="subtitle">products</h3>
              </li>
              <li>
                <h2 className="title">200M+</h2>
                <h3 className="subtitle">products</h3>
              </li>
              <li>
                <h2 className="title">200M+</h2>
                <h3 className="subtitle">products</h3>
              </li>
              <li>
                <h2 className="title">200M+</h2>
                <h3 className="subtitle">products</h3>
              </li>
            </ul>
          </div>
        </div>

        <Slider className="option_slider" {...sliderSettings}>
          <div className="swiper-slide">
            <div className="slide_content">
              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="slide_content">
              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="slide_content">
              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="slide_content">
              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="slide_content">
              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="slide_content">
              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="slide_content">
              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="slide_content">
              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="slide_content">
              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="slide_content">
              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="slide_content">
              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="slide_content">
              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="slide_content">
              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="slide_content">
              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="slide_content">
              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="slide_content">
              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="slide_content">
              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>

              <div className="option_card">
                <div className="head">
                  <div className="imgbox">
                    <img src="image/option.png" alt="" />
                  </div>
                </div>
                <div className="body">
                  <h2 className="title">Business Services</h2>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
}
