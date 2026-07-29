import { useEffect, useState } from "react";
import {
    Card,
    Button,
    Spinner,
} from "react-bootstrap";

import api from "../../services/api";

import AdminLayout from "../components/AdminLayout";
import CategoryTable from "../components/CategoryTable";
import AddCategoryModal from "../components/AddCategoryModal";

import CustomPagination from "../components/CustomPagination";

const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showAdd, setShowAdd] = useState(false);

    // Pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCategories, setTotalCategories] = useState(0);

    const itemsPerPage = 10;

    useEffect(() => {

        fetchCategories(page);

    }, [page]);

    // ==========================
    // Fetch Categories
    // ==========================

    const fetchCategories = async (currentPage = page) => {

        try {

            setLoading(true);

            const res = await api.get(
                `/categories?page=${currentPage}&limit=${itemsPerPage}`
            );

            setCategories(res.data.categories);

            setPage(res.data.page);

            setTotalPages(res.data.pages);

            setTotalCategories(res.data.totalCategories);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <AdminLayout>

            <Card className="border-0 shadow-sm">

                <Card.Body>

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h3 className="mb-0 fw-bold">

                            Category Management

                        </h3>

                        <Button
                            variant="success"
                            onClick={() => setShowAdd(true)}
                        >

                            + Add Category

                        </Button>

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

                            <>

                                <CategoryTable
                                    categories={categories}
                                    fetchCategories={() =>
                                        fetchCategories(page)
                                    }
                                    currentPage={page}
                                    itemsPerPage={itemsPerPage}
                                />

                                <CustomPagination
                                    totalItems={totalCategories}
                                    itemsPerPage={itemsPerPage}
                                    currentPage={page}
                                    setCurrentPage={setPage}
                                />

                            </>

                        )

                    }

                </Card.Body>

            </Card>

            <AddCategoryModal
                show={showAdd}
                handleClose={() => setShowAdd(false)}
                fetchCategories={() =>
                    fetchCategories(page)
                }
            />

        </AdminLayout>

    );

};

export default Categories;