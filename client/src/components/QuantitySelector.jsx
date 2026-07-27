import { useState, useEffect } from "react";
import "./QuantitySelector.css";

const QuantitySelector = ({
    stock = 0,
    value = 1,
    onChange,
}) => {

    const [quantity, setQuantity] = useState(value);

    useEffect(() => {
        setQuantity(value);
    }, [value]);

    const increase = () => {

        if (quantity < stock) {

            const newQty = quantity + 1;

            setQuantity(newQty);

            onChange && onChange(newQty);

        }

    };

    const decrease = () => {

        if (quantity > 1) {

            const newQty = quantity - 1;

            setQuantity(newQty);

            onChange && onChange(newQty);

        }

    };

    return (

        <div className="quantity-selector">

            <button
                onClick={decrease}
                disabled={quantity === 1}
            >
                -
            </button>

            <input
                type="text"
                value={quantity}
                readOnly
            />

            <button
                onClick={increase}
                disabled={quantity === stock}
            >
                +
            </button>

        </div>

    );

};

export default QuantitySelector;