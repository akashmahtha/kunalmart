import { Link } from "react-router-dom";

import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";

import ownerImage from "../assets/owner.png";

import "./Footer.css";

const Footer = () => {

    return (

        <footer className="modern-footer">

            <div className="footer-container">

                {/* ===============================
                    MAIN FOOTER
                =============================== */}

                <div className="footer-main-grid">


                    {/* BRAND */}

                    <div className="footer-brand">

                        <h2 className="footer-logo">

                            🛒 <span>Kunal</span>Mart

                        </h2>

                        <p>

                            KunalMart delivers fresh groceries,
                            fruits, vegetables, dairy products,
                            beverages and daily essentials directly
                            to your doorstep with trusted quality,
                            affordable pricing and fast delivery.

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


                    {/* CUSTOMER SERVICE */}

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

                            <li>

                                <Link to="/careers">

                                    Careers

                                </Link>

                            </li>

                            <li>

                                <Link to="/blogs">

                                    Blogs

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

                                Rishra, Serampore,
                                Hooghly,
                                West Bengal - 712101

                            </span>

                        </div>

                    </div>

                </div>


                {/* ===============================
                    FOUNDER SECTION
                    (Inside Footer)
                =============================== */}

                <div className="footer-founder">

                    <div className="footer-founder-image">

                        <img
                            src={ownerImage}
                            alt="Founder"
                        />

                    </div>

                    <div className="footer-founder-content">

                        <span className="footer-founder-tag">

                            MEET THE FOUNDER

                        </span>

                        <h3>

                            Kunal

                        </h3>

                        <p>

                            Founder of KunalMart. Our vision is to
                            simplify grocery shopping by delivering
                            fresh products, daily essentials and a
                            seamless shopping experience with quality,
                            affordability and customer satisfaction.

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

                </div>
                {/* ===============================
                    COPYRIGHT
                =============================== */}

                <div className="footer-bottom">

                    <div className="footer-bottom-left">

                        <p>

                            © {new Date().getFullYear()}{" "}

                            <strong>KunalMart</strong>. All Rights Reserved.

                        </p>

                    </div>

                    <div className="footer-bottom-right">

                        <Link to="/privacy-policy">

                            Privacy Policy

                        </Link>

                        <span>|</span>

                        <Link to="/terms">

                            Terms & Conditions

                        </Link>

                        <span>|</span>

                        <Link to="/contact">

                            Contact Us

                        </Link>

                    </div>

                </div>

            </div>

        </footer>

    );

};

export default Footer;