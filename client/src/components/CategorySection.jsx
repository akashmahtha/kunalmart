import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import CategoryCard from "./CategoryCard";

const CategorySection = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get("/categories");

            // Change this according to your controller response
            setCategories(res.data.categories || res.data.data || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="container py-5">
                <div className="text-center">
                    <div className="spinner-border text-success"></div>
                </div>
            </section>
        );
    }

    return (
        <section className="container my-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2 className="fw-bold mb-1">
                        Shop by Category
                    </h2>

                    <p className="text-muted mb-0">
                        Find fresh groceries from your favourite categories
                    </p>
                </div>

                <Link
                    to="/categories"
                    className="btn btn-outline-success"
                >
                    View All
                </Link>

            </div>

            <div className="row g-4">

                {categories.length > 0 ? (

                    categories.map((category) => (

                        <div
                            key={category._id}
                            className="col-lg-2 col-md-3 col-sm-4 col-6"
                        >
                            <CategoryCard category={category} />
                        </div>

                    ))

                ) : (

                    <div className="col-12 text-center">

                        <h5>No Categories Found</h5>

                    </div>

                )}

            </div>

        </section>
    );
};

export default CategorySection;