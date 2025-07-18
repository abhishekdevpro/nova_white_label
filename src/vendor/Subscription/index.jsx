import { useEffect, useState } from "react";
// import Sidebar from "./Sidebar";
// import Navbar from "../Navbar/Navbar";

import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import VendorHeader from "../../markup/Layout/VendorHeader";

export default function SubscriptionPlan() {
  const [status, setStatus] = useState("Inactive");
  const [accountId, setAccountId] = useState();
  const [userData, setUserData] = useState(null); // Store current plan
  useEffect(() => {
    setAccountId(localStorage.getItem("ID"));
  }, []);

  const handleCancelSubscription = async () => {
    try {
      const token = localStorage.getItem("vendorToken");
      if (!token) {
        toast.error("Unauthorized. Please log in.");
        return;
      }

      const response = await axios.post(
        "https://apiwl.novajobs.us/api/admin/vendor/payment/cancel-subscription",
        {}, // Empty body if API doesn't require data
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // Add Bearer if required
          },
        }
      );

      if (response.status === 200) {
        // Successfully canceled the subscription
        toast.success("Your subscription has been canceled.");
      } else {
        toast.error(
          response.data.message || "Failed to cancel the subscription."
        );
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token"); // Remove token if expired
        window.location.href = "/login"; // Redirect to login page
      } else {
        toast.error(
          error.response?.data?.message ||
            "An error occurred. Please try again later."
        );
      }
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("vendorToken");
        // if (!token) {
        //   setError("Unauthorized. Please log in.");
        //   return;
        // }

        const response = await axios.get(
          "https://apiwl.novajobs.us/api/admin/vendor/user-profile",
          {
            headers: { Authorization: token },
          }
        );

        if (response.data?.status === "success") {
          const userData = response.data.data; // Get user data from API
          setUserData(userData.personal_details); // Store user data
          setStatus(userData.is_active_plan ? "Active" : "Inactive"); // Set status correctly
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setStatus("Inactive"); // Set status to Inactive on error
      }
    };

    fetchUserProfile();
  }, []);
  const planName = {
    1: "Free",
    2: "Nova Pro",
    3: "Nova Enterprise",
  };

  const currentPlan = userData?.plan_id
    ? planName[String(userData.plan_id)]
    : "Free";
  // console.log(userData,"/////");

  return (
    <>
      <VendorHeader />
      {/* <Navbar /> */}
      <div className="container py-4 py-md-5">
        <h2 className="fs-4 fw-semibold mb-4">Account Settings</h2>

        <div className="row">
          {/* Sidebar */}
          {/* <div className="col-md-3 mb-4 mb-md-0">
            <Sidebar />
          </div> */}

          {/* Main Content */}
          <div className="col-md-9">
            <div className="p-4 bg-white border rounded shadow-sm">
              <h3 className="fs-5 fw-semibold mb-4">Subscription</h3>

              {/* Help & Support Box */}
              <div className="border rounded bg-light p-3 mb-4">
                <div className="row">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <p className="fw-semibold text-dark">
                      Need help or want to change your subscription?
                    </p>
                    <p className="mb-1">Contact us at:</p>
                    <ul className="ps-3 mb-0">
                      <li>📧 contact@novajobs.us</li>
                    </ul>
                  </div>

                  {/* Divider */}
                  <div className="d-none d-md-block col-md-1 border-end"></div>

                  <div className="col-md-5">
                    <p className="fw-semibold text-dark">
                      Available days a week:
                    </p>
                    <ul className="ps-3 mb-0">
                      <li>Monday-Friday: 8 AM - 8 PM (IST)</li>
                      <li>Saturday: 8 AM - 5 PM (IST)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Account ID */}
              <div className="py-3 border-bottom">
                <p className="fw-semibold text-dark mb-0">
                  Account ID:{" "}
                  <span className="text-muted fw-normal">
                    {accountId || 618744350}
                  </span>
                </p>
              </div>

              {/* Subscription Details */}
              <div className="mt-4">
                <h4 className="fs-6 fw-semibold text-dark">
                  Subscription details
                </h4>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-3">
                  <p className="text-muted mb-3 mb-md-0">
                    Status:{" "}
                    <span
                      className={`fw-medium ${
                        status === "Active" ? "text-success" : "text-danger"
                      }`}
                    >
                      {status}
                    </span>
                  </p>

                  <div className="d-flex gap-2">
                    <Link to="/vendor/payments">
                      <button className="btn btn-primary">Upgrade</button>
                    </Link>
                    <button
                      onClick={handleCancelSubscription}
                      disabled={
                        userData?.plan_id === 1 || !userData?.is_active_plan
                      }
                      className={`btn ${
                        userData?.plan_id === 1 || !userData?.is_active_plan
                          ? "btn-secondary disabled"
                          : "btn-danger"
                      }`}
                    >
                      Cancel Subscription
                    </button>
                  </div>
                </div>

                <p className="text-muted mt-2 mb-1">
                  Current Plan:{" "}
                  <span
                    className={`badge text-bg-${
                      currentPlan === "Free" ? "danger" : "success"
                    }`}
                  >
                    {currentPlan}
                  </span>
                </p>

                <p className="mt-3 text-muted">
                  For more information or changes to your subscription, contact
                  us at{" "}
                  <a href="mailto:contact@novajobs.us" className="text-primary">
                    contact@novajobs.us
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
