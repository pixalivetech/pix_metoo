import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HotSellingWeb } from "../../Api/hotselling";
import "./ProductDetail.css";

const SimilarProducts = ({ currentProductId }) => {
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    HotSellingWeb()
      .then((res) => {
        const value = res?.data?.result?.productList;
        const filteredProducts = value.filter(
          (product) => product._id !== currentProductId
        );
        setSimilarProducts(filteredProducts.slice(0, 6));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentProductId]);

  return (
    <div>
      <h3 className="text-headings-color mt-3">Products you may also like</h3>
      <div className="d-flex mt-4 gap-3 simliar-prod text-muted">
        {similarProducts.map((product) => (
          <Link
            key={product._id}
            to={`/productDetails?productId=${product._id}`}
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={product.productImage}
              className="d-block rounded-2"
              alt="Similar Product"
            />
            <span className="text-headings-color text_small mt-1 text-center">
              {product.productName}
            </span>
            <br />
            <span className="text-headings-color text_small text-center">
              ₹{product.discountedPrice}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
