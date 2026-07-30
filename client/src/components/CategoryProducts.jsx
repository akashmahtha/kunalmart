import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import ProductCard from "./ProductCard";
import "./CategoryProducts.css";

const CategoryProducts = ({ selectedCategory }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("default");

    useEffect(() => {

        if (!selectedCategory?._id) {
            setProducts([]);
            return;
        }

        getProducts();

    }, [selectedCategory]);

    const getProducts = async () => {

        try {

            setLoading(true);

            // Backend connect hone ke baad ye API chalegi
            const { data } = await api.get(
                `/products/category/${selectedCategory._id}`
            );

            setProducts(data.products || data || []);

        } catch (err) {

            console.log(err);

            // Abhi backend ready nahi hai
            setProducts([]);

        } finally {

            setLoading(false);

        }

    };

    const filteredProducts = useMemo(() => {

        let list = [...products];

        if (search.trim()) {

            list = list.filter((item) =>
                item.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
            );

        }

        switch (sortBy) {

            case "low":

                list.sort(
                    (a, b) =>
                        (a.discountPrice || a.price) -
                        (b.discountPrice || b.price)
                );

                break;

            case "high":

                list.sort(
                    (a, b) =>
                        (b.discountPrice || b.price) -
                        (a.discountPrice || a.price)
                );

                break;

            case "name":

                list.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );

                break;

            default:
                break;
        }

        return list;

    }, [products, search, sortBy]);

    return (
        <div className="category-products">

            {/* Header */}

            <div className="category-header">

                <div>

                    <h2>
                        {selectedCategory?.name || "Products"}
                    </h2>

                    <p>

                        {filteredProducts.length} Products Available

                    </p>

                </div>

                <div className="category-actions">

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >

                        <option value="default">
                            Sort
                        </option>

                        <option value="low">
                            Price : Low to High
                        </option>

                        <option value="high">
                            Price : High to Low
                        </option>

                        <option value="name">
                            A - Z
                        </option>

                    </select>

                </div>

            </div>

            {/* Loading */}

            {loading ? (

                <div className="loading-box">

                    Loading Products...

                </div>

            ) : filteredProducts.length === 0 ? (

                <div className="empty-box">

                    <h3>No Products Found</h3>

                    <p>
                        Products will appear here after selecting a category.
                    </p>

                </div>

            ) : (

                <div className="products-grid">

                    {filteredProducts.map((product) => (

                        <ProductCard
                            key={product._id}
                            product={product}
                        />

                    ))}

                </div>

            )}

        </div>
    );
};

export default CategoryProducts;