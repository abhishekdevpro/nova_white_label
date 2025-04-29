
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import parse from "html-react-parser";

// const postBlog = [
//   {
//     image: require("./../../images/testimonials/pic1.png"),
//     comment:
//       "This Website made finding job so much easier! I love how simple it is to filter my search and set up alerts for the kinds of positions I'm interested in. Landed two Interviews in My First Weak",
//     name: "Sarah ",
//     location: "Seattle",
//   },
//   {
//     image: require("./../../images/testimonials/pic2.png"),
//     comment:
//       "I felt lost before finding this site. The resume builder helped me craft a much stronger document, and the practice interview questions were a lifesaver. Now, I feel more confident going into interviews.",
//     name: "Alex ",
//     location: "Chicago",
//   },
//   {
//     image: require("./../../images/testimonials/pic3.png"),
//     comment:
//       "This AI builder got me interviews I never would have gotten otherwise!",
//     name: "Jinnay",
//     location: "Los Angeles",
//   },
//   {
//     image: require("./../../images/testimonials/pic4.png"),
//     comment:
//       "Not only great tech, but their customer service helped me every step.",
//     name: "Lisa",
//     location: "Miami",
//   },
//   {
//     image: require("./../../images/testimonials/pic5.png"),
//     comment:
//       "The feedback on my skills section was invaluable. Love this AI service!",
//     name: "Max",
//     location: "Denver",
//   },
// ];

// const OwlTestimonial = () => {
//   const [pageData, setPageData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const url = window.location.origin.includes("localhost")
//     ? "https://novajobs.us"
//     : window.location.origin;
    
//   useEffect(() => {
//     const fetchPageData = async () => {
//       try {
//         const response = await axios.get(
//           `https://apiwl.novajobs.us/api/jobseeker/testimonial?domain=${url}`
//         );
//         setPageData(response.data.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching page data:", err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchPageData();
//   }, [url]);
  
//   const settings = {
//     slidesToShow: 3,
//     arrows: false,
//     infinite: true,
//     autoplay: true,
//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 991,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 576,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };
//   // console.log(pageData,"////");
//   return (
//     <Slider className="blog-carousel-center owl-carousel owl-none" {...settings}>
//       {pageData && pageData.length>0 ? (
//         pageData.map((item)=>(
//           <div className="item p-3" key={item.id}>
//           <div className="testimonial-5">
//             <div
//               className="testimonial-text"
//               style={{
//                 height: "300px",
//               }}
//             >
//               <p>{typeof item.content === "string" ? parse(item.content) : item.content}</p>
//             </div>
//             <div className="testimonial-detail clearfix">
//               <div className="testimonial-pic radius shadow">
//                 <img
//                   src={item.photo}
//                   width="100"
//                   alt=""
//                   style={{
//                     objectFit: "cover",
//                     aspectRatio: 1,
//                   }}
//                 />
//               </div>
//               <strong className="testimonial-name" style={{ color: "white" }}>
//                 {item.name}
//               </strong>
//               <span className="testimonial-position">{item.place}</span>
//             </div>
//           </div>
//         </div>
//         ))
//       ) 
//       : (
//         postBlog.map((item, index) => (
//           <div className="item p-3" key={index}>
//             <div className="testimonial-5">
//               <div
//                 className="testimonial-text"
//                 style={{
//                   height: "300px",
//                 }}
//               >
//                 <p>{item.comment}</p>
//               </div>
//               <div className="testimonial-detail clearfix">
//                 <div className="testimonial-pic radius shadow">
//                   <img
//                     src={item.image}
//                     width="100"
//                     alt=""
//                     style={{
//                       objectFit: "cover",
//                       aspectRatio: 1,
//                     }}
//                   />
//                 </div>
//                 <strong className="testimonial-name" style={{ color: "white" }}>
//                   {item.name}
//                 </strong>
//                 <span className="testimonial-position">{item.location}</span>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </Slider>
//   );
// };

// export default OwlTestimonial;

import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import parse from "html-react-parser";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';

// Styled Components for dynamic data
const TestimonialCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 25px;
  margin: 15px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const TestimonialContent = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #444;
  margin-bottom: 20px;
  min-height: 240px;
`;

const TestimonialFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const TestimonialImage = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
  border: 3px solid #3498db;
`;

const TestimonialInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TestimonialName = styled.h5`
  margin: 0;
  font-weight: 600;
  color: #2c3e50;
`;

const TestimonialLocation = styled.span`
  color: #7f8c8d;
  font-size: 14px;
`;

// Static data for fallback
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
  const [pageData, setPageData] = useState([]);
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

  // Render dynamic content with new styling or fallback to static content with original styling
  return (
    <div className="container">
      <Slider className="testimonial-carousel" {...settings}>
        {pageData && pageData.length > 0 ? (
          // Dynamic data with Bootstrap and styled-components
          pageData.map((item) => (
            <div className="item" key={item.id}>
              <TestimonialCard className="h-100">
                <TestimonialContent>
                  {typeof item.content === "string" ? parse(item.content) : item.content}
                </TestimonialContent>
                <TestimonialFooter>
                  <TestimonialImage>
                    <img
                      src={item.photo}
                      className="img-fluid"
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </TestimonialImage>
                  <TestimonialInfo>
                    <TestimonialName>{item.name}</TestimonialName>
                    <TestimonialLocation>{item.place}</TestimonialLocation>
                  </TestimonialInfo>
                </TestimonialFooter>
              </TestimonialCard>
            </div>
          ))
        ) : (
          // Static data with original styling
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
    </div>
  );
};

export default OwlTestimonial;