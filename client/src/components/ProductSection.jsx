import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "./ProductCard";

const ProductSection = ({ title, endpoint }) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, [endpoint]);

    const fetchProducts = async () => {
        try {

            const res = await api.get(endpoint);

            setProducts(res.data.products || []);

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

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold">
                        {title}
                    </h2>

                    <p className="text-muted mb-0">
                        Fresh products specially selected for you
                    </p>

                </div>

                <Link
                    to="/products"
                    className="btn btn-outline-success"
                >
                    View All
                </Link>

            </div>

            <div className="row g-4">

                {products.length > 0 ? (

                    products.map((product) => (

                        <div
                            className="col-lg-3 col-md-4 col-sm-6"
                            key={product._id}
                        >

                            <ProductCard product={product} />

                        </div>

                    ))

                ) : (

                    <div className="text-center">

                        No Products Found

                    </div>

                )}

            </div>

        </section>

    );
};

export default ProductSection;