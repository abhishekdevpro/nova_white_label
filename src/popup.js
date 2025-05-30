import React, { useState } from "react";

function PopupLanding() {
  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => setShowPopup(false);

  return (
    <>
      {showPopup && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content border-0 rounded-4 shadow-lg">
              <div
                className="modal-body bg-gradient text-[#1c2957] p-4"
                style={{
                  background: "white",
                }}
              >
                <h5 className="modal-title fw-bold mb-3">
                  🌍 Global Launch Now Live – Pompano Beach & Hallandale Beach
                  Officially Onboard!
                </h5>
                <p className="mb-4">
                  Hyper V Solutions is proud to introduce our AI-powered
                  platforms –<strong> NovaJobs </strong> and
                  <strong> UltraAura Education </strong> – across the globe.
                  <br />
                  <br />
                  We’re honored to be official partners with the cities of
                  Pompano Beach and Hallandale Beach to bring local job seekers
                  and students into the future of work and learning.
                  <br />
                  <br />
                  👉 Tap below to explore your local platform and start your
                  journey today!
                </p>
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  <a
                    href="https://pompanobeach.novajobs.us/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn text-white hoverlogo-3d"
                    style={{ backgroundColor: " rgb(8, 15, 58)" }}
                  >
                    Visit Pompano Portal
                  </a>
                  <a
                    href="https://hollandalebeach.novajobs.us/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn text-white hoverlogo-3d"
                    style={{ backgroundColor: " rgb(8, 15, 58)" }}
                  >
                    Visit Hallandale Portal
                  </a>
                  <button
                    className="btn btn-light text-danger fw-semibold"
                    onClick={closePopup}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default PopupLanding;
