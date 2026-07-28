import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

import api from "../services/api";
import CategoryCard from "./CategoryCard";

import "./CategorySection.css";


const CategorySection = () => {


    // =========================
    // STATES
    // =========================

    const [categories, setCategories] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    // =========================
    // SCROLL REF
    // =========================

    const categoryScrollRef =
        useRef(null);


    // =========================
    // ARROW STATES
    // =========================

    const [isScrollable, setIsScrollable] =
        useState(false);

    const [canScrollLeft, setCanScrollLeft] =
        useState(false);

    const [canScrollRight, setCanScrollRight] =
        useState(false);


    // =========================
    // FETCH CATEGORIES
    // =========================

    useEffect(() => {

        fetchCategories();

    }, []);


    const fetchCategories = async () => {

        try {

            const res =
                await api.get("/categories");


            setCategories(

                res.data.categories ||

                res.data.data ||

                []

            );

        }

        catch (error) {

            console.error(
                "Error fetching categories:",
                error
            );


            setCategories([]);

        }

        finally {

            setLoading(false);

        }

    };


    // =========================
    // CHECK SCROLL POSITION
    // =========================

    const checkScrollPosition = () => {


        const container =
            categoryScrollRef.current;


        if (!container) return;


        // Check whether horizontal scroll exists

        const hasScroll =

            container.scrollWidth >

            container.clientWidth + 1;


        setIsScrollable(hasScroll);


        // Left arrow state

        setCanScrollLeft(

            container.scrollLeft > 0

        );


        // Right arrow state

        setCanScrollRight(

            container.scrollLeft +

            container.clientWidth

            <

            container.scrollWidth - 1

        );

    };


    // =========================
    // SCROLL EVENT
    // =========================

    useEffect(() => {


        const container =
            categoryScrollRef.current;


        if (!container) return;


        // Initial check

        checkScrollPosition();


        // On scroll

        container.addEventListener(

            "scroll",

            checkScrollPosition

        );


        // On window resize

        window.addEventListener(

            "resize",

            checkScrollPosition

        );


        return () => {


            container.removeEventListener(

                "scroll",

                checkScrollPosition

            );


            window.removeEventListener(

                "resize",

                checkScrollPosition

            );

        };


    }, [categories]);


    // =========================
    // SCROLL CATEGORIES
    // =========================

    const scrollCategories = (direction) => {


        const container =
            categoryScrollRef.current;


        if (!container) return;


        const scrollAmount =
            container.clientWidth * 0.8;


        container.scrollBy({

            left:

                direction === "left"

                    ? -scrollAmount

                    : scrollAmount,


            behavior: "smooth",

        });

    };


    // =========================
    // LOADING UI
    // =========================

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

                                Everything you need for your daily grocery shopping

                            </p>

                        </div>


                    </div>


                    <div className="category-scroll">


                        {[

                            1,

                            2,

                            3,

                            4,

                            5,

                            6,

                        ].map((item) => (


                            <div

                                key={item}

                                className="category-item"

                            >

                                <div className="category-skeleton">

                                </div>

                            </div>


                        ))}


                    </div>


                </div>

            </section>

        );

    }


    // =========================
    // MAIN UI
    // =========================

    return (


        <section className="category-section">


            <div className="container">


                {/* =========================
                    HEADER
                ========================= */}


                <div className="category-header">


                    <div>


                        <h2>

                            Shop by Category

                        </h2>


                        <p>

                            Everything you need for your daily grocery shopping

                        </p>


                    </div>


                    <Link

                        to="/categories"

                        className="view-all-link"

                    >

                        View All →

                    </Link>


                </div>


                {/* =========================
                    CATEGORY SLIDER
                ========================= */}


                {

                    categories.length > 0 ? (


                        <div className="category-slider-wrapper">


                            {/* LEFT ARROW */}

                            {

                                isScrollable && (


                                    <button

                                        className="category-arrow category-arrow-left"


                                        onClick={() =>

                                            scrollCategories("left")

                                        }


                                        disabled={

                                            !canScrollLeft

                                        }


                                        aria-label="Previous categories"

                                    >


                                        <FaChevronLeft />


                                    </button>


                                )

                            }


                            {/* CATEGORY LIST */}


                            <div

                                className="category-scroll"

                                ref={

                                    categoryScrollRef

                                }

                            >


                                {

                                    categories.map(

                                        (category) => (


                                            <div

                                                key={

                                                    category._id

                                                }

                                                className="category-item"

                                            >


                                                <CategoryCard

                                                    category={

                                                        category

                                                    }

                                                />


                                            </div>


                                        )

                                    )

                                }


                            </div>


                            {/* RIGHT ARROW */}


                            {

                                isScrollable && (


                                    <button

                                        className="category-arrow category-arrow-right"


                                        onClick={() =>

                                            scrollCategories("right")

                                        }


                                        disabled={

                                            !canScrollRight

                                        }


                                        aria-label="Next categories"

                                    >


                                        <FaChevronRight />


                                    </button>


                                )

                            }


                        </div>


                    ) : (


                        <div className="text-center py-4">


                            <h5>

                                No Categories Found

                            </h5>


                        </div>


                    )

                }


            </div>


        </section>


    );

};


export default CategorySection;