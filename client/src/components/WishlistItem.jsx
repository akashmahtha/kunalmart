import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";

import api from "../services/api";

const WishlistItem = ({ item, fetchWishlist }) => {

    const removeWishlist = async () => {

        try {

            await api.delete(`/wishlist/${item._id}`);

            toast.success("Removed from wishlist");

            fetchWishlist();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to remove item"
            );

        }

    };

    const moveToCart = async () => {

        try {

            await api.post("/cart", {
                productId: item._id,
                quantity: 1,
            });

            await api.delete(`/wishlist/${item._id}`);

            toast.success("Moved to cart");

            fetchWishlist();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to move product"
            );

        }

    };

    const finalPrice =
        item.discountPrice || item.price;

    const discount =
        item.discountPrice
            ? Math.round(
                ((item.price - item.discountPrice) /
                    item.price) * 100
            )
            : 0;

    return (

        <div className="card h-100 shadow-sm border-0 rounded-4">

            <img
                src={
                    item.images?.[0]?.url ||
                    "https://placehold.co/300x300?text=No+Image"
                }
                alt={item.name}
                className="card-img-top p-3"
                style={{
                    height: "220px",
                    objectFit: "contain",
                }}
            />

            <div className="card-body">

                <h5 className="fw-bold">

                    {item.name}

                </h5>

                <p className="text-muted mb-2">

                    {item.brand}

                </p>

                <div className="mb-3">

                    <span className="fs-5 fw-bold text-success">

                        ₹{finalPrice}

                    </span>

                    {item.discountPrice && (

                        <>
                            <span className="text-decoration-line-through text-muted ms-2">

                                ₹{item.price}

                            </span>

                            <span className="badge bg-danger ms-2">

                                {discount}% OFF

                            </span>
                        </>

                    )}

                </div>

                {item.stock > 0 ? (

                    <span className="badge bg-success mb-3">

                        In Stock

                    </span>

                ) : (

                    <span className="badge bg-danger mb-3">

                        Out Of Stock

                    </span>

                )}

                <div className="d-grid gap-2">

                    <Link
                        to={`/product/${item._id}`}
                        className="btn btn-outline-success"
                    >

                        View Product

                    </Link>

                    <button
                        className="btn btn-success"
                        onClick={moveToCart}
                        disabled={item.stock === 0}
                    >

                        <FaShoppingCart className="me-2" />

                        Move To Cart

                    </button>

                    <button
                        className="btn btn-outline-danger"
                        onClick={removeWishlist}
                    >

                        <FaHeart className="me-2" />

                        Remove

                    </button>

                </div>

            </div>

        </div>

    );

};

export default WishlistItem;