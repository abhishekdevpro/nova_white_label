// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const EmployerGauth = () => {
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Function to extract query parameters from the URL
//     const getQueryParams = (url) => {
//       const params = new URLSearchParams(new URL(url).search);
//       return Object.fromEntries(params.entries());
//     };

//     // Extract the code from the URL
//     const queryParams = getQueryParams(window.location.href);
//     const code = queryParams.code;

//     if (code) {
//       // Send the code to the API endpoint
//       const sendAuthCode = async () => {
//         try {
//           const response = await axios.get(
//             `https://apiwl.novajobs.us/api/employeer/auth/callback?code=${code}`
//           );
//           const token = response.data.data.token;
//           console.log(response);
//           // Save the token in localStorage
//           localStorage.setItem("employeeLoginToken", token);

//           navigate(`/employer/company-profile`);

//           console.log(response);
//           //   window.open='http://localhost:3000/user/jobs-profile'

//           // Redirect to the success URL with the token
//           //   window.open = `https://abroadium-arbuild-dev-fe.vercel.app/dashboard/?${token}`;
//         } catch (error) {
//           console.error("Error while sending auth code:", error);
//           navigate("/employer/login");
//         } finally {
//           setLoading(false); // Stop the loader
//         }
//       };

//       sendAuthCode();
//     } else {
//       console.error("Code parameter is missing in the URL");
//       setLoading(false);
//       navigate(""); // Redirect to the login page if code is missing
//     }
//   }, []);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       {loading ? (
//         <div className="flex flex-col items-center">
//           <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
//           <p className="mt-4 text-gray-600">Loading, please wait...</p>
//         </div>
//       ) : (
//         <div className="text-gray-600">Redirecting...</div>
//       )}
//     </div>
//   );
// };

// export default EmployerGauth;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const EmployerGauth = () => {
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Function to extract query parameters from the URL
//     const getQueryParams = (url) => {
//       const params = new URLSearchParams(new URL(url).search);
//       return Object.fromEntries(params.entries());
//     };

//     // Extract the code from the URL
//     const queryParams = getQueryParams(window.location.href);
//     const code = queryParams.code;

//     if (code) {
//       // Send the code to the API endpoint
//       const sendAuthCode = async () => {
//         try {
//           const response = await axios.get(
//             `https://apiwl.novajobs.us/api/employeeer/auth/callback?code=${code}`
//           );
//           const token = response.data.data.token;

//           // Save the token in localStorage
//           localStorage.setItem("employeeLoginToken", token);
//           console.log(response);
//           //   window.open='http://localhost:3000/user/jobs-profile'
//           navigate("/employer/company-profile");

//           // Redirect to the success URL with the token
//           //   window.open = `https://abroadium-arbuild-dev-fe.vercel.app/dashboard/?${token}`;
//         } catch (error) {
//           console.error("Error while sending auth code:", error);
//           navigate("/employer/login");
//         } finally {
//           setLoading(false); // Stop the loader
//         }
//       };

//       sendAuthCode();
//     } else {
//       console.error("Code parameter is missing in the URL");
//       setLoading(false);
//       navigate(""); // Redirect to the login page if code is missing
//     }
//   }, []);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       {loading ? (
//         <div className="flex flex-col items-center">
//           <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
//           <p className="mt-4 text-gray-600">Loading, please wait...</p>
//         </div>
//       ) : (
//         <div className="text-gray-600">Redirecting...</div>
//       )}
//     </div>
//   );
// };

// export default EmployerGauth;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployerGauth = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const url = window.location.origin.includes("localhost")
  ? "https://wl.novajobs.us"
  : window.location.origin;

  useEffect(() => {
    const getQueryParams = (url) => {
      const params = new URLSearchParams(new URL(url).search);
      return Object.fromEntries(params.entries());
    };

    const queryParams = getQueryParams(window.location.href);
    const code = queryParams.code;
    const state = queryParams.state;

    if (code && state) {
      const sendAuthCode = async () => {
        try {
          const response = await axios.get(
            `https://apiwl.novajobs.us/api/employeer/auth/callback?code=${code}&state=${state}&domain=${url}`
          );
          const token = response.data.data.token;
          const message = response.data.message; // Get the success message from API
          console.log(message, ">>>>message");
          // Save token in localStorage
          localStorage.setItem("employeeLoginToken", token);

          // ✅ Show success toast message
          toast.success(message || "Login successful!");
          window.open(`${response.data?.data?.domain}/employer/company-profile`)
          // Navigate to company profile page
          // navigate("/employer/company-profile");
        } catch (error) {
          console.error("Error while sending auth code:", error);

          // ❌ Show error toast message
          toast.error(error || "Authentication failed. Please try again.");

          navigate("/employer/login");
        } finally {
          setLoading(false);
        }
      };

      sendAuthCode();
    } else {
      console.error("Code parameter is missing in the URL");
      setLoading(false);
      navigate("/employer/login");
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

export default EmployerGauth;
