import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaArrowRight,
    FaCcVisa,
    FaCcMastercard,
    FaCcPaypal,
} from "react-icons/fa";

import api from "../services/api";

import ownerImage from "../assets/owner.png";

import "./Footer.css";

const Footer = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        fetchCategories();

    }, []);

    const fetchCategories = async () => {

        try {

            const res = await api.get("/categories");

            setCategories(
                res.data?.categories || []
            );

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <footer className="modern-footer">

            {/* ================= NEWSLETTER ================= */}

            <div className="container">

                <div className="footer-newsletter">

                    <div>

                        <span className="footer-small-title">

                            STAY CONNECTED

                        </span>

                        <h2>

                            Fresh Grocery Delivered Daily

                        </h2>

                        <p>

                            Subscribe now to receive exclusive offers,
                            discounts and grocery updates.

                        </p>

                    </div>

                    <div className="newsletter-form">

                        <input
                            type="email"
                            placeholder="Enter your email"
                        />

                        <button>

                            Subscribe

                            <FaArrowRight />

                        </button>

                    </div>

                </div>

            </div>

            {/* ================= MAIN FOOTER ================= */}

            <div className="container">

                <div className="row gy-5">

                    {/* ================= BRAND ================= */}

                    <div className="col-lg-4 col-md-6">

                        <div className="footer-brand">

                            <h2 className="footer-logo">

                                🛒 Kunal Mart

                            </h2>

                            <p>

                                Fresh fruits, vegetables, dairy products,
                                snacks and daily essentials delivered to
                                your doorstep with the best quality and
                                affordable prices.

                            </p>

                        </div>

                        <div className="footer-socials">

                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaTwitter />
                            </a>

                        </div>

                    </div>

                    {/* ================= QUICK LINKS ================= */}

                    <div className="col-lg-2 col-md-6">

                        <h5 className="footer-heading">

                            Quick Links

                        </h5>

                        <ul className="footer-links">

                            <li>

                                <Link to="/">

                                    Home

                                </Link>

                            </li>

                            <li>

                                <Link to="/products">

                                    Products

                                </Link>

                            </li>

                            <li>

                                <Link to="/cart">

                                    Cart

                                </Link>

                            </li>

                            <li>

                                <Link to="/wishlist">

                                    Wishlist

                                </Link>

                            </li>

                            <li>

                                <Link to="/orders">

                                    My Orders

                                </Link>

                            </li>

                        </ul>

                    </div>

                    {/* ================= CATEGORIES ================= */}

                    <div className="col-lg-2 col-md-6">

                        <h5 className="footer-heading">

                            Categories

                        </h5>

                        <ul className="footer-links">

                            {

                                categories.length > 0 ? (

                                    categories.map((category) => (

                                        <li
                                            key={category._id}
                                        >

                                            <Link
                                                to={`/products?category=${category._id}`}
                                            >

                                                {category.name}

                                            </Link>

                                        </li>

                                    ))

                                ) : (

                                    <li>

                                        No Categories Found

                                    </li>

                                )

                            }

                        </ul>

                    </div>

                    {/* ================= CONTACT ================= */}

                    <div className="col-lg-4 col-md-6">

                        <h5 className="footer-heading">

                            Contact Us

                        </h5>

                        <div className="contact-item">

                            <FaMapMarkerAlt />

                            <span>

                                35/3 NS Road, Rishra,
                                Hooghly, West Bengal

                            </span>

                        </div>

                        <div className="contact-item">

                            <FaPhoneAlt />

                            <span>

                                +91 81008 95700

                            </span>

                        </div>

                        <div className="contact-item">

                            <FaEnvelope />

                            <span>

                                support@kunalmart.com

                            </span>

                        </div>

                        <div className="contact-item">

                            <FaMapMarkerAlt />

                            <span>

                                Kolkata & Nearby Areas

                            </span>

                        </div>

                    </div>

                </div>

                {/* ================= OWNER ================= */}

                <div className="owner-section">

                    <div className="owner-image-wrapper">

                        <img
                            src={ownerImage}
                            alt="Owner"
                        />

                    </div>

                    <div className="owner-content">

                        <span>

                            FOUNDER

                        </span>

                        <h3>

                            Kunal

                        </h3>

                        <p>

                            Our mission is to provide fresh groceries,
                            daily essentials and the fastest delivery
                            service with the best customer experience.

                        </p>

                    </div>

                </div>

                {/* ================= PAYMENT ================= */}

                <div className="payment-section">

                    <div>

                        <span>

                            SECURE PAYMENT METHODS

                        </span>

                        <div className="payment-icons">

                            <FaCcVisa />

                            <FaCcMastercard />

                            <FaCcPaypal />

                        </div>

                    </div>

                    <div className="delivery-badge">

                        🚚 Fast Delivery • Fresh Products

                    </div>

                </div>

                {/* ================= BOTTOM ================= */}

                <div className="footer-bottom">

                    <p>

                        © {new Date().getFullYear()}{" "}

                        <strong>

                            Kunal Mart

                        </strong>

                        . All Rights Reserved.

                    </p>

                    <p>

                        Designed & Developed by{" "}

                        <strong>

                            Akash Kumar

                        </strong>

                    </p>

                </div>

            </div>

        </footer>

    );

};

export default Footer;