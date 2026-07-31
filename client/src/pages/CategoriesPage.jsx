import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import CategorySidebar from "../components/CategorySidebar";
import CategoryProducts from "../components/CategoryProducts";

import api from "../services/api";

import "./CategoriesPage.css";

const CategoriesPage = () => {

    const [searchParams] = useSearchParams();

    const categoryId = searchParams.get("category");

    const [selectedCategory, setSelectedCategory] = useState(null);

    // Load category from URL
    useEffect(() => {

        if (!categoryId) return;

        const fetchCategory = async () => {

            try {

                const res = await api.get("/categories");

                const categories =
                    res.data.categories ||
                    res.data.data ||
                    [];

                const selected = categories.find(
                    (cat) =>
                        cat._id === categoryId ||
                        cat.slug === categoryId
                );

                if (selected) {
                    setSelectedCategory(selected);
                }

            } catch (err) {
                console.log(err);
            }

        };

        fetchCategory();

    }, [categoryId]);

    return (
        <>
            <Navbar />

            <div className="category-page">

                <aside className="left-panel">

                    <CategorySidebar
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />

                </aside>

                <main className="right-panel">

                    <CategoryProducts
                        selectedCategory={selectedCategory}
                    />

                </main>

            </div>

            <Footer />
        </>
    );
};

export default CategoriesPage;