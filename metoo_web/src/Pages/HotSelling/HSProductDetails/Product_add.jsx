import React, { useState } from "react";
import "./HSPD1.css";

function Product_add({ onQuantityChange }) {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 0;
      onQuantityChange(newQuantity);
      return newQuantity;
    });
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      onQuantityChange(newQuantity);
      return newQuantity;
    });
  };

  return (
    <div className="quantity-control">
      <button
        type="button"
        className="quantity-selector__button"
        aria-label="Decrease quantity"
        onClick={handleDecrement}
      >
        -
      </button>
      <input
        type="text"
        className="QuantityDisplay"
        value={quantity}
        readOnly
      />
      <button
        type="button"
        className="quantity-selector__button"
        aria-label="Increase quantity"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
}

export default Product_add;
