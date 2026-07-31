import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";

const CartItem = ({ item, fetchCart }) => {

    const product = item?.product;

    // ==========================
    // Product Missing
    // ==========================

    if (!product) {

        return (

            <div className="card shadow-sm border-0 rounded-4 mb-4">

                <div className="card-body text-center">

                    <h5 className="text-danger mb-2">

                        Product Not Available

                    </h5>

                    <p className="text-muted mb-0">

                        This product may have been deleted or is no longer available.

                    </p>

                </div>

            </div>

        );

    }

    // ==========================
    // Update Quantity
    // ==========================

    const updateQuantity = async (quantity) => {

        try {

            await api.put(

                `/cart/${product._id}`,

                {
                    quantity,
                }

            );

            fetchCart();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to update quantity"

            );

        }

    };

    // ==========================
    // Remove Product
    // ==========================

    const removeItem = async () => {

        try {

            await api.delete(

                `/cart/${product._id}`

            );

            toast.success("Product removed");

            fetchCart();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to remove product"

            );

        }

    };

    return (

        <div className="card shadow-sm border-0 rounded-4 mb-4">

            <div className="card-body">

                <div className="row align-items-center">

                    {/* Product Image */}

                    <div className="col-md-2 col-4">

                        <img
                            src={
                                product.images?.[0]?.url ||
                                "https://placehold.co/120x120?text=No+Image"
                            }
                            alt={product.name}
                            className="img-fluid rounded"
                            style={{
                                width: "100%",
                                height: "100px",
                                objectFit: "cover",
                            }}
                        />

                    </div>

                    {/* Product Details */}

                    <div className="col-md-4 col-8">

                        <h5 className="fw-bold">

                            {product.name}

                        </h5>

                        <p className="text-muted mb-1">

                            {product.brand || "No Brand"}

                        </p>

                        <p className="text-muted mb-1">

                            Pack:

                            {" "}

                            {product.packSize}

                            {" "}

                            {product.unit}

                        </p>

                        <h5 className="text-success">

                            ₹{item.price}

                        </h5>

                    </div>

                    {/* Quantity */}

                    <div className="col-md-3 mt-3 mt-md-0">

                        <div className="d-flex justify-content-center align-items-center">

                            <button
                                className="btn btn-outline-secondary"
                                disabled={item.quantity <= 1}
                                onClick={() =>
                                    updateQuantity(item.quantity - 1)
                                }
                            >

                                <FaMinus />

                            </button>

                            <span className="mx-3 fw-bold fs-5">

                                {item.quantity}

                            </span>

                            <button
                                className="btn btn-outline-secondary"
                                disabled={
                                    item.quantity >= product.stock
                                }
                                onClick={() =>
                                    updateQuantity(item.quantity + 1)
                                }
                            >

                                <FaPlus />

                            </button>

                        </div>

                    </div>

                    {/* Total */}

                    <div className="col-md-3 text-md-end mt-3 mt-md-0">

                        <h4 className="text-success fw-bold">

                            ₹{item.price * item.quantity}

                        </h4>

                        <button
                            className="btn btn-outline-danger btn-sm mt-2"
                            onClick={removeItem}
                        >

                            <FaTrash className="me-2" />

                            Remove

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default CartItem;