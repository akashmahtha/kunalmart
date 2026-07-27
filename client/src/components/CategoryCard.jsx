import { Link } from "react-router-dom";
import "./CategoryCard.css";

const CategoryCard = ({ category }) => {

    const image =
        category.image?.url ||
        category.image ||
        "https://placehold.co/150x150?text=Category";

    return (

        <Link
            to={`/products?category=${category.slug || category._id}`}
            className="text-decoration-none"
        >

            <div className="category-card">

                <div className="category-image-box">

                    <img
                        src={image}
                        alt={category.name}
                        className="category-image"
                    />

                </div>

                <h6 className="category-name">

                    {category.name}

                </h6>

                {category.productCount && (

                    <small className="text-muted">

                        {category.productCount} Products

                    </small>

                )}

            </div>

        </Link>

    );

};

export default CategoryCard;