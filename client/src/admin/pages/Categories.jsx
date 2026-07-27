import { useEffect, useState } from "react";
import { Card, Button, Spinner } from "react-bootstrap";

import api from "../../services/api";
import AdminLayout from "../components/AdminLayout";
import CategoryTable from "../components/CategoryTable";
import AddCategoryModal from "../components/AddCategoryModal";

const Categories = () => {

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showAdd, setShowAdd] = useState(false);

    const fetchCategories = async () => {

        try {

            const res = await api.get("/categories");

            setCategories(res.data.categories);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchCategories();

    }, []);

    return (

        <AdminLayout>

            <Card className="shadow-sm border-0">

                <Card.Body>

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h3 className="fw-bold mb-0">

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

                            <CategoryTable
                                categories={categories}
                                fetchCategories={fetchCategories}
                            />

                        )

                    }

                </Card.Body>

            </Card>

            <AddCategoryModal
                show={showAdd}
                handleClose={() => setShowAdd(false)}
                fetchCategories={fetchCategories}
            />

        </AdminLayout>

    );

};

export default Categories;