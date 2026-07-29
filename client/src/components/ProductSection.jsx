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

    // ==========================
    // FETCH PRODUCTS
    // ==========================

    useEffect(() => {
        fetchProducts();
    }, [endpoint]);

    const fetchProducts = async () => {

        try {

            setLoading(true);

            const res = await api.get(endpoint);

            setProducts(
                res.data.products ||
                res.data.data ||
                []
            );

        } catch (err) {

            console.error(err);
            setProducts([]);

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // SCROLL
    // ==========================

    const checkScroll = () => {

        const slider = scrollRef.current;

        if (!slider) return;

        setCanScrollLeft(
            slider.scrollLeft > 5
        );

        setCanScrollRight(
            slider.scrollLeft + slider.clientWidth <
            slider.scrollWidth - 5
        );

    };

    useEffect(() => {

        const slider = scrollRef.current;

        if (!slider) return;

        checkScroll();

        slider.addEventListener(
            "scroll",
            checkScroll
        );

        window.addEventListener(
            "resize",
            checkScroll
        );

        return () => {

            slider.removeEventListener(
                "scroll",
                checkScroll
            );

            window.removeEventListener(
                "resize",
                checkScroll
            );

        };

    }, [products]);

    const scroll = (direction) => {

        if (!scrollRef.current) return;

        scrollRef.current.scrollBy({

            left:
                direction === "left"
                    ? -700
                    : 700,

            behavior: "smooth",

        });

    };

    // ==========================
    // LOADING
    // ==========================

    if (loading) {

        return (

            <section className="product-section">

                <div className="container">

                    <div className="product-header">

                        <div>

                            <h2>{title}</h2>

                            <p>
                                Fresh products specially selected for you
                            </p>

                        </div>

                    </div>

                    <div className="product-carousel">

                        {[1, 2, 3, 4, 5, 6].map((item) => (

                            <div
                                className="product-slide"
                                key={item}
                            >

                                <div className="product-skeleton"></div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

        );

    }

    if (!products.length) return null;

    return (

        <section className="product-section">

            <div className="container">

                {/* HEADER */}

                <div className="product-header">

                    <div>

                        <h2>{title}</h2>

                        <p>
                            Fresh products specially selected for you
                        </p>

                    </div>

                    <Link
                        to="/products"
                        className="view-all-btn"
                    >
                        View All →
                    </Link>

                </div>

                {/* SLIDER */}

                <div className="product-slider">

                    {canScrollLeft && (

                        <button
                            className="product-arrow left"
                            onClick={() => scroll("left")}
                        >

                            <FaChevronLeft />

                        </button>

                    )}

                    <div
                        className="product-carousel"
                        ref={scrollRef}
                    >

                        {products.map((product) => (

                            <div
                                key={product._id}
                                className="product-slide"
                            >

                                <ProductCard
                                    product={product}
                                />

                            </div>

                        ))}

                    </div>

                    {canScrollRight && (

                        <button
                            className="product-arrow right"
                            onClick={() => scroll("right")}
                        >

                            <FaChevronRight />

                        </button>

                    )}

                </div>

            </div>

        </section>

    );

};

export default ProductSection;