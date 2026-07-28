import { useEffect, useState } from "react";
import {
    Modal,
    Button,
    Form,
    Image,
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
        description: "",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (category) {

            setFormData({
                name: category.name || "",
                description: category.description || "",
            });

            setPreview(category.image || "");
            setImage(null);

        }

    }, [category]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const data = new FormData();

            data.append("name", formData.name);
            data.append("description", formData.description);

            if (image) {
                data.append("image", image);
            }

            const res = await api.put(
                `/categories/${category._id}`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
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
                            Category Image
                        </Form.Label>

                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                    </Form.Group>

                    {preview && (

                        <div className="mb-3 text-center">

                            <Image
                                src={preview}
                                thumbnail
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    objectFit: "cover",
                                }}
                            />

                        </div>

                    )}

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
                        {loading
                            ? "Updating..."
                            : "Update Category"}
                    </Button>

                </Modal.Footer>

            </Form>

        </Modal>

    );

};

export default EditCategoryModal;