import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import CategorySidebar from "../components/CategorySidebar";
import CategoryProducts from "../components/CategoryProducts";

import "./CategoriesPage.css";

const CategoriesPage = () => {

    const [selectedCategory, setSelectedCategory] = useState(null);

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