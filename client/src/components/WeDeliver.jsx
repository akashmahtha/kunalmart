import { FaMapMarkerAlt } from "react-icons/fa";
import "./WeDeliver.css";

const locations = [
    {
        name: "Rishra",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600",
    },
    {
        name: "Serampore",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600",
    },
    {
        name: "Konnagar",
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600",
    },
];

const WeDeliver = () => {
    return (
        <section className="we-deliver-section">

            <div className="container">

                <div className="section-heading">

                    <h2>
                        We Deliver In
                    </h2>

                    <p>
                        Fresh groceries delivered to your doorstep
                    </p>

                </div>

                <div className="row g-4">

                    {locations.map((location) => (

                        <div
                            className="col-lg-4 col-md-6"
                            key={location.name}
                        >

                            <div className="delivery-card">

                                <img
                                    src={location.image}
                                    alt={location.name}
                                />

                                <div className="delivery-overlay">

                                    <FaMapMarkerAlt />

                                    <div>

                                        <h5>
                                            {location.name}
                                        </h5>

                                        <span>
                                            Fast & fresh delivery
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                    <div className="col-lg-4 col-md-6">

                        <div className="coming-soon-card">

                            <FaMapMarkerAlt />

                            <h5>
                                Coming Soon
                            </h5>

                            <p>
                                More locations coming soon
                            </p>

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

export default WeDeliver;