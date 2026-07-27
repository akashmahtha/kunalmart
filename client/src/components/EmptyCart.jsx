import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const EmptyCart = () => {

    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-lg-6">

                    <div className="card border-0 shadow rounded-4">

                        <div className="card-body text-center py-5">

                            <div
                                className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                                style={{
                                    width: "120px",
                                    height: "120px",
                                }}
                            >

                                <FaShoppingCart
                                    size={55}
                                    className="text-success"
                                />

                            </div>

                            <h2 className="fw-bold mb-3">

                                Your Cart is Empty

                            </h2>

                            <p className="text-muted mb-4">

                                Looks like you haven't added any grocery items yet.

                            </p>

                            <Link
                                to="/products"
                                className="btn btn-success btn-lg px-5"
                            >

                                Start Shopping

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default EmptyCart;