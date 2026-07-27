import { Table, Badge, Button, Spinner } from "react-bootstrap";
import { FaEye, FaEdit } from "react-icons/fa";

const OrderTable = ({
    orders,
    loading,
    onView,
    onStatus,
}) => {

    const statusVariant = (status) => {

        switch (status) {

            case "Pending":
                return "warning";

            case "Confirmed":
                return "info";

            case "Packed":
                return "primary";

            case "Shipped":
                return "secondary";

            case "Delivered":
                return "success";

            case "Cancelled":
                return "danger";

            default:
                return "dark";

        }

    };

    const paymentVariant = (status) => {

        switch (status) {

            case "Paid":
                return "success";

            case "Pending":
                return "warning";

            case "Failed":
                return "danger";

            default:
                return "secondary";

        }

    };

    if (loading) {

        return (

            <div className="text-center py-5">

                <Spinner animation="border" />

            </div>

        );

    }

    return (

        <div className="table-responsive">

            <Table
                hover
                bordered
                className="align-middle"
            >

                <thead className="table-dark">

                    <tr>

                        <th>#</th>

                        <th>Customer</th>

                        <th>Email</th>

                        <th>Amount</th>

                        <th>Payment</th>

                        <th>Payment Status</th>

                        <th>Order Status</th>

                        <th>Date</th>

                        <th width="170">Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        orders.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="9"
                                    className="text-center py-4"
                                >

                                    No Orders Found

                                </td>

                            </tr>

                        ) : (

                            orders.map((order, index) => (

                                <tr key={order._id}>

                                    <td>

                                        {index + 1}

                                    </td>

                                    <td>

                                        {order.user?.name}

                                    </td>

                                    <td>

                                        {order.user?.email}

                                    </td>

                                    <td>

                                        ₹{order.finalAmount}

                                    </td>

                                    <td>

                                        {order.paymentMethod}

                                    </td>

                                    <td>

                                        <Badge
                                            bg={paymentVariant(
                                                order.paymentStatus
                                            )}
                                        >

                                            {order.paymentStatus}

                                        </Badge>

                                    </td>

                                    <td>

                                        <Badge
                                            bg={statusVariant(
                                                order.orderStatus
                                            )}
                                        >

                                            {order.orderStatus}

                                        </Badge>

                                    </td>

                                    <td>

                                        {

                                            new Date(
                                                order.createdAt
                                            ).toLocaleDateString()

                                        }

                                    </td>

                                    <td>

                                        <Button
                                            size="sm"
                                            variant="info"
                                            className="me-2"
                                            onClick={() =>
                                                onView(order)
                                            }
                                        >

                                            <FaEye />

                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="warning"
                                            onClick={() =>
                                                onStatus(order)
                                            }
                                        >

                                            <FaEdit />

                                        </Button>

                                    </td>

                                </tr>

                            ))

                        )

                    }

                </tbody>

            </Table>

        </div>

    );

};

export default OrderTable;