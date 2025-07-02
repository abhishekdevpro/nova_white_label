
import React from "react";
import CompanyJobHeader from "./CompanyHeader";
import ApplyForm from "./ApplyForm";
import { useParams } from "react-router-dom";
import UserHeader from "../Layout/Header";
import Footer from "../Layout/Footer";
const CoursePage = () => {
    const {id}=useParams();


  return (
    <>
     
      <UserHeader />
      {/* End Header */}

      <section className="ls-section bg-stone">
        <div className="auto-container">
          <div className="row">
            <CompanyJobHeader companyId={id}/>
            <ApplyForm companyId={id} />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CoursePage;
