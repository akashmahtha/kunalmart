import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    FaStar,
    FaShoppingCart,
    FaHeart,
} from "react-icons/fa";

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

    useEffect(() => {

        fetchProduct();

    }, [id]);

    const fetchProduct = async () => {

        try {

            const res = await api.get(`/products/${id}`);

            setProduct(res.data.product);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };
    // ===========================
    // Add To Cart
    // ===========================

    const addToCart = async () => {
        console.log("Button Clicked");

        const token = localStorage.getItem("token");
        console.log("Token:", token);

        if (!token) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }

        try {
            console.log({
                productId: product._id,
                quantity,
            });

            const res = await api.post("/cart", {
                productId: product._id,
                quantity,
            });

            console.log("Response:", res.data);

            toast.success(res.data.message);

        } catch (error) {

            console.log("ERROR:", error);

            console.log("Response:", error.response);

            toast.error(
                error.response?.data?.message || "Failed to add product"
            );
        }
    };

    // ===========================
    // Add To Wishlist
    // ===========================

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

    // ===========================
    // Buy Now
    // ===========================

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

    const finalPrice =

        product?.discountPrice > 0

            ? product.discountPrice

            : product?.price;

    const discount =

        product?.discountPrice > 0

            ? Math.round(

                (

                    (product.price - product.discountPrice)

                    / product.price

                ) * 100

            )

            : 0;
    if (loading) {

        return (

            <>

                <Navbar />

                <div className="container py-5 text-center">

                    <div className="spinner-border text-success"></div>

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

                    <h2>Product Not Found</h2>

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

                        <small className="text-success fw-semibold">

                            {product.category?.name}

                        </small>

                        <h2 className="fw-bold mt-2">

                            {product.name}

                        </h2>

                        <p className="text-muted">

                            Brand :

                            <strong className="ms-2">

                                {product.brand || "Kunal Mart"}

                            </strong>

                        </p>

                        {/* Rating */}

                        <div className="d-flex align-items-center mb-3">

                            <FaStar className="text-warning" />

                            <span className="fw-bold ms-2">

                                {product.rating?.toFixed(1) || 0}

                            </span>

                            <span className="text-muted ms-2">

                                ({product.numReviews || 0} Reviews)

                            </span>

                        </div>

                        {/* Price */}

                        <div className="mb-4">

                            <span className="display-6 fw-bold text-success">

                                ₹{finalPrice}

                            </span>

                            {

                                product.discountPrice > 0 && (

                                    <>

                                        <span className="text-decoration-line-through text-muted ms-3">

                                            ₹{product.price}

                                        </span>

                                        <span className="badge bg-danger ms-3">

                                            {discount}% OFF

                                        </span>

                                    </>

                                )

                            }

                        </div>

                        {/* Stock */}

                        <div className="mb-4">

                            {

                                product.stock > 0 ? (

                                    <span className="badge bg-success">
                                        In Stock
                                    </span>

                                ) : (

                                    <span className="badge bg-danger fs-6">

                                        Out Of Stock

                                    </span>

                                )

                            }

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

                            />

                        </div>
                        {/* Buttons */}

                        <div className="d-grid gap-3">

                            <button
                                className="btn btn-success btn-lg"
                                disabled={product.stock === 0}
                                onClick={addToCart}
                            >

                                <FaShoppingCart className="me-2" />

                                Add To Cart

                            </button>

                            <button
                                className="btn btn-warning btn-lg fw-bold"
                                disabled={product.stock === 0}
                                onClick={buyNow}
                            >

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

                        {/* Delivery Information */}

                        <DeliveryInfo />

                    </div>

                </div>

                <hr className="my-5" />

                <ProductInfoCard

                    product={product}

                />

                <hr className="my-5" />

                {/* Reviews */}

                <ReviewSection

                    productId={product._id}

                />

                <hr className="my-5" />

                {/* Related Products */}

                <RelatedProducts

                    productId={product._id}

                />

            </div>

            <Footer />

        </>

    );

};

export default ProductDetails;