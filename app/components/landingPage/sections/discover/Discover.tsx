import { Link } from '@remix-run/react'
import './discover.css'

export default function Discover() {
  return (
    <section className="discover_section">
                <div className="container">
                    <h2 className="heading">Discover your next business opportunity</h2>
                    <div className="row gy-4">
                        <div className="col-12 col-md-4">
                            <div className="discover_card">
                                <div className="head">
                                    <div className="left_box">
                                        <h2 className="title">Most Popular</h2>
                                        <h3 className="subtitle">Start with trends</h3>
                                    </div>

                                    <div className="right_box">
                                        <Link to="/" className="view_more">View more</Link>
                                    </div>
                                </div>

                                <div className="body_one">
                                    <div className="left_box">
                                        <div className="imgbox_full">
                                            <img src="image/discover-01.png" alt="" />
                                        </div>
                                        <div className="imgbox_full">
                                            <img src="image/discover-01.png" alt="" />
                                        </div>
                                        <div className="imgbox_full">
                                            <img src="image/discover-01.png" alt="" />
                                        </div>
                                    </div>

                                    <div className="right_box">
                                        <div className="imgbox_full">
                                            <img src="image/discover-02.png" alt="" />
                                        </div>
                                        {/* <!-- <span className="badge">Popularity score: 4.9</span> --> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="discover_card">
                                <div className="head">
                                    <div className="left_box">
                                        <h2 className="title">Most Popular</h2>
                                        <h3 className="subtitle">Start with trends</h3>
                                    </div>

                                    <div className="right_box">
                                        <Link to="/" className="view_more">View more</Link>
                                    </div>
                                </div>

                                <div className="body_tow">
                                    <div className="left_box">
                                        <div className="imgbox_full">
                                            <img src="image/discover-03.png" alt="" />
                                        </div>
                                        <div className="imgbox_full">
                                            <img src="image/discover-03.png" alt="" />
                                        </div>
                                        <div className="imgbox_full">
                                            <img src="image/discover-03.png" alt="" />
                                        </div>
                                        <div className="imgbox_full">
                                            <img src="image/discover-03.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="discover_card">
                                <div className="head">
                                    <div className="left_box">
                                        <h2 className="title">Most Popular</h2>
                                        <h3 className="subtitle">Start with trends</h3>
                                    </div>

                                    <div className="right_box">
                                        <Link to="/" className="view_more">View more</Link>
                                    </div>
                                </div>

                                <div className="body_three">
                                    <div className="right_box">
                                        <div className="imgbox">
                                            <img src="image/discover-02.png" alt="" />
                                        </div>

                                        <span className="badge">10% OFF</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
  )
}
