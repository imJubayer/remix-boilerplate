import FilterAccordion from "../filter-accordion/FilterAccordion";
import HeadingBox from "../heading-box/HeadingBox";
import PriceRange from "../price-range/PriceRange";
import ProductCard from "../product-card/ProductCard";
import "./productlist.css";

export default function ProductList() {
  return (
    <section className="product_list_section">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-3">
            <div className="filter_content">
              <div className="filter_title_box">
                <h2 className="title">Filter</h2>

                <div className="icon_box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <mask
                      id="mask0_199_23817"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="25"
                    >
                      <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_199_23817)">
                      <path
                        d="M10 18.5V16.5H14V18.5H10ZM6 13.5V11.5H18V13.5H6ZM3 8.5V6.5H21V8.5H3Z"
                        fill="#3C4242"
                      />
                    </g>
                  </svg>
                </div>
              </div>

              <div className="filter_wrapper">
                <FilterAccordion title={"Category"}>
                  <ul className="category_list">
                    <li>
                      <span className="text">Tops</span>

                      <div className="icon_box">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="7"
                          height="14"
                          viewBox="0 0 7 14"
                          fill="none"
                        >
                          <path
                            d="M1 12.3705L5.73782 7.63263C6.08739 7.28306 6.08739 6.7163 5.73782 6.36673L1 1.62891"
                            stroke="#7F7F7F"
                            stroke-width="1.8"
                            stroke-linecap="round"
                          />
                        </svg>
                      </div>
                    </li>

                    <li>
                      <span className="text">Tops</span>

                      <div className="icon_box">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="7"
                          height="14"
                          viewBox="0 0 7 14"
                          fill="none"
                        >
                          <path
                            d="M1 12.3705L5.73782 7.63263C6.08739 7.28306 6.08739 6.7163 5.73782 6.36673L1 1.62891"
                            stroke="#7F7F7F"
                            stroke-width="1.8"
                            stroke-linecap="round"
                          />
                        </svg>
                      </div>
                    </li>

                    <li>
                      <span className="text">Tops</span>

                      <div className="icon_box">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="7"
                          height="14"
                          viewBox="0 0 7 14"
                          fill="none"
                        >
                          <path
                            d="M1 12.3705L5.73782 7.63263C6.08739 7.28306 6.08739 6.7163 5.73782 6.36673L1 1.62891"
                            stroke="#7F7F7F"
                            stroke-width="1.8"
                            stroke-linecap="round"
                          />
                        </svg>
                      </div>
                    </li>

                    <li>
                      <span className="text">Tops</span>

                      <div className="icon_box">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="7"
                          height="14"
                          viewBox="0 0 7 14"
                          fill="none"
                        >
                          <path
                            d="M1 12.3705L5.73782 7.63263C6.08739 7.28306 6.08739 6.7163 5.73782 6.36673L1 1.62891"
                            stroke="#7F7F7F"
                            stroke-width="1.8"
                            stroke-linecap="round"
                          />
                        </svg>
                      </div>
                    </li>

                    <li>
                      <span className="text">Tops</span>

                      <div className="icon_box">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="7"
                          height="14"
                          viewBox="0 0 7 14"
                          fill="none"
                        >
                          <path
                            d="M1 12.3705L5.73782 7.63263C6.08739 7.28306 6.08739 6.7163 5.73782 6.36673L1 1.62891"
                            stroke="#7F7F7F"
                            stroke-width="1.8"
                            stroke-linecap="round"
                          />
                        </svg>
                      </div>
                    </li>
                  </ul>
                </FilterAccordion>

                <FilterAccordion title={"Price"}>
                  <PriceRange/>
                </FilterAccordion>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-9">
            <div className="product_list_content">
              <HeadingBox title={"Product List"}/>

              <div className="products">
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
