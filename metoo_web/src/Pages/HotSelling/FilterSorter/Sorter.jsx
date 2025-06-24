import React from "react";
import "./Sorter.css";

const Sorter = ({
  sortProductsByPriceLowToHigh,
  sortProductsAlphabeticallyAZ,
  sortProductsAlphabeticallyZA,
  sortProductsByPriceHighToLow,
}) => {
  return (
    <>
      <body>
        <div class="dropdown">
          <button
            class="btn btn-white dropdown-toggle p-0"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sort By
          </button>
          <ul class="dropdown-menu">
            <li>
              <div class="dropdown-item" onClick={sortProductsAlphabeticallyAZ}>
                Alphabetically, A-Z
              </div>
            </li>
            <li>
              <div class="dropdown-item" onClick={sortProductsAlphabeticallyZA}>
                Alphabetically, Z-A
              </div>
            </li>
            <li>
              <div class="dropdown-item" onClick={sortProductsByPriceLowToHigh}>
                Price, low to high
              </div>
            </li>
            <li>
              <div class="dropdown-item" onClick={sortProductsByPriceHighToLow}>
                Price, high to low
              </div>
            </li>
          </ul>
        </div>
      </body>
    </>
  );
};

export default Sorter;
