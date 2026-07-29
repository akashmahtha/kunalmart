import { Modal, Button, Badge, Row, Col, Image } from "react-bootstrap";

const ReviewDetailsModal = ({ show, handleClose, review }) => {
    if (!review) return null;

    const renderStars = (rating) => {
        return (
            <>
                {"★".repeat(rating)}
                {"☆".repeat(5 - rating)}
            </>
        );
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Review Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Row>

                    <Col md={4} className="text-center">

                        <Image
                            src={
                                review.product?.images?.[0]?.url ||
                                "/placeholder.png"
                            }
                            fluid
                            rounded
                            style={{
                                maxHeight: "220px",
                                objectFit: "cover",
                            }}
                        />

                    </Col>

                    <Col md={8}>

                        <h4>{review.product?.name}</h4>

                        <hr />

                        <p>
                            <strong>Customer :</strong>{" "}
                            {review.user?.name}
                        </p>

                        <p>
                            <strong>Email :</strong>{" "}
                            {review.user?.email}
                        </p>

                        <p>
                            <strong>Rating :</strong>{" "}
                            <Badge bg="warning" text="dark">
                                {renderStars(review.rating)}
                            </Badge>
                        </p>

                        <p>
                            <strong>Comment :</strong>
                        </p>

                        <div
                            className="border rounded p-3 bg-light"
                            style={{
                                minHeight: "100px",
                            }}
                        >
                            {review.comment}
                        </div>

                        <hr />

                        <p>
                            <strong>Reviewed On :</strong>{" "}
                            {new Date(review.createdAt).toLocaleString()}
                        </p>

                        <p>
                            <strong>Review ID :</strong>{" "}
                            {review._id}
                        </p>

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

export default ReviewDetailsModal;