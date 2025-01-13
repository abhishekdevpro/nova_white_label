import React from "react";
import gif from "../../images/gifs/gif.gif";
const Preloader = () => {
  return (
    <div className="w-100 d-flex flex-row justify-content-center align-items-center bg-white p-5 ">
      <div
        className="w-75 d-flex flex-column align-items-center "
        style={{ gap: "7px" }}
      >
        <img src={gif} alt="gif" className="w-50" />
        <h2>Hold On A Second! We're Processing your request...!</h2>
        <p className="p-0 m-0 " style={{ color: "red", fontWeight: "500" }}>
          Don't Shut or Back Your Window!
        </p>
      </div>
    </div>
  );
};

export default Preloader;
