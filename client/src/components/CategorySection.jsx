import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import api from "../services/api";
import CategoryCard from "./CategoryCard";

import "./CategorySection.css";

const CategorySection = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const sliderRef = useRef(null);

    const [showArrows, setShowArrows] = useState(false);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(false);

    // ============================
    // Fetch Categories
    // ============================

    useEffect(() => {

        fetchCategories();

    }, []);

    const fetchCategories = async () => {

        try {

            const res = await api.get("/categories");

            setCategories(

                res.data.categories ||

                res.data.data ||

                []

            );

        }

        catch (err) {

            console.log(err);

            setCategories([]);

        }

        finally {

            setLoading(false);

        }

    };

    // ============================
    // Check Slider
    // ============================

    const checkSlider = () => {

        const slider = sliderRef.current;

        if (!slider) return;

        const hasScroll =
            slider.scrollWidth >
            slider.clientWidth + 5;

        setShowArrows(hasScroll);

        setCanLeft(
            slider.scrollLeft > 5
        );

        setCanRight(
            slider.scrollLeft <
            slider.scrollWidth -
            slider.clientWidth - 5
        );

    };

    useEffect(() => {

        checkSlider();

        const slider = sliderRef.current;

        if (!slider) return;

        slider.addEventListener(
            "scroll",
            checkSlider
        );

        window.addEventListener(
            "resize",
            checkSlider
        );

        return () => {

            slider.removeEventListener(
                "scroll",
                checkSlider
            );

            window.removeEventListener(
                "resize",
                checkSlider
            );

        };

    }, [categories]);

    // ============================
    // Scroll
    // ============================

    const scroll = (dir) => {

        const slider = sliderRef.current;

        if (!slider) return;

        slider.scrollBy({

            left:
                dir === "left"
                    ? -350
                    : 350,

            behavior: "smooth",

        });

    };

    // ============================
    // Loading
    // ============================

    if (loading) {

        return (

            <section className="category-section">

                <div className="container">

                    <div className="category-header">

                        <div>

                            <h2>
                                Shop by Category
                            </h2>

                            <p>
                                Loading...
                            </p>

                        </div>

                    </div>

                    <div className="category-scroll">

                        {

                            [...Array(10)].map((_, i) => (

                                <div
                                    key={i}
                                    className="category-skeleton"
                                />

                            ))

                        }

                    </div>

                </div>

            </section>

        );

    }

    return (

        <section className="category-section">

            <div className="container">

                {/* HEADER */}

                <div className="category-header">

                    <div>

                        <h2>

                            Shop by Category

                        </h2>



                    </div>

                    <Link
                        to="/categories"
                        className="view-all-link"
                    >

                        View All →

                    </Link>

                </div>

                {/* SLIDER */}

                <div className="category-slider">

                    {

                        showArrows && (

                            <button

                                className="slider-arrow left"

                                onClick={() => scroll("left")}

                                disabled={!canLeft}

                            >

                                <FaChevronLeft />

                            </button>

                        )

                    }

                    <div

                        className="category-scroll"

                        ref={sliderRef}

                    >

                        {

                            categories.map((category) => (

                                <CategoryCard

                                    key={category._id}

                                    category={category}

                                />

                            ))

                        }

                    </div>

                    {

                        showArrows && (

                            <button

                                className="slider-arrow right"

                                onClick={() => scroll("right")}

                                disabled={!canRight}

                            >

                                <FaChevronRight />

                            </button>

                        )

                    }

                </div>

            </div>

        </section>

    );

};

export default CategorySection;