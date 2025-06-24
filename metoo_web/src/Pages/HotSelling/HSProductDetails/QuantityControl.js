import React, { useState, useEffect } from "react";
import "./QuantityControl.css";

import { useDispatch, useSelector } from 'react-redux';
import { receiveMessage } from '../../../State Mangement/action';
function QuantityControl({ initialValue, onQuantityChange }) {
  const [quantity, setQuantity] = useState(initialValue || 1);

  useEffect(() => {
    if (initialValue) {
      setQuantity(initialValue);
    }
  }, []);

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  return (
    <div className="quantity-controller">
      <button
        type="button"
        className="quantity-selector__button"
        aria-label="Decrease quantity"
        onClick={handleDecrement}
      >
        <span class="button-content">-</span>
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
        <span class="button-content">+</span>
      </button>
    </div>
  );
}
export default QuantityControl;
