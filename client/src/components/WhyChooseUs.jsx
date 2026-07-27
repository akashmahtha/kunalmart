import {
    FaTruck,
    FaLeaf,
    FaHeadset,
    FaShieldAlt,
} from "react-icons/fa";

import "./WhyChooseUs.css";

const WhyChooseUs = () => {

    const features = [
        {
            icon: <FaTruck />,
            title: "Free Delivery",
            text: "Free delivery on all orders above ₹499.",
        },
        {
            icon: <FaLeaf />,
            title: "Fresh Products",
            text: "Fresh fruits, vegetables and groceries every day.",
        },
        {
            icon: <FaShieldAlt />,
            title: "Quality Guarantee",
            text: "100% quality checked products from trusted brands.",
        },
        {
            icon: <FaHeadset />,
            title: "24/7 Support",
            text: "Friendly customer support whenever you need help.",
        },
    ];

    return (

        <section className="why-section">

            <div className="container">

                <div className="text-center mb-5">

                    <h2 className="fw-bold">
                        Why Choose Kunal Mart?
                    </h2>

                    <p className="text-muted">
                        We deliver freshness, quality and convenience.
                    </p>

                </div>

                <div className="row">

                    {

                        features.map((item, index) => (

                            <div
                                className="col-lg-3 col-md-6 mb-4"
                                key={index}
                            >

                                <div className="feature-card">

                                    <div className="feature-icon">

                                        {item.icon}

                                    </div>

                                    <h5>{item.title}</h5>

                                    <p>{item.text}</p>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

};

export default WhyChooseUs;