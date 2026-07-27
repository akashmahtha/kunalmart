import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";

import api from "../services/api";

import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";
import "./Products.css";
import PaginationComponent from "../components/Pagination";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Products = () => {

    const location = useLocation();

    const keyword = new URLSearchParams(location.search).get("keyword") || "";

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);

    const [brands, setBrands] = useState([]);

    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const [filters, setFilters] = useState({

        category: "",

        brand: "",

        minPrice: "",

        maxPrice: "",

        sort: "",

        page: 1,

    });

    useEffect(() => {

        fetchCategories();

    }, []);

    useEffect(() => {

        fetchProducts();

    }, [filters, keyword]);

    // ==========================
    // Categories
    // ==========================

    const fetchCategories = async () => {

        try {

            const res = await api.get("/categories");

            setCategories(res.data.categories);

        } catch (error) {

            console.log(error);

        }

    };

    // ==========================
    // Products
    // ==========================

    const fetchProducts = async () => {

        try {

            setLoading(true);

            const res = await api.get("/products/search", {

                params: {

                    keyword,

                    category: filters.category,

                    brand: filters.brand,

                    minPrice: filters.minPrice,

                    maxPrice: filters.maxPrice,

                    sort: filters.sort,

                    page: filters.page,

                    limit: 12,

                },

            });

            setProducts(res.data.products);

            setCurrentPage(res.data.currentPage);

            setTotalPages(res.data.totalPages);

            // Dynamic Brands

            const uniqueBrands = [

                ...new Set(

                    res.data.products

                        .map((item) => item.brand)

                        .filter(Boolean)

                ),

            ];

            setBrands(uniqueBrands);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    return (
        <>

            <Navbar />

            <Container className="products-page py-5">




                <div className="filter-wrapper">

                    <ProductFilter
                        filters={filters}
                        setFilters={setFilters}
                        categories={categories}
                        brands={brands}
                    />

                </div>

                {

                    loading ? (

                        <div className="text-center py-5">

                            <Spinner animation="border" variant="success" />

                        </div>

                    ) : (

                        <>

                            <Row className="products-grid">

                                {

                                    products.length > 0 ? (

                                        products.map((product) => (

                                            <Col
                                                lg={3}
                                                md={4}
                                                sm={6}
                                                xs={12}
                                                key={product._id}
                                                className="mb-4"
                                            >

                                                <ProductCard
                                                    product={product}
                                                />

                                            </Col>

                                        ))

                                    ) : (

                                        <div className="no-products">

                                            <h4>No Products Found</h4>

                                        </div>

                                    )

                                }

                            </Row>

                            <PaginationComponent

                                currentPage={currentPage}

                                totalPages={totalPages}

                                onPageChange={(page) =>

                                    setFilters({

                                        ...filters,

                                        page,

                                    })

                                }

                            />

                        </>

                    )

                }

            </Container >

            <Footer />

        </>

    );

};

export default Products;