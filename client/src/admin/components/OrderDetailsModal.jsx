import {
    Modal,
    Button,
    Row,
    Col,
    Table,
    Badge,
    Image,
} from "react-bootstrap";

const OrderDetailsModal = ({
    show,
    handleClose,
    order,
}) => {

    if (!order) return null;

    return (

        <Modal
            show={show}
            onHide={handleClose}
            size="xl"
            centered
        >

            <Modal.Header closeButton>

                <Modal.Title>

                    Order Details

                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                {/* Customer */}

                <Row className="mb-4">

                    <Col md={6}>

                        <h6 className="fw-bold">

                            Customer Information

                        </h6>

                        <p className="mb-1">

                            <strong>Name :</strong>{" "}

                            {order.user?.name}

                        </p>

                        <p className="mb-1">

                            <strong>Email :</strong>{" "}

                            {order.user?.email}

                        </p>

                    </Col>

                    <Col md={6}>

                        <h6 className="fw-bold">

                            Shipping Address

                        </h6>

                        <p className="mb-1">

                            {order.shippingAddress?.fullName}

                        </p>

                        <p className="mb-1">

                            {order.shippingAddress?.address}

                        </p>

                        <p className="mb-1">

                            {order.shippingAddress?.city},{" "}
                            {order.shippingAddress?.state}

                        </p>

                        <p className="mb-1">

                            {order.shippingAddress?.pincode}

                        </p>

                        <p>

                            {order.shippingAddress?.phone}

                        </p>

                    </Col>

                </Row>

                {/* Order Info */}

                <Row className="mb-4">

                    <Col md={4}>

                        <strong>Payment Method</strong>

                        <br />

                        {order.paymentMethod}

                    </Col>

                    <Col md={4}>

                        <strong>Payment Status</strong>

                        <br />

                        <Badge
                            bg={
                                order.paymentStatus === "Paid"
                                    ? "success"
                                    : order.paymentStatus === "Failed"
                                        ? "danger"
                                        : "warning"
                            }
                        >

                            {order.paymentStatus}

                        </Badge>

                    </Col>

                    <Col md={4}>

                        <strong>Order Status</strong>

                        <br />

                        <Badge
                            bg={
                                order.orderStatus === "Delivered"
                                    ? "success"
                                    : order.orderStatus === "Cancelled"
                                        ? "danger"
                                        : "primary"
                            }
                        >

                            {order.orderStatus}

                        </Badge>

                    </Col>

                </Row>

                {/* Products */}

                <Table
                    bordered
                    hover
                    responsive
                >

                    <thead className="table-light">

                        <tr>

                            <th>Image</th>

                            <th>Product</th>

                            <th>Price</th>

                            <th>Qty</th>

                            <th>Total</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            order.items.map((item, index) => (

                                <tr key={index}>

                                    <td width="90">

                                        <Image
                                            src={item.image}
                                            width={60}
                                            height={60}
                                            rounded
                                            style={{
                                                objectFit: "cover",
                                            }}
                                        />

                                    </td>

                                    <td>

                                        {item.name}

                                    </td>

                                    <td>

                                        ₹{item.price}

                                    </td>

                                    <td>

                                        {item.quantity}

                                    </td>

                                    <td>

                                        ₹{item.price * item.quantity}

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </Table>

                {/* Summary */}

                <Row className="justify-content-end mt-4">

                    <Col md={4}>

                        <Table bordered>

                            <tbody>

                                <tr>

                                    <th>Total</th>

                                    <td>

                                        ₹{order.totalAmount}

                                    </td>

                                </tr>

                                <tr>

                                    <th>Delivery</th>

                                    <td>

                                        ₹{order.deliveryCharge}

                                    </td>

                                </tr>

                                <tr>

                                    <th>Discount</th>

                                    <td>

                                        ₹{order.discount}

                                    </td>

                                </tr>

                                <tr className="table-success">

                                    <th>Final Amount</th>

                                    <th>

                                        ₹{order.finalAmount}

                                    </th>

                                </tr>

                            </tbody>

                        </Table>

                    </Col>

                </Row>

            </Modal.Body>

            <Modal.Footer>

                <Button
                    variant="secondary"
                    onClick={handleClose}
                >

                    Close

                </Button>

            </Modal.Footer>

        </Modal>

    );

};

export default OrderDetailsModal;