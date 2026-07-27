import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";

import api from "../../services/api";
import AdminLayout from "../components/AdminLayout";
import UserTable from "../components/UserTable";

const Users = () => {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {

        try {

            const res = await api.get("/admin/users");

            setUsers(res.data.users);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchUsers();

    }, []);

    return (

        <AdminLayout>

            <Card className="shadow-sm border-0">

                <Card.Body>

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h3 className="fw-bold mb-0">

                            Users Management

                        </h3>

                    </div>

                    {

                        loading ? (

                            <div className="text-center py-5">

                                <Spinner
                                    animation="border"
                                    variant="success"
                                />

                            </div>

                        ) : (

                            <UserTable
                                users={users}
                                fetchUsers={fetchUsers}
                            />

                        )

                    }

                </Card.Body>

            </Card>

        </AdminLayout>

    );

};

export default Users;