import React from "react";

import FeedSection from "./FeedSection";
import FixedHeader from "../../Layout/fixedHeader";
import Profilesidebar from "../Profilesidebar";
import Footer from "../../Layout/Footer";
import UserHeader2 from "../../Layout/Header2";
import FilterLeftSidebar from "./Rightsidebar";
import FilterSidebar from "./LeftSidebar";
import EmployeeHeader2 from "../../../employeeMarkup/Layout/Header2";


function Community() {
  const token = localStorage.getItem("jobSeekerLoginToken")
  return (
    <>
     {token ? <UserHeader2 />:<EmployeeHeader2/>}
      {/* <FixedHeader /> */}

      <div className="page-content bg-light">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20 shadow-sm">
            <div className="container w">
              <div className="row">
                <div className="col-xl-3 col-lg-4 d-none d-lg-block">
                  {/* <Profilesidebar data={"community"} /> */}
                  <FilterSidebar />
                </div>
                <div className="col-xl-6 m-b30">
         
                    <FeedSection />
           
                </div>
                <div className="col-xl-3 col-lg-4 d-none d-lg-block">
                    <FilterLeftSidebar />
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

export default Community;
