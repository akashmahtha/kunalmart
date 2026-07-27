import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { toast } from "react-toastify";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const res = await api.get("/orders");

            setOrders(res.data.orders);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to load orders"
            );

        } finally {

            setLoading(false);

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

    return (

        <>
            <Navbar />

            <div className="container py-5">

                <h2 className="fw-bold mb-4">

                    My Orders

                </h2>

                {

                    orders.length === 0 ? (

                        <div className="alert alert-info">

                            No orders found.

                        </div>

                    ) : (

                        orders.map((order) => (

                            <div
                                key={order._id}
                                className="card shadow-sm border-0 rounded-4 mb-4"
                            >

                                <div className="card-body">

                                    <div className="row align-items-center">

                                        <div className="col-lg-8">

                                            <h5 className="fw-bold">

                                                Order #{order._id.slice(-8)}

                                            </h5>

                                            <p className="text-muted mb-1">

                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleString()}

                                            </p>

                                            <p className="mb-1">

                                                <strong>Items :</strong>{" "}

                                                {order.items.length}

                                            </p>

                                            <p className="mb-1">

                                                <strong>Payment :</strong>{" "}

                                                {order.paymentMethod}

                                            </p>

                                            <p className="mb-0">

                                                <strong>Total :</strong>{" "}

                                                ₹{order.finalAmount}

                                            </p>

                                        </div>

                                        <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">

                                            <span
                                                className={`badge fs-6 mb-3 ${order.orderStatus === "Delivered"
                                                        ? "bg-success"
                                                        : order.orderStatus === "Cancelled"
                                                            ? "bg-danger"
                                                            : order.orderStatus === "Shipped"
                                                                ? "bg-primary"
                                                                : "bg-warning text-dark"
                                                    }`}
                                            >

                                                {order.orderStatus}

                                            </span>

                                            <br />

                                            <Link
                                                to={`/orders/${order._id}`}
                                                className="btn btn-success"
                                            >

                                                View Details

                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                    )

                }

            </div>

            <Footer />

        </>

    );

};

export default Orders;