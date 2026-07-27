import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    FaHeart,
    FaShoppingCart,
    FaUser,
    FaSearch,
    FaMapMarkerAlt,
    FaBoxOpen,
    FaSignOutAlt,
    FaUserCircle,
    FaBars,
} from "react-icons/fa";

import { toast } from "react-toastify";

import api from "../services/api";

import logo from "../assets/logo.png";

import "./Navbar.css";

const Navbar = () => {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const [categories, setCategories] = useState([]);

    // Future Ready
    const [cartCount] = useState(0);

    const [wishlistCount] = useState(0);

    // Login Check
    const token = localStorage.getItem("token");

    const user = !!token;

    useEffect(() => {

        fetchCategories();

    }, []);

    const fetchCategories = async () => {

        try {

            const res = await api.get("/categories");

            setCategories(res.data.categories);

        } catch (error) {

            console.log(error);

        }

    };

    const handleSearch = (e) => {

        e.preventDefault();

        if (search.trim()) {

            navigate(`/products?keyword=${search}`);

        }

        else {

            navigate("/products");

        }

    };

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

        window.location.reload();

    };

    return (

        <>

            {/* Offer Bar */}

            <div className="offer-bar">

                🚚 Free Delivery on Orders Above ₹499

            </div>

            <nav className="navbar navbar-expand-lg custom-navbar sticky-top shadow">

                <div className="container">

                    {/* ================= Logo ================= */}

                    <Link
                        to="/"
                        className="navbar-brand d-flex align-items-center"
                    >

                        <img
                            src={logo}
                            alt="Kunal Mart"
                            className="logo-img"
                        />

                        <div className="ms-2">

                            <h5 className="logo-title mb-0">

                                Kunal Mart

                            </h5>

                            <small className="logo-subtitle">

                                Fresh Grocery

                            </small>

                        </div>

                    </Link>

                    {/* Mobile Toggle */}

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                    >

                        <FaBars />

                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarContent"
                    >

                        {/* Delivery */}

                        <div className="delivery-box ms-lg-4">

                            <FaMapMarkerAlt className="delivery-icon me-2" />

                            <div>

                                <small className="text-white-50">

                                    Deliver To

                                </small>

                                <div className="fw-bold text-white">

                                    Pune

                                </div>

                            </div>

                        </div>

                        {/* Category */}

                        <select
                            className="form-select category-select mx-lg-3"
                            onChange={(e) => {

                                if (e.target.value) {

                                    navigate(
                                        `/products?category=${e.target.value}`
                                    );

                                }

                                else {

                                    navigate("/products");

                                }

                            }}
                        >

                            <option value="">

                                All Categories

                            </option>

                            {

                                categories.map((category) => (

                                    <option
                                        key={category._id}
                                        value={category._id}
                                    >

                                        {category.name}

                                    </option>

                                ))

                            }

                        </select>

                        {/* Search */}

                        <form
                            className="search-box flex-grow-1"
                            onSubmit={handleSearch}
                        >

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Products..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                            <button
                                className="btn btn-warning"
                                type="submit"
                            >

                                <FaSearch />

                            </button>

                        </form>

                        {/* ========================= */}
                        {/* Right Side */}
                        {/* ========================= */}

                        {/* ================= Right Side ================= */}

                        <ul className="navbar-nav align-items-center ms-lg-4">

                            {/* Wishlist */}

                            <li className="nav-item mx-2">

                                <Link
                                    to="/wishlist"
                                    className="nav-link icon-link"
                                >

                                    <div className="icon-wrapper">

                                        <FaHeart />

                                        {
                                            wishlistCount > 0 && (

                                                <span className="nav-badge">

                                                    {wishlistCount}

                                                </span>

                                            )
                                        }

                                    </div>

                                    <small>

                                        Wishlist

                                    </small>

                                </Link>

                            </li>

                            {/* Cart */}

                            <li className="nav-item mx-2">

                                <Link
                                    to="/cart"
                                    className="nav-link icon-link"
                                >

                                    <div className="icon-wrapper">

                                        <FaShoppingCart />

                                        {
                                            cartCount > 0 && (

                                                <span className="nav-badge">

                                                    {cartCount}

                                                </span>

                                            )
                                        }

                                    </div>

                                    <small>

                                        Cart

                                    </small>

                                </Link>

                            </li>

                            {/* User */}

                            <li className="nav-item dropdown ms-3">

                                <a
                                    href="/#"
                                    className="nav-link icon-link dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                >

                                    <div className="icon-wrapper">

                                        <FaUserCircle />

                                    </div>

                                    <small>

                                        Account

                                    </small>

                                </a>

                                <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-4">

                                    {

                                        user ? (

                                            <>

                                                <li>

                                                    <Link
                                                        to="/profile"
                                                        className="dropdown-item"
                                                    >

                                                        <FaUser className="me-2" />

                                                        My Profile

                                                    </Link>

                                                </li>

                                                <li>

                                                    <Link
                                                        to="/orders"
                                                        className="dropdown-item"
                                                    >

                                                        <FaBoxOpen className="me-2" />

                                                        My Orders

                                                    </Link>

                                                </li>

                                                <li>

                                                    <hr className="dropdown-divider" />

                                                </li>

                                                <li>

                                                    <button
                                                        className="dropdown-item text-danger"
                                                        onClick={handleLogout}
                                                    >

                                                        <FaSignOutAlt className="me-2" />

                                                        Logout

                                                    </button>

                                                </li>

                                            </>

                                        ) : (

                                            <>

                                                <li>

                                                    <Link
                                                        to="/login"
                                                        className="dropdown-item"
                                                    >

                                                        Login

                                                    </Link>

                                                </li>

                                                <li>

                                                    <Link
                                                        to="/register"
                                                        className="dropdown-item"
                                                    >

                                                        Register

                                                    </Link>

                                                </li>

                                            </>

                                        )

                                    }

                                </ul>

                            </li>

                        </ul>

                    </div>

                </div>

            </nav>

        </>

    );

};

export default Navbar;