// import { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const googleOneTapLogin = async ({ token }) => {
//   const path = `https://apiwl.novajobs.us/api/jobseeker/google-one-tap-login`;
//   const res = await axios.post(path, { token });
//   return res;
// };

// const GoogleOneTapLoginJobseeker = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (
//       typeof window !== "undefined" &&
//       localStorage.getItem("jobSeekerLoginToken")
//     )
//       return;

//     // ✅ 1. Dynamically load the script
//     const script = document.createElement("script");
//     script.src = "https://accounts.google.com/gsi/client";
//     script.async = true;
//     script.defer = true;

//     script.onload = () => {
//       // ✅ 2. Once loaded, wait 2 seconds and then initialize
//       const timeout = setTimeout(() => oneTap(), 2000);
//       return () => clearTimeout(timeout);
//     };

//     document.body.appendChild(script);
//   }, []);

//   const oneTap = () => {
//     const { google } = window;
//     if (!google || !google.accounts || !google.accounts.id) {
//       console.warn("Google One Tap script not loaded properly.");
//       return;
//     }

//     google.accounts.id.initialize({
//       client_id:
//         "976140565294-gg5icnv8v0h2hfbgvrso1m1nsssg0pm9.apps.googleusercontent.com",
//       callback: async (response) => {
//         call(response.credential);
//       },
//     });

//     google.accounts.id.prompt((notification) => {
//       if (notification.isNotDisplayed()) {
//         console.log(
//           "getNotDisplayedReason:",
//           notification.getNotDisplayedReason()
//         );
//       } else if (notification.isSkippedMoment()) {
//         console.log("getSkippedReason:", notification.getSkippedReason());
//       } else if (notification.isDismissedMoment()) {
//         console.log("getDismissedReason:", notification.getDismissedReason());
//       }
//     });
//   };

//   const call = async (jobSeekerLoginToken) => {
//     try {
//       const res = await googleOneTapLogin({ jobSeekerLoginToken });
//       localStorage.setItem(
//         "jobSeekerLoginToken",
//         res?.data?.data?.jobSeekerLoginToken
//       );
//       navigate("/user/jobs-profile");
//     } catch (error) {
//       navigate("/user/login");
//     }
//   };

//   return null; // or <></>
// };

// export default GoogleOneTapLoginJobseeker;
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const googleOneTapLogin = async ({ token }) => {
  const path = `https://apiwl.novajobs.us/api/jobseeker/google-one-tap-login`;
  const res = await axios.post(path, { token });
  return res;
};

const GoogleOneTapLoginJobseeker = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("jobSeekerLoginToken")
    )
      return;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      const timeout = setTimeout(() => oneTap(), 2000);
      return () => clearTimeout(timeout);
    };

    document.body.appendChild(script);
  }, []);

  const oneTap = () => {
    const { google } = window;
    if (!google || !google.accounts?.id) {
      console.warn("Google One Tap script not loaded properly.");
      return;
    }

    google.accounts.id.initialize({
      client_id:
        "976140565294-gg5icnv8v0h2hfbgvrso1m1nsssg0pm9.apps.googleusercontent.com",
      callback: async (response) => {
        call(response.credential);
      },
    });

    google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        console.log(
          "NotDisplayedReason:",
          notification.getNotDisplayedReason()
        );
      } else if (notification.isSkippedMoment()) {
        console.log("SkippedReason:", notification.getSkippedReason());
      } else if (notification.isDismissedMoment()) {
        console.log("DismissedReason:", notification.getDismissedReason());
      }
    });
  };

  const call = async (token) => {
    try {
      const response = await googleOneTapLogin({ token });

      if (response.data?.success === "success" || response.data?.code === 200) {
        const token = response.data?.data?.token;
        const user = response.data?.data;

        toast.success(response.data?.message || "Login successful!");

        localStorage.setItem("jobSeekerLoginToken", token);
        localStorage.removeItem("employeeLoginToken");

        console.log(user, "from google one-tap");

        const missingProfile =
          !user.first_name ||
          !user.last_name ||
          !user.rb_job_seeker_resumes?.file_path;

        if (missingProfile) {
          navigate("/user/profile");
        } else {
          navigate("/user/jobs-profile");
        }
      } else {
        toast.error(response.data?.message || "Login failed");
        navigate("/user/login");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      navigate("/user/login");
    }
  };

  return null;
};

export default GoogleOneTapLoginJobseeker;
