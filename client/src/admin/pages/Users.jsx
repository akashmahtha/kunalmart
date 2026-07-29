import { useEffect, useState } from "react";
import { Card, Spinner, Form, Row, Col } from "react-bootstrap";

import api from "../../services/api";
import AdminLayout from "../components/AdminLayout";
import UserTable from "../components/UserTable";
import CustomPagination from "../components/CustomPagination";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [totalUsers, setTotalUsers] = useState(0);

    const itemsPerPage = 10;

    const fetchUsers = async (currentPage = page) => {
        try {
            setLoading(true);

            const { data } = await api.get(
                `/admin/users?page=${currentPage}&limit=${itemsPerPage}&search=${search}`
            );

            setUsers(data.users);
            setTotalUsers(data.totalUsers);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page, search]);

    return (
        <AdminLayout>

            <Card className="shadow-sm border-0">

                <Card.Body>

                    <Row className="align-items-center mb-4">

                        <Col>

                            <h3 className="fw-bold mb-0">
                                Users Management
                            </h3>

                        </Col>

                        <Col xs="auto">

                            <span className="badge bg-success fs-6">
                                {totalUsers} Users
                            </span>

                        </Col>

                    </Row>

                    <Row className="mb-3">

                        <Col md={4} className="ms-auto">

                            <Form.Control
                                placeholder="Search Users..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                            />

                        </Col>

                    </Row>

                    {loading ? (

                        <div className="text-center py-5">

                            <Spinner
                                animation="border"
                                variant="success"
                            />

                        </div>

                    ) : (

                        <>
                            <UserTable
                                users={users}
                                currentPage={page}
                                itemsPerPage={itemsPerPage}
                                fetchUsers={() => fetchUsers(page)}
                            />

                            <div className="mt-4">

                                <CustomPagination
                                    totalItems={totalUsers}
                                    itemsPerPage={itemsPerPage}
                                    currentPage={page}
                                    setCurrentPage={setPage}
                                />

                            </div>
                        </>

                    )}

                </Card.Body>

            </Card>

        </AdminLayout>
    );
};

export default Users;