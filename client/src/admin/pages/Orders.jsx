import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";

import api from "../../services/api";

import AdminLayout from "../components/AdminLayout";
import OrderTable from "../components/OrderTable";
import OrderStatusModal from "../components/OrderStatusModal";
import OrderDetailsModal from "../components/OrderDetailsModal";

const Orders = () => {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedOrder, setSelectedOrder] = useState(null);

    const [showStatus, setShowStatus] = useState(false);

    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {

        fetchOrders();

    }, []);

    // ==========================
    // Fetch Orders
    // ==========================

    const fetchOrders = async () => {

        try {

            setLoading(true);

            const res = await api.get("/orders/admin/all");

            setOrders(res.data.orders);

        } catch (error) {

            toast.error("Failed to load orders");

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // View Details
    // ==========================

    const viewHandler = (order) => {

        setSelectedOrder(order);

        setShowDetails(true);

    };

    // ==========================
    // Update Status
    // ==========================

    const statusHandler = (order) => {

        setSelectedOrder(order);

        setShowStatus(true);

    };

    return (

        <AdminLayout>

            <Card className="shadow-sm border-0">

                <Card.Body>

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h3 className="mb-0">

                            Orders

                        </h3>

                        <span className="badge bg-success fs-6">

                            {orders.length} Orders

                        </span>

                    </div>

                    <OrderTable
                        orders={orders}
                        loading={loading}
                        onView={viewHandler}
                        onStatus={statusHandler}
                    />

                </Card.Body>

            </Card>

            <OrderStatusModal
                show={showStatus}
                handleClose={() => setShowStatus(false)}
                order={selectedOrder}
                fetchOrders={fetchOrders}
            />

            <OrderDetailsModal
                show={showDetails}
                handleClose={() => setShowDetails(false)}
                order={selectedOrder}
            />

        </AdminLayout>

    );

};

export default Orders;