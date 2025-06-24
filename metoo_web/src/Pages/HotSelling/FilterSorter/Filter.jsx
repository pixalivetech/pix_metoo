import React from "react";
import "./Filter.css";

const Filter = ({
  resetFilters,
  MinPriceFilter,
  MaxPriceFilter,
  setMaxPriceFilter,
  setMinPriceFilter,
  PercentageDiscount,
  setPercentageDiscount,
  productNameFilter,
  setProductNameFilter,
  applyFilters,
}) => {
  return (
    <>
      <body>
        <div>
          <p data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <i class="bi bi-filter"></i>
            Filter
          </p>
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered custom-modal">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    Filters
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>

                <div className="modal-body">
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-4">
                        <p>in stock only</p>
                      </div>
                      <div className="col-sm-7"></div>
                      <div className="col-sm-1">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="customSwitch"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customSwitch"
                          ></label>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <div className="">
                        <div className="accordion" id="accordionExample">
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              >
                                Price
                              </button>
                            </h2>
                            <div
                              id="collapseOne"
                              className="accordion-collapse collapse show"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <div className="container">
                                  <div className="d-flex gap-2 justify-content-between">
                                    <div>
                                      <input
                                        className="form-control w-100"
                                        type="number"
                                        placeholder="Min Price"
                                        value={MinPriceFilter}
                                        onChange={(e) =>
                                          setMinPriceFilter(e.target.value)
                                        }
                                      />
                                    </div>

                                    <div>
                                      <input
                                        className="form-control w-100"
                                        type="number"
                                        placeholder="Max Price"
                                        value={MaxPriceFilter}
                                        onChange={(e) =>
                                          setMaxPriceFilter(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                Discount
                              </button>
                            </h2>
                            <div
                              id="collapseTwo"
                              className="accordion-collapse collapse"
                              data-bs-parent="#accordionExample"
                            >
                              {/* -------------DISCOUNT_ACCORDION_BODY-------- */}
                              <div className="accordion-body">
                                <div className="container">
                                  <div className="d-flex align-items-center justify-content-center gap-2">
                                    <span>Discount Filter:</span>
                                    <input
                                      className="form-control w-50"
                                      type="text"
                                      value={PercentageDiscount}
                                      onChange={(e) =>
                                        setPercentageDiscount(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* -------------PRODUCT_ACCORDION-------- */}
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                              >
                                Product
                              </button>
                            </h2>
                            <div
                              id="collapseThree"
                              className="accordion-collapse collapse"
                              data-bs-parent="#accordionExample"
                            >
                              {/* -------------PRODUCT_ACCORDION_BODY-------- */}
                              <div className="accordion-body">
                                <div className="container">
                                  <div className="d-flex align-items-center justify-content-center gap-2">
                                    <span>Product Name:</span>

                                    <input
                                      type="text"
                                      className="form-control w-50"
                                      value={productNameFilter}
                                      onChange={(e) =>
                                        setProductNameFilter(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* --------------------------MODAL_FOOTER-------------------------- */}
                <div className="modal-footer">
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-12 d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={applyFilters}
                        >
                          Apply Filter
                        </button>
                        <button
                          type="button"
                          class="btn btn-outline-danger"
                          data-bs-dismiss="modal"
                          on
                          onClick={resetFilters}
                        >
                          Clear Filter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Filter;
