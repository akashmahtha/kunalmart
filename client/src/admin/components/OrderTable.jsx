import {
    Table,
    Badge,
    Button,
    Spinner,
} from "react-bootstrap";
import {
    FaEye,
    FaEdit,
} from "react-icons/fa";

const OrderTable = ({
    orders,
    loading,
    currentPage,
    itemsPerPage,
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
                <Spinner animation="border" variant="success" />
            </div>
        );
    }

    return (
        <div className="table-responsive">

            <Table
                hover
                bordered
                className="align-middle order-table mb-0"
            >

                <thead className="order-table-header">

                    <tr>

                        <th style={{ width: "60px" }}>#</th>

                        <th>Customer</th>

                        <th>Email</th>

                        <th style={{ width: "120px" }}>
                            Amount
                        </th>

                        <th style={{ width: "120px" }}>
                            Payment
                        </th>

                        <th style={{ width: "150px" }}>
                            Payment Status
                        </th>

                        <th style={{ width: "150px" }}>
                            Order Status
                        </th>

                        <th style={{ width: "130px" }}>
                            Date
                        </th>

                        <th style={{ width: "140px" }}>
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {orders.length > 0 ? (

                        orders.map((order, index) => (

                            <tr key={order._id}>

                                <td>
                                    {(currentPage - 1) *
                                        itemsPerPage +
                                        index +
                                        1}
                                </td>

                                <td>
                                    {order.user?.name || "-"}
                                </td>

                                <td>
                                    {order.user?.email || "-"}
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
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </td>

                                <td>

                                    <Button
                                        variant="info"
                                        size="sm"
                                        className="me-2"
                                        onClick={() =>
                                            onView(order)
                                        }
                                    >
                                        <FaEye />
                                    </Button>

                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() =>
                                            onStatus(order)
                                        }
                                    >
                                        <FaEdit />
                                    </Button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="9"
                                className="text-center py-5"
                            >
                                <h6 className="mb-0 text-muted">
                                    No Orders Found
                                </h6>
                            </td>

                        </tr>

                    )}

                </tbody>

            </Table>

        </div>
    );
};

export default OrderTable;