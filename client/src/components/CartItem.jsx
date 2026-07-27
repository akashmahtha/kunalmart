import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import api from "../services/api";
import { toast } from "react-toastify";

const CartItem = ({ item, fetchCart }) => {

    const updateQuantity = async (quantity) => {

        try {

            await api.put(`/cart/${item.product._id}`, {
                quantity,
            });

            fetchCart();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to update cart"
            );

        }

    };

    const removeItem = async () => {

        try {

            await api.delete(`/cart/${item.product._id}`);

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

                    {/* Image */}

                    <div className="col-md-2 col-4">

                        <img
                            src={item.product.images[0]?.url}
                            alt={item.product.name}
                            className="img-fluid rounded"
                        />

                    </div>

                    {/* Product */}

                    <div className="col-md-4 col-8">

                        <h5 className="fw-bold">

                            {item.product.name}

                        </h5>

                        <p className="text-muted mb-1">

                            {item.product.brand}

                        </p>

                        <h6 className="text-success">

                            ₹{item.price}

                        </h6>

                    </div>
                    {/* Quantity */}

                    <div className="col-md-3 mt-3 mt-md-0">

                        <div className="d-flex align-items-center justify-content-center">

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
                                    item.quantity >= item.product.stock
                                }
                                onClick={() =>
                                    updateQuantity(item.quantity + 1)
                                }
                            >

                                <FaPlus />

                            </button>

                        </div>

                    </div>

                    {/* Total + Remove */}

                    <div className="col-md-3 text-md-end mt-3 mt-md-0">

                        <h5 className="text-success fw-bold">

                            ₹{item.price * item.quantity}

                        </h5>

                        <button
                            className="btn btn-sm btn-outline-danger mt-2"
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