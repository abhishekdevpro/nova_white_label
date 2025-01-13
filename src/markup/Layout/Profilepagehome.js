import React from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import Header2 from "./Header2";
import logo from "../../assests/logocompanyprofile.jpg"

import photo1 from "../../assests/photo1.jpg"
import photo2 from "../../assests/photo2.jpg"
import photo3 from "../../assests/photo3.jpg"

const employersInfo = [
  {
    id: "1",
    img: "https://via.placeholder.com/150",
    name: "Nova Home Care - Leading home care services of USA",
    location: "SC, USA",
    jobType: "HomeCare",
    // phone: '123 456 7890',
    email: "info@novahome.care",
    jobNumber: 10,
  },
  // Add more employers if needed
];

const MetaComponent = ({ meta }) => (
  <head>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
  </head>
);

const LoginPopup = () => (
  <div className="modal fade" id="loginPopup" tabIndex="-1" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">{/* Login popup content */}</div>
    </div>
  </div>
);

const DefaulHeader = () => (
  <header className="bg-primary text-white p-3">
    <div className="container">
      <h1>Default Header</h1>
    </div>
  </header>
);

const MobileMenu = () => (
  <div className="d-lg-none bg-secondary text-white p-3">
    <div className="container">
      <h2>Mobile Menu</h2>
    </div>
  </div>
);

const JobDetailsDescriptions = () => (
  <div className="text-start px-5">
    <h4 className="text-start px-5">About Company</h4>
    <p className="text-start px-5">
      <strong>Skilled Elderly Management </strong>
      We provide exceptional, personalized care for the elderly. Our
      professional team ensures comfort and well-being, focusing on dignity and
      respect to enhance their quality of life. Security & Safety 24X7 Medical
      Support Best Care Takers Relaxing Environment
    </p>
    <h5>
      <strong className="text-start px-5 mt-3">Our Services</strong>
    </h5>
    <div className="row images-outer px-5 d-flex justify-content-center  gap-4 my-4">
      <img src={photo1} style={{ width: "240px" }} alt="" />
      <img src={photo2} style={{ width: "240px" }} alt="" />
      <img src={photo3} style={{ width: "240px" }} alt="" />
    </div>

    <ul className="px-5 mx-5 my-3">
      <li>Security and Safety</li>
      <li>Care Taking</li>
      <li>House Keeping</li>
    </ul>
  </div>
);

const RelatedJobs = () => (
  <div className=" mb-4 border-0 col-lg-12 ms-5">
    <div className="card-body border rounded-4 d-flex">
      <div className=" me-3  col-lg-2">
        <img
          src="https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Femployers-single-4.png&w=256&q=75"
          alt="resource"
          className="img-fluid"
          style={{ width: "100px", height: "100px" }}
        />
      </div>

      <div className="col-lg-9">
        <div className="d-flex justify-content-between">
          <h4 className="mb-2 ">ios developer</h4>
          <button className="btn btn-outline-secondary">
            <i className="bi bi-bookmark"></i>
          </button>
        </div>

        <ul className="list-unstyled mb-2 d-flex gap-3">
          <li className="mb-1">
            <i className="bi bi-briefcase me-2"></i>
            segment
          </li>
          <li className="mb-1">
            <i className="bi bi-geo-alt me-2"></i>
            london
          </li>
          <li className="mb-1">
            <i className="bi bi-clock me-2"></i>
            11 hours
          </li>
          <li className="mb-1">
            <i className="bi bi-currency-dollar me-2"></i>
            35$ - 45$
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const randomLatitude = -15.812898768599155;
const randomLongitude = 104.14392380381247;

const MapJobFinder = () => (
  <div style={{ height: "300px", background: "#e9ecef" }}>
    <iframe
      width="100%"
      height="300"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31571676.56496063!2d-124.84897487781247!3d37.275120302365075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8c05555555555%3A0x4b1c9b0aaf10b10!2sUnited%20States!5e0!3m2!1sen!2sus!4v1613954061167!5m2!1sen!2sus"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
    ></iframe>
  </div>
);

const Social = () => (
  <div>
    <a href="#">Facebook</a> | <a href="#">Twitter</a>
  </div>
);

const PrivateMessageBox = () => (
  <div>
    <textarea className="form-control" placeholder="Write a message"></textarea>
  </div>
);

const FooterDefault = () => (
  <footer className="bg-dark text-white p-3 mt-5">
    <div className="container">
      <p>Footer content</p>
    </div>
  </footer>
);

const metadata = {
  title: "Employers Single Dynamic V1 || Superio - Job Board ReactJs Template",
  description: "Superio - Job Board ReactJs Template",
};

const Profilepagehome = () => {
  const [activeTab, setActiveTab] = useState("about");

  const { id } = useParams();
  const employer =
    employersInfo.find((item) => item.id === id) || employersInfo[0];

  return (
    <>
      <Header2 />
      <section className=" border my-">
        <div
          className="  border-0  py-4  py-5"
          style={{ backgroundColor: "#F6F9FD" }}
        >
          <div className="c d-flex justify-content-between px-5">
            <div className="d-flex align-items-center">
              <img
                src={logo}
                alt="logo"
                className="mr-3"
                style={{ width: "200px", height: "100px" }}
              />
              <div className="ms-3">
                <h4 className="d-flex float-left ">{employer?.name}</h4>
                <br />
                <br />
                <ul
                  className="list-inline font-fs font-bold"
                  style={{ fontWeight: "600" }}
                >
                  <li className="list-inline-item">
                    <i className="bi bi-geo-alt"></i> {employer?.location} |
                  </li>
                  <li className="list-inline-item">
                    <i className="bi bi-briefcase"></i> {employer?.jobType} |
                  </li>
                  {/* <li className="list-inline-item"><i className="bi bi-telephone"></i> {employer?.phone} |</li> */}
                  <li className="list-inline-item">
                    <i className="bi bi-envelope"></i> {employer?.email}
                  </li>
                </ul>
                <ul className="list-inline d-flex float-left">
                  <li className="list-inline-item badge rounded-pill text-bg-info text-white p-2 px-4">
                    Open Jobs – {employer.jobNumber}
                  </li>
                </ul>
              </div>
            </div>
            <div className="m-5 ">
              <a href="mailto:info@hypervsolutions.net">
                <button
                  className="btn btn-primary p-3 px-5 rounded-3 mx-2"
                  data-bs-toggle="modal"
                  data-bs-target="#privateMessage"
                >
                  Private Message
                </button>
              </a>
              <button className="btn btn-outline-primary ml-2 p-3 t">
                <i className="bi bi-bookmark "></i>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 p">
          <div className="max-w-4xl mx-auto ">
            <ul
              className="list-inline font-fs bg-secondary-subtle text-secondary-emphasis font-bold d-flex justify-content-center gap-3 pt-2"
              id="myTab"
              role="tablist"
              style={{ fontWeight: "600" }}
            >
              <li
                className="nav-item"
                role="presentation"
                style={{ fontWeight: "600" }}
              >
                <a
                  className={`nav-link ${
                    activeTab === "about"
                      ? "active p-3 border-top-0 border-end-0 border-start-0 border-5"
                      : "p-3"
                  }`}
                  id="about-tab"
                  data-bs-toggle="tab"
                  href="#about"
                  role="tab"
                  aria-controls="about"
                  aria-selected={activeTab === "about"}
                  onClick={() => setActiveTab("about")}
                >
                  About
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className={`nav-link ${
                    activeTab === "jobs"
                      ? "active p-3 border-top-0 border-end-0 border-start-0 border-5"
                      : "p-3"
                  }`}
                  id="jobs-tab"
                  data-bs-toggle="tab"
                  href="#jobs"
                  role="tab"
                  aria-controls="jobs"
                  aria-selected={activeTab === "jobs"}
                  onClick={() => setActiveTab("jobs")}
                >
                  Jobs
                </a>
              </li>

              <li className="nav-item" role="presentation">
                <a
                  className={`nav-link ${
                    activeTab === "offices"
                      ? "active p-3 border-top-0 border-end-0 border-start-0 border-5"
                      : "p-3"
                  }`}
                  id="offices-tab"
                  data-bs-toggle="tab"
                  href="#offices"
                  role="tab"
                  aria-controls="offices"
                  aria-selected={activeTab === "offices"}
                  onClick={() => setActiveTab("offices")}
                >
                  Offices
                </a>
              </li>
            </ul>

            <div className="p-4">
              {activeTab === "about" && (
                <>
                  <div className="row ">
                    <div className="col-lg-8 float-start">
                      <JobDetailsDescriptions />
                      <div className="m-5 "></div>
                      <h3 className="ms-5 ps-5 mt-5">Jobs Available</h3>

                      <div className="mt-5 col-lg-11 mx-5 mb-5">
                        <Link to="/user/job/1">
                          <RelatedJobs />
                        </Link>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div
                        className=" mb-4 p-2 border-0"
                        style={{ backgroundColor: "#F5F7FC", fontSize: "14px" }}
                      >
                        <div className="card-body">
                          <ul className="list-unstyled mb-4 ">
                            <li className="d-flex justify-content-between mb-3 ">
                              <strong>Primary industry:</strong>
                              <span>
                                <i className="bi bi-briefcase me-2"></i>{" "}
                                Software
                              </span>
                            </li>
                            <li className="d-flex justify-content-between mb-3">
                              <strong>Company size:</strong>
                              <span>
                                <i className="bi bi-people-fill me-2"></i>{" "}
                                50-100
                              </span>
                            </li>
                            <li className="d-flex justify-content-between mb-3">
                              <strong>Founded in:</strong>
                              <span>
                                <i className="bi bi-calendar mb-3"></i> 2023
                              </span>
                            </li>
                            {/* <li className="d-flex justify-content-between mb-3"> */}
                            {/* <strong>Phone:</strong> */}
                            {/* <span><i className="bi bi-telephone me-2"></i> {employer?.phone}</span> */}
                            {/* </li> */}
                            <li className="d-flex justify-content-between mb-3">
                              <strong>Email:</strong>
                              <span>
                                <i className="bi bi-envelope me-3"></i>
                                info@novahome.care
                              </span>
                            </li>
                            <li className="d-flex justify-content-between mb-3">
                              <strong>Location:</strong>
                              <span>
                                <i className="bi bi-geo-alt me-3"></i>{" "}
                                {employer?.location}
                              </span>
                            </li>
                            <li className="d-flex justify-content-between mb-3">
                              <strong>Social media:</strong>
                              <span>
                                <i className="bi bi-facebook me-2"></i>
                                <i className="bi bi-twitter me-2"></i>
                                <i className="bi bi-instagram me-2"></i>
                                <i className="bi bi-linkdin me-2"></i>
                              </span>
                            </li>
                          </ul>
                          <a
                            href={`http://www.novahome.care`}
                            className="btn btn-primary p-2 px-5 rounded-3 border-0 mx-2 text-primary text-center"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ backgroundColor: "#A9C5ED" }}
                          >
                            www.novahome.care
                          </a>
                        </div>
                      </div>
                      <div
                        className=" border-0 "
                        style={{ backgroundColor: "#F5F7FC" }}
                      >
                        <div className="card-body">
                          <h4 className="card-title flaot-start">
                            Job Location
                          </h4>
                          <MapJobFinder
                            latitude={randomLatitude}
                            longitude={randomLongitude}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeTab === "jobs" && (
                <div>
                  <h3 className="text-xl font-semibold">
                    Jobs Section Content
                  </h3>
                  {/* Add content for the Jobs tab here */}
                </div>
              )}
              {activeTab === "employees" && (
                <div>
                  <h3 className="text-xl font-semibold">
                    Employees Section Content
                  </h3>
                  {/* Add content for the Employees tab here */}
                </div>
              )}
              {activeTab === "offices" && (
                <div>
                  <h3 className="text-xl font-semibold">
                    Offices Section Content
                  </h3>
                  {/* Add content for the Offices tab here */}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Profilepagehome;
