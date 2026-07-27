import { useEffect, useState } from "react";
import {
    Modal,
    Button,
    Form,
} from "react-bootstrap";
import { toast } from "react-toastify";

import api from "../../services/api";

const EditCategoryModal = ({
    show,
    handleClose,
    category,
    fetchCategories,
}) => {

    const [formData, setFormData] = useState({

        name: "",

        image: "",

        description: "",

    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (category) {

            setFormData({

                name: category.name || "",

                image: category.image || "",

                description: category.description || "",

            });

        }

    }, [category]);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await api.put(

                `/categories/${category._id}`,

                formData

            );

            toast.success(res.data.message);

            fetchCategories();

            handleClose();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to update category"

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

                    Edit Category

                </Modal.Title>

            </Modal.Header>

            <Form onSubmit={handleSubmit}>

                <Modal.Body>

                    <Form.Group className="mb-3">

                        <Form.Label>

                            Category Name

                        </Form.Label>

                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">

                        <Form.Label>

                            Image URL

                        </Form.Label>

                        <Form.Control
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                        />

                    </Form.Group>

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
                        variant="warning"
                        disabled={loading}
                    >

                        {

                            loading

                                ? "Updating..."

                                : "Update Category"

                        }

                    </Button>

                </Modal.Footer>

            </Form>

        </Modal>

    );

};

export default EditCategoryModal;