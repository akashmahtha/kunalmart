import {
    FaTruck,
    FaLeaf,
    FaTag,
    FaShieldAlt,
    FaUndo,
} from "react-icons/fa";

import "./WhyChooseUs.css";


const WhyChooseUs = () => {

    const features = [

        {
            icon: <FaTruck />,
            title: "Fast Delivery",
            text: "Get your order in 30–45 minutes",
        },

        {
            icon: <FaLeaf />,
            title: "Farm Fresh",
            text: "Carefully selected fresh products",
        },

        {
            icon: <FaTag />,
            title: "Best Prices",
            text: "Best quality at best prices",
        },

        {
            icon: <FaShieldAlt />,
            title: "Secure Payments",
            text: "100% safe & secure payments",
        },

        {
            icon: <FaTag />,
            title: "Daily Offers",
            text: "Exciting offers everyday",
        },

        {
            icon: <FaUndo />,
            title: "Easy Returns",
            text: "Hassle-free returns policy",
        },

    ];


    return (

        <section className="why-section">

            <div className="why-container">

                {/* TITLE */}

                <div className="why-header">

                    <h2>
                        Why Choose KunalMart?
                    </h2>

                </div>


                {/* FEATURES */}

                <div className="why-features">

                    {features.map((item, index) => (

                        <div
                            className="why-feature-card"
                            key={index}
                        >

                            <div className="why-feature-icon">
                                {item.icon}
                            </div>


                            <div className="why-feature-content">

                                <h4>
                                    {item.title}
                                </h4>

                                <p>
                                    {item.text}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

};


export default WhyChooseUs;