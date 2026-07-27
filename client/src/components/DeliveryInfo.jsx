import {
    FaMapMarkerAlt,
    FaTruck,
    FaCheckCircle,
} from "react-icons/fa";

const DeliveryInfo = () => {

    return (

        <div className="card border-0 shadow-sm rounded-4 mt-4">

            <div className="card-body">

                <h5 className="fw-bold mb-4">

                    Delivery Information

                </h5>

                <div className="d-flex align-items-center mb-3">

                    <FaMapMarkerAlt
                        className="text-success me-3"
                        size={22}
                    />

                    <div>

                        <strong>Deliver to</strong>

                        <div className="text-muted">

                            Pune, Maharashtra

                        </div>

                    </div>

                </div>

                <div className="d-flex align-items-center mb-3">

                    <FaTruck
                        className="text-primary me-3"
                        size={22}
                    />

                    <div>

                        <strong>Estimated Delivery</strong>

                        <div className="text-muted">

                            20 - 30 Minutes

                        </div>

                    </div>

                </div>

                <div className="d-flex align-items-center">

                    <FaCheckCircle
                        className="text-success me-3"
                        size={22}
                    />

                    <div>

                        <strong>Free Delivery</strong>

                        <div className="text-muted">

                            On orders above ₹499

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default DeliveryInfo;