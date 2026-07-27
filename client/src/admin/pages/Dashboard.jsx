import { useEffect, useState } from "react";
import {
    Row,
    Col,
    Card,
    Table,
    Spinner,
} from "react-bootstrap";
import {
    FaUsers,
    FaBoxes,
    FaTags,
    FaShoppingCart,
    FaRupeeSign,
    FaCalendarDay,
} from "react-icons/fa";

import AdminLayout from "../components/AdminLayout";
import api from "../../services/api";

const Dashboard = () => {

    const [dashboard, setDashboard] = useState({});
    const [recentOrders, setRecentOrders] = useState([]);
    const [lowStock, setLowStock] = useState([]);
    const [topProducts, setTopProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const [
                dashboardRes,
                recentRes,
                stockRes,
                topRes,
            ] = await Promise.all([

                api.get("/admin/dashboard"),

                api.get("/admin/recent-orders"),

                api.get("/admin/low-stock"),

                api.get("/admin/top-products"),

            ]);

            setDashboard(
                dashboardRes.data.dashboard
            );

            setRecentOrders(
                recentRes.data.orders
            );

            setLowStock(
                stockRes.data.products
            );

            setTopProducts(
                topRes.data.products
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const cards = [

        {
            title: "Users",
            value: dashboard.totalUsers,
            icon: <FaUsers />,
            color: "primary",
        },

        {
            title: "Products",
            value: dashboard.totalProducts,
            icon: <FaBoxes />,
            color: "success",
        },

        {
            title: "Categories",
            value: dashboard.totalCategories,
            icon: <FaTags />,
            color: "warning",
        },

        {
            title: "Orders",
            value: dashboard.totalOrders,
            icon: <FaShoppingCart />,
            color: "danger",
        },

        {
            title: "Revenue",
            value: `₹${dashboard.totalRevenue || 0}`,
            icon: <FaRupeeSign />,
            color: "info",
        },

        {
            title: "Today's Orders",
            value: dashboard.todayOrders,
            icon: <FaCalendarDay />,
            color: "dark",
        },

    ];

    if (loading) {

        return (

            <AdminLayout>

                <div className="text-center py-5">

                    <Spinner
                        animation="border"
                        variant="success"
                    />

                </div>

            </AdminLayout>

        );

    }

    return (

        <AdminLayout>

            <h2 className="fw-bold mb-4">

                Dashboard

            </h2>

            <Row>

                {

                    cards.map((card, index) => (

                        <Col
                            lg={4}
                            md={6}
                            className="mb-4"
                            key={index}
                        >

                            <Card
                                className={`border-0 shadow dashboard-card bg-${card.color} text-white`}
                            >

                                <Card.Body>

                                    <div className="d-flex justify-content-between align-items-center">

                                        <div>

                                            <h6>

                                                {card.title}

                                            </h6>

                                            <h3>

                                                {card.value}

                                            </h3>

                                        </div>

                                        <div
                                            style={{
                                                fontSize: "40px",
                                            }}
                                        >

                                            {card.icon}

                                        </div>

                                    </div>

                                </Card.Body>

                            </Card>

                        </Col>

                    ))

                }

            </Row>

            <Row>

                <Col lg={6} className="mb-4">

                    <Card className="shadow border-0">

                        <Card.Header>

                            Recent Orders

                        </Card.Header>

                        <Card.Body>

                            <Table hover responsive>

                                <thead>

                                    <tr>

                                        <th>User</th>

                                        <th>Total</th>

                                        <th>Status</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        recentOrders.map((order) => (

                                            <tr
                                                key={order._id}
                                            >

                                                <td>

                                                    {order.user?.name}

                                                </td>

                                                <td>

                                                    ₹{order.finalAmount}

                                                </td>

                                                <td>

                                                    {order.orderStatus}

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </Table>

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={6} className="mb-4">

                    <Card className="shadow border-0">

                        <Card.Header>

                            Low Stock Products

                        </Card.Header>

                        <Card.Body>

                            <Table hover responsive>

                                <thead>

                                    <tr>

                                        <th>Name</th>

                                        <th>Stock</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        lowStock.map((product) => (

                                            <tr
                                                key={product._id}
                                            >

                                                <td>

                                                    {product.name}

                                                </td>

                                                <td>

                                                    {product.stock}

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </Table>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

            <Card className="shadow border-0">

                <Card.Header>

                    Top Selling Products

                </Card.Header>

                <Card.Body>

                    <Table hover responsive>

                        <thead>

                            <tr>

                                <th>Product</th>

                                <th>Sold</th>

                                <th>Stock</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                topProducts.map((product) => (

                                    <tr
                                        key={product._id}
                                    >

                                        <td>

                                            {product.name}

                                        </td>

                                        <td>

                                            {product.sold}

                                        </td>

                                        <td>

                                            {product.stock}

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </Table>

                </Card.Body>

            </Card>

        </AdminLayout>

    );

};

export default Dashboard;