import { Card, Row, Col, Button } from "react-bootstrap";
import { FaTicketAlt, FaClock } from "react-icons/fa";
import AdminLayout from "../components/AdminLayout";

const Coupons = () => {
    return (
        <AdminLayout>
            <div className="container-fluid">

                <Row className="mb-4">
                    <Col>
                        <h2 className="fw-bold">Coupon Management</h2>
                        <p className="text-muted mb-0">
                            Create, manage and monitor discount coupons.
                        </p>
                    </Col>
                </Row>

                <Card className="shadow-sm border-0">
                    <Card.Body className="text-center py-5">

                        <FaTicketAlt
                            size={80}
                            className="text-warning mb-4"
                        />

                        <h3 className="fw-bold">
                            Coupon Module Coming Soon 🚀
                        </h3>

                        <p
                            className="text-muted mx-auto mt-3"
                            style={{ maxWidth: "650px" }}
                        >
                            The Coupon Management system is currently under
                            development. Soon you'll be able to create discount
                            coupons, percentage offers, fixed amount coupons,
                            free delivery coupons, usage limits, expiry dates,
                            customer-specific offers, and much more.
                        </p>

                        <div className="mt-4">

                            <Button
                                variant="warning"
                                disabled
                                className="px-4"
                            >
                                <FaClock className="me-2" />
                                Under Development
                            </Button>

                        </div>

                    </Card.Body>
                </Card>

            </div>
        </AdminLayout>
    );
};

export default Coupons;