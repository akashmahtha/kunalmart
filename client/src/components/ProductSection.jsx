import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

import api from "../services/api";
import ProductCard from "./ProductCard";

import "./ProductSection.css";


const ProductSection = ({ title, endpoint }) => {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const scrollRef = useRef(null);

    const [canScrollLeft, setCanScrollLeft] = useState(false);

    const [canScrollRight, setCanScrollRight] = useState(false);


    // =========================
    // Fetch Products
    // =========================

    useEffect(() => {

        fetchProducts();

    }, [endpoint]);


    const fetchProducts = async () => {

        try {

            const res = await api.get(endpoint);

            setProducts(
                res.data.products || []
            );

        } catch (error) {

            console.error(
                "Error fetching products:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // Check Scroll Position
    // =========================

    const checkScroll = () => {

        const element = scrollRef.current;

        if (!element) return;


        setCanScrollLeft(

            element.scrollLeft > 5

        );


        setCanScrollRight(

            element.scrollLeft +
            element.clientWidth <
            element.scrollWidth - 5

        );

    };


    // =========================
    // Scroll Event
    // =========================

    useEffect(() => {

        const element = scrollRef.current;

        if (!element) return;


        checkScroll();


        element.addEventListener(
            "scroll",
            checkScroll
        );


        window.addEventListener(
            "resize",
            checkScroll
        );


        return () => {

            element.removeEventListener(
                "scroll",
                checkScroll
            );


            window.removeEventListener(
                "resize",
                checkScroll
            );

        };

    }, [products]);


    // =========================
    // Left Scroll
    // =========================

    const scrollLeft = () => {

        if (!scrollRef.current) return;


        scrollRef.current.scrollBy({

            left: -650,

            behavior: "smooth",

        });

    };


    // =========================
    // Right Scroll
    // =========================

    const scrollRight = () => {

        if (!scrollRef.current) return;


        scrollRef.current.scrollBy({

            left: 650,

            behavior: "smooth",

        });

    };


    // =========================
    // Loading
    // =========================

    if (loading) {

        return (

            <section className="product-section">

                <div className="container">

                    <div className="product-loading">

                        <div className="spinner-border text-success"></div>

                    </div>

                </div>

            </section>

        );

    }


    // =========================
    // No Products
    // =========================

    if (!products.length) {

        return null;

    }


    return (

        <section className="product-section">

            <div className="container">


                {/* =========================
                    Section Header
                ========================= */}

                <div className="product-section-header">


                    <div>

                        <h2 className="product-section-title">

                            {title}

                        </h2>


                        <p className="product-section-subtitle">

                            Fresh products specially selected for you

                        </p>

                    </div>


                    <Link
                        to="/products"
                        className="view-all-btn"
                    >

                        View All

                    </Link>

                </div>


                {/* =========================
                    Product Carousel
                ========================= */}

                <div className="product-carousel-wrapper">


                    {/* LEFT ARROW */}

                    {

                        canScrollLeft && (

                            <button
                                className="
                                    product-arrow
                                    product-arrow-left
                                "
                                onClick={scrollLeft}
                                aria-label="Previous products"
                            >

                                <FaChevronLeft />

                            </button>

                        )

                    }


                    {/* PRODUCTS */}

                    <div
                        className="product-carousel"
                        ref={scrollRef}
                    >

                        {

                            products.map((product) => (

                                <div
                                    className="product-slide"
                                    key={product._id}
                                >

                                    <ProductCard
                                        product={product}
                                    />

                                </div>

                            ))

                        }

                    </div>


                    {/* RIGHT ARROW */}

                    {

                        canScrollRight && (

                            <button
                                className="
                                    product-arrow
                                    product-arrow-right
                                "
                                onClick={scrollRight}
                                aria-label="Next products"
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


export default ProductSection;