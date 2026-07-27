import { Row, Col, Form, Button } from "react-bootstrap";
import "./ProductFilter.css";

const ProductFilter = ({
    filters,
    setFilters,
    categories,
    brands,
}) => {

    const handleChange = (e) => {

        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
            page: 1,
        });

    };

    const resetFilters = () => {

        setFilters({
            category: "",
            brand: "",
            minPrice: "",
            maxPrice: "",
            sort: "",
            page: 1,
        });

    };

    return (

        <div className="filter-card">

            <div className="d-flex justify-content-between align-items-center mb-3">

                <div>

                    <h4 className="filter-title mb-0">
                        Filter Products
                    </h4>

                    <small className="text-muted">
                        Filter by category, brand and price
                    </small>

                </div>

                <Button
                    variant="outline-danger"
                    onClick={resetFilters}
                >
                    Reset Filters
                </Button>

            </div>

            <Row className="g-3">

                {/* Category */}

                <Col lg={3} md={6}>

                    <Form.Label>Category</Form.Label>

                    <Form.Select
                        name="category"
                        value={filters.category}
                        onChange={handleChange}
                    >

                        <option value="">
                            All Categories
                        </option>

                        {

                            categories.map((category) => (

                                <option
                                    key={category._id}
                                    value={category._id}
                                >

                                    {category.name}

                                </option>

                            ))

                        }

                    </Form.Select>

                </Col>

                {/* Brand */}

                <Col lg={2} md={6}>

                    <Form.Label>Brand</Form.Label>

                    <Form.Select
                        name="brand"
                        value={filters.brand}
                        onChange={handleChange}
                    >

                        <option value="">
                            All Brands
                        </option>

                        {

                            brands.map((brand, index) => (

                                <option
                                    key={index}
                                    value={brand}
                                >

                                    {brand}

                                </option>

                            ))

                        }

                    </Form.Select>

                </Col>

                {/* Min Price */}

                <Col lg={2} md={6}>

                    <Form.Label>Min Price</Form.Label>

                    <Form.Control
                        type="number"
                        placeholder="₹0"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleChange}
                    />

                </Col>

                {/* Max Price */}

                <Col lg={2} md={6}>

                    <Form.Label>Max Price</Form.Label>

                    <Form.Control
                        type="number"
                        placeholder="₹5000"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleChange}
                    />

                </Col>

                {/* Sort */}

                <Col lg={3} md={12}>

                    <Form.Label>Sort By</Form.Label>

                    <Form.Select
                        name="sort"
                        value={filters.sort}
                        onChange={handleChange}
                    >

                        <option value="">
                            Default
                        </option>

                        <option value="latest">
                            Latest
                        </option>

                        <option value="oldest">
                            Oldest
                        </option>

                        <option value="priceLow">
                            Price : Low → High
                        </option>

                        <option value="priceHigh">
                            Price : High → Low
                        </option>

                        <option value="name">
                            Name (A-Z)
                        </option>

                    </Form.Select>

                </Col>

            </Row>

        </div>

    );

};

export default ProductFilter;