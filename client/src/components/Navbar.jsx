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


    // =====================================================
    // STATES
    // =====================================================

    const [search, setSearch] = useState("");

    const [categories, setCategories] = useState([]);

    const [cartCount, setCartCount] = useState(0);

    const [wishlistCount] = useState(0);


    // =====================================================
    // LOGIN CHECK
    // =====================================================

    const token = localStorage.getItem("token");

    const user = !!token;


    // =====================================================
    // FETCH DATA
    // =====================================================

    useEffect(() => {

        fetchCategories();

        fetchCartCount();

    }, []);


    // =====================================================
    // FETCH CATEGORIES
    // =====================================================

    const fetchCategories = async () => {

        try {

            const res = await api.get("/categories");

            setCategories(
                res.data?.categories || []
            );

        } catch (error) {

            console.log(
                "Category Error:",
                error
            );

            setCategories([]);

        }

    };


    // =====================================================
    // FETCH CART COUNT
    // =====================================================

    const fetchCartCount = async () => {

        try {

            const res = await api.get("/cart");

            const items =
                res.data?.cart?.items || [];


            const totalQuantity = items.reduce(

                (total, item) =>

                    total + (item.quantity || 0),

                0

            );


            setCartCount(totalQuantity);

        } catch (error) {

            console.log(
                "Cart Count Error:",
                error
            );

            setCartCount(0);

        }

    };


    // =====================================================
    // SEARCH
    // =====================================================

    const handleSearch = (e) => {

        e.preventDefault();

        const keyword = search.trim();


        if (keyword) {

            navigate(
                `/products?keyword=${encodeURIComponent(
                    keyword
                )}`
            );

        } else {

            navigate("/products");

        }

    };


    // =====================================================
    // CATEGORY CLICK
    // =====================================================

    const handleCategoryClick = (categoryId) => {

        if (categoryId) {

            navigate(
                `/products?category=${categoryId}`
            );

        } else {

            navigate("/products");

        }

    };


    // =====================================================
    // ACTIVE CATEGORY
    // =====================================================

    const params = new URLSearchParams(
        location.search
    );

    const activeCategoryId =
        params.get("category");


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/");

        window.location.reload();

    };


    return (

        <header className="km-header">


            {/* =====================================================
                TOP GREEN BAR
            ===================================================== */}

            <div className="km-topbar">

                <div className="km-container km-topbar-inner">


                    <div className="km-top-item">

                        <FaMapMarkerAlt />

                        <span>

                            Delivering to:
                            Rishra, Serampore, Konnagar

                        </span>

                    </div>


                    <div className="km-top-item km-launch-offer">

                        <span>

                            🎉

                        </span>

                        <span>

                            Launch Offer:
                            Potatoes @ $1/kg*

                        </span>

                    </div>


                    <div className="km-top-item">

                        <FaTruck />

                        <span>

                            Free Delivery on orders above $499

                        </span>

                    </div>


                    <div className="km-top-item">

                        <span>

                            ☎

                        </span>

                        <span>

                            Customer Support: 81008 95700

                        </span>

                    </div>


                </div>

            </div>


            {/* =====================================================
                MAIN HEADER
            ===================================================== */}

            <div className="km-main-header">

                <div className="km-container km-main-inner">


                    {/* =================================================
                        LOGO
                    ================================================= */}

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

                                Kunal<span>Mart</span>

                            </h2>


                            <small>

                                Your Daily Grocery Partner

                            </small>

                        </div>

                    </Link>


                    {/* =================================================
                        SEARCH
                    ================================================= */}

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


                    {/* =================================================
                        RIGHT MENU
                    ================================================= */}

                    <div className="km-main-actions">


                        {/* =================================================
                            ACCOUNT
                        ================================================= */}

                        <div className="km-account dropdown">

                            <button
                                type="button"
                                className="km-action-button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >

                                <FaUser />

                                <span>

                                    {
                                        user
                                            ? "Account"
                                            : "Login / Signup"
                                    }

                                </span>

                            </button>


                            <ul className="dropdown-menu dropdown-menu-end km-dropdown">


                                {

                                    user ? (

                                        <>


                                            {/* PROFILE */}

                                            <li>

                                                <Link
                                                    to="/profile"
                                                    className="dropdown-item"
                                                >

                                                    <FaUser className="me-2" />

                                                    My Profile

                                                </Link>

                                            </li>


                                            {/* ORDERS */}

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


                                            {/* LOGOUT */}

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


                                            {/* LOGIN */}

                                            <li>

                                                <Link
                                                    to="/login"
                                                    className="dropdown-item"
                                                >

                                                    Login

                                                </Link>

                                            </li>


                                            {/* REGISTER */}

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


                        {/* =================================================
                            ORDERS
                        ================================================= */}

                        <Link
                            to="/orders"
                            className="km-action-button"
                        >

                            <FaBoxOpen />

                            <span>

                                My Orders

                            </span>

                        </Link>


                        {/* =================================================
                            WISHLIST
                        ================================================= */}

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


                        {/* =================================================
                            CART
                        ================================================= */}

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


            {/* =====================================================
                CATEGORY NAVIGATION
            ===================================================== */}

            <nav className="km-category-nav">

                <div className="km-container km-category-inner">


                    {/* =================================================
                        ALL CATEGORIES
                    ================================================= */}

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


                            {/* ALL PRODUCTS */}

                            <li>

                                <Link
                                    to="/products"
                                    className="dropdown-item"
                                >

                                    All Products

                                </Link>

                            </li>


                            {/* DATABASE CATEGORIES */}

                            {

                                categories.map(

                                    (category) => (

                                        <li
                                            key={category._id}
                                        >

                                            <button
                                                type="button"
                                                className="dropdown-item"
                                                onClick={() =>
                                                    handleCategoryClick(
                                                        category._id
                                                    )
                                                }
                                            >

                                                {category.name}

                                            </button>

                                        </li>

                                    )

                                )

                            }


                        </ul>

                    </div>


                    {/* =================================================
                        NAV LINKS
                    ================================================= */}

                    <div className="km-nav-links">


                        {/* HOME */}

                        <Link
                            to="/"
                            className={`km-nav-link ${location.pathname === "/"
                                ? "active"
                                : ""
                                }`}
                        >

                            Home

                        </Link>


                        {/* CATEGORIES */}

                        {

                            categories
                                .slice(0, 6)
                                .map(

                                    (category) => (

                                        <button
                                            key={category._id}
                                            type="button"
                                            className={`km-nav-link ${activeCategoryId ===
                                                category._id
                                                ? "active"
                                                : ""
                                                }`}
                                            onClick={() =>
                                                handleCategoryClick(
                                                    category._id
                                                )
                                            }
                                        >

                                            {category.name}

                                        </button>

                                    )

                                )

                        }


                        {/* OFFERS */}

                        <Link
                            to="/products"
                            className={`km-nav-link ${location.pathname ===
                                "/products" &&
                                !activeCategoryId
                                ? "active"
                                : ""
                                }`}
                        >

                            Offers

                        </Link>


                        {/* MORE */}

                        <Link
                            to="/products"
                            className="km-nav-link"
                        >

                            More

                        </Link>


                    </div>

                </div>

            </nav>


            {/* =====================================================
                MOBILE NAV
            ===================================================== */}

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
                        location.pathname === "/products" &&
                            !activeCategoryId
                            ? "active"
                            : ""
                    }
                >

                    Products

                </Link>


                <Link
                    to="/wishlist"
                >

                    Wishlist

                </Link>


                <Link
                    to="/cart"
                >

                    Cart

                </Link>


            </div>


        </header>

    );

};


export default Navbar;