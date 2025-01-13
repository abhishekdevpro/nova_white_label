import React from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import CompanySideBar from "../Layout/companySideBar";

function EmployeeCompanytransactions() {
  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <CompanySideBar active="transactions" />
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

                    {/*
                    <div className="row ">

                      <div className="col-lg-8 col-sm-12 col-12 col-md-8">
                        <div className="d-flex justify-content-between align-items-center">

                          <div className="card"
                            style={{
                              background: '#f9faff', boxShadow: '0 0 10px 0 rgba(0, 24, 128, 0.1)',
                              height: "200px",
                              borderRadius: '20px', width: '285px'
                            }}  >
                            <div className="card-body text-center" style={{ transition: "box-shadow 0.3s ease 0s;" }}>
                              <div className="d-flex justify-content-between align-items-center">
                                <div><h1>+</h1></div>
                                <div><h1>+</h1></div>
                              </div>
                              <h6 className="card-title">3445 6545 4545 3434</h6>
                              <p className="card-text d-flex justify-content-between align-items-center">
                                <div>
                                  <p className="mb-0 " style={{ fontSize: '12px' }}>CARD HOLDER NAME</p>
                                  <p className="mb-2 " style={{ fontSize: '12px', fontWeight: 'bold' }}>CARD HOLDER NAME</p>
                                </div>
                                <div>
                                  <p className="mb-0" style={{ fontSize: '12px' }}>VAID THRU</p>
                                  <p className="mb-2 " style={{ fontSize: '12px', fontWeight: 'bold' }}>02/22</p>
                                </div>
                              </p>

                            </div>
                          </div>
                          <div className="card"
                            style={{
                              background: 'rgb(225, 231, 255)', boxShadow: '0 0 10px 0 rgba(0, 24, 128, 0.1)',
                              height: "200px",
                              borderRadius: '20px', width: '195px'
                            }}  >
                            <div className="card-body text-center" style={{ transition: "box-shadow 0.3s ease 0s;" }}>

                              <div className="text-left">
                                <p className="mb-0">Balance</p>
                                <h6 >$ 556  875.80</h6>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-12 col-12 col-md-4">
                        <div className="d-flex justify-content-between align-items-center">

                          <div className="card"
                            style={{
                              background: '#f9faff', boxShadow: '0 0 10px 0 rgba(0, 24, 128, 0.1)',
                              height: "200px",
                              borderRadius: '20px', width: '90px'
                            }}  >
                            <div className="card-body " style={{ transition: "box-shadow 0.3s ease 0s;" }}>


                              <div className="mt-5 text-left">
                                <p className="mb-0 " style={{ fontSize: '12px' }}>Add ad block</p>
                                <h6 className="mb-2" style={{ fontSize: '15px' }}>$ 78.99</h6>
                              </div>



                            </div>
                          </div><div>
                            <div className="card"
                              style={{
                                background: 'rgb(225, 231, 255)', boxShadow: '0 0 10px 0 rgba(0, 24, 128, 0.1)',
                                height: "150px",
                                borderRadius: '20px', width: '90px'
                              }}  >
                              <div className="card-body " style={{ transition: "box-shadow 0.3s ease 0s;" }}>

                                <div className="text-left mt-5">
                                  <p className="mb-0" style={{ fontSize: '12px' }}>Add task</p>
                                  <h6 style={{ fontSize: '15px' }}>$ 2.88</h6>
                                </div>
                              </div>
                            </div>
                            <button class="px-3 py-2 site-button text-white border-0 mt-2" style={{ borderRadius: '7px', cursor: "pointer" }}>See All</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ul className="post-job-bx browse-job mt-4">
                      <h4 className="mt-4">Yesterday Wallet</h4>

                      <li >
                        <div className="post-bx d-flex w-100 justify-content-between ">
                          <div className="job-post-info m-a0 ">

                            <div className="d-flex justify-content-start aligns-item-center ">
                              <div>
                                <i className="fa fa-user-o" aria-hidden="true"></i>
                              </div>
                              <div className="ml-2">
                                <h6 className="mb-0 d-flex justify-content-between align-items-center">ABC</h6>
                                <p className="mb-0" style={{ color: "rgb(28, 41, 87)" }}> apply AI</p>

                              </div>
                            </div>
                          </div>
                          <div>
                            <h5>+ $ 146</h5>
                          </div>
                        </div>
                      </li>
                      <li >
                        <div className="post-bx d-flex w-100 justify-content-between ">
                          <div className="job-post-info m-a0 ">

                            <div className="d-flex justify-content-start aligns-item-center ">
                              <div>
                                <i className="fa fa-user-o" aria-hidden="true"></i>
                              </div>
                              <div className="ml-2">
                                <h6 className="mb-0 d-flex justify-content-between align-items-center">ABC</h6>
                                <p className="mb-0" style={{ color: "rgb(28, 41, 87)" }}> apply AI</p>

                              </div>
                            </div>
                          </div>
                          <div>
                            <h5>+ $ 146</h5>
                          </div>
                        </div>
                      </li>
                      <li >
                        <div className="post-bx d-flex w-100 justify-content-between ">
                          <div className="job-post-info m-a0 ">

                            <div className="d-flex justify-content-start aligns-item-center ">
                              <div>
                                <i className="fa fa-user-o" aria-hidden="true"></i>
                              </div>
                              <div className="ml-2">
                                <h6 className="mb-0 d-flex justify-content-between align-items-center">ABC</h6>
                                <p className="mb-0" style={{ color: "rgb(28, 41, 87)" }}> apply AI</p>

                              </div>
                            </div>
                          </div>
                          <div>
                            <h5>+ $ 146</h5>
                          </div>
                        </div>
                      </li>

                    </ul>
                   */}
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
export default EmployeeCompanytransactions;
