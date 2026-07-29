import { useEffect, useState } from "react";
import { Card, Col, Form, Row, Spinner } from "react-bootstrap";
import AdminLayout from "../components/AdminLayout";
import ReviewTable from "../components/ReviewTable";
import CustomPagination from "../components/CustomPagination";
// import api from "../services/api";
import api from "../../services/api";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalReviews, setTotalReviews] = useState(0);

    const itemsPerPage = 10;

    const fetchReviews = async (currentPage = page) => {
        try {
            setLoading(true);

            const { data } = await api.get(
                `/admin/reviews?page=${currentPage}&limit=${itemsPerPage}&search=${search}`
            );

            if (data.success) {
                setReviews(data.reviews);
                setTotalReviews(data.totalReviews);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews(page);
    }, [page, search]);

    return (
        <AdminLayout>

            <div className="container-fluid">

                <Row className="mb-4 align-items-center">

                    <Col md={6}>
                        <h2 className="fw-bold">
                            Reviews Management
                        </h2>
                        <p className="text-muted mb-0">
                            Manage customer product reviews
                        </p>
                    </Col>

                    <Col md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Search reviews..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                        />
                    </Col>

                </Row>

                <Card className="shadow-sm border-0">

                    <Card.Body>

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <h5 className="mb-0">
                                Total Reviews : {totalReviews}
                            </h5>

                        </div>

                        {loading ? (

                            <div className="text-center py-5">

                                <Spinner
                                    animation="border"
                                    variant="primary"
                                />

                            </div>

                        ) : (

                            <>
                                <ReviewTable
                                    reviews={reviews}
                                    currentPage={page}
                                    itemsPerPage={itemsPerPage}
                                    fetchReviews={() => fetchReviews(page)}
                                />

                                <div className="d-flex justify-content-end mt-4">

                                    <CustomPagination
                                        totalItems={totalReviews}
                                        itemsPerPage={itemsPerPage}
                                        currentPage={page}
                                        setCurrentPage={setPage}
                                    />

                                </div>

                            </>

                        )}

                    </Card.Body>

                </Card>

            </div>

        </AdminLayout>
    );
};

export default Reviews;