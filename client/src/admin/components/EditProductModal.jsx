import { useEffect, useState } from "react";
import {
    Modal,
    Button,
    Form,
    Row,
    Col,
    Image,
} from "react-bootstrap";
import { toast } from "react-toastify";
import api from "../../services/api";

const EditProductModal = ({
    show,
    handleClose,
    product,
    fetchProducts,
}) => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        brand: "",
        price: "",
        discountPrice: "",
        stock: "",
        unit: "pcs",
        isFeatured: false,
        isTrending: false,
        isBestSeller: false,
        images: [],
    });

    useEffect(() => {

        if (show) {
            fetchCategories();
        }

    }, [show]);

    useEffect(() => {

        if (product) {

            setFormData({
                name: product.name || "",
                description: product.description || "",
                category: product.category?._id || "",
                brand: product.brand || "",
                price: product.price || "",
                discountPrice: product.discountPrice || "",
                stock: product.stock || "",
                unit: product.unit || "pcs",
                isFeatured: product.isFeatured,
                isTrending: product.isTrending,
                isBestSeller: product.isBestSeller,
                images: [],
            });

            if (product.images) {
                setPreviewImages(
                    product.images.map((img) => img.url)
                );
            }

        }

    }, [product]);

    const fetchCategories = async () => {

        try {

            const res = await api.get("/categories");

            setCategories(res.data.categories);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        });

    };

    const handleImageChange = (e) => {

        const files = Array.from(e.target.files);

        setFormData({
            ...formData,
            images: files,
        });

        const previews = files.map((file) =>
            URL.createObjectURL(file)
        );

        setPreviewImages(previews);

    };
    // ==========================
    // Update Product
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const data = new FormData();

            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("category", formData.category);
            data.append("brand", formData.brand);
            data.append("price", formData.price);
            data.append("discountPrice", formData.discountPrice);
            data.append("stock", formData.stock);
            data.append("unit", formData.unit);

            data.append("isFeatured", formData.isFeatured);
            data.append("isTrending", formData.isTrending);
            data.append("isBestSeller", formData.isBestSeller);

            formData.images.forEach((image) => {
                data.append("images", image);
            });

            const res = await api.put(
                `/products/${product._id}`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success(res.data.message);

            fetchProducts();

            handleClose();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update product"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <Modal
            show={show}
            onHide={handleClose}
            size="xl"
            centered
        >

            <Modal.Header closeButton>

                <Modal.Title>

                    Edit Product

                </Modal.Title>

            </Modal.Header>

            <Form onSubmit={handleSubmit}>

                <Modal.Body>

                    <Row className="g-3">

                        <Col md={6}>

                            <Form.Label>

                                Product Name

                            </Form.Label>

                            <Form.Control
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </Col>

                        <Col md={6}>

                            <Form.Label>

                                Brand

                            </Form.Label>

                            <Form.Control
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                            />

                        </Col>

                        <Col md={12}>

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

                        </Col>

                        <Col md={6}>

                            <Form.Label>

                                Category

                            </Form.Label>

                            <Form.Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >

                                <option value="">

                                    Select Category

                                </option>

                                {

                                    categories.map((cat) => (

                                        <option
                                            key={cat._id}
                                            value={cat._id}
                                        >

                                            {cat.name}

                                        </option>

                                    ))

                                }

                            </Form.Select>

                        </Col>

                        <Col md={3}>

                            <Form.Label>

                                Price

                            </Form.Label>

                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />

                        </Col>

                        <Col md={3}>

                            <Form.Label>

                                Discount Price

                            </Form.Label>

                            <Form.Control
                                type="number"
                                name="discountPrice"
                                value={formData.discountPrice}
                                onChange={handleChange}
                            />

                        </Col>

                        <Col md={4}>

                            <Form.Label>

                                Stock

                            </Form.Label>

                            <Form.Control
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                            />

                        </Col>

                        <Col md={4}>

                            <Form.Label>

                                Unit

                            </Form.Label>

                            <Form.Select
                                name="unit"
                                value={formData.unit}
                                onChange={handleChange}
                            >

                                <option value="pcs">pcs</option>
                                <option value="kg">kg</option>
                                <option value="gm">gm</option>
                                <option value="L">L</option>
                                <option value="ml">ml</option>

                            </Form.Select>

                        </Col>

                        <Col md={4} className="d-flex align-items-end">

                            <div>

                                <Form.Check
                                    type="checkbox"
                                    label="Featured"
                                    name="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={handleChange}
                                />

                                <Form.Check
                                    type="checkbox"
                                    label="Trending"
                                    name="isTrending"
                                    checked={formData.isTrending}
                                    onChange={handleChange}
                                />

                                <Form.Check
                                    type="checkbox"
                                    label="Best Seller"
                                    name="isBestSeller"
                                    checked={formData.isBestSeller}
                                    onChange={handleChange}
                                />

                            </div>

                        </Col>

                        <Col md={12}>

                            <Form.Label>

                                Change Images

                            </Form.Label>

                            <Form.Control
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                            />

                        </Col>

                        {

                            previewImages.length > 0 && (

                                <Col md={12}>

                                    <Row>

                                        {

                                            previewImages.map((img, index) => (

                                                <Col
                                                    md={2}
                                                    xs={3}
                                                    key={index}
                                                    className="mb-3"
                                                >

                                                    <Image
                                                        src={img}
                                                        thumbnail
                                                        style={{
                                                            width: "100%",
                                                            height: "100px",
                                                            objectFit: "cover",
                                                        }}
                                                    />

                                                </Col>

                                            ))

                                        }

                                    </Row>

                                </Col>

                            )

                        }

                    </Row>

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

                                : "Update Product"

                        }

                    </Button>

                </Modal.Footer>

            </Form>

        </Modal>

    );

};

export default EditProductModal;