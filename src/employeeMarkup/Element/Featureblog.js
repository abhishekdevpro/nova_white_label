import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';


function Featureblog() {
  const navigate = useNavigate();

  const handleLocationSelect = (location) => {
    localStorage.setItem("selectedLocation", location);
    navigate("/user/job/2");
  };

  // Define an array of state objects with name, image, and job count
  const states = [
    { name: "Alabama", jobs: 765, image: require("./../../images/city/pic1.jpg") },
    { name: "Alaska", jobs: 300, image: require("./../../images/city/pic2.jpg") },
    { name: "Arizona", jobs: 500, image: require("./../../images/city/pic3.jpg") },
    { name: "Arkansas", jobs: 400, image: require("./../../images/city/pic4.jpg") },
    { name: "California", jobs: 900, image: require("./../../images/city/pic5.jpg") },
    { name: "Colorado", jobs: 600, image: require("./../../images/city/pic6.jpg") },
    { name: "Connecticut", jobs: 200, image: require("./../../images/city/pic7.jpg") },
    { name: "Delaware", jobs: 150, image: require("./../../images/city/pic8.jpg") },
    { name: "Florida", jobs: 600, image: require("./../../images/city/pic1.jpg") },
    { name: "Georgia", jobs: 500, image: require("./../../images/city/pic2.jpg") },
    { name: "Hawaii", jobs: 450, image: require("./../../images/city/pic3.jpg") },
    { name: "Idaho", jobs: 300, image: require("./../../images/city/pic4.jpg") },
    { name: "Illinois", jobs: 800, image: require("./../../images/city/pic5.jpg") },
    { name: "Indiana", jobs: 700, image: require("./../../images/city/pic6.jpg") },
    { name: "Iowa", jobs: 250, image: require("./../../images/city/pic7.jpg") },
    { name: "Kansas", jobs: 200, image: require("./../../images/city/pic8.jpg") },
    { name: "Kentucky", jobs: 765, image: require("./../../images/city/pic1.jpg") },
    { name: "Louisiana", jobs: 300, image: require("./../../images/city/pic2.jpg") },
    { name: "Maine", jobs: 500, image: require("./../../images/city/pic3.jpg") },
    { name: "Maryland", jobs: 400, image: require("./../../images/city/pic4.jpg") },
    { name: "Massachusetts", jobs: 900, image: require("./../../images/city/pic5.jpg") },
    { name: "Michigan", jobs: 600, image: require("./../../images/city/pic6.jpg") },
    { name: "Minnesota", jobs: 200, image: require("./../../images/city/pic7.jpg") },
    { name: "Mississippi", jobs: 150, image: require("./../../images/city/pic8.jpg") },
    { name: "Missouri", jobs: 600, image: require("./../../images/city/pic1.jpg") },
    { name: "Montana", jobs: 500, image: require("./../../images/city/pic2.jpg") },
    { name: "Nebraska", jobs: 450, image: require("./../../images/city/pic3.jpg") },
    { name: "Nevada", jobs: 300, image: require("./../../images/city/pic4.jpg") },
    { name: "New Hampshire", jobs: 800, image: require("./../../images/city/pic5.jpg") },
    { name: "New Jersey", jobs: 700, image: require("./../../images/city/pic6.jpg") },
    { name: "New Mexico", jobs: 250, image: require("./../../images/city/pic7.jpg") },
    { name: "New York", jobs: 200, image: require("./../../images/city/pic8.jpg") },
    { name: "North Carolina", jobs: 700, image: require("./../../images/city/pic6.jpg") },
    { name: "North Dakota", jobs: 250, image: require("./../../images/city/pic7.jpg") },
    { name: "Ohio", jobs: 200, image: require("./../../images/city/pic8.jpg") },
    { name: "Oklahoma", jobs: 700, image: require("./../../images/city/pic6.jpg") },
    { name: "Oregon", jobs: 250, image: require("./../../images/city/pic7.jpg") },
    { name: "Pennsylvania", jobs: 200, image: require("./../../images/city/pic8.jpg") },
    { name: "Rhode Island", jobs: 700, image: require("./../../images/city/pic6.jpg") },
    { name: "South Carolina", jobs: 250, image: require("./../../images/city/pic7.jpg") },
    { name: "South Dakota", jobs: 200, image: require("./../../images/city/pic8.jpg") },
    { name: "Tennessee", jobs: 700, image: require("./../../images/city/pic6.jpg") },
    { name: "Texas", jobs: 250, image: require("./../../images/city/pic7.jpg") },
    { name: "Utah", jobs: 200, image: require("./../../images/city/pic8.jpg") },
    { name: "Vermont", jobs: 700, image: require("./../../images/city/pic6.jpg") },
    { name: "Virginia", jobs: 250, image: require("./../../images/city/pic7.jpg") },
    { name: "Washington", jobs: 200, image: require("./../../images/city/pic8.jpg") },
    { name: "West Virginia", jobs: 700, image: require("./../../images/city/pic6.jpg") },
 
   
    // Add more states as needed
  ];

  // Function to chunk array into smaller arrays of size n
  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
      arr.slice(index * size, index * size + size)
    );
  };

  // Chunk the states array into arrays of 8 states per slide
  const chunkedStates = chunkArray(states, 8);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="section-full content-inner bg-gray">
      <div className="container">
        <div className="row">
          <div className="align-self-end float-end">
            <Link to={"/user/job/2"} className="site-button button-sm float-end">
              Browse Jobs in other State <i className="fa fa-long-arrow-right"></i>
            </Link>
          </div>
          <div className="col-lg-12 section-head text-center">
            <h2 className="m-b5">Featured States</h2>
            <h6 className="fw4 m-b0">Featured States</h6>
          </div>
        </div>

        <Carousel>
          {isMobile
            ? chunkedStates.flat().map((state, index) => (
                <Carousel.Item key={index} className="p-3" style={{ backgroundColor: '#FFD5D5' }}>
                  <div className="row justify-content-center">
                    <div className="col-12 m-b30">
                      <div onClick={() => handleLocationSelect(state.name.toLowerCase())}>
                        <div
                          className="city-bx align-items-end d-flex"
                          style={{
                            backgroundImage: `url(${state.image})`,
                            cursor: "pointer",
                          }}>
                          <div className="city-info">
                            <h5>{state.name}</h5>
                            <span>{state.jobs} Jobs</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
              ))
            : chunkedStates.map((slideStates, slideIndex) => (
                <Carousel.Item key={slideIndex} className="p-3" style={{ backgroundColor: '#FFD5D5' }}>
                  <div className="row">
                    {slideStates.map((state, index) => (
                      <div key={index} className="col-lg-3 col-sm-6 col-md-6 m-b30">
                        <div onClick={() => handleLocationSelect(state.name.toLowerCase())}>
                          <div
                            className="city-bx align-items-end d-flex"
                            style={{
                              backgroundImage: `url(${state.image})`,
                              cursor: "pointer",
                            }}>
                            <div className="city-info">
                              <h5>{state.name}</h5>
                                     {/* <span>{state.jobs} Jobs</span> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Carousel.Item>
              ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Featureblog;
