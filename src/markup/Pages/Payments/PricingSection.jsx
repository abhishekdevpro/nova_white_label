import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { plans } from "./Plan";
const PricingSection = () => {
  // Plans data array with all details
  const navigate = useNavigate();

  // Styles object to keep JSX clean
  const styles = {
    section: {
      padding: "80px 0",
      backgroundColor: "#fff",
      fontFamily: '"Poppins", sans-serif',
    },
    container: {
      maxWidth: "",
      margin: "0 auto",
      padding: "0 15px",
    },
    sectionHead: {
      textAlign: "center",
      marginBottom: "50px",
    },
    title: {
      position: "relative",
      display: "inline-block",
      paddingBottom: "15px",
      color: "#09213c",
      fontWeight: "700",
      fontSize: "36px",
      marginBottom: "15px",
    },
    titleLine: {
      position: "absolute",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "80px",
      height: "4px",
      backgroundColor: "#09213c",
      borderRadius: "2px",
    },
    subtitle: {
      color: "#09213c",
      fontSize: "18px",
      marginBottom: "0",
      opacity: "0.8",
    },
    pricingRow: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "30px",
      marginBottom: "30px",
    },
    pricingCol: {
      flex: "1 1 280px",
      minWidth: "280px",
      maxWidth: "300px",
      display: "flex",
    },
    getCardStyle: (plan) => ({
      width: "100%",
      borderRadius: "15px",
      overflow: "hidden",
      boxShadow: `0 8px 24px ${
        plan.isDark ? "rgba(0,0,0,0.2)" : "rgba(9,33,60,0.12)"
      }`,
      transition: "all 0.3s ease",
      transform: plan.isPopular ? "translateY(-10px)" : "none",
      border: plan.isPopular
        ? "2px solid #09213c"
        : plan.isDark
        ? "none"
        : "1px solid rgba(9,33,60,0.08)",
      backgroundColor: plan.isDark ? "#183153" : "#fff",
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }),
    cardHeader: {
      padding: "30px 25px 20px",
      textAlign: "center",
      borderBottom: "1px solid rgba(9,33,60,0.08)",
    },
    getCardTitle: (isDark) => ({
      color: isDark ? "#fff" : "#09213c",
      fontWeight: "600",
      fontSize: "22px",
      marginBottom: "15px",
    }),
    getPriceWrap: (isDark) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",
      color: isDark ? "#fff" : "#09213c",
    }),
    getPriceAmount: (isDark) => ({
      fontSize: "40px",
      fontWeight: "700",
      lineHeight: "1",
      color: isDark ? "#fff" : "#09213c",
    }),
    getPricePeriod: (isDark) => ({
      fontSize: "16px",
      opacity: "0.7",
      alignSelf: "flex-end",
      paddingBottom: "8px",
      color: isDark ? "#fff" : "#09213c",
    }),
    cardBody: {
      padding: "25px",
      flex: "1",
    },
    getFeatureList: (isDark) => ({
      listStyle: "none",
      padding: "0",
      margin: "0",
      color: isDark ? "#fff" : "#09213c",
    }),
    getFeatureItem: (isDark) => ({
      padding: "12px 0",
      borderBottom: isDark
        ? "1px solid rgba(255,255,255,0.1)"
        : "1px solid rgba(9,33,60,0.06)",
      display: "flex",
      alignItems: "center",
      fontSize: "15px",
    }),
    getCheckIcon: (isDark) => ({
      marginRight: "10px",
      color: isDark ? "#5dd3f8" : "#09213c",
      fontWeight: "bold",
    }),
    cardFooter: {
      padding: "0 25px 30px 25px",
      textAlign: "center",
    },
    getButton: (isDark, isPopular) => ({
      display: "block",
      width: "100%",
      padding: "14px 20px",
      borderRadius: "8px",
      backgroundColor: isDark ? "#0a1a36" : isPopular ? "#0d2849" : "#09213c",
      color: "#fff",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "16px",
      textAlign: "center",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: isDark
        ? "0 4px 15px rgba(10, 26, 54, 0.4)"
        : "0 4px 15px rgba(9, 33, 60, 0.15)",
    }),
    // Add popular badge
    popularBadge: {
      position: "absolute",
      top: "10px",
      right: "10px",
      backgroundColor: "#09213c",
      color: "#fff",
      padding: "5px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      boxShadow: "0 2px 8px rgba(9,33,60,0.2)",
    },
  };
  const token = localStorage.getItem("jobSeekerLoginToken");
  const handleClick = () => {
    if (!token) {
      toast.error("Please Login First");
      navigate("/user/login");
    } else {
      navigate("/user/subscription");
      // window.location.href  = (`https://airesume.novajobs.us/settings/subscription/?tokenbyurl=${token}`)
      // window.location.href = (`http://localhost:3001/settings/subscription/?tokenbyurl=${token}`)
    }
  };
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* Section Heading */}
        <div style={styles.sectionHead}>
          <h2 style={styles.title}>
            Choose Your Perfect Plan
            <span style={styles.titleLine}></span>
          </h2>
          <div className="alert alert-info text-center" role="alert" style={{width:"600px",margin:"0 auto",backgroundColor:"#09213c",color:"white",borderRadius:"10px"}}>
            <h4 className="alert-heading">Limited Time Offer!</h4>
            <p>
              Get FREE access to Nova’s premium tools  try resumes, jobs, and skill tests before you choose a plan!
            </p>
          </div>
        </div>

        {/* Pricing Cards Row */}
        <div style={styles.pricingRow}>
          {/* Map through plans array to create pricing cards */}
          {plans.map((plan) => (
            <div key={plan.id} style={styles.pricingCol}>
              <div style={styles.getCardStyle(plan)}>
                {/* Popular Badge (if applicable) */}
                {plan.isPopular && (
                  <div style={styles.popularBadge}>
                    {plan.id === "ultraelite" ? "Unlimited" : "Most Popular"}
                  </div>
                )}

                {/* Plan Header */}
                <div style={styles.cardHeader}>
                  <h3 style={styles.getCardTitle(plan.isDark)}>{plan.name}</h3>
                  <div style={styles.getPriceWrap(plan.isDark)}>
                    <div style={styles.getPriceAmount(plan.isDark)}>
                      ${plan.price}
                    </div>
                    <div style={styles.getPricePeriod(plan.isDark)}>/mo</div>
                  </div>
                </div>

                {/* Plan Features */}
                <div style={styles.cardBody}>
                  <ul style={styles.getFeatureList(plan.isDark)}>
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        style={styles.getFeatureItem(plan.isDark)}
                      >
                        <i
                          className="fa fa-check"
                          style={styles.getCheckIcon(plan.isDark)}
                        ></i>
                        {typeof feature === "string" ? (
                          <span>{feature}</span>
                        ) : (
                          feature
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div style={styles.cardFooter}>
                  <button
                    onClick={() => handleClick()}
                    style={styles.getButton(plan.isDark, plan.isPopular)}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
