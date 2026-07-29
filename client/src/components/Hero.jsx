import { useState } from "react";
import { Link } from "react-router-dom";

import {
    FaShoppingBag,
    FaDownload,
    FaTruck,
    FaTag,
    FaShieldAlt,
    FaUndo,
} from "react-icons/fa";

import heroImage from "../assets/hero-grocery.png";

import "./Hero.css";

const Hero = () => {

    const [showComingSoon, setShowComingSoon] = useState(false);

    const handleDownloadApp = () => {
        setShowComingSoon(true);

        setTimeout(() => {
            setShowComingSoon(false);
        }, 4000);
    };

    return (

        <section className="km-hero">

            <div className="km-hero-container">

                {/* ================= LEFT ================= */}

                <div className="km-hero-content">

                    <h1>
                        Fresh Groceries
                        <br />
                        <span>Delivered in Minutes</span>
                    </h1>

                    <p>
                        Fruits, Vegetables, Dairy, Snacks & Daily
                        <br />
                        Essentials at the Best Prices.
                    </p>


                    {/* BUTTONS */}

                    <div className="km-hero-buttons">

                        <Link
                            to="/products"
                            className="km-shop-btn"
                        >
                            <FaShoppingBag />
                            Shop Now
                        </Link>


                        <button
                            type="button"
                            className="km-download-btn"
                            onClick={handleDownloadApp}
                        >
                            <FaDownload />
                            Download App
                        </button>

                    </div>


                    {/* COMING SOON */}

                    {showComingSoon && (

                        <div className="km-coming-soon">

                            <div className="km-coming-icon">
                                ✓
                            </div>

                            <div>

                                <strong>
                                    App Coming Soon!
                                </strong>

                                <p>
                                    Our app is on the way. Stay tuned!
                                </p>

                            </div>

                        </div>

                    )}


                    {/* FEATURES */}

                    <div className="km-hero-features">

                        <div className="km-feature">

                            <FaTruck />

                            <div>
                                <strong>
                                    Fast Delivery
                                </strong>

                                <small>
                                    Quick doorstep delivery
                                </small>
                            </div>

                        </div>


                        <div className="km-feature">

                            <FaTag />

                            <div>
                                <strong>
                                    Best Prices
                                </strong>

                                <small>
                                    Unbeatable prices
                                </small>
                            </div>

                        </div>


                        <div className="km-feature">

                            <FaShieldAlt />

                            <div>
                                <strong>
                                    Fresh & Quality
                                </strong>

                                <small>
                                    100% quality guarantee
                                </small>
                            </div>

                        </div>


                        <div className="km-feature">

                            <FaUndo />

                            <div>
                                <strong>
                                    Easy Returns
                                </strong>

                                <small>
                                    Hassle-free returns
                                </small>
                            </div>

                        </div>

                    </div>

                </div>


                {/* ================= RIGHT IMAGE ================= */}

                <div className="km-hero-image">

                    <img
                        src={heroImage}
                        alt="KunalMart Fresh Groceries"
                    />

                </div>

            </div>


            {/* SLIDER DOTS */}



        </section>

    );
};

export default Hero;