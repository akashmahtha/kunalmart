// 📁 src/components/FlashSale.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "./ProductCard";

const FlashSale = () => {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [timeLeft, setTimeLeft] = useState({
        hours: 12,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {

        fetchFlashProducts();

        const timer = setInterval(() => {

            setTimeLeft((prev) => {

                let { hours, minutes, seconds } = prev;

                if (seconds > 0) {

                    seconds--;

                } else if (minutes > 0) {

                    minutes--;
                    seconds = 59;

                } else if (hours > 0) {

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

            const res = await api.get("/products/trending");

            setProducts(res.data.products.slice(0, 4));

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="container py-5 text-center">

                <div className="spinner-border text-success"></div>

            </div>

        );

    }

    return (

        <section className="container my-5">

            <div className="bg-danger rounded-4 p-4 text-white">

                <div className="d-flex justify-content-between align-items-center flex-wrap">

                    <div>

                        <h2 className="fw-bold mb-1">

                            🔥 Flash Sale

                        </h2>

                        <p className="mb-0">

                            Hurry! Limited time offers.

                        </p>

                    </div>

                    <div className="text-center">

                        <h5 className="mb-1">

                            Ends In

                        </h5>

                        <h3 className="fw-bold">

                            {String(timeLeft.hours).padStart(2, "0")} :
                            {String(timeLeft.minutes).padStart(2, "0")} :
                            {String(timeLeft.seconds).padStart(2, "0")}

                        </h3>

                    </div>

                    <Link
                        to="/products"
                        className="btn btn-light fw-bold"
                    >

                        View All

                    </Link>

                </div>

            </div>

            <div className="row mt-4">

                {

                    products.map((product) => (

                        <div
                            key={product._id}
                            className="col-lg-3 col-md-6 mb-4"
                        >

                            <ProductCard product={product} />

                        </div>

                    ))

                }

            </div>

        </section>

    );

};

export default FlashSale;