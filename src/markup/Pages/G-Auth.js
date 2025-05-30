import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Gauth = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to extract query parameters from the URL
    const getQueryParams = (url) => {
      const params = new URLSearchParams(new URL(url).search);
      return Object.fromEntries(params.entries());
    };

    // Extract the code from the URL
    const queryParams = getQueryParams(window.location.href);
    const code = queryParams.code;
    const state = queryParams.state;

    console.log(code, state, "code,state");
    // const url = window.location.origin;
    const url = window.location.origin.includes("localhost")
      ? "https://wl.novajobs.us"
      : window.location.origin;
    console.log(window.location.origin, url, ">>>url");
    if (code && state) {
      // Send the code to the API endpoint
      const sendAuthCode = async () => {
        try {
          const response = await axios.get(
            `https://apiwl.novajobs.us/api/jobseeker/auth/callback?code=${code}&state=${state}&domain=${url}`
          );
          const token = response.data.data.token;
          const message = response.data.message;
          // Save the token in localStorage
          localStorage.setItem("jobSeekerLoginToken", token);
          console.log(response);
          console.log(message, ">>>>message");
          toast.success(message || "Login successful!");
          //   window.open='http://localhost:3000/user/jobs-profile'
          window.open(response.data?.data?.domain);
          // navigate("/user/dashboard");

          // Redirect to the success URL with the token
          //   window.open = `https://abroadium-arbuild-dev-fe.vercel.app/dashboard/?${token}`;
        } catch (error) {
          console.error("Error while sending auth code:", error);
          toast.error(error || "Authentication failed. Please try again.");
          navigate("/user/login");
        } finally {
          setLoading(false); // Stop the loader
        }
      };

      sendAuthCode();
    } else {
      console.error("Code parameter is missing in the URL");
      setLoading(false);
      navigate(""); // Redirect to the login page if code is missing
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading, please wait...</p>
        </div>
      ) : (
        <div className="text-gray-600">Redirecting...</div>
      )}
    </div>
  );
};

export default Gauth;
