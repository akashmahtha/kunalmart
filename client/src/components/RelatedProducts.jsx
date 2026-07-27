import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ productId }) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (productId) {
            fetchRelatedProducts();
        }

    }, [productId]);

    const fetchRelatedProducts = async () => {

        try {

            const res = await api.get(`/products/related/${productId}`);

            setProducts(res.data.products);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <section className="my-5">

                <h3 className="fw-bold mb-4">
                    Related Products
                </h3>

                <div className="text-center py-5">

                    <div className="spinner-border text-success"></div>

                </div>

            </section>

        );

    }

    if (products.length === 0) {

        return (

            <section className="my-5">

                <h3 className="fw-bold mb-4">
                    Related Products
                </h3>

                <div className="alert alert-light border">

                    No Related Products Found.

                </div>

            </section>

        );

    }

    return (

        <section className="my-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h3 className="fw-bold">

                    Related Products

                </h3>

            </div>

            <div className="row">

                {

                    products.map((product) => (

                        <div
                            className="col-lg-3 col-md-4 col-sm-6 mb-4"
                            key={product._id}
                        >

                            <ProductCard
                                product={product}
                            />

                        </div>

                    ))

                }

            </div>

        </section>

    );

};

export default RelatedProducts;