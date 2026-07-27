import { Link } from "react-router-dom";
import {
    FaArrowRight,
    FaTruck,
    FaLeaf,
    FaClock,
} from "react-icons/fa";
import hero from "../assets/images/hero.png";
import "./Hero.css";

const Hero = () => {
    return (
        <section className="hero">

            <div className="container">

                <div className="row align-items-center gy-5">

                    {/* Left */}

                    <div className="col-lg-6">

                        <span className="hero-offer">
                            🎉 Flat 30% OFF on Your First Order
                        </span>

                        <h1 className="hero-title">
                            Fresh Groceries
                            <span> Delivered Fast</span>
                        </h1>

                        <p className="hero-description">
                            Fresh fruits, vegetables, dairy products,
                            snacks and daily essentials delivered
                            straight to your doorstep with lightning-fast delivery.
                        </p>

                        <div className="hero-buttons">

                            <Link
                                to="/products"
                                className="btn btn-success btn-lg px-4"
                            >
                                Shop Now
                                <FaArrowRight className="ms-2" />
                            </Link>

                            <Link
                                to="/products"
                                className="btn btn-outline-success btn-lg px-4"
                            >
                                Browse Products
                            </Link>

                        </div>

                        <div className="hero-features">

                            <div>

                                <FaTruck className="feature-icon" />

                                <div>

                                    <h6>Fast Delivery</h6>

                                    <small>Within 30 Minutes</small>

                                </div>

                            </div>

                            <div>

                                <FaLeaf className="feature-icon" />

                                <div>

                                    <h6>100% Fresh</h6>

                                    <small>Direct From Farm</small>

                                </div>

                            </div>

                            <div>

                                <FaClock className="feature-icon" />

                                <div>

                                    <h6>24/7 Service</h6>

                                    <small>Always Available</small>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Right */}

                    <div className="col-lg-6 text-center position-relative">

                        <div className="hero-circle"></div>

                        <img
                            src={hero}
                            alt="hero"
                            className="hero-image"
                        />

                    </div>

                </div>

            </div>

        </section>
    );
};

export default Hero;