import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

import api from "../services/api";
import ProductCard from "./ProductCard";

import "./FlashSale.css";


const FlashSale = () => {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);


    const [timeLeft, setTimeLeft] = useState({

        hours: 12,

        minutes: 0,

        seconds: 0,

    });


    const scrollRef = useRef(null);


    const [canScrollLeft, setCanScrollLeft] =
        useState(false);


    const [canScrollRight, setCanScrollRight] =
        useState(false);


    // =========================
    // Fetch Products
    // =========================

    useEffect(() => {

        fetchFlashProducts();


        const timer = setInterval(() => {


            setTimeLeft((prev) => {


                let {

                    hours,

                    minutes,

                    seconds,

                } = prev;


                if (seconds > 0) {

                    seconds--;

                }

                else if (minutes > 0) {

                    minutes--;

                    seconds = 59;

                }

                else if (hours > 0) {

                    hours--;

                    minutes = 59;

                    seconds = 59;

                }


                return {

                    hours,

                    minutes,

                    seconds,

                };

            });


        }, 1000);


        return () => clearInterval(timer);


    }, []);


    const fetchFlashProducts = async () => {

        try {

            const res = await api.get(

                "/products/trending"

            );


            setProducts(

                (res.data.products || [])
                    .slice(0, 10)

            );


        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // Check Scroll
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


    const scrollLeft = () => {

        scrollRef.current?.scrollBy({

            left: -600,

            behavior: "smooth",

        });

    };


    const scrollRight = () => {

        scrollRef.current?.scrollBy({

            left: 600,

            behavior: "smooth",

        });

    };


    if (loading) {

        return (

            <div className="container py-5 text-center">

                <div className="spinner-border text-success"></div>

            </div>

        );

    }


    if (!products.length) {

        return null;

    }


    return (

        <section className="flash-sale-section">

            <div className="container">


                {/* =========================
                    Sale Header
                ========================= */}

                <div className="flash-sale-header">


                    <div>

                        <h2>

                            🔥 Flash Sale

                        </h2>


                        <p>

                            Hurry! Limited time offers.

                        </p>

                    </div>


                    <div className="flash-timer">

                        <small>

                            Ends In

                        </small>


                        <strong>

                            {String(
                                timeLeft.hours
                            ).padStart(2, "0")}

                            :

                            {String(
                                timeLeft.minutes
                            ).padStart(2, "0")}

                            :

                            {String(
                                timeLeft.seconds
                            ).padStart(2, "0")}

                        </strong>

                    </div>


                    <Link

                        to="/products"

                        className="flash-view-all"

                    >

                        View All

                    </Link>

                </div>


                {/* =========================
                    Product Carousel
                ========================= */}

                <div className="flash-carousel-wrapper">


                    {

                        canScrollLeft && (

                            <button

                                className="
                                    flash-arrow
                                    flash-arrow-left
                                "

                                onClick={scrollLeft}

                            >

                                <FaChevronLeft />

                            </button>

                        )

                    }


                    <div

                        className="flash-product-carousel"

                        ref={scrollRef}

                    >

                        {

                            products.map((product) => (

                                <div

                                    className="flash-product-slide"

                                    key={product._id}

                                >

                                    <ProductCard

                                        product={product}

                                    />

                                </div>

                            ))

                        }

                    </div>


                    {

                        canScrollRight && (

                            <button

                                className="
                                    flash-arrow
                                    flash-arrow-right
                                "

                                onClick={scrollRight}

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


export default FlashSale;