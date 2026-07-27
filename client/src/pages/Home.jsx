import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import ProductSection from "../components/ProductSection";
import OfferBanner from "../components/OfferBanner";
import WhyChooseUs from "../components/WhyChooseUs";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import FlashSale from "../components/FlashSale";

const Home = () => {
    return (
        <>
            <Navbar />

            <Hero />

            <CategorySection />
            <FlashSale />

            <ProductSection
                title="Featured Products"
                endpoint="/products/featured"
            />

            <ProductSection
                title="Trending Products"
                endpoint="/products/trending"
            />

            <ProductSection
                title="Best Sellers"
                endpoint="/products/bestseller"
            />

            <ProductSection
                title="Latest Products"
                endpoint="/products/latest"
            />

            <OfferBanner />

            <WhyChooseUs />

            <Newsletter />

            <Footer />
        </>
    );
};

export default Home;