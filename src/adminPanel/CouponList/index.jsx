import React from "react";
import CustomNavbar from "../Navbar";
import AdminSidebar from "../Sidebar";
import CouponList from "./CouponList";
import { Col } from "react-bootstrap";

const CouponListPage = () => {
  return (
    <div>
      <CustomNavbar />
      <div className="container">
        <div className="row">
          {/* <Col md={2} className="p-0"> */}
          <AdminSidebar active="coupon-list" />
          {/* </Col> */}
          <Col>
            <CouponList />
            {/* <CouponList /> */}
          </Col>
        </div>
      </div>
    </div>
  );
};

export default CouponListPage;
