import { Link } from "react-router-dom";
import "./OfferBanner.css";

const OfferBanner = () => {
    return (
        <section className="offer-banner">
            <div className="container">
                <div className="row align-items-center">

                    <div className="col-lg-6">

                        <span className="offer-tag">
                            Limited Time Offer
                        </span>

                        <h2>
                            Get Up To <span>50% OFF</span>
                        </h2>

                        <p>
                            Fresh fruits, vegetables, dairy products and grocery
                            essentials delivered to your doorstep.
                        </p>

                        <Link
                            to="/products"
                            className="btn btn-warning btn-lg mt-3"
                        >
                            Shop Now
                        </Link>

                    </div>

                    <div className="col-lg-6 text-center">

                        <img
                            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800"
                            alt="Offer"
                            className="img-fluid offer-img"
                        />

                    </div>

                </div>
            </div>
        </section>
    );
};

export default OfferBanner;