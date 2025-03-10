import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const LogoContext = createContext();

export const LogoProvider = ({ children }) => {
  const [logo, setLogo] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUhQJ-44yDYIuo8Hj-L1ezQSKAkkK4CqlecQ&s");
  const [isPartner, setIsPartner] = useState(null);

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
          localStorage.setItem("IsPartner", response.data.data.is_partner_with_us);
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };

    fetchLogo();

    // Optional: Check for logo updates every 30 seconds
    // const interval = setInterval(fetchLogo, 30000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <LogoContext.Provider value={{ logo, isPartner }}>
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = () => useContext(LogoContext);
