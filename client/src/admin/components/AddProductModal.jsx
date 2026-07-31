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

const AddProductModal = ({
    show,
    handleClose,
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
        packSize: 1,
        stock: "",
        unit: "pcs",
        badge: "",
        isFeatured: false,
        isTrending: false,
        isBestSeller: false,
        images: [],
    });

    // ==========================
    // Load Categories
    // ==========================

    useEffect(() => {
        if (show) {
            fetchCategories();
        }
    }, [show]);

    const fetchCategories = async () => {
        try {
            const res = await api.get("/categories");
            setCategories(res.data.categories || []);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load categories");
        }
    };

    // ==========================
    // Cleanup Preview URLs
    // ==========================

    useEffect(() => {
        return () => {
            previewImages.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [previewImages]);

    // ==========================
    // Input Change
    // ==========================

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };

    // ==========================
    // Image Upload
    // ==========================

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 5) {
            toast.error("Maximum 5 images allowed");
            return;
        }

        const previews = files.map((file) =>
            URL.createObjectURL(file)
        );

        setFormData((prev) => ({
            ...prev,
            images: files,
        }));

        setPreviewImages(previews);
    };

    // ==========================
    // Remove Preview Image
    // ==========================

    const removeImage = (index) => {
        const newImages = [...formData.images];
        newImages.splice(index, 1);

        const newPreview = [...previewImages];
        URL.revokeObjectURL(newPreview[index]);
        newPreview.splice(index, 1);

        setFormData((prev) => ({
            ...prev,
            images: newImages,
        }));

        setPreviewImages(newPreview);
    };

    // ==========================
    // Reset Form
    // ==========================

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            category: "",
            brand: "",
            price: "",
            discountPrice: "",
            packSize: 1,
            stock: "",
            unit: "pcs",
            badge: "",
            isFeatured: false,
            isTrending: false,
            isBestSeller: false,
            images: [],
        });

        previewImages.forEach((url) =>
            URL.revokeObjectURL(url)
        );

        setPreviewImages([]);
    };

    // ==========================
    // Submit Product
    // ==========================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim())
            return toast.error("Product name is required");

        if (!formData.description.trim())
            return toast.error("Description is required");

        if (!formData.category)
            return toast.error("Please select category");

        if (!formData.price)
            return toast.error("Price is required");

        if (Number(formData.price) <= 0)
            return toast.error("Price must be greater than zero");

        if (
            formData.discountPrice &&
            Number(formData.discountPrice) >= Number(formData.price)
        ) {
            return toast.error(
                "Discount price should be less than price"
            );
        }

        if (!formData.stock)
            return toast.error("Stock is required");

        if (Number(formData.stock) < 0)
            return toast.error("Invalid stock");

        if (!formData.packSize)
            return toast.error("Pack size is required");

        if (formData.images.length === 0)
            return toast.error(
                "Please upload at least one product image"
            );

        try {
            setLoading(true);

            const data = new FormData();

            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("category", formData.category);
            data.append("brand", formData.brand);

            data.append("price", formData.price);
            data.append(
                "discountPrice",
                formData.discountPrice || 0
            );

            data.append("packSize", formData.packSize);
            data.append("stock", formData.stock);
            data.append("unit", formData.unit);
            data.append("badge", formData.badge);

            data.append(
                "isFeatured",
                String(formData.isFeatured)
            );

            data.append(
                "isTrending",
                String(formData.isTrending)
            );

            data.append(
                "isBestSeller",
                String(formData.isBestSeller)
            );

            formData.images.forEach((image) => {
                data.append("images", image);
            });
            const res = await api.post("/products", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success(res.data.message);

            fetchProducts();
            resetForm();
            handleClose();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to create product"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            show={show}
            onHide={() => {
                resetForm();
                handleClose();
            }}
            centered
            size="xl"
        >
            <Modal.Header closeButton>
                <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row className="g-3">

                        {/* Product Name */}
                        <Col md={6}>
                            <Form.Label>Product Name *</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter product name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Col>

                        {/* Brand */}
                        <Col md={6}>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                name="brand"
                                placeholder="Brand name"
                                value={formData.brand}
                                onChange={handleChange}
                            />
                        </Col>

                        {/* Description */}
                        <Col md={12}>
                            <Form.Label>Description *</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="description"
                                placeholder="Product description..."
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </Col>

                        {/* Category */}
                        <Col md={6}>
                            <Form.Label>Category *</Form.Label>
                            <Form.Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select Category
                                </option>

                                {categories.map((cat) => (
                                    <option
                                        key={cat._id}
                                        value={cat._id}
                                    >
                                        {cat.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>

                        {/* Badge */}
                        <Col md={6}>
                            <Form.Label>Badge</Form.Label>
                            <Form.Select
                                name="badge"
                                value={formData.badge}
                                onChange={handleChange}
                            >
                                <option value="">
                                    No Badge
                                </option>
                                <option value="New">
                                    New
                                </option>
                                <option value="Best Seller">
                                    Best Seller
                                </option>
                                <option value="Trending">
                                    Trending
                                </option>
                                <option value="Limited Stock">
                                    Limited Stock
                                </option>
                            </Form.Select>
                        </Col>

                        {/* Price */}
                        <Col md={3}>
                            <Form.Label>Price *</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </Col>

                        {/* Discount Price */}
                        <Col md={3}>
                            <Form.Label>Discount Price</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                name="discountPrice"
                                value={formData.discountPrice}
                                onChange={handleChange}
                            />
                        </Col>

                        {/* Pack Size */}
                        <Col md={3}>
                            <Form.Label>Pack Size *</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                name="packSize"
                                value={formData.packSize}
                                onChange={handleChange}
                                required
                            />
                        </Col>

                        {/* Stock */}
                        <Col md={3}>
                            <Form.Label>Stock *</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                            />
                        </Col>

                        {/* Unit */}
                        <Col md={6}>
                            <Form.Label>Unit</Form.Label>
                            <Form.Select
                                name="unit"
                                value={formData.unit}
                                onChange={handleChange}
                            >
                                <option value="pcs">Pieces (pcs)</option>
                                <option value="kg">Kilogram (kg)</option>
                                <option value="gm">Gram (gm)</option>
                                <option value="L">Liter (L)</option>
                                <option value="ml">Milliliter (ml)</option>
                                <option value="pack">Pack</option>
                                <option value="box">Box</option>
                                <option value="dozen">Dozen</option>
                                <option value="tray">Tray</option>
                                <option value="bottle">Bottle</option>
                            </Form.Select>
                        </Col>

                        {/* Product Status */}
                        <Col md={6} className="d-flex align-items-end">
                            <div className="w-100">
                                <Form.Check
                                    type="checkbox"
                                    label="Featured Product"
                                    name="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={handleChange}
                                />

                                <Form.Check
                                    type="checkbox"
                                    label="Trending Product"
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

                        {/* Product Images */}
                        <Col md={12}>
                            <Form.Label>
                                Product Images *
                            </Form.Label>

                            <Form.Control
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Col>

                        {/* Preview Images */}
                        {previewImages.length > 0 && (
                            <Col md={12}>
                                <Row className="g-3">
                                    {previewImages.map(
                                        (img, index) => (
                                            <Col
                                                xs={6}
                                                md={2}
                                                key={index}
                                            >
                                                <div className="position-relative">
                                                    <Image
                                                        src={img}
                                                        thumbnail
                                                        style={{
                                                            width: "100%",
                                                            height: "120px",
                                                            objectFit: "cover",
                                                        }}
                                                    />

                                                    <Button
                                                        size="sm"
                                                        variant="danger"
                                                        className="position-absolute top-0 end-0 m-1"
                                                        onClick={() =>
                                                            removeImage(index)
                                                        }
                                                    >
                                                        ✕
                                                    </Button>
                                                </div>
                                            </Col>
                                        )
                                    )}
                                </Row>
                            </Col>
                        )}

                    </Row>
                </Modal.Body>
                <Modal.Footer>

                    <Button
                        variant="secondary"
                        onClick={() => {
                            resetForm();
                            handleClose();
                        }}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="success"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                                Saving...
                            </>
                        ) : (
                            "Save Product"
                        )}
                    </Button>

                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddProductModal;