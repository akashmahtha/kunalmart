import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";
import "./ProductCard.css";

const ProductCard = ({ product }) => {

    const navigate = useNavigate();

    const image =
        product.images?.length > 0
            ? product.images[0].url
            : "https://placehold.co/300x300?text=No+Image";

    const finalPrice =
        product.discountPrice > 0
            ? product.discountPrice
            : product.price;

    const discount =
        product.discountPrice > 0
            ? Math.round(
                ((product.price - product.discountPrice) /
                    product.price) *
                100
            )
            : 0;

    // ==========================
    // Add To Cart
    // ==========================

    const addToCart = async () => {

        const token = localStorage.getItem("token");

        if (!token) {

            toast.error("Please login first");

            navigate("/login");

            return;

        }

        try {

            const res = await api.post("/cart", {
                productId: product._id,
                quantity: 1,
            });

            toast.success(res.data.message);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to add product"
            );

        }

    };

    // ==========================
    // Add To Wishlist
    // ==========================

    const addToWishlist = async () => {

        const token = localStorage.getItem("token");

        if (!token) {

            toast.error("Please login first");

            navigate("/login");

            return;

        }

        try {

            const res = await api.post("/wishlist", {
                productId: product._id,
            });

            toast.success(res.data.message);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to add wishlist"
            );

        }

    };

    return (

        <div className="card product-card border-0 shadow-sm h-100">

            {/* Discount */}

            {
                discount > 0 && (
                    <span className="badge bg-danger discount-badge">
                        {discount}% OFF
                    </span>
                )
            }

            {/* Wishlist */}

            <button
                className="wishlist-btn"
                onClick={addToWishlist}
            >
                <FaHeart />
            </button>

            {/* Product Image */}

            <Link
                to={`/product/${product._id}`}
                className="text-decoration-none"
            >
                <img
                    src={image}
                    alt={product.name}
                    className="card-img-top product-image"
                />
            </Link>

            <div className="card-body d-flex flex-column">

                {/* Category */}

                <small className="text-success fw-semibold">
                    {product.category?.name}
                </small>

                {/* Name */}

                <h6 className="product-title mt-2">
                    {product.name}
                </h6>

                {/* Rating */}

                <div className="rating mb-2">

                    <FaStar />

                    <span className="ms-1">
                        {product.rating?.toFixed(1) || 0}
                    </span>

                    <small className="text-muted ms-2">
                        ({product.numReviews || 0})
                    </small>

                </div>

                {/* Price */}

                <div className="mb-3">

                    <span className="price">
                        ₹{finalPrice}
                    </span>

                    {
                        product.discountPrice > 0 && (
                            <span className="old-price ms-2">
                                ₹{product.price}
                            </span>
                        )
                    }

                </div>

                {/* Stock */}

                <div className="mb-3">

                    {
                        product.stock > 0 ? (
                            <span className="badge bg-success">
                                In Stock
                            </span>
                        ) : (
                            <span className="badge bg-danger">
                                Out Of Stock
                            </span>
                        )
                    }

                </div>

                {/* Add To Cart */}

                <button
                    className="btn btn-success mt-auto"
                    disabled={product.stock === 0}
                    onClick={addToCart}
                >
                    <FaShoppingCart className="me-2" />
                    Add To Cart
                </button>

            </div>

        </div>

    );

};

export default ProductCard;