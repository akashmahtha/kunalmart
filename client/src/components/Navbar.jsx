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

import api from "../services/api";

import logo from "../assets/logo.png";

import "./Navbar.css";


const Navbar = () => {

    const navigate = useNavigate();


    // ================= STATES =================

    const [search, setSearch] = useState("");

    const [categories, setCategories] = useState([]);

    const [cartCount, setCartCount] = useState(0);

    const [wishlistCount] = useState(0);


    // ================= LOGIN CHECK =================

    const token = localStorage.getItem("token");

    const user = !!token;


    // ================= FETCH DATA =================

    useEffect(() => {

        fetchCategories();

        fetchCartCount();

    }, []);


    // ================= FETCH CATEGORIES =================

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


    // ================= FETCH CART COUNT =================

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


    // ================= SEARCH =================

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


    // ================= CATEGORY =================

    const handleCategoryChange = (e) => {

        const categoryId = e.target.value;


        if (categoryId) {

            navigate(

                `/products?category=${categoryId}`

            );

        } else {

            navigate("/products");

        }

    };


    // ================= LOGOUT =================

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");


        navigate("/");


        window.location.reload();

    };


    return (

        <>

            {/* ================================================= */}
            {/* OFFER BAR */}
            {/* ================================================= */}

            <div className="offer-bar">

                🚚 Free Delivery on Orders Above ₹499

            </div>


            {/* ================================================= */}
            {/* NAVBAR */}
            {/* ================================================= */}

            <nav className="navbar navbar-expand-lg custom-navbar sticky-top shadow-sm">


                <div className="container">


                    {/* ================================================= */}
                    {/* LOGO */}
                    {/* ================================================= */}

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


                    {/* ================================================= */}
                    {/* MOBILE BUTTON */}
                    {/* ================================================= */}

                    <button

                        className="navbar-toggler"

                        type="button"

                        data-bs-toggle="collapse"

                        data-bs-target="#navbarContent"

                        aria-controls="navbarContent"

                        aria-expanded="false"

                        aria-label="Toggle navigation"

                    >

                        <FaBars />

                    </button>


                    {/* ================================================= */}
                    {/* NAVBAR CONTENT */}
                    {/* ================================================= */}

                    <div

                        className="collapse navbar-collapse"

                        id="navbarContent"

                    >


                        {/* ================================================= */}
                        {/* DELIVERY LOCATION */}
                        {/* ================================================= */}

                        <div className="delivery-box ms-lg-4">


                            <FaMapMarkerAlt

                                className="delivery-icon me-2"

                            />


                            <div>


                                <small className="delivery-label">

                                    Deliver To

                                </small>


                                <div className="delivery-city">

                                    Kolkata

                                </div>


                            </div>


                        </div>


                        {/* ================================================= */}
                        {/* CATEGORY */}
                        {/* ================================================= */}

                        <select

                            className="form-select category-select mx-lg-3"

                            onChange={handleCategoryChange}

                        >


                            <option value="">

                                All Categories

                            </option>


                            {

                                categories.map(

                                    (category) => (

                                        <option

                                            key={category._id}

                                            value={category._id}

                                        >

                                            {category.name}

                                        </option>

                                    )

                                )

                            }


                        </select>


                        {/* ================================================= */}
                        {/* SEARCH */}
                        {/* ================================================= */}

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

                                    setSearch(

                                        e.target.value

                                    )

                                }

                            />


                            <button

                                className="btn btn-success"

                                type="submit"

                            >

                                <FaSearch />

                            </button>


                        </form>


                        {/* ================================================= */}
                        {/* RIGHT SIDE */}
                        {/* ================================================= */}

                        <ul className="navbar-nav align-items-center ms-lg-4">


                            {/* ================= WISHLIST ================= */}

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


                            {/* ================= CART ================= */}

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


                            {/* ================= ACCOUNT ================= */}

                            <li className="nav-item dropdown ms-3">


                                <a

                                    href="/#"

                                    className="nav-link icon-link dropdown-toggle"

                                    data-bs-toggle="dropdown"

                                    role="button"

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


                            </li>


                        </ul>


                    </div>


                </div>


            </nav>


        </>

    );

};


export default Navbar;