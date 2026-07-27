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

                Loading Products...

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

                    <th>#</th>

                    <th>Image</th>

                    <th>Name</th>

                    <th>Category</th>

                    <th>Brand</th>

                    <th>Price</th>

                    <th>Stock</th>

                    <th>Status</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {

                    products.length > 0 ? (

                        products.map((product, index) => (

                            <tr key={product._id}>

                                <td>

                                    {(currentPage - 1) * itemsPerPage + index + 1}

                                </td>

                                <td>

                                    <Image
                                        src={
                                            product.images?.length > 0
                                                ? product.images[0].url
                                                : "https://placehold.co/60x60"
                                        }
                                        width={60}
                                        height={60}
                                        rounded
                                        style={{
                                            objectFit: "cover",
                                        }}
                                    />

                                </td>

                                <td>

                                    {product.name}

                                </td>

                                <td>

                                    {product.category?.name}

                                </td>

                                <td>

                                    {product.brand || "-"}

                                </td>

                                <td>

                                    ₹{product.price}

                                </td>

                                <td>

                                    {product.stock}

                                </td>

                                <td>

                                    <Badge
                                        bg={
                                            product.status
                                                ? "success"
                                                : "secondary"
                                        }
                                    >

                                        {
                                            product.status
                                                ? "Active"
                                                : "Inactive"
                                        }

                                    </Badge>

                                </td>

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
                                colSpan="9"
                                className="text-center py-4"
                            >

                                No Products Found

                            </td>

                        </tr>

                    )

                }

            </tbody>

        </Table>

    );

};

export default ProductTable;