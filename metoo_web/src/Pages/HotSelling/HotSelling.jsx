import React, { useState, useEffect } from "react";
import "./HotSelling.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Filter from "./FilterSorter/Filter";
import Sorter from "./FilterSorter/Sorter";
import { HotSellingWeb } from "../../Api/hotselling";
import { Link, useNavigate } from "react-router-dom";
import { BsStar, BsStarFill } from "react-icons/bs";
import { getAllCategory } from "../../Api/category";

const HotSelling = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [minPriceFilter, setMinPriceFilter] = useState();
  const [maxPriceFilter, setMaxPriceFilter] = useState();
  const [PercentageDiscount, setPercentageDiscount] = useState("");
  const [productNameFilter, setProductNameFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const productsPerPage = 20;

  const resetFilters = () => {
    setMinPriceFilter("");
    setMaxPriceFilter("");
    setPercentageDiscount("");
    setProductNameFilter("");
    setProducts(originalProducts);
  };

  const applyFilters = () => {
    const minPrice = parseFloat(minPriceFilter);
    const maxPrice = parseFloat(maxPriceFilter);

    let filteredProducts = originalProducts.slice();

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      filteredProducts = filteredProducts.filter((product) => {
        const originalPrice = parseFloat(product.discountedPrice);
        return originalPrice >= minPrice && originalPrice <= maxPrice;
      });
    }

    if (PercentageDiscount !== "" && !isNaN(PercentageDiscount)) {
      filteredProducts = filteredProducts.filter((product) => {
        return (
          parseFloat(product.discountPercentage) ===
          parseFloat(PercentageDiscount)
        );
      });
    }

    if (productNameFilter.trim() !== "") {
      filteredProducts = filteredProducts.filter((product) => {
        return product.productName
          .toLowerCase()
          .includes(productNameFilter.toLowerCase());
      });
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter((product) => {
        return product.categoryId === selectedCategory._id;
      });
    }

    setProducts(filteredProducts);
  };

  const handleCategoryClick = (data) => {
    navigate(`/Category?categoryName=${data.categoryName}`);
  };

  const sortProductsByPriceLowToHigh = () => {
    const sortedProducts = [...products];
    sortedProducts.sort(
      (a, b) => parseFloat(a.discountedPrice) - parseFloat(b.discountedPrice)
    );
    setProducts(sortedProducts);
  };

  const sortProductsAlphabeticallyAZ = () => {
    const sortedProducts = [...products];
    sortedProducts.sort((a, b) =>
      a.productName.localeCompare(b.productName, undefined, {
        sensitivity: "base",
      })
    );
    setProducts(sortedProducts);
  };

  const sortProductsAlphabeticallyZA = () => {
    const sortedProducts = [...products];
    sortedProducts.sort((a, b) =>
      b.productName.localeCompare(a.productName, undefined, {
        sensitivity: "base",
      })
    );
    setProducts(sortedProducts);
  };

  const sortProductsByPriceHighToLow = () => {
    const sortedProducts = [...products];
    sortedProducts.sort(
      (a, b) => parseFloat(b.discountedPrice) - parseFloat(a.discountedPrice)
    );
    setProducts(sortedProducts);
  };

  const clearSorting = () => {
    getProducts();
    sortProductsByPriceLowToHigh();
  };
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getProducts();
    getCategory();
  }, []);

  const getProducts = () => {
    HotSellingWeb()
      .then((res) => {
        const value = res?.data?.result?.productList;
        const sortedProducts = value.slice();
        sortedProducts.sort(
          (a, b) =>
            parseFloat(a.discountedPrice) - parseFloat(b.discountedPrice)
        );
        setOriginalProducts(sortedProducts);
        setProducts(sortedProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getCategory = () => {
    getAllCategory()
      .then((res) => {
        setCategory(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <Header />
        <div className="hotselling_head mb-3">
          <div className="container">
            <div className="d-flex flex-wrap justify-content-center category-img-head">
              {category.slice(-8).map((data, index) => (
                <div
                  key={index}
                  className={`text-center ${
                    selectedCategory === data ? "selected-category" : ""
                  }`}
                  onClick={() => handleCategoryClick(data)}
                >
                  <div className="rounded-circle p-3 border custom-bg-colour category_small mt-3">
                    <img
                      src={data?.categoryImage}
                      width="80"
                      height="80"
                      className="rounded-circle shadow"
                      alt="Power"
                    />
                  </div>
                  <p className="cat_name">{data?.categoryName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <body>
          <div className="container shadow-lg">
            <div className="d-flex justify-content-between">
              <div>
                <Filter
                  applyFilters={applyFilters}
                  resetFilters={resetFilters}
                  MinPriceFilter={minPriceFilter}
                  MaxPriceFilter={maxPriceFilter}
                  setMinPriceFilter={setMinPriceFilter}
                  setMaxPriceFilter={setMaxPriceFilter}
                  PercentageDiscount={PercentageDiscount}
                  setPercentageDiscount={setPercentageDiscount}
                  productNameFilter={productNameFilter}
                  setProductNameFilter={setProductNameFilter}
                />
              </div>

              <div>
                <Sorter
                  sortProductsByPriceLowToHigh={sortProductsByPriceLowToHigh}
                  sortProductsAlphabeticallyAZ={sortProductsAlphabeticallyAZ}
                  sortProductsAlphabeticallyZA={sortProductsAlphabeticallyZA}
                  sortProductsByPriceHighToLow={sortProductsByPriceHighToLow}
                  clearSorting={clearSorting}
                />
              </div>
            </div>

            <div className="row mt-3">
              {currentProducts.map((product, index) => (
                <div className="col-6 col-md-4 col-lg-3 mb-3" key={product._id}>
                  <Link
                    to={`/ProductDetails?productId=${product._id}`}
                    className="text-decoration-none"
                  >
                    <div className="card h-100 product_card">
                      <div className="card-body d-flex flex-column justify-content-center align-items-center">
                        <div className="img_size_fix position-relative">
                          <span className="TCbg badge position-absolute p-2">
                            Save {product.discountPercentage}%
                          </span>
                          <div className="product-container">
                            <div className="image-container">
                              <img
                                src={product.productGif}
                                alt="HS_P_1"
                                className="img-fluid product-gif"
                              />
                              <img
                                src={product.productImage}
                                alt="HS_P_1"
                                className="img-fluid product-img"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="fs-6 fw-bold mt-3 text-black">
                          {product.productName}
                        </div>
                        <div>
                          <span className="bi bi-currency-rupee text-black">
                            {product.discountedPrice}
                          </span>
                          <del className="bi bi-currency-rupee text-muted text-white">
                            {product.finalPrice}
                          </del>
                        </div>
                        <div>
                          {[0, 1, 2, 3, 4].map((starIndex) => (
                            <span
                              key={starIndex}
                              value={starIndex}
                              className={` star ${
                                starIndex < product.rating ? "filled" : ""
                              }`}
                            >
                              {starIndex < product.rating ? (
                                <BsStarFill />
                              ) : (
                                <BsStar />
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* Pagination */}
          <div className="container" style={{ overflowX: "hidden" }}>
  <div className="row d-flex justify-content-center">
    <div className="col-12 col-lg-12 col-md-12 col-xxl-12 d-flex justify-content-center">
      <nav
        aria-label="Page navigation example"
        className="col-sm-2 d-flex mt-3 justify-content-center"
      >
        <ul className="pagination ">
          <li
            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
          >
            <a
              className="page-link"
              href="#"
              aria-label="Previous"
              onClick={() => paginate(currentPage - 1)}
            >
              <span className="TC fw-bold" aria-hidden="true">
                &laquo;
              </span>
            </a>
          </li>
          {Array.from({
            length: Math.ceil(products.length / productsPerPage),
          }).map((_, index) => (
            <li
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
              key={index}
            >
              <button
                className="page-link TCbg"
                onClick={() => paginate(index + 1)}
              >
                <span className="text-white fw-bold">{index + 1}</span>
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === Math.ceil(products.length / productsPerPage)
                ? "disabled"
                : ""
            }`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => paginate(currentPage + 1)}
            >
              <span className="TC fw-bold" aria-hidden="true">
                &raquo;
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</div>

        </body>
        <Footer />
      </div>
    </>
  );
};

export default HotSelling;
