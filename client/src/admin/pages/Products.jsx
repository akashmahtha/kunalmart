import { useEffect, useState } from "react";
import {
    Button,
    Card,
    Form,
} from "react-bootstrap";
import { toast } from "react-toastify";

import api from "../../services/api";

import AdminLayout from "../components/AdminLayout";
import ProductTable from "../components/ProductTable";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";

import CustomPagination from "../../components/Pagination";

const Products = () => {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showAdd, setShowAdd] = useState(false);

    const [showEdit, setShowEdit] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);

    // Search
    const [search, setSearch] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    useEffect(() => {

        fetchProducts();

    }, []);

    // ==========================
    // Fetch Products
    // ==========================

    const fetchProducts = async () => {

        try {

            setLoading(true);

            const res = await api.get("/products");

            setProducts(res.data.products);

        } catch (error) {

            toast.error("Failed to load products");

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // Search
    // ==========================

    const filteredProducts = products.filter((product) =>
        product.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // ==========================
    // Pagination
    // ==========================

    const lastIndex = currentPage * itemsPerPage;

    const firstIndex = lastIndex - itemsPerPage;

    const currentProducts = filteredProducts.slice(
        firstIndex,
        lastIndex
    );

    // ==========================
    // Delete Product
    // ==========================

    const deleteProduct = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this product?"
        );

        if (!confirmDelete) return;

        try {

            const res = await api.delete(
                `/products/${id}`
            );

            toast.success(res.data.message);

            const updatedProducts = products.filter(
                (product) => product._id !== id
            );

            setProducts(updatedProducts);

            const totalPages = Math.ceil(
                updatedProducts.length /
                itemsPerPage
            );

            if (
                currentPage > totalPages &&
                currentPage > 1
            ) {
                setCurrentPage(totalPages);
            }

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Delete failed"

            );

        }

    };

    // ==========================
    // Edit Product
    // ==========================

    const editHandler = (product) => {

        setSelectedProduct(product);

        setShowEdit(true);

    };

    return (

        <AdminLayout>

            <Card className="border-0 shadow-sm">

                <Card.Body>

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h3 className="mb-0">

                            Products

                        </h3>

                        <Button
                            variant="success"
                            onClick={() =>
                                setShowAdd(true)
                            }
                        >

                            + Add Product

                        </Button>

                    </div>

                    <div className="d-flex justify-content-end mb-3">

                        <Form.Control
                            placeholder="Search Product..."
                            style={{
                                maxWidth: "300px",
                            }}
                            value={search}
                            onChange={(e) => {

                                setSearch(e.target.value);

                                setCurrentPage(1);

                            }}
                        />

                    </div>

                    <ProductTable
                        products={currentProducts}
                        loading={loading}
                        onEdit={editHandler}
                        onDelete={deleteProduct}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                    />

                    <CustomPagination

                        totalItems={filteredProducts.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />

                </Card.Body>

            </Card>

            <AddProductModal
                show={showAdd}
                handleClose={() =>
                    setShowAdd(false)
                }
                fetchProducts={fetchProducts}
            />

            <EditProductModal
                show={showEdit}
                handleClose={() =>
                    setShowEdit(false)
                }
                product={selectedProduct}
                fetchProducts={fetchProducts}
            />

        </AdminLayout>

    );

};

export default Products;