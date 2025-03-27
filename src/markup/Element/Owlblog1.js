
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import parse from "html-react-parser";

const postBlog = [
  {
    image: require("./../../images/testimonials/pic1.png"),
    comment:
      "This Website made finding job so much easier! I love how simple it is to filter my search and set up alerts for the kinds of positions I'm interested in. Landed two Interviews in My First Weak",
    name: "Sarah ",
    location: "Seattle",
  },
  {
    image: require("./../../images/testimonials/pic2.png"),
    comment:
      "I felt lost before finding this site. The resume builder helped me craft a much stronger document, and the practice interview questions were a lifesaver. Now, I feel more confident going into interviews.",
    name: "Alex ",
    location: "Chicago",
  },
  {
    image: require("./../../images/testimonials/pic3.png"),
    comment:
      "This AI builder got me interviews I never would have gotten otherwise!",
    name: "Jinnay",
    location: "Los Angeles",
  },
  {
    image: require("./../../images/testimonials/pic4.png"),
    comment:
      "Not only great tech, but their customer service helped me every step.",
    name: "Lisa",
    location: "Miami",
  },
  {
    image: require("./../../images/testimonials/pic5.png"),
    comment:
      "The feedback on my skills section was invaluable. Love this AI service!",
    name: "Max",
    location: "Denver",
  },
];

const OwlTestimonial = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = window.location.origin.includes("localhost")
    ? "https://novajobs.us"
    : window.location.origin;
    
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await axios.get(
          `https://apiwl.novajobs.us/api/jobseeker/testimonial?domain=${url}`
        );
        setPageData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching page data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPageData();
  }, [url]);
  
  const settings = {
    slidesToShow: 3,
    arrows: false,
    infinite: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  // console.log(pageData,"////");
  return (
    <Slider className="blog-carousel-center owl-carousel owl-none" {...settings}>
      {pageData && pageData.length>0 ? (
        pageData.map((item)=>(
          <div className="item p-3" key={item.id}>
          <div className="testimonial-5">
            <div
              className="testimonial-text"
              style={{
                height: "300px",
              }}
            >
              <p>{typeof item.content === "string" ? parse(item.content) : item.content}</p>
            </div>
            <div className="testimonial-detail clearfix">
              <div className="testimonial-pic radius shadow">
                <img
                  src={item.photo}
                  width="100"
                  alt=""
                  style={{
                    objectFit: "cover",
                    aspectRatio: 1,
                  }}
                />
              </div>
              <strong className="testimonial-name" style={{ color: "white" }}>
                {item.name}
              </strong>
              <span className="testimonial-position">{item.place}</span>
            </div>
          </div>
        </div>
        ))
      ) 
      : (
        postBlog.map((item, index) => (
          <div className="item p-3" key={index}>
            <div className="testimonial-5">
              <div
                className="testimonial-text"
                style={{
                  height: "300px",
                }}
              >
                <p>{item.comment}</p>
              </div>
              <div className="testimonial-detail clearfix">
                <div className="testimonial-pic radius shadow">
                  <img
                    src={item.image}
                    width="100"
                    alt=""
                    style={{
                      objectFit: "cover",
                      aspectRatio: 1,
                    }}
                  />
                </div>
                <strong className="testimonial-name" style={{ color: "white" }}>
                  {item.name}
                </strong>
                <span className="testimonial-position">{item.location}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </Slider>
  );
};

export default OwlTestimonial;