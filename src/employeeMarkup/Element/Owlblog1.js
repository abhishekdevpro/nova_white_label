import React, { Component } from "react";
import Slider from "react-slick";

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
    name: "Lisa ",
    location: "Miami",
  },
  {
    image: require("./../../images/testimonials/pic5.png"),
    comment:
      "The feedback on my skills section was invaluable. Love this AI service!",
    name: "Max ",
    location: "Denver",
  },
];

class owltestimonial extends Component {
  render() {
    var settings = {
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
    return (
      <Slider
        className="blog-carousel-center owl-carousel owl-none "
        {...settings}
      >
        {postBlog.map((item, index) => (
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
                <strong
                  className="testimonial-name "
                  style={{ color: "white" }}
                >
                  {item.name}
                </strong>
                <span className="testimonial-position">{item.location}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    );
  }
}

export default owltestimonial;
