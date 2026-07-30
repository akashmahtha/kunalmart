import { Link } from "react-router-dom";
import "./CategoryCard.css";

const CategoryCard = ({ category }) => {

    const image =
        category.image?.url ||
        category.image ||
        "https://placehold.co/300x300?text=Category";

    // =====================================
    // Background Color Mapping
    // =====================================

    const getBackgroundColor = (name = "") => {

        const categoryName = name.toLowerCase();

        if (categoryName.includes("vegetable"))
            return "#EAF8E9";

        if (categoryName.includes("fruit"))
            return "#FFF8DD";

        if (categoryName.includes("dairy"))
            return "#EEF7FF";

        if (categoryName.includes("bakery"))
            return "#FFF3E8";

        if (categoryName.includes("beverage"))
            return "#FFF0F4";

        if (categoryName.includes("drink"))
            return "#FFF0F4";

        if (categoryName.includes("snack"))
            return "#FFF5E6";

        if (categoryName.includes("rice"))
            return "#F7F3E8";

        if (categoryName.includes("oil"))
            return "#FFFCEB";

        if (categoryName.includes("personal"))
            return "#F4F0FF";

        if (categoryName.includes("beauty"))
            return "#FCEEFF";

        if (categoryName.includes("clean"))
            return "#EEF8FF";

        if (categoryName.includes("baby"))
            return "#FFF5F8";

        if (categoryName.includes("pet"))
            return "#F8F5EC";

        return "#F6F8F6";
    };

    return (

        <Link
            to={`/categories?category=${category._id}`}
            className="category-card-link"
        >

            <div className="category-card">

                <div
                    className="category-image-box"
                    style={{
                        background: getBackgroundColor(category.name)
                    }}
                >

                    <img
                        src={image}
                        alt={category.name}
                        className="category-image"
                        loading="lazy"
                        onError={(e) => {
                            e.target.src =
                                "https://placehold.co/200x200?text=Category";
                        }}
                    />

                </div>

                <h6 className="category-name">
                    {category.name}
                </h6>

                {category.productCount !== undefined && (

                    <span className="category-product-count">
                        {category.productCount} Items
                    </span>

                )}

            </div>

        </Link>

    );

};

export default CategoryCard;