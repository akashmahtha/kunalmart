import { Link } from "react-router-dom";
import "./OfferBanner.css";

const OfferBanner = () => {

    return (

        <section className="offer-banner">

            <div className="container">

                <div className="offer-wrapper row align-items-center">

                    <div className="col-lg-6">

                        <span className="offer-tag">

                            🛒 Limited Time Offer

                        </span>

                        <h2>

                            Stock Up On

                            <br />

                            <span>Daily Essentials</span>

                        </h2>

                        <p>

                            Fresh fruits, vegetables, dairy products and
                            everyday grocery essentials delivered fresh
                            to your doorstep.

                        </p>

                        <Link
                            to="/products"
                            className="offer-btn"
                        >

                            Shop Now

                        </Link>

                    </div>

                    <div className="col-lg-6 text-center">

                        <img
                            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200"
                            alt="Fresh Grocery"
                            className="offer-img"
                        />

                    </div>

                </div>

            </div>

        </section>

    );

};

export default OfferBanner;