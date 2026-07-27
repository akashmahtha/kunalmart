const ProductInfoCard = ({ product }) => {
    return (
        <div className="card border-0 shadow-sm rounded-4 mt-4">

            <div className="card-body">

                <h5 className="fw-bold mb-4">
                    Product Information
                </h5>

                <table className="table table-borderless mb-0">

                    <tbody>

                        <tr>
                            <th width="35%">Brand</th>
                            <td>{product.brand || "Kunal Mart"}</td>
                        </tr>

                        <tr>
                            <th>Category</th>
                            <td>{product.category?.name}</td>
                        </tr>

                        <tr>
                            <th>Unit</th>
                            <td>{product.unit}</td>
                        </tr>

                        <tr>
                            <th>Available Stock</th>
                            <td>{product.stock}</td>
                        </tr>

                        <tr>
                            <th>Sold</th>
                            <td>{product.sold}</td>
                        </tr>

                        <tr>
                            <th>Status</th>

                            <td>

                                {product.stock > 0 ? (

                                    <span className="badge bg-success">
                                        In Stock
                                    </span>

                                ) : (

                                    <span className="badge bg-danger">
                                        Out of Stock
                                    </span>

                                )}

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default ProductInfoCard;