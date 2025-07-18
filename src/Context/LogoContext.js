import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoContext = createContext();

export const LogoProvider = ({ children }) => {
  const [logo, setLogo] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUhQJ-44yDYIuo8Hj-L1ezQSKAkkK4CqlecQ&s"
  );
  const [isPartner, setIsPartner] = useState(null);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  // const [isApiSuccess, setIsApiSuccess] = useState(false);

  const url = window.location.origin.includes("localhost")
    ? "https://novajobs.us"
    : window.location.origin;

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get(
          `https://apiwl.novajobs.us/api/jobseeker/acount-info?domain=${url}`
        );

        if (response.data?.data?.logo) {
          setLogo(response.data.data.logo);
          setIsPartner(response.data.data.is_partner_with_us);
          localStorage.setItem(
            "IsPartner",
            response.data.data.is_partner_with_us
          );
          // setIsApiSuccess(true);
        }
      } catch (error) {
        console.error("Error fetching logo:", error);

        if (error.response?.status === 403) {
          // Show upgrade popup for 403 errors and block access
          setShowUpgradePopup(true);
          setIsBlocked(true);
        } else if (
          error.response?.data?.message?.includes(
            "Account information not found"
          ) &&
          window.location.pathname !== "/*" &&
          !window.location.pathname.includes("404")
        ) {
          // Redirect to /* for account not found errors
          window.location.href = "*";
        }
      }
    };

    fetchLogo();
    if (url) fetchLogo();
    // Optional: Check for logo updates every 30 seconds
    // const interval = setInterval(fetchLogo, 30000);
    // return () => clearInterval(interval);
  }, [url]);

  const handleUpgradeClick = () => {
    window.location.href = "https://novajobs.us/white-label-started";
  };

  const handleClosePopup = () => {
    setShowUpgradePopup(false);
    // Don't unblock - user must upgrade to access
  };

  return (
    <LogoContext.Provider value={{ logo, isPartner }}>
      {/* {isApiSuccess ? children : null} */}
      {!isBlocked ? children : null}

      {/* Upgrade Plan Popup */}
      {showUpgradePopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "10px",
              maxWidth: "400px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h2 style={{ color: "#1C2957", marginBottom: "15px" }}>
              Upgrade Your Plan
            </h2>
            <p style={{ color: "#666", marginBottom: "25px" }}>
              Your current plan doesn't have access to this feature. Please
              upgrade your plan to continue.
            </p>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <button
                onClick={handleUpgradeClick}
                style={{
                  backgroundColor: "#1C2957",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}
    </LogoContext.Provider>
  );
};

export const useLogo = () => useContext(LogoContext);
