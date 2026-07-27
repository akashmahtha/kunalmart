import { Modal, Button, Table, Badge } from "react-bootstrap";

const UserDetailsModal = ({
    show,
    handleClose,
    user,
}) => {

    if (!user) return null;

    return (

        <Modal
            show={show}
            onHide={handleClose}
            centered
            size="lg"
        >

            <Modal.Header closeButton>

                <Modal.Title>

                    User Details

                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                <Table
                    bordered
                    responsive
                >

                    <tbody>

                        <tr>

                            <th width="200">

                                Name

                            </th>

                            <td>

                                {user.name}

                            </td>

                        </tr>

                        <tr>

                            <th>

                                Email

                            </th>

                            <td>

                                {user.email}

                            </td>

                        </tr>

                        <tr>

                            <th>

                                Phone

                            </th>

                            <td>

                                {user.phone}

                            </td>

                        </tr>

                        <tr>

                            <th>

                                Role

                            </th>

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

                        </tr>

                        <tr>

                            <th>

                                Status

                            </th>

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

                        </tr>

                        <tr>

                            <th>

                                Joined On

                            </th>

                            <td>

                                {

                                    user.createdAt
                                        ? new Date(
                                            user.createdAt
                                        ).toLocaleDateString()
                                        : "-"

                                }

                            </td>

                        </tr>

                        <tr>

                            <th>

                                User ID

                            </th>

                            <td>

                                {user._id}

                            </td>

                        </tr>

                    </tbody>

                </Table>

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

export default UserDetailsModal;