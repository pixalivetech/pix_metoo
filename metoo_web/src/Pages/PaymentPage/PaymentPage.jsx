import React from "react";
import "./PaymentPage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";

function PaymentPage() {
  return (
    <div>
      <Header />
      <div className="container-fluid chan_ba_img_fon">
        <div className="container change_container_prop p-0 change_bg_im py-5 ">
          <div className="card chnage_prop_font px-4 py-2">
            <p className="h8 py-3 font_size_chnge_temp">Payment Details</p>
            <p className="px-5 text-secondary fw-bold change_ssss ">
              <span className="px-4 change_clr_font_pp">
                You need to make a payment to access the chat.
              </span>
            </p>
            <div className="row gx-3">
              <div className="col-12">
                <div className="d-flex flex-column">
                  <p className="text mb-1 font_size_chnge_temp">Person Name</p>
                  <input
                    className="form-control harshith_fcd mb-3"
                    type="text"
                    placeholder="Name"
                    defaultValue="Barry Allen"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex flex-column">
                  <p className="text mb-1 font_size_chnge_temp">Card Number</p>
                  <input
                    className="form-control harshith_fcd mb-3"
                    type="text"
                    placeholder="1234 5678 435678"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex flex-column">
                  <p className="text mb-1 font_size_chnge_temp">Expiry</p>
                  <input
                    className="form-control harshith_fcd mb-3"
                    type="text"
                    placeholder="MM/YYYY"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex flex-column">
                  <p className="text mb-1 font_size_chnge_temp">CVV/CVC</p>
                  <input
                    className="form-control harshith_fcd mb-3 pt-2 "
                    type="password"
                    placeholder="***"
                  />
                </div>
              </div>
              <div className="col-12 change_btn_fon">
                <Link className="change_cl_ttt" to="/ChatUs">
                  <button className="fw-bold text-white">
                    Make a payment <i class="bi bi-chevron-double-right"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PaymentPage;
