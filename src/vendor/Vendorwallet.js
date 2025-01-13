import React from "react";
import { Link } from "react-router-dom";

import VendorCompanySideBar from "./Vendorsidebar";
import { Navbar, Nav, Badge } from 'react-bootstrap';
import Footer from "../markup/Layout/Footer";
function Vendorwallet() {
  return (
    <>
      <div className="page-content bg-white">
        <Navbar bg="white" variant="white" className="py-3 border-bottom">
          <Navbar.Brand as={Link} to="/">
            <img
              style={{ width: "110px" }}
              src={require("../images/logo/NovaUS.png")}
              className="logo"
              alt="img"
            />
          </Navbar.Brand>

          <Nav className="ml-auto align-items-center"></Nav>
        </Navbar>
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <VendorCompanySideBar active="transactions" />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx table-job-bx clearfix">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Wallet History
                      </h5>
                      <Link
                        to={"/employer/company-profile"}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
                    </div>
                    <div className="d-flex justify-content-center">
                      <h1>🚧 Wallet Section coming soon</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Vendorwallet;
