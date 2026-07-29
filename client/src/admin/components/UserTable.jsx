import { useState } from "react";
import {
    Table,
    Button,
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

const UserTable = ({
    users,
    fetchUsers,
    currentPage,
    itemsPerPage,
}) => {

    const [selectedUser, setSelectedUser] = useState(null);

    const [showModal, setShowModal] = useState(false);

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

        if (!window.confirm("Delete this user?")) return;

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

            <div className="table-responsive">

                <Table
                    hover
                    bordered
                    className="align-middle order-table mb-0"
                >

                    <thead className="user-table-header">

                        <tr>

                            <th width="60">#</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Phone</th>

                            <th width="120">Role</th>

                            <th width="120">Status</th>

                            <th width="170">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            users.length > 0 ? (

                                users.map((user, index) => (

                                    <tr key={user._id}>

                                        <td>

                                            {(currentPage - 1) * itemsPerPage + index + 1}

                                        </td>

                                        <td>

                                            {user.name}

                                        </td>

                                        <td>

                                            {user.email}

                                        </td>

                                        <td>

                                            {user.phone}

                                        </td>

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
                                                    user.isBlocked
                                                        ? <FaCheck />
                                                        : <FaBan />
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
                                        colSpan="7"
                                        className="text-center py-5"
                                    >

                                        No Users Found

                                    </td>

                                </tr>

                            )

                        }

                    </tbody>

                </Table>

            </div>

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