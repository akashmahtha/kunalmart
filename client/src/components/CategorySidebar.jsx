import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "./CategorySidebar.css";

const CategorySidebar = ({
    selectedCategory,
    setSelectedCategory,
}) => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchParams] = useSearchParams();

    const categoryId = searchParams.get("category");

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {

        try {

            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/categories`
            );

            const list = data.categories || data;

            setCategories(list);

            // ==========================
            // If category comes from Home
            // ==========================

            if (categoryId) {

                const selected = list.find(
                    (cat) =>
                        cat._id === categoryId ||
                        cat.slug === categoryId
                );

                if (selected) {
                    setSelectedCategory(selected);
                } else if (list.length > 0) {
                    setSelectedCategory(list[0]);
                }

            } else {

                // View All
                if (list.length > 0) {
                    setSelectedCategory(list[0]);
                }

            }

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <div className="category-loading">
                Loading Categories...
            </div>
        );

    }

    return (

        <div className="category-sidebar">

            <div className="sidebar-header">
                Categories
            </div>

            <div className="sidebar-list">

                {categories.map((category) => (

                    <div
                        key={category._id}
                        className={`sidebar-item ${selectedCategory?._id === category._id
                                ? "active"
                                : ""
                            }`}
                        onClick={() => setSelectedCategory(category)}
                    >

                        <div className="sidebar-image">

                            <img
                                src={category.image}
                                alt={category.name}
                            />

                        </div>

                        <span>{category.name}</span>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default CategorySidebar;