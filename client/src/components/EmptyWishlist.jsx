import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const EmptyWishlist = () => {

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

                                <FaHeart
                                    size={55}
                                    className="text-danger"
                                />

                            </div>

                            <h2 className="fw-bold mb-3">

                                Your Wishlist is Empty

                            </h2>

                            <p className="text-muted mb-4">

                                Save your favourite grocery products here
                                and buy them later.

                            </p>

                            <Link
                                to="/products"
                                className="btn btn-success btn-lg px-5"
                            >

                                Explore Products

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default EmptyWishlist;