import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { toast } from "react-toastify";

const OrderDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchOrder();

    }, []);

    const fetchOrder = async () => {

        try {

            const res = await api.get(`/orders/${id}`);

            setOrder(res.data.order);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to load order"
            );

            navigate("/orders");

        } finally {

            setLoading(false);

        }

    };

    const cancelOrder = async () => {

        if (!window.confirm("Are you sure you want to cancel this order?")) {
            return;
        }

        try {

            await api.patch(`/orders/cancel/${id}`);

            toast.success("Order cancelled successfully");

            fetchOrder();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to cancel order"
            );

        }

    };

    const buyAgain = async (productId) => {

        try {

            await api.post("/cart", {
                productId,
                quantity: 1,
            });

            toast.success("Product added to cart");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to add product"
            );

        }

    };

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

    if (!order) {

        return (
            <>
                <Navbar />

                <div className="container py-5">

                    <div className="alert alert-danger">

                        Order not found

                    </div>

                </div>

                <Footer />
            </>
        );

    }

    return (

        <>
            <Navbar />

            <div className="container py-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2 className="fw-bold">

                        Order Details

                    </h2>

                    <span
                        className={`badge fs-6 ${order.orderStatus === "Delivered"
                                ? "bg-success"
                                : order.orderStatus === "Cancelled"
                                    ? "bg-danger"
                                    : "bg-warning text-dark"
                            }`}
                    >
                        {order.orderStatus}
                    </span>

                </div>

                <div className="card shadow-sm border-0 rounded-4 mb-4">

                    <div className="card-body">

                        <h5 className="fw-bold mb-3">

                            Order Information

                        </h5>

                        <p>
                            <strong>Order ID :</strong>{" "}
                            {order._id}
                        </p>

                        <p>
                            <strong>Date :</strong>{" "}
                            {new Date(order.createdAt).toLocaleString()}
                        </p>

                        <p>
                            <strong>Payment :</strong>{" "}
                            {order.paymentMethod}
                        </p>

                        <p>
                            <strong>Payment Status :</strong>

                            <span
                                className={`badge ms-2 ${order.paymentStatus === "Paid"
                                        ? "bg-success"
                                        : order.paymentStatus === "Failed"
                                            ? "bg-danger"
                                            : "bg-warning text-dark"
                                    }`}
                            >
                                {order.paymentStatus}
                            </span>

                        </p>

                    </div>

                </div>

                <div className="card shadow-sm border-0 rounded-4 mb-4">

                    <div className="card-body">

                        <h4 className="fw-bold mb-3">

                            Ordered Products

                        </h4>

                        {

                            order.items.map((item) => (

                                <div
                                    key={item.product}
                                    className="row align-items-center border-bottom py-3"
                                >

                                    <div className="col-md-2">

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="img-fluid rounded"
                                        />

                                    </div>

                                    <div className="col-md-5">

                                        <h5>{item.name}</h5>

                                        <p className="mb-1">
                                            Qty : {item.quantity}
                                        </p>

                                        <p className="mb-0">
                                            ₹{item.price}
                                        </p>

                                    </div>

                                    <div className="col-md-5 text-end">

                                        <h5 className="text-success">

                                            ₹{item.price * item.quantity}

                                        </h5>

                                        <button
                                            className="btn btn-outline-success mt-2"
                                            onClick={() =>
                                                buyAgain(item.product)
                                            }
                                        >

                                            Buy Again

                                        </button>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                </div>

                <div className="card shadow-sm border-0 rounded-4 mb-4">

                    <div className="card-body">

                        <h4 className="fw-bold mb-3">

                            Delivery Address

                        </h4>

                        <p>

                            <strong>

                                {order.shippingAddress.fullName}

                            </strong>

                        </p>

                        <p>{order.shippingAddress.addressLine1}</p>

                        <p>{order.shippingAddress.addressLine2}</p>

                        <p>

                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.state} -
                            {order.shippingAddress.pincode}

                        </p>

                        <p>

                            📞 {order.shippingAddress.phone}

                        </p>

                    </div>

                </div>

                <div className="card shadow-sm border-0 rounded-4">

                    <div className="card-body">

                        <h4 className="fw-bold mb-4">

                            Price Details

                        </h4>

                        <div className="d-flex justify-content-between">

                            <span>Total Amount</span>

                            <strong>

                                ₹{order.totalAmount}

                            </strong>

                        </div>

                        <div className="d-flex justify-content-between mt-3">

                            <span>Delivery Charge</span>

                            <strong>

                                ₹{order.deliveryCharge}

                            </strong>

                        </div>

                        <hr />

                        <div className="d-flex justify-content-between">

                            <h5>Grand Total</h5>

                            <h4 className="text-success">

                                ₹{order.finalAmount}

                            </h4>

                        </div>

                        {

                            order.orderStatus !== "Delivered" &&
                            order.orderStatus !== "Cancelled" && (

                                <button
                                    className="btn btn-danger w-100 mt-4"
                                    onClick={cancelOrder}
                                >

                                    Cancel Order

                                </button>

                            )

                        }

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

};

export default OrderDetails;