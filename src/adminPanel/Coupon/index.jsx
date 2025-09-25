import React from "react";
import CustomNavbar from "../Navbar";
import { Col } from "react-bootstrap";
import AdminSidebar from "../Sidebar";
import CouponForm from "./CouponForm";

function AddCoupon() {
  return (
    <div>
      <CustomNavbar />
      <div className="">
        <div className="row">
          {/* <Col md={2} className="p-0"> */}
          <AdminSidebar active="add-coupon" />
          {/* </Col> */}
          <Col>
            <CouponForm />
            {/* <CouponList /> */}
          </Col>
        </div>
      </div>
    </div>
  );
}

export default AddCoupon;
