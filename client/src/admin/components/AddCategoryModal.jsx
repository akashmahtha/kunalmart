import { useState } from "react";
import {
    Modal,
    Button,
    Form,
} from "react-bootstrap";
import { toast } from "react-toastify";

import api from "../../services/api";

const AddCategoryModal = ({
    show,
    handleClose,
    fetchCategories,
}) => {

    const [formData, setFormData] = useState({
        name: "",
        image: null,
        description: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { name, value, files } = e.target;

        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const data = new FormData();

            data.append("name", formData.name);
            data.append("description", formData.description);

            if (formData.image) {
                data.append("image", formData.image);
            }

            const res = await api.post(
                "/categories",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success(res.data.message);

            fetchCategories();

            setFormData({
                name: "",
                image: null,
                description: "",
            });

            handleClose();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to create category"
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

                    Add Category

                </Modal.Title>

            </Modal.Header>

            <Form onSubmit={handleSubmit}>

                <Modal.Body>

                    {/* Category Name */}

                    <Form.Group className="mb-3">

                        <Form.Label>

                            Category Name

                        </Form.Label>

                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter category name"
                            required
                        />

                    </Form.Group>

                    {/* Category Image */}

                    <Form.Group className="mb-3">

                        <Form.Label>

                            Category Image

                        </Form.Label>

                        <Form.Control
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                        />

                    </Form.Group>

                    {/* Description */}

                    <Form.Group>

                        <Form.Label>

                            Description

                        </Form.Label>

                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter category description"
                        />

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

                        {loading
                            ? "Saving..."
                            : "Add Category"}

                    </Button>

                </Modal.Footer>

            </Form>

        </Modal>

    );

};

export default AddCategoryModal;