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


    // =========================
    // Product Image
    // =========================

    const image =

        product.images?.length > 0

            ? product.images[0].url

            : "https://placehold.co/300x300?text=No+Image";


    // =========================
    // Price
    // =========================

    const finalPrice =

        product.discountPrice > 0

            ? product.discountPrice

            : product.price;


    // =========================
    // Discount
    // =========================

    const discount =

        product.discountPrice > 0

            ? Math.round(

                (

                    (product.price -
                        product.discountPrice)

                    /

                    product.price

                ) * 100

            )

            : 0;


    // =========================
    // Add To Cart
    // =========================

    const addToCart = async () => {

        const token = localStorage.getItem(
            "token"
        );


        if (!token) {

            toast.error(
                "Please login first"
            );

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


    // =========================
    // Add To Wishlist
    // =========================

    const addToWishlist = async () => {

        const token = localStorage.getItem(
            "token"
        );


        if (!token) {

            toast.error(
                "Please login first"
            );

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


    return (

        <div className="card product-card">


            {/* =========================
                DISCOUNT
            ========================= */}

            {

                discount > 0 && (

                    <span className="discount-badge">

                        {discount}% OFF

                    </span>

                )

            }


            {/* =========================
                WISHLIST
            ========================= */}

            <button

                className="wishlist-btn"

                onClick={addToWishlist}

            >

                <FaHeart />

            </button>


            {/* =========================
                IMAGE
            ========================= */}

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


            {/* =========================
                CARD BODY
            ========================= */}

            <div className="product-card-body">


                {/* Delivery */}

                <div className="delivery-time">

                    🕘 8 MINS

                </div>


                {/* Category */}

                {

                    product.category?.name && (

                        <small className="product-category">

                            {product.category.name}

                        </small>

                    )

                }


                {/* Product Name */}

                <Link

                    to={`/product/${product._id}`}

                    className="product-name"

                >

                    {product.name}

                </Link>


                {/* Rating */}

                <div className="product-rating">

                    <FaStar />

                    <span>

                        {product.rating?.toFixed(1) || 0}

                    </span>

                    <small>

                        ({product.numReviews || 0})

                    </small>

                </div>


                {/* Quantity */}

                <div className="product-quantity">

                    {product.quantity ||
                        product.unit ||
                        "1 unit"}

                </div>


                {/* Bottom */}

                <div className="product-bottom">


                    <div className="product-price">

                        <strong>

                            ₹{finalPrice}

                        </strong>


                        {

                            product.discountPrice > 0 && (

                                <del>

                                    ₹{product.price}

                                </del>

                            )

                        }

                    </div>


                    <button

                        className="add-cart-btn"

                        disabled={product.stock === 0}

                        onClick={addToCart}

                    >

                        <FaShoppingCart />

                        ADD

                    </button>

                </div>

            </div>

        </div>

    );

};


export default ProductCard;