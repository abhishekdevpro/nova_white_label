import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const googleOneTapLogin = async ({ token }) => {
  const path = `https://apiwl.novajobs.us/api/employeer/google-one-tap-login`;
  const res = await axios.post(path, { token });
  return res;
};

const GoogleOneTapLoginEmployee = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("employeeLoginToken")
    )
      return;

    // ✅ 1. Dynamically load the script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // ✅ 2. Once loaded, wait 2 seconds and then initialize
      const timeout = setTimeout(() => oneTap(), 2000);
      return () => clearTimeout(timeout);
    };

    document.body.appendChild(script);
  }, []);

  const oneTap = () => {
    const { google } = window;
    if (!google || !google.accounts || !google.accounts.id) {
      console.warn("Google One Tap script not loaded properly.");
      return;
    }

    google.accounts.id.initialize({
      client_id:
        "976140565294-aj7etlsr3amtu5igqr5h79atglre1gdf.apps.googleusercontent.com",
      callback: async (response) => {
        call(response.credential);
      },
    });

    google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        console.log(
          "getNotDisplayedReason:",
          notification.getNotDisplayedReason()
        );
      } else if (notification.isSkippedMoment()) {
        console.log("getSkippedReason:", notification.getSkippedReason());
      } else if (notification.isDismissedMoment()) {
        console.log("getDismissedReason:", notification.getDismissedReason());
      }
    });
  };

  const call = async (employeeLoginToken) => {
    try {
      const res = await googleOneTapLogin({ employeeLoginToken });
      localStorage.setItem(
        "employeeLoginToken",
        res?.data?.data?.employeeLoginToken
      );
      navigate("/employer/company-profile");
    } catch (error) {
      navigate("/employer/login");
    }
  };

  return null; // or <></>
};

export default GoogleOneTapLoginEmployee;
