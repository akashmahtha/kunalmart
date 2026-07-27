import { useEffect, useState } from "react";
import "./ProductImageGallery.css";

const ProductImageGallery = ({ images = [] }) => {

    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {

        if (images.length > 0) {
            setSelectedImage(images[0].url);
        }

    }, [images]);

    return (

        <div className="gallery">

            <div className="main-image">

                <img
                    src={
                        selectedImage ||
                        "https://placehold.co/600x600?text=No+Image"
                    }
                    alt="Product"
                />

            </div>

            {

                images.length > 1 && (

                    <div className="thumbnail-wrapper">

                        {

                            images.map((image, index) => (

                                <img
                                    key={index}
                                    src={image.url}
                                    alt=""
                                    className={
                                        selectedImage === image.url
                                            ? "thumbnail active"
                                            : "thumbnail"
                                    }
                                    onClick={() =>
                                        setSelectedImage(image.url)
                                    }
                                />

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

};

export default ProductImageGallery;