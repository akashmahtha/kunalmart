import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFeaturedProducts();
    }, []);

    const getFeaturedProducts = async () => {
        try {
            const res = await api.get("/products/featured");

            // Adjust this if your controller returns a different shape
            setProducts(res.data.products || []);
        } catch (err) {
            console.error(err);
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

                <h2 className="fw-bold">
                    Featured Products
                </h2>

                <Link
                    to="/products"
                    className="text-success text-decoration-none fw-semibold"
                >
                    View All →
                </Link>

            </div>

            <div className="row">

                {products.length > 0 ? (

                    products.map((product) => (

                        <div
                            className="col-lg-3 col-md-4 col-sm-6 mb-4"
                            key={product._id}
                        >
                            <ProductCard product={product} />
                        </div>

                    ))

                ) : (

                    <div className="text-center">
                        No Featured Products Found
                    </div>

                )}

            </div>

        </section>
    );
};

export default FeaturedProducts;