import {
    Table,
    Button,
    Badge,
    Image,
} from "react-bootstrap";

import {
    FaEdit,
    FaTrash,
} from "react-icons/fa";

const ProductTable = ({
    products,
    loading,
    onEdit,
    onDelete,
    currentPage,
    itemsPerPage,
}) => {

    if (loading) {

        return (

            <div className="text-center py-5">

                <div
                    className="spinner-border text-success mb-3"
                    role="status"
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

                <h6>Loading Products...</h6>

            </div>

        );

    }

    return (

        <Table
            bordered
            hover
            responsive
            className="align-middle"
        >

            <thead className="table-success">

                <tr>

                    <th style={{ width: "60px" }}>
                        #
                    </th>

                    <th style={{ width: "110px" }}>
                        Images
                    </th>

                    <th>
                        Product
                    </th>

                    <th>
                        Category
                    </th>

                    <th>
                        Price
                    </th>

                    <th>
                        Pack
                    </th>

                    <th>
                        Stock
                    </th>

                    <th>
                        Badge
                    </th>

                    <th>
                        Status
                    </th>

                    <th
                        style={{
                            width: "130px",
                        }}
                    >
                        Actions
                    </th>

                </tr>

            </thead>

            <tbody>

                {

                    products.length > 0 ? (

                        products.map((product, index) => (

                            <tr key={product._id}>

                                {/* Serial */}

                                <td>

                                    {

                                        (currentPage - 1) *
                                        itemsPerPage +
                                        index +
                                        1

                                    }

                                </td>

                                {/* Images */}

                                <td>

                                    <div className="d-flex gap-1 flex-wrap">

                                        {

                                            product.images?.length ? (

                                                product.images
                                                    .slice(0, 2)
                                                    .map((img, i) => (

                                                        <Image
                                                            key={i}
                                                            src={img.url}
                                                            rounded
                                                            width={45}
                                                            height={45}
                                                            style={{
                                                                objectFit:
                                                                    "cover",
                                                                border:
                                                                    "1px solid #ddd",
                                                            }}
                                                        />

                                                    ))

                                            ) : (

                                                <Image
                                                    src="https://placehold.co/45x45?text=No"
                                                    rounded
                                                    width={45}
                                                    height={45}
                                                />

                                            )

                                        }

                                    </div>

                                </td>

                                {/* Product */}

                                <td>

                                    <div className="fw-bold">

                                        {product.name}

                                    </div>

                                    <small className="text-muted d-block">

                                        {product.brand || "No Brand"}

                                    </small>

                                    <div className="mt-2">

                                        {

                                            product.isFeatured && (

                                                <Badge
                                                    bg="warning"
                                                    text="dark"
                                                    className="me-1"
                                                >

                                                    Featured

                                                </Badge>

                                            )

                                        }

                                        {

                                            product.isTrending && (

                                                <Badge
                                                    bg="info"
                                                    className="me-1"
                                                >

                                                    Trending

                                                </Badge>

                                            )

                                        }

                                        {

                                            product.isBestSeller && (

                                                <Badge
                                                    bg="success"
                                                >

                                                    Best Seller

                                                </Badge>

                                            )

                                        }

                                    </div>

                                </td>

                                {/* Category */}

                                <td>

                                    {

                                        product.category?.name ||

                                        "-"

                                    }

                                </td>

                                {/* Price */}

                                <td>

                                    {

                                        product.discountPrice >

                                            0 ? (

                                            <>

                                                <div className="fw-bold text-success">

                                                    ₹

                                                    {

                                                        product.discountPrice

                                                    }

                                                </div>

                                                <small className="text-decoration-line-through text-muted">

                                                    ₹

                                                    {

                                                        product.price

                                                    }

                                                </small>

                                                {

                                                    product.offerPercentage >

                                                    0 && (

                                                        <div className="mt-1">

                                                            <Badge bg="danger">

                                                                {

                                                                    product.offerPercentage

                                                                }

                                                                % OFF

                                                            </Badge>

                                                        </div>

                                                    )

                                                }

                                            </>

                                        ) : (

                                            <span className="fw-bold">

                                                ₹

                                                {

                                                    product.price

                                                }

                                            </span>

                                        )

                                    }

                                </td>
                                {/* Pack */}

                                <td>

                                    <Badge bg="primary">

                                        {product.packSize} {product.unit}

                                    </Badge>

                                </td>

                                {/* Stock */}

                                <td>

                                    <Badge
                                        bg={
                                            product.stock > 50
                                                ? "success"
                                                : product.stock > 10
                                                    ? "warning"
                                                    : "danger"
                                        }
                                    >

                                        {product.stock} {product.unit}

                                    </Badge>

                                </td>

                                {/* Badge */}

                                <td>

                                    {product.badge ? (

                                        <Badge bg="dark">

                                            {product.badge}

                                        </Badge>

                                    ) : (

                                        <span className="text-muted">

                                            -

                                        </span>

                                    )}

                                </td>

                                {/* Status */}

                                <td>

                                    <Badge
                                        bg={
                                            product.status
                                                ? "success"
                                                : "secondary"
                                        }
                                    >

                                        {product.status
                                            ? "Active"
                                            : "Inactive"}

                                    </Badge>

                                </td>

                                {/* Actions */}

                                <td>

                                    <Button
                                        size="sm"
                                        variant="warning"
                                        className="me-2"
                                        onClick={() =>
                                            onEdit(product)
                                        }
                                    >

                                        <FaEdit />

                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() =>
                                            onDelete(product._id)
                                        }
                                    >

                                        <FaTrash />

                                    </Button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={10}
                                className="text-center py-5"
                            >

                                <Image
                                    src="https://placehold.co/120x120?text=📦"
                                    width={120}
                                    height={120}
                                    className="mb-3"
                                />

                                <h5 className="fw-bold">

                                    No Products Found

                                </h5>

                                <p className="text-muted mb-0">

                                    No products have been added yet.

                                </p>

                            </td>

                        </tr>

                    )

                }

            </tbody>

        </Table>

    );

};

export default ProductTable;