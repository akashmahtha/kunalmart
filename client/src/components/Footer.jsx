import { Link } from "react-router-dom";
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaCcVisa,
    FaCcMastercard,
    FaCcPaypal,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="bg-dark text-light pt-5 mt-5">

            <div className="container">

                <div className="row gy-4">

                    {/* Company */}
                    <div className="col-lg-4 col-md-6">

                        <h3 className="fw-bold text-warning mb-3">
                            🛒 Kunal Mart
                        </h3>

                        <p className="text-light">
                            Kunal Mart is your trusted online grocery store
                            offering fresh fruits, vegetables, dairy products,
                            bakery items, beverages and daily essentials with
                            fast doorstep delivery at affordable prices.
                        </p>

                        <div className="d-flex gap-3 mt-4">

                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="text-light fs-4"
                            >
                                <FaFacebook />
                            </a>

                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                className="text-light fs-4"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noreferrer"
                                className="text-light fs-4"
                            >
                                <FaTwitter />
                            </a>

                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="text-light fs-4"
                            >
                                <FaLinkedin />
                            </a>

                        </div>

                    </div>

                    {/* Quick Links */}
                    <div className="col-lg-2 col-md-6">

                        <h5 className="fw-bold mb-3">
                            Quick Links
                        </h5>

                        <ul className="list-unstyled">

                            <li className="mb-2">
                                <Link
                                    to="/"
                                    className="footer-link"
                                >
                                    Home
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link
                                    to="/products"
                                    className="footer-link"
                                >
                                    Products
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link
                                    to="/cart"
                                    className="footer-link"
                                >
                                    Cart
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link
                                    to="/wishlist"
                                    className="footer-link"
                                >
                                    Wishlist
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link
                                    to="/orders"
                                    className="footer-link"
                                >
                                    My Orders
                                </Link>
                            </li>

                        </ul>

                    </div>

                    {/* Categories */}
                    <div className="col-lg-3 col-md-6">

                        <h5 className="fw-bold mb-3">
                            Categories
                        </h5>

                        <ul className="list-unstyled">

                            <li className="mb-2">🥭 Fruits</li>

                            <li className="mb-2">🥦 Vegetables</li>

                            <li className="mb-2">🥛 Dairy</li>

                            <li className="mb-2">🥖 Bakery</li>

                            <li className="mb-2">🥤 Beverages</li>

                        </ul>

                    </div>

                    {/* Contact */}
                    <div className="col-lg-3 col-md-6">

                        <h5 className="fw-bold mb-3">
                            Contact Us
                        </h5>

                        <p>
                            <FaMapMarkerAlt className="me-2 text-warning" />
                            Pune, Maharashtra
                        </p>

                        <p>
                            <FaEnvelope className="me-2 text-warning" />
                            support@kunalmart.com
                        </p>

                        <p>
                            <FaPhoneAlt className="me-2 text-warning" />
                            +91 9876543210
                        </p>

                        <div className="mt-4">

                            <h6 className="fw-bold">
                                Secure Payments
                            </h6>

                            <div className="fs-2 d-flex gap-3 text-warning">

                                <FaCcVisa />

                                <FaCcMastercard />

                                <FaCcPaypal />

                            </div>

                        </div>

                    </div>

                </div>

                <hr className="border-secondary my-4" />

                <div className="row align-items-center">

                    <div className="col-md-6 text-center text-md-start">

                        © {new Date().getFullYear()} <strong>Kunal Mart</strong>.
                        All Rights Reserved.

                    </div>

                    <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">

                        Designed & Developed by
                        <span className="text-warning fw-bold">
                            {" "}Akash Kumar
                        </span>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;