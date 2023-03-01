import React, { useState } from "react";
import { IProduct } from "../models";

interface ProductProps {
  product: IProduct;
}
const Product: React.FC<ProductProps> = ({ product }) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleVisible = () => {
    setIsVisible((prev) => !prev);
  };
  const btnBgClassName = isVisible ? "bg-blue-400" : "bg-yellow-400";
  return (
    <div className="border py-2 px-4 rounded flex flex-col items-center mb-2">
      <img src={product.image} alt={product.title} className="w-1/6"></img>
      <p>{product.title}</p>
      <p className="font-bold">{product.price}</p>
      <button
        className={`py-2 px-4 border ${btnBgClassName}`}
        onClick={handleVisible}
      >
        {isVisible ? "Hide Details" : "Show Details"}
      </button>
      {isVisible && (
        <div>
          <p>{product.description}</p>
          <p>
            Rate:
            <span style={{ fontWeight: "bold" }}>{product?.rating?.rate}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Product;
