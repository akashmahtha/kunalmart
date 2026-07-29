import { useState } from "react";
import { Table, Button, Badge, Modal } from "react-bootstrap";
import { FaEye, FaTrash } from "react-icons/fa";
// import api from "../services/api";
import api from "../../services/api";
import { toast } from "react-toastify";

const ReviewTable = ({
    reviews,
    currentPage,
    itemsPerPage,
    fetchReviews,
}) => {

    const [show, setShow] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    const handleView = (review) => {
        setSelectedReview(review);
        setShow(true);
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this review?"
        );

        if (!confirmDelete) return;

        try {

            const { data } = await api.delete(`/admin/reviews/${id}`);

            if (data.success) {
                toast.success(data.message);
                fetchReviews();
            }

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Failed to delete review"
            );

        }

    };

    const renderStars = (rating) => {

        return (
            <>
                {"★".repeat(rating)}
                {"☆".repeat(5 - rating)}
            </>
        );

    };

    return (
        <>
            <Table
                responsive
                hover
                bordered
                className="align-middle"
            >

                <thead className="user-table-header">

                    <tr>

                        <th>#</th>

                        <th>Product</th>

                        <th>Customer</th>

                        <th>Rating</th>

                        <th>Comment</th>

                        <th>Date</th>

                        <th className="text-center">
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {reviews.length === 0 ? (

                        <tr>

                            <td
                                colSpan="7"
                                className="text-center py-4"
                            >
                                No Reviews Found
                            </td>

                        </tr>

                    ) : (

                        reviews.map((review, index) => (

                            <tr key={review._id}>

                                <td>
                                    {(currentPage - 1) * itemsPerPage +
                                        index +
                                        1}
                                </td>

                                <td>
                                    <div className="d-flex align-items-center gap-2">

                                        <img
                                            src={
                                                review.product?.images?.[0]
                                                    ?.url ||
                                                "/placeholder.png"
                                            }
                                            alt=""
                                            width={45}
                                            height={45}
                                            style={{
                                                objectFit: "cover",
                                                borderRadius: 8,
                                            }}
                                        />

                                        <span>
                                            {review.product?.name}
                                        </span>

                                    </div>
                                </td>

                                <td>

                                    <div>
                                        <strong>
                                            {review.user?.name}
                                        </strong>

                                        <br />

                                        <small className="text-muted">
                                            {review.user?.email}
                                        </small>
                                    </div>

                                </td>

                                <td>

                                    <Badge bg="warning" text="dark">
                                        {renderStars(review.rating)}
                                    </Badge>

                                </td>

                                <td
                                    style={{
                                        maxWidth: 300,
                                    }}
                                >
                                    {review.comment}
                                </td>

                                <td>
                                    {new Date(
                                        review.createdAt
                                    ).toLocaleDateString()}
                                </td>

                                <td className="text-center">

                                    <Button
                                        size="sm"
                                        variant="primary"
                                        className="me-2"
                                        onClick={() =>
                                            handleView(review)
                                        }
                                    >
                                        <FaEye />
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() =>
                                            handleDelete(review._id)
                                        }
                                    >
                                        <FaTrash />
                                    </Button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </Table>

            {/* Review Details Modal */}

            <Modal
                show={show}
                onHide={() => setShow(false)}
                centered
            >

                <Modal.Header closeButton>

                    <Modal.Title>
                        Review Details
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    {selectedReview && (

                        <>

                            <h5>
                                {selectedReview.product?.name}
                            </h5>

                            <hr />

                            <p>

                                <strong>Customer :</strong>{" "}

                                {selectedReview.user?.name}

                            </p>

                            <p>

                                <strong>Email :</strong>{" "}

                                {selectedReview.user?.email}

                            </p>

                            <p>

                                <strong>Rating :</strong>{" "}

                                {renderStars(
                                    selectedReview.rating
                                )}

                            </p>

                            <p>

                                <strong>Comment :</strong>

                            </p>

                            <div className="border rounded p-3 bg-light">

                                {selectedReview.comment}

                            </div>

                            <p className="mt-3">

                                <strong>Date :</strong>{" "}

                                {new Date(
                                    selectedReview.createdAt
                                ).toLocaleString()}

                            </p>

                        </>

                    )}

                </Modal.Body>

            </Modal>
        </>
    );
};

export default ReviewTable;