import { useEffect, useState, useCallback } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
    FaStar,
    FaShoppingCart,
    FaHeart,
    FaBolt,
    FaBoxOpen,
    FaCheckCircle,
} from "react-icons/fa";

import { Badge } from "react-bootstrap";
import { toast } from "react-toastify";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import ProductImageGallery from "../components/ProductImageGallery";
import QuantitySelector from "../components/QuantitySelector";
import DeliveryInfo from "../components/DeliveryInfo";
import ProductInfoCard from "../components/ProductInfoCard";
import ReviewSection from "../components/ReviewSection";
import RelatedProducts from "../components/RelatedProducts";

const ProductDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [quantity, setQuantity] = useState(1);

    // ==========================
    // Fetch Product
    // ==========================

    const fetchProduct = useCallback(async () => {

        try {

            setLoading(true);

            const res = await api.get(`/products/${id}`);

            setProduct(res.data.product);

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to load product"
            );

        } finally {

            setLoading(false);

        }

    }, [id]);

    useEffect(() => {

        fetchProduct();

    }, [fetchProduct]);

    // ==========================
    // Prices
    // ==========================

    const finalPrice =
        product?.discountPrice > 0
            ? product.discountPrice
            : product?.price;

    const discount =
        product?.offerPercentage ||
        (
            product?.discountPrice > 0
                ? Math.round(
                    (
                        (product.price - product.discountPrice) /
                        product.price
                    ) * 100
                )
                : 0
        );

    // ==========================
    // Stock Status
    // ==========================

    const getStockBadge = () => {

        if (!product)
            return null;

        if (product.stock <= 0) {

            return (
                <Badge bg="danger">
                    Out Of Stock
                </Badge>
            );

        }

        if (product.stock <= 10) {

            return (
                <Badge bg="warning" text="dark">
                    Only {product.stock} Left
                </Badge>
            );

        }

        return (
            <Badge bg="success">
                In Stock
            </Badge>
        );

    };

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

                quantity,

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
    // Wishlist
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

    // ==========================
    // Buy Now
    // ==========================

    const buyNow = async () => {

        const token = localStorage.getItem("token");

        if (!token) {

            toast.error("Please login first");

            navigate("/login");

            return;

        }

        try {

            await api.post("/cart", {

                productId: product._id,

                quantity,

            });

            navigate("/cart");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };

    if (loading) {

        return (

            <>

                <Navbar />

                <div className="container py-5 text-center">

                    <div
                        className="spinner-border text-success"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>

                    <h5 className="mt-3">
                        Loading Product...
                    </h5>

                </div>

                <Footer />

            </>

        );

    }

    if (!product) {

        return (

            <>

                <Navbar />

                <div className="container py-5 text-center">

                    <h2>
                        Product Not Found
                    </h2>

                </div>

                <Footer />

            </>

        );

    }

    return (

        <>

            <Navbar />

            <div className="container my-5">

                <Breadcrumb product={product} />

                <div className="row g-5">

                    {/* Left Side */}

                    <div className="col-lg-6">

                        <ProductImageGallery
                            images={product.images}
                        />

                    </div>

                    {/* Right Side */}

                    <div className="col-lg-6">
                        {/* Category */}

                        <small className="text-success fw-semibold">

                            {product.category?.name}

                        </small>

                        {/* Product Name */}

                        <h2 className="fw-bold mt-2">

                            {product.name}

                        </h2>

                        {/* Brand */}

                        <p className="text-muted mb-2">

                            Brand :

                            <strong className="ms-2">

                                {product.brand || "Kunal Mart"}

                            </strong>

                        </p>

                        {/* Product Badge */}

                        {product.badge && (

                            <div className="mb-3">

                                <Badge bg="primary">

                                    {product.badge}

                                </Badge>

                            </div>

                        )}

                        {/* Featured / Trending / Best Seller */}

                        <div className="mb-3">

                            {product.isFeatured && (

                                <Badge
                                    bg="warning"
                                    text="dark"
                                    className="me-2"
                                >
                                    ⭐ Featured
                                </Badge>

                            )}

                            {product.isTrending && (

                                <Badge
                                    bg="info"
                                    className="me-2"
                                >
                                    🔥 Trending
                                </Badge>

                            )}

                            {product.isBestSeller && (

                                <Badge bg="success">

                                    🏆 Best Seller

                                </Badge>

                            )}

                        </div>

                        {/* Rating */}

                        <div className="d-flex align-items-center mb-4">

                            <FaStar className="text-warning" />

                            <span className="fw-bold ms-2">

                                {product.rating?.toFixed(1) || "0.0"}

                            </span>

                            <span className="text-muted ms-2">

                                ({product.numReviews || 0} Reviews)

                            </span>

                        </div>

                        {/* Price */}

                        <div className="mb-4">

                            <span className="display-5 fw-bold text-success">

                                ₹{finalPrice}

                            </span>

                            {product.discountPrice > 0 && (

                                <>

                                    <span className="ms-3 text-decoration-line-through text-muted fs-5">

                                        ₹{product.price}

                                    </span>

                                    <Badge
                                        bg="danger"
                                        className="ms-3"
                                    >

                                        {product.offerLabel ||
                                            `${discount}% OFF`}

                                    </Badge>

                                </>

                            )}

                        </div>

                        {/* Pack Size */}

                        <div className="mb-3">

                            <FaBoxOpen className="me-2 text-success" />

                            <strong>

                                Pack :

                            </strong>

                            <span className="ms-2">

                                {product.packSize} {product.unit}

                            </span>

                        </div>

                        {/* Stock */}

                        <div className="mb-4">

                            {getStockBadge()}

                        </div>

                        {/* Description */}

                        <div className="mb-4">

                            <h5 className="fw-bold">

                                Description

                            </h5>

                            <p className="text-muted">

                                {product.description}

                            </p>

                        </div>

                        {/* Quantity */}

                        <div className="mb-4">

                            <h6 className="fw-bold mb-3">

                                Select Quantity

                            </h6>

                            <QuantitySelector
                                stock={product.stock}
                                value={quantity}
                                onChange={setQuantity}
                                disabled={product.stock === 0}
                            />

                        </div>


                        {/* Action Buttons */}

                        <div className="d-grid gap-3 mt-4">

                            <button
                                className="btn btn-success btn-lg"
                                disabled={product.stock <= 0}
                                onClick={addToCart}
                            >

                                <FaShoppingCart className="me-2" />

                                Add To Cart

                            </button>

                            <button
                                className="btn btn-warning btn-lg fw-bold"
                                disabled={product.stock <= 0}
                                onClick={buyNow}
                            >

                                <FaBolt className="me-2" />

                                Buy Now

                            </button>

                            <button
                                className="btn btn-outline-danger btn-lg"
                                onClick={addToWishlist}
                            >

                                <FaHeart className="me-2" />

                                Add To Wishlist

                            </button>

                        </div>

                        {/* Stock Note */}

                        {

                            product.stock > 0 && (

                                <div className="mt-4 text-success">

                                    <FaCheckCircle className="me-2" />

                                    Ready for fast delivery

                                </div>

                            )

                        }

                    </div>

                </div>


                {/* Related Products */}

                <div className="mt-5">

                    <RelatedProducts
                        productId={product._id}
                    />

                </div>

            </div>

            <Footer />

        </>

    );

};

export default ProductDetails;