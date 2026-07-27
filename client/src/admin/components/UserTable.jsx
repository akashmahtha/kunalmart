import { useState } from "react";
import {
    Table,
    Button,
    Form,
    Badge,
} from "react-bootstrap";
import { toast } from "react-toastify";
import {
    FaEye,
    FaBan,
    FaCheck,
    FaTrash,
} from "react-icons/fa";

import api from "../../services/api";
import UserDetailsModal from "./UserDetailsModal";

const UserTable = ({ users, fetchUsers }) => {

    const [search, setSearch] = useState("");

    const [selectedUser, setSelectedUser] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search)
    );

    // =========================
    // View User
    // =========================

    const viewUser = async (id) => {

        try {

            const res = await api.get(`/admin/users/${id}`);

            setSelectedUser(res.data.user);

            setShowModal(true);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch user"
            );

        }

    };

    // =========================
    // Block / Unblock
    // =========================

    const toggleBlock = async (user) => {

        try {

            if (user.isBlocked) {

                await api.patch(
                    `/admin/users/unblock/${user._id}`
                );

                toast.success("User Unblocked");

            } else {

                await api.patch(
                    `/admin/users/block/${user._id}`
                );

                toast.success("User Blocked");

            }

            fetchUsers();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Action Failed"
            );

        }

    };

    // =========================
    // Delete User
    // =========================

    const deleteUser = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this user?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/admin/users/${id}`);

            toast.success("User Deleted");

            fetchUsers();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }

    };

    return (

        <>

            <div className="d-flex justify-content-end mb-3">

                <Form.Control
                    style={{ maxWidth: "300px" }}
                    placeholder="Search User..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>

            <Table
                responsive
                hover
                bordered
                className="align-middle"
            >

                <thead className="table-success">

                    <tr>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Phone</th>

                        <th>Role</th>

                        <th>Status</th>

                        <th width="220">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredUsers.length > 0 ? (

                            filteredUsers.map((user) => (

                                <tr key={user._id}>

                                    <td>{user.name}</td>

                                    <td>{user.email}</td>

                                    <td>{user.phone}</td>

                                    <td>

                                        <Badge
                                            bg={
                                                user.role === "admin"
                                                    ? "danger"
                                                    : "primary"
                                            }
                                        >

                                            {user.role}

                                        </Badge>

                                    </td>

                                    <td>

                                        {

                                            user.isBlocked ? (

                                                <Badge bg="danger">

                                                    Blocked

                                                </Badge>

                                            ) : (

                                                <Badge bg="success">

                                                    Active

                                                </Badge>

                                            )

                                        }

                                    </td>

                                    <td>

                                        <Button
                                            size="sm"
                                            variant="info"
                                            className="me-2"
                                            onClick={() =>
                                                viewUser(user._id)
                                            }
                                        >

                                            <FaEye />

                                        </Button>

                                        <Button
                                            size="sm"
                                            variant={
                                                user.isBlocked
                                                    ? "success"
                                                    : "warning"
                                            }
                                            className="me-2"
                                            onClick={() =>
                                                toggleBlock(user)
                                            }
                                        >

                                            {

                                                user.isBlocked ? (
                                                    <FaCheck />
                                                ) : (
                                                    <FaBan />
                                                )

                                            }

                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() =>
                                                deleteUser(user._id)
                                            }
                                        >

                                            <FaTrash />

                                        </Button>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center"
                                >

                                    No Users Found

                                </td>

                            </tr>

                        )

                    }

                </tbody>

            </Table>

            <UserDetailsModal
                show={showModal}
                handleClose={() =>
                    setShowModal(false)
                }
                user={selectedUser}
            />

        </>

    );

};

export default UserTable;