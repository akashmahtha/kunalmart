import { Link } from "react-router-dom";
import {
    FaArrowRight,
    FaTruck,
    FaLeaf,
    FaClock,
} from "react-icons/fa";

import "./Hero.css";

const Hero = () => {

    const heroImage =
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80";

    return (

        <section className="hero-section">

            <div className="container">

                <div className="hero-banner">

                    {/* Left Content */}

                    <div className="hero-content">

                        <span className="hero-badge">
                            🎉 Flat 30% OFF on Your First Order
                        </span>

                        <h1>
                            Fresh Groceries
                            <br />
                            <span>Delivered Fast</span>
                        </h1>

                        <p>
                            Fresh fruits, vegetables, dairy products,
                            snacks and daily essentials delivered
                            straight to your doorstep in minutes.
                        </p>

                        <div className="hero-buttons">

                            <Link
                                to="/products"
                                className="shop-now-btn"
                            >
                                Shop Now
                                <FaArrowRight />
                            </Link>

                            <Link
                                to="/products"
                                className="browse-btn"
                            >
                                Browse Products
                            </Link>

                        </div>

                        <div className="hero-features">

                            <div className="hero-feature">
                                <FaTruck />
                                <div>
                                    <strong>Fast Delivery</strong>
                                    <small>Within 30 Minutes</small>
                                </div>
                            </div>

                            <div className="hero-feature">
                                <FaLeaf />
                                <div>
                                    <strong>100% Fresh</strong>
                                    <small>Farm Fresh Products</small>
                                </div>
                            </div>

                            <div className="hero-feature">
                                <FaClock />
                                <div>
                                    <strong>Open Everyday</strong>
                                    <small>7 AM - 11 PM</small>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Right Image */}

                    <div className="hero-image-wrapper">

                        <div className="hero-circle"></div>

                        <img
                            src={heroImage}
                            alt="Fresh Groceries"
                            className="hero-image"
                            loading="lazy"
                        />

                    </div>

                </div>

            </div>

        </section>

    );

};

export default Hero;