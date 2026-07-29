import { Link, useNavigate } from "react-router-dom";

import {
    FaHeart,
    FaShoppingCart,
    FaStar,
} from "react-icons/fa";

import { toast } from "react-toastify";

import api from "../services/api";

import "./ProductCard.css";


const ProductCard = ({ product }) => {

    const navigate = useNavigate();


    // =========================================
    // PRODUCT IMAGE
    // =========================================

    const image =
        product.images?.length > 0
            ? (
                product.images[0]?.url ||
                product.images[0]
            )
            : "https://placehold.co/300x300?text=No+Image";


    // =========================================
    // PRICE
    // =========================================

    const finalPrice =
        product.discountPrice > 0
            ? product.discountPrice
            : product.price;


    // =========================================
    // DISCOUNT
    // =========================================

    const discount =
        product.discountPrice > 0 && product.price > 0
            ? Math.round(
                (
                    (product.price - product.discountPrice) /
                    product.price
                ) * 100
            )
            : 0;


    // =========================================
    // ADD TO CART
    // =========================================

    const addToCart = async () => {

        const token = localStorage.getItem("token");

        if (!token) {

            toast.error("Please login first");

            navigate("/login");

            return;
        }


        try {

            const res = await api.post(
                "/cart",
                {
                    productId: product._id,
                    quantity: 1,
                }
            );


            toast.success(
                res.data.message ||
                "Product added to cart"
            );


        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to add product"
            );

        }

    };


    // =========================================
    // ADD TO WISHLIST
    // =========================================

    const addToWishlist = async () => {

        const token = localStorage.getItem("token");


        if (!token) {

            toast.error("Please login first");

            navigate("/login");

            return;
        }


        try {

            const res = await api.post(
                "/wishlist",
                {
                    productId: product._id,
                }
            );


            toast.success(
                res.data.message ||
                "Added to wishlist"
            );


        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to add wishlist"
            );

        }

    };


    // =========================================
    // RENDER
    // =========================================

    return (

        <div className="product-card">


            {/* =================================
                DISCOUNT BADGE
            ================================= */}

            {discount > 0 && (

                <span className="discount-badge">

                    {discount}% OFF

                </span>

            )}


            {/* =================================
                WISHLIST
            ================================= */}

            <button
                type="button"
                className="wishlist-btn"
                onClick={addToWishlist}
                aria-label="Add to wishlist"
            >

                <FaHeart />

            </button>


            {/* =================================
                PRODUCT IMAGE
            ================================= */}

            <Link
                to={`/product/${product._id}`}
                className="product-image-link"
            >

                <img
                    src={image}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                />

            </Link>


            {/* =================================
                PRODUCT BODY
            ================================= */}

            <div className="product-card-body">


                {/* DELIVERY */}

                <div className="delivery-time">

                    🕘 8 MINS

                </div>


                {/* CATEGORY */}

                {product.category?.name && (

                    <small className="product-category">

                        {product.category.name}

                    </small>

                )}


                {/* PRODUCT NAME */}

                <Link
                    to={`/product/${product._id}`}
                    className="product-name"
                >

                    {product.name}

                </Link>


                {/* RATING */}

                <div className="product-rating">

                    <FaStar />

                    <span>
                        {product.rating?.toFixed(1) || "0.0"}
                    </span>

                    <small>
                        ({product.numReviews || 0})
                    </small>

                </div>


                {/* QUANTITY */}

                <div className="product-quantity">

                    {product.quantity ||
                        product.unit ||
                        "1 unit"}

                </div>


                {/* =================================
                    PRICE + ADD
                ================================= */}

                <div className="product-bottom">


                    <div className="product-price">

                        <strong>

                            ₹{Number(finalPrice || 0).toLocaleString("en-IN")}

                        </strong>


                        {product.discountPrice > 0 && (

                            <del>

                                ₹{Number(product.price || 0).toLocaleString("en-IN")}

                            </del>

                        )}

                    </div>


                    {/* COMPACT ADD BUTTON */}

                    <button
                        type="button"
                        className="km-add-btn"
                        disabled={product.stock === 0}
                        onClick={addToCart}
                    >

                        <FaShoppingCart />

                        {product.stock === 0
                            ? "OUT"
                            : "ADD"
                        }

                    </button>

                </div>

            </div>

        </div>

    );

};


export default ProductCard;