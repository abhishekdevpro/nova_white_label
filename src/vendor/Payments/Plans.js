import React, { useState, useEffect } from "react";
import { Lock, CheckCircle, CreditCard } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import VendorHeader from "../../markup/Layout/VendorHeader";

// Pricing Data (same as in previous components)
const pricingData = [
  // {
  //   id: 1,
  //   title: "NovaJobs Start",
  //   price: "Free",
  //   description:
  //     "Best-in-class recruitment website package, with integrated job board.",
  //   features: [
  //     "Unlimited Job post",
  //     "Upload and manage job openings",
  //     "Basic Candidate Management",
  //     "Community Access",
  //     "Engage in a forum for recruiters and job seekers",
  //     "Basic Reporting",
  //     "View simple metrics like job views",
  //     "Branding pages",
  //   ],
  // },
  {
    id: 2,
    title: "Nova Pro",
    price: "$99/month",
    description:
      "For larger recruitment websites, including an hour of Web Care every month.",
    features: [
      "All Nova Start Features",
      "Jobseeker self help portal",
      "Resume Builder",
      "Skill Test for Jobseeker",
      "Basic Applicant Tracking System (ATS)",
      "Messaging",
      "Custom Email Notifications",
      "Mobile-Responsive Design",
      "Payment gateway",
    ],
  },
  {
    id: 3,
    title: "Nova Enterprise",
    price: "$199/month",
    description:
      "Integrate your CRM, ATS, or Multi-Poster to automatically import your jobs.",
    features: [
      "All Nova Pro Features",
      "Digital Marketing",
      "Nova Database access",
      "WhiteLabel everything under your brand",
      "Priority Customer Support",
      "Admin Panel",
    ],
  },
];

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract selected plan from URL query parameters
    const searchParams = new URLSearchParams(location.search);
    const planId = searchParams.get("selectedPlan");

    if (planId) {
      const plan = pricingData.find((p) => p.id === parseInt(planId));
      if (plan) {
        setSelectedPlan(plan);
      } else {
        // Redirect if invalid plan
        navigate("/pricing");
      }
    } else {
      // Redirect if no plan selected
      navigate("/pricing");
    }
  }, [location, navigate]);

    const url = window.location.origin.includes("localhost")
    ? "https://novajobs.us"
    : window.location.origin;

  const handleCheckout = async () => {
    if (!selectedPlan) {
      toast.error("Please select a plan before proceeding.");
      return;
    }

    // Check if user is authenticated
    // const token = localStorage.getItem("token");
    const token = localStorage.getItem("vendorToken");
    if (!token) {
      toast.error("Please log in to continue.");
      return;
    }

    try {
      const response = await axios.post(
        `https://apiwl.novajobs.us/api/admin/vendor/payment/checkout`,
        {
          plan_id: selectedPlan.id,
          domain:url
          // planName: selectedPlan.title,
          // paymentMethod: paymentMethod,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        if (response.data?.url) {
          toast.success("Payment successful! Redirecting...");
          window.location.href = response.data.url;
        } else if (response.data?.message) {
          toast.info(response.data.message); // 👈 shows API message like "user has subscription active already"
        } else {
          toast.error("Unexpected response from the server. No URL returned.");
        }
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.response?.data?.message || "Payment processing failed");
    }
  };

  if (!selectedPlan) return null;

  return (
    <>
      <VendorHeader />
      <div style={styles.pageContainer}>
        <div style={styles.container}>
          <h1 style={styles.heading}>Confirm Your Plan</h1>

          {/* Selected Plan Summary */}
          <div style={styles.planSummary}>
            <h2 style={styles.planTitle}>{selectedPlan.title}</h2>
            <p style={styles.planPrice}>{selectedPlan.price}</p>
            <p style={styles.planDescription}>{selectedPlan.description}</p>

            {/* Features List */}
            <div style={styles.featuresContainer}>
              {selectedPlan.features.map((feature, index) => (
                <div key={index} style={styles.featureItem}>
                  <CheckCircle
                    color="#1C2957"
                    size={18}
                    style={{ marginRight: "10px" }}
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method Selection */}
          {/* <div style={styles.paymentMethodContainer}>
          <h3 style={styles.paymentMethodTitle}>Select Payment Method</h3>
          <div style={styles.paymentMethodOptions}>
            <div 
              style={{
                ...styles.paymentMethodButton,
                border: paymentMethod === 'credit' 
                  ? '2px solid #1C2957' 
                  : '1px solid #E2E8F0'
              }}
              onClick={() => setPaymentMethod('credit')}
            >
              <CreditCard 
                color={paymentMethod === 'credit' ? '#1C2957' : '#718096'} 
                size={24} 
              />
              <span>Credit Card</span>
            </div>
            <div 
              style={{
                ...styles.paymentMethodButton,
                border: paymentMethod === 'paypal' 
                  ? '2px solid #1C2957' 
                  : '1px solid #E2E8F0'
              }}
              onClick={() => setPaymentMethod('paypal')}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill={paymentMethod === 'paypal' ? '#1C2957' : '#718096'}
              >
                <path d="M6.628 22.261c.907 0 1.691-.553 1.958-1.409l4.251-14.392h-4.499l-3.371 14.394c-.225.952.448 1.406 1.661 1.406zm10.572-7.026l.857-3.549.019.074c.269.853 1.352 1.286 2.152 1.286 1.041 0 1.677-.624 1.677-1.568 0-1.01-.833-1.688-2.099-1.688-1.127 0-1.854.441-2.253 1.115l-1.416 4.79h4.299c.711 0 1.295-.382 1.528-1.04h-3.764l.999-3.42zm-5.137-9.375l1.416-4.79h-4.299c-.711 0-1.295.382-1.528 1.04h3.764l-.999 3.42.857-3.549-.019.074c-.269-.853-1.352-1.286-2.152-1.286-1.041 0-1.677.624-1.677 1.568 0 1.01.833 1.688 2.099 1.688 1.127 0 1.854-.441 2.253-1.115z"/>
              </svg>
              <span>PayPal</span>
            </div>
          </div>
        </div> */}

          {/* Checkout Button */}
          <button style={styles.checkoutButton} onClick={handleCheckout}>
            Complete Checkout
          </button>

          {/* Secure Checkout Indicator */}
          <div style={styles.secureCheckout}>
            <Lock color="#1C2957" size={20} style={{ marginRight: "10px" }} />
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>
    </>
  );
}

// Styles object (similar to previous component)
const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#F4F7FA",
    padding: "20px",
  },
  container: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#1C2957",
  },
  planSummary: {
    backgroundColor: "#F8FAFC",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  planTitle: {
    color: "#1C2957",
    marginBottom: "10px",
  },
  planPrice: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1C2957",
    marginBottom: "15px",
  },
  planDescription: {
    color: "#718096",
    marginBottom: "15px",
  },
  featuresContainer: {
    marginTop: "15px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  paymentMethodContainer: {
    marginBottom: "20px",
  },
  paymentMethodTitle: {
    textAlign: "center",
    color: "#1C2957",
    marginBottom: "15px",
  },
  paymentMethodOptions: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  paymentMethodButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "15px",
    borderRadius: "8px",
    cursor: "pointer",
    width: "120px",
    transition: "all 0.3s ease",
  },
  checkoutButton: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#1C2957",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    marginTop: "20px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  secureCheckout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    color: "#718096",
  },
};
