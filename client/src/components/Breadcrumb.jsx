import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const Breadcrumb = ({ product }) => {

    return (

        <nav className="mb-4">

            <ol className="breadcrumb align-items-center">

                <li className="breadcrumb-item">

                    <Link
                        to="/"
                        className="text-decoration-none"
                    >
                        Home
                    </Link>

                </li>

                <FaChevronRight
                    className="mx-2 text-muted"
                    size={10}
                />

                <li className="breadcrumb-item">

                    <Link
                        to="/products"
                        className="text-decoration-none"
                    >
                        Products
                    </Link>

                </li>

                <FaChevronRight
                    className="mx-2 text-muted"
                    size={10}
                />

                <li className="breadcrumb-item">

                    <Link
                        to={`/products?category=${product.category?._id}`}
                        className="text-decoration-none"
                    >
                        {product.category?.name}
                    </Link>

                </li>

                <FaChevronRight
                    className="mx-2 text-muted"
                    size={10}
                />

                <li
                    className="breadcrumb-item active fw-semibold"
                >

                    {product.name}

                </li>

            </ol>

        </nav>

    );

};

export default Breadcrumb;