import { Link } from "react-router-dom";
import "./CategoryCard.css";

const CategoryCard = ({ category }) => {

    const image =
        category.image?.url ||
        category.image ||
        "https://placehold.co/200x200?text=Category";

    return (

        <Link
            to={`/products?category=${category.slug || category._id}`}
            className="category-card-link"
        >

            <div className="category-card">

                {/* Category Image */}

                <div className="category-image-box">

                    <img
                        src={image}
                        alt={category.name}
                        className="category-image"
                        loading="lazy"
                    />

                </div>


                {/* Category Name */}

                <h6 className="category-name">

                    {category.name}

                </h6>


                {/* Product Count */}

                {

                    category.productCount !== undefined && (

                        <small className="category-product-count">

                            {category.productCount} Products

                        </small>

                    )

                }

            </div>

        </Link>

    );

};

export default CategoryCard;