import { FaMapMarkerAlt, FaLocationArrow } from "react-icons/fa";
import "./DeliverySection.css";

const DeliverySection = () => {
    const locations = [
        {
            name: "Rishra",
            image: "/delivery/rishra.jpg",
            text: "Fast delivery at your doorstep",
        },
        {
            name: "Serampore",
            image: "/delivery/serampore.jpg",
            text: "Fast delivery at your doorstep",
        },
        {
            name: "Konnagar",
            image: "/delivery/konnagar.jpg",
            text: "Fast delivery at your doorstep",
        },
    ];

    return (
        <section className="delivery-section">

            <div className="delivery-container">

                {/* Heading */}
                <div className="delivery-heading-row">
                    <h2>We Deliver In</h2>

                    <span className="delivery-view-all">
                        View All →
                    </span>
                </div>

                {/* Location Cards */}
                <div className="delivery-grid">

                    {locations.map((location) => (
                        <div
                            className="delivery-card"
                            key={location.name}
                        >

                            <div className="delivery-image">
                                <img
                                    src={location.image}
                                    alt={location.name}
                                />

                                <div className="delivery-pin">
                                    <FaMapMarkerAlt />
                                </div>
                            </div>

                            <div className="delivery-info">

                                <h3>
                                    {location.name}
                                </h3>

                                <p>
                                    <FaLocationArrow />
                                    {location.text}
                                </p>

                            </div>

                        </div>
                    ))}

                    {/* Coming Soon Card */}
                    <div className="delivery-card coming-card">

                        <div className="coming-content">

                            <div className="coming-icon">
                                <FaMapMarkerAlt />
                            </div>

                            <h3>
                                Coming Soon to
                                <br />
                                More Locations...
                            </h3>

                            <button>
                                Stay Tuned
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default DeliverySection;