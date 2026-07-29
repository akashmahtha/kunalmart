import { useEffect, useState } from "react";
import { Card, Form, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

import api from "../../services/api";

import AdminLayout from "../components/AdminLayout";
import OrderTable from "../components/OrderTable";
import OrderStatusModal from "../components/OrderStatusModal";
import OrderDetailsModal from "../components/OrderDetailsModal";
import CustomPagination from "../components/CustomPagination";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedOrder, setSelectedOrder] = useState(null);

    const [showStatus, setShowStatus] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    // Search
    const [search, setSearch] = useState("");

    // Pagination
    const [page, setPage] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);

    const itemsPerPage = 10;

    useEffect(() => {
        fetchOrders();
    }, [page, search]);

    const fetchOrders = async () => {
        try {
            setLoading(true);

            const { data } = await api.get(
                `/orders/admin/all?page=${page}&limit=${itemsPerPage}&search=${search}`
            );

            console.log("Orders Response :", data);

            setOrders(data.orders || []);
            setTotalOrders(data.totalOrders || 0);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    const viewHandler = (order) => {
        setSelectedOrder(order);
        setShowDetails(true);
    };

    const statusHandler = (order) => {
        setSelectedOrder(order);
        setShowStatus(true);
    };

    return (
        <AdminLayout>

            <Card className="shadow-sm border-0">

                <Card.Body>

                    <Row className="align-items-center mb-4">

                        <Col>

                            <h3 className="fw-bold mb-0">
                                Orders
                            </h3>

                        </Col>

                        <Col xs="auto">

                            <span className="badge bg-success fs-6">
                                {totalOrders} Orders
                            </span>

                        </Col>

                    </Row>

                    <Row className="mb-3">

                        <Col md={4} className="ms-auto">

                            <Form.Control
                                type="text"
                                placeholder="Search Orders..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                            />

                        </Col>

                    </Row>

                    <OrderTable
                        orders={orders}
                        loading={loading}
                        currentPage={page}
                        itemsPerPage={itemsPerPage}
                        onView={viewHandler}
                        onStatus={statusHandler}
                    />

                    <div className="mt-4">

                        <CustomPagination
                            totalItems={totalOrders}
                            itemsPerPage={itemsPerPage}
                            currentPage={page}
                            setCurrentPage={setPage}
                        />

                    </div>

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