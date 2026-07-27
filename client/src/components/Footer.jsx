import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    // FaLinkedinIn,
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


    // ============================
    // Fetch Categories
    // ============================

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
                "Footer categories error:",
                error
            );

        }

    };


    return (

        <footer className="modern-footer">


            {/* ============================
                NEWSLETTER SECTION
            ============================ */}

            <div className="container">

                <div className="footer-newsletter">

                    <div>

                        <span className="footer-small-title">

                            STAY CONNECTED

                        </span>


                        <h2>

                            Fresh deals delivered to your inbox

                        </h2>


                        <p>

                            Get exclusive offers, new arrivals and
                            grocery updates directly in your inbox.

                        </p>

                    </div>


                    <div className="newsletter-form">

                        <input
                            type="email"
                            placeholder="Enter your email address"
                        />


                        <button>

                            Subscribe

                            <FaArrowRight />

                        </button>

                    </div>

                </div>

            </div>



            {/* ============================
                MAIN FOOTER
            ============================ */}

            <div className="container">

                <div className="row gy-5">


                    {/* ============================
                        BRAND SECTION
                    ============================ */}

                    <div className="col-lg-4 col-md-6">

                        <div className="footer-brand">

                            <h2>

                                <span>🛒</span> Kunal Mart

                            </h2>


                            <p>

                                Your trusted online grocery store
                                for fresh, quality and affordable
                                daily essentials delivered right
                                to your doorstep.

                            </p>

                        </div>


                        {/* Social Media */}

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



                    {/* ============================
                        QUICK LINKS
                    ============================ */}

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



                    {/* ============================
                        CATEGORIES FROM DATABASE
                    ============================ */}

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



                    {/* ============================
                        CONTACT SECTION
                    ============================ */}

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


                                <strong className="delivery-label">

                                    🚚 Delivery Areas:

                                </strong>


                                <br />


                                Kolkata and surrounding areas


                            </span>


                        </div>


                    </div>


                </div>



                {/* ============================
                    OWNER SECTION
                ============================ */}

                <div className="owner-section">


                    <div className="owner-image-wrapper">


                        <img
                            src={ownerImage}
                            alt="Kunal Mart Owner"
                        />


                    </div>


                    <div className="owner-content">


                        <span>

                            FOUNDER & OWNER

                        </span>


                        <h3>

                            Kunal

                        </h3>


                        <p>

                            Building Kunal Mart with a vision
                            to make everyday grocery shopping
                            simple, reliable and convenient
                            for everyone.

                        </p>


                    </div>


                </div>



                {/* ============================
                    PAYMENT SECTION
                ============================ */}

                <div className="payment-section">


                    <div>


                        <span>

                            SECURE PAYMENTS

                        </span>


                        <div className="payment-icons">


                            <FaCcVisa />


                            <FaCcMastercard />


                            <FaCcPaypal />


                        </div>


                    </div>


                    <div className="delivery-badge">


                        🚚 Fast & Reliable Delivery

                    </div>


                </div>



                {/* ============================
                    BOTTOM FOOTER
                ============================ */}

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