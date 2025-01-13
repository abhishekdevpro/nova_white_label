import axios from "axios";
import { showToastError } from "../../utils/toastify";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Jobcategories() {
  const token = localStorage.getItem("employeeLoginToken");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://api.novajobs.us/api/employeer/job-categories",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        showToastError(err?.response?.data?.message);
      });
  }, []);
  return (
    <div className="row sp20">
      {data.map((item, index) => {
        return (
          <div key={index} className="col-lg-3 col-md-6 col-sm-6">
            <div className="icon-bx-wraper">
              <div className="icon-content">
                <div className="icon-md text-primary m-b20">
                  <i className="ti-location-pin"></i>
                </div>
                <Link
                  to={`/employer/company-manage-job/jobs/jobsDesign-art-multimedia`}
                  className="dez-tilte"
                >
                  {item.name}
                </Link>
                <div className="rotate-icon">
                  <i className="ti-location-pin"></i>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="col-lg-12 text-center m-t30">
        <button className="site-button radius-xl">All Categories</button>
      </div>
    </div>
  );
}

export default Jobcategories;
