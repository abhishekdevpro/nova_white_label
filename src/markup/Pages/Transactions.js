import React, { useState, useEffect } from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Link, useNavigate } from "react-router-dom";
//import video from '../../assests/HyperV Solutions.mp4';
import logo1 from "../../assests/logo1.jpg";
import logo2 from "../../assests/logo2.jpg";
import logo3 from "../../assests/logo3.jpg";
import logo5 from "../../assests/logo5.jpg";
import pic1 from "../../assests/1 (1).png";
import pic2 from "../../assests/1 (2).png";
import pic3 from "../../assests/1 (3).png";
import pic4 from "../../assests/1 (4).png";
import pic5 from "../../assests/1 (5).png";
import pic6 from "../../assests/1 (6).png";
import pic7 from "../../assests/1 (7).png";
import pic8 from "../../assests/1 (8).png";
import pic9 from "../../assests/1 (9).png";
import pic10 from "../../assests/1 (10).png";
import pic11 from "../../assests/1 (11).png";
import pic12 from "../../assests/1 (12).png";
// import pic13 from "../../assests/1 (13).png";
import { Carousel } from "react-bootstrap";
import "./aboutus.css";
import { useLocation } from 'react-router-dom';

// Aboutus1 :
function Transactions() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('s');
  return (
    <>
      <Header />
      <div className="text-center my-5">
      <h1>💲Transactions</h1>
      {status === 'success' && <p style={{fontSize:"40px"}} className="my-5">
      💵 Your Payment is 
        Successfull!</p>}
      {status === 'failed' &&  <p style={{fontSize:"40px"}} className="my-5">❌ Your Payment is Failed❗❗</p>}
      {/* Render transactions based on the status */}
    </div>
      <Footer />
    </>
  );
}

export default Transactions;
