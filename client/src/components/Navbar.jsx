import { useEffect, useState } from "react";
import {
    Link,
    useNavigate,
    useLocation,
} from "react-router-dom";

import {
    FaSearch,
    FaMapMarkerAlt,
    FaTruck,
    FaUser,
    FaBoxOpen,
    FaShoppingCart,
    FaHeart,
    FaSignOutAlt,
    FaBars,
    FaChevronDown,
} from "react-icons/fa";

import api from "../services/api";
import logo from "../assets/logo.png";

import "./Navbar.css";

const Navbar = () => {

    const navigate = useNavigate();
    const location = useLocation();

    // ==========================================
    // STATE
    // ==========================================

    const [search, setSearch] = useState("");

    const [categories, setCategories] = useState([]);

    const [cartCount, setCartCount] = useState(0);

    const [wishlistCount, setWishlistCount] = useState(0);

    const token = localStorage.getItem("token");

    const user = !!token;

    // ==========================================
    // ACTIVE CATEGORY
    // ==========================================

    const activeCategoryId =
        new URLSearchParams(location.search).get("category");

    // ==========================================
    // LOAD DATA
    // ==========================================

    useEffect(() => {

        fetchCategories();

        if (token) {

            fetchCartCount();

            fetchWishlistCount();

        }

    }, []);

    // ==========================================
    // FETCH CATEGORIES
    // ==========================================

    const fetchCategories = async () => {

        try {

            const res = await api.get("/categories");

            setCategories(
                res.data?.categories ||
                res.data?.data ||
                []
            );

        } catch (err) {

            console.log(err);

            setCategories([]);

        }

    };

    // ==========================================
    // FETCH CART COUNT
    // ==========================================

    const fetchCartCount = async () => {

        try {

            const res = await api.get("/cart");

            const items =
                res.data?.cart?.items || [];

            const total = items.reduce(

                (sum, item) =>

                    sum + (item.quantity || 0),

                0

            );

            setCartCount(total);

        } catch (err) {

            console.log(err);

            setCartCount(0);

        }

    };

    // ==========================================
    // FETCH WISHLIST COUNT
    // ==========================================

    const fetchWishlistCount = async () => {

        try {

            const res = await api.get("/wishlist");

            const items =
                res.data?.wishlist?.items || [];

            setWishlistCount(items.length);

        } catch (err) {

            console.log(err);

            setWishlistCount(0);

        }

    };

    // ==========================================
    // SEARCH
    // ==========================================

    const handleSearch = (e) => {

        e.preventDefault();

        const keyword = search.trim();

        if (keyword) {

            navigate(
                `/products?keyword=${encodeURIComponent(keyword)}`
            );

        } else {

            navigate("/products");

        }

    };

    // ==========================================
    // CATEGORY CLICK
    // ==========================================

    const handleCategoryClick = (categoryId) => {

        navigate(
            `/categories?category=${categoryId}`
        );

    };

    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/");

        window.location.reload();

    };

    return (

        <header className="km-header">

            {/* ==========================================
                TOP BAR
            ========================================== */}

            <div className="km-topbar">

                <div className="km-container km-topbar-inner">

                    <div className="km-top-item">

                        <FaMapMarkerAlt />

                        <span>

                            Delivering to:
                            Rishra, Serampore, Konnagar

                        </span>

                    </div>

                    <div className="km-top-item">

                        <FaTruck />

                        <span>

                            Free Delivery on orders above ₹499

                        </span>

                    </div>

                    <div className="km-top-item">

                        <span>☎</span>

                        <span>

                            Customer Support:
                            81008 95700

                        </span>

                    </div>

                </div>

            </div>

            {/* ==========================================
                MAIN HEADER
            ========================================== */}

            <div className="km-main-header">

                <div className="km-container km-main-inner">

                    {/* Logo */}

                    <Link
                        to="/"
                        className="km-logo"
                    >

                        <img
                            src={logo}
                            alt="Kunal Mart"
                            className="km-logo-img"
                        />

                        <div className="km-logo-text">

                            <h2>

                                Kunal
                                <span>Mart</span>

                            </h2>

                            <small>

                                Your Daily Grocery Partner

                            </small>

                        </div>

                    </Link>

                    {/* Search */}

                    <form
                        className="km-search"
                        onSubmit={handleSearch}
                    >

                        <input
                            type="text"
                            placeholder="Search for fruits, vegetables, groceries..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                        <button type="submit">

                            <FaSearch />

                        </button>

                    </form>
                    {/* ==========================================
                        RIGHT ACTIONS
                    ========================================== */}

                    <div className="km-main-actions">

                        {/* ===============================
                            ACCOUNT
                        =============================== */}

                        <div className="dropdown">

                            <button
                                className="km-action-button"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >

                                <FaUser />

                                <span>

                                    {user ? "My Account" : "Login / Signup"}

                                </span>

                            </button>

                            <ul className="dropdown-menu dropdown-menu-end km-dropdown">

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
                                                    type="button"
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

                        </div>

                        {/* ===============================
                            ORDERS
                        =============================== */}

                        <Link
                            to="/orders"
                            className="km-action-button"
                        >

                            <FaBoxOpen />

                            <span>

                                My Orders

                            </span>

                        </Link>

                        {/* ===============================
                            WISHLIST
                        =============================== */}

                        <Link
                            to="/wishlist"
                            className="km-action-button km-wishlist"
                        >

                            <span className="km-icon-wrap">

                                <FaHeart />

                                {

                                    wishlistCount > 0 && (

                                        <span className="km-badge">

                                            {wishlistCount}

                                        </span>

                                    )

                                }

                            </span>

                            <span>

                                Wishlist

                            </span>

                        </Link>

                        {/* ===============================
                            CART
                        =============================== */}

                        <Link
                            to="/cart"
                            className="km-action-button km-cart"
                        >

                            <span className="km-icon-wrap">

                                <FaShoppingCart />

                                {

                                    cartCount > 0 && (

                                        <span className="km-badge">

                                            {cartCount}

                                        </span>

                                    )

                                }

                            </span>

                            <span>

                                Cart

                            </span>

                        </Link>

                    </div>

                </div>

            </div>
            {/* ==========================================
                CATEGORY NAVIGATION
            ========================================== */}

            <nav className="km-category-nav">

                <div className="km-container km-category-inner">

                    {/* ===========================
                        ALL CATEGORIES
                    =========================== */}

                    <div className="km-all-categories dropdown">

                        <button
                            type="button"
                            className="km-all-category-btn"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >

                            <FaBars />

                            <span>

                                All Categories

                            </span>

                            <FaChevronDown />

                        </button>

                        <ul className="dropdown-menu km-category-dropdown">

                            <li>

                                <Link
                                    to="/products"
                                    className="dropdown-item fw-bold"
                                >

                                    All Products

                                </Link>

                            </li>

                            <li>

                                <hr className="dropdown-divider" />

                            </li>

                            {

                                categories.length > 0 ? (

                                    categories.map((category) => (

                                        <li key={category._id}>

                                            <button
                                                type="button"
                                                className="dropdown-item"
                                                onClick={() =>
                                                    handleCategoryClick(category._id)
                                                }
                                            >

                                                {category.name}

                                            </button>

                                        </li>

                                    ))

                                ) : (

                                    <li>

                                        <span className="dropdown-item text-muted">

                                            No Categories Found

                                        </span>

                                    </li>

                                )

                            }

                        </ul>

                    </div>

                    {/* ===========================
                        NAV LINKS
                    =========================== */}

                    <div className="km-nav-links">

                        {/* Home */}

                        <Link
                            to="/"
                            className={`km-nav-link ${location.pathname === "/"
                                ? "active"
                                : ""
                                }`}
                        >

                            Home

                        </Link>

                        {/* First 5 Categories */}

                        {

                            categories
                                .slice(0, 5)
                                .map((category) => (

                                    <button
                                        key={category._id}
                                        type="button"
                                        className={`km-nav-link ${activeCategoryId === category._id
                                            ? "active"
                                            : ""
                                            }`}
                                        onClick={() =>
                                            handleCategoryClick(category._id)
                                        }
                                    >

                                        {category.name}

                                    </button>

                                ))

                        }

                        {/* More */}

                        {/* <Link
                            to="/products"
                            className={`km-nav-link ${location.pathname === "/products" &&
                                    !activeCategoryId
                                    ? "active"
                                    : ""
                                }`}
                        >

                            More

                        </Link> */}

                    </div>

                </div>

            </nav>

            {/* ==========================================
                MOBILE NAVIGATION
            ========================================== */}

            <div className="km-mobile-nav">

                <Link
                    to="/"
                    className={
                        location.pathname === "/"
                            ? "active"
                            : ""
                    }
                >

                    Home

                </Link>

                <Link
                    to="/products"
                    className={
                        location.pathname === "/products"
                            ? "active"
                            : ""
                    }
                >

                    Products

                </Link>

                <Link
                    to="/wishlist"
                    className={
                        location.pathname === "/wishlist"
                            ? "active"
                            : ""
                    }
                >

                    Wishlist

                </Link>

                <Link
                    to="/cart"
                    className={
                        location.pathname === "/cart"
                            ? "active"
                            : ""
                    }
                >

                    Cart

                </Link>

            </div>

        </header>

    );

};

export default Navbar;