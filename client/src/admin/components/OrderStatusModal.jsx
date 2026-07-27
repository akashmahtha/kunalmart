import { useEffect, useState } from "react";
import {
    Modal,
    Button,
    Form,
} from "react-bootstrap";
import { toast } from "react-toastify";

import api from "../../services/api";

const OrderStatusModal = ({
    show,
    handleClose,
    order,
    fetchOrders,
}) => {

    const [loading, setLoading] = useState(false);

    const [status, setStatus] = useState("Pending");

    useEffect(() => {

        if (order) {

            setStatus(order.orderStatus);

        }

    }, [order]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await api.patch(

                `/orders/admin/status/${order._id}`,

                {
                    orderStatus: status,
                }

            );

            toast.success(res.data.message);

            fetchOrders();

            handleClose();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to update order"

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <Modal
            show={show}
            onHide={handleClose}
            centered
        >

            <Modal.Header closeButton>

                <Modal.Title>

                    Update Order Status

                </Modal.Title>

            </Modal.Header>

            <Form onSubmit={handleSubmit}>

                <Modal.Body>

                    <Form.Group>

                        <Form.Label>

                            Order Status

                        </Form.Label>

                        <Form.Select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }
                        >

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Confirmed">
                                Confirmed
                            </option>

                            <option value="Packed">
                                Packed
                            </option>

                            <option value="Shipped">
                                Shipped
                            </option>

                            <option value="Delivered">
                                Delivered
                            </option>

                            <option value="Cancelled">
                                Cancelled
                            </option>

                        </Form.Select>

                    </Form.Group>

                </Modal.Body>

                <Modal.Footer>

                    <Button
                        variant="secondary"
                        onClick={handleClose}
                    >

                        Cancel

                    </Button>

                    <Button
                        type="submit"
                        variant="success"
                        disabled={loading}
                    >

                        {

                            loading

                                ? "Updating..."

                                : "Update Status"

                        }

                    </Button>

                </Modal.Footer>

            </Form>

        </Modal>

    );

};

export default OrderStatusModal;