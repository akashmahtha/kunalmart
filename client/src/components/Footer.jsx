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


    // =========================================
    // FETCH CATEGORIES
    // =========================================

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

            console.error(
                "Error fetching categories:",
                error
            );

        }

    };


    return (

        <footer className="modern-footer">


            {/* =========================================
                OWNER / FOUNDER SECTION - TOP
            ========================================= */}

            <section className="footer-owner-section">

                <div className="footer-owner-container">


                    {/* OWNER IMAGE */}

                    <div className="footer-owner-image">

                        <img
                            src={ownerImage}
                            alt="Kunal - Founder of KunalMart"
                        />

                    </div>


                    {/* OWNER CONTENT */}

                    <div className="footer-owner-content">

                        <span className="footer-owner-label">

                            MEET THE FOUNDER

                        </span>


                        <h2>

                            Kunal

                        </h2>


                        <p>

                            Founder of KunalMart. Our mission is to
                            provide fresh groceries, daily essentials
                            and fast delivery with the best customer
                            experience.

                        </p>


                        <div className="footer-owner-socials">

                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                            >

                                <FaFacebookF />

                            </a>


                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                            >

                                <FaInstagram />

                            </a>


                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Twitter"
                            >

                                <FaTwitter />

                            </a>

                        </div>

                    </div>

                </div>

            </section>



            {/* =========================================
                NEWSLETTER
            ========================================= */}

            <div className="footer-container">

                <div className="footer-newsletter">

                    <div className="footer-newsletter-content">

                        <span className="footer-small-title">

                            STAY CONNECTED

                        </span>


                        <h2>

                            Fresh Grocery Delivered Daily

                        </h2>


                        <p>

                            Subscribe to receive exclusive offers,
                            discounts and grocery updates.

                        </p>

                    </div>


                    <div className="newsletter-form">

                        <input
                            type="email"
                            placeholder="Enter your email"
                        />


                        <button type="button">

                            Subscribe

                            <FaArrowRight />

                        </button>

                    </div>

                </div>



                {/* =========================================
                    MAIN FOOTER
                ========================================= */}

                <div className="footer-main-grid">


                    {/* BRAND */}

                    <div className="footer-brand">

                        <h2 className="footer-logo">

                            🛒 <span>Kunal</span>Mart

                        </h2>


                        <p>

                            Fresh fruits, vegetables, dairy products,
                            snacks and daily essentials delivered to
                            your doorstep with the best quality and
                            affordable prices.

                        </p>


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



                    {/* QUICK LINKS */}

                    <div className="footer-column">

                        <h5>

                            Customer Service

                        </h5>


                        <ul>

                            <li>
                                <Link to="/about">
                                    About Us
                                </Link>
                            </li>

                            <li>
                                <Link to="/contact">
                                    Contact Us
                                </Link>
                            </li>

                            <li>
                                <Link to="/faq">
                                    FAQs
                                </Link>
                            </li>

                            <li>
                                <Link to="/shipping">
                                    Shipping Policy
                                </Link>
                            </li>

                            <li>
                                <Link to="/returns">
                                    Return & Refund
                                </Link>
                            </li>

                        </ul>

                    </div>



                    {/* ACCOUNT */}

                    <div className="footer-column">

                        <h5>

                            My Account

                        </h5>


                        <ul>

                            <li>
                                <Link to="/orders">
                                    My Orders
                                </Link>
                            </li>

                            <li>
                                <Link to="/wishlist">
                                    Wishlist
                                </Link>
                            </li>

                            <li>
                                <Link to="/track-order">
                                    Track Order
                                </Link>
                            </li>

                            <li>
                                <Link to="/login">
                                    Login / Signup
                                </Link>
                            </li>

                        </ul>

                    </div>



                    {/* INFORMATION */}

                    <div className="footer-column">

                        <h5>

                            Information

                        </h5>


                        <ul>

                            <li>
                                <Link to="/privacy-policy">
                                    Privacy Policy
                                </Link>
                            </li>

                            <li>
                                <Link to="/terms">
                                    Terms & Conditions
                                </Link>
                            </li>

                            <li>
                                <Link to="/cancellation">
                                    Cancellation Policy
                                </Link>
                            </li>

                        </ul>

                    </div>



                    {/* CONTACT */}

                    <div className="footer-column footer-contact">

                        <h5>

                            Contact Us

                        </h5>


                        <div className="contact-item">

                            <FaPhoneAlt />

                            <span>

                                81008 95700

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

                                Rishra, Serampore,
                                Hooghly, West Bengal - 712101

                            </span>

                        </div>

                    </div>

                </div>



                {/* =========================================
                    CATEGORIES
                ========================================= */}

                <div className="footer-categories">

                    <h5>

                        Popular Categories

                    </h5>


                    <div className="footer-category-list">

                        {

                            categories.length > 0

                                ? categories.map((category) => (

                                    <Link
                                        key={category._id}
                                        to={`/products?category=${category._id}`}
                                    >

                                        {category.name}

                                    </Link>

                                ))

                                : (

                                    <span>

                                        Fresh Groceries

                                    </span>

                                )

                        }

                    </div>

                </div>



                {/* =========================================
                    PAYMENT
                ========================================= */}

                <div className="footer-payment">

                    <div>

                        <span className="payment-title">

                            SECURE PAYMENT METHODS

                        </span>


                        <div className="payment-icons">

                            <span className="payment-box">

                                UPI

                            </span>


                            <FaCcVisa />


                            <FaCcMastercard />


                            <FaCcPaypal />

                        </div>

                    </div>


                    <div className="delivery-badge">

                        🚚 Fast Delivery • Fresh Products

                    </div>

                </div>



                {/* =========================================
                    COPYRIGHT
                ========================================= */}

                <div className="footer-bottom">

                    <p>

                        © {new Date().getFullYear()}{" "}

                        <strong>KunalMart</strong>

                        . All Rights Reserved.

                    </p>

                </div>

            </div>

        </footer>

    );

};


export default Footer;