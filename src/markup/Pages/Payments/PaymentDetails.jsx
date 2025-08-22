import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CheckCircle, Lock } from "lucide-react";
import styled from "styled-components";
import { plans } from "./Plan";
import UserHeader2 from "../../Layout/Header2";
// New plans array structure

// Styled components (assumed to exist in original code)
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const CardContainer = styled.div`
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 600px;
  margin: 0 auto;
`;

const ContentSection = styled.div`
  padding: 2rem;
`;

const OrderReviewSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #111827;
`;

const PlanName = styled.p`
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #4b5563;
`;

const FeaturesList = styled.div`
  margin: 1.5rem 0;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const FeatureText = styled.span`
  margin-left: 0.5rem;
  color: #4b5563;
`;

const PriceBox = styled.div`
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  color: #374151;
`;

const PriceAmount = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`;

const TermsText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const TermsLink = styled.a`
  color: #2563eb;
  text-decoration: none;
  margin: 0 0.25rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const SecureCheckoutLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  color: #6b7280;
`;

const SecureText = styled.span`
  margin-left: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
`;

// Map for billing periods (added this since your plans don't specify billing cycles)
const planBillingCycles = {
  freemium: "month",
  elevate: "month",
  promax: "month",
  ultraelite: "month",
};

export default function PaymentPage() {
  const BASE_URL = "https://apiwl.novajobs.us";
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [couponCode, setCouponCode] = useState(null);
  const [error, setError] = useState("");
  const [promoId,setPromoId]= useState(null)
  const navigate = useNavigate();

  // Convert plans array to object with id as key for easy lookup
  const plansObj = plans.reduce((acc, plan) => {
    acc[plan.id] = {
      ...plan,
      billingCycle: planBillingCycles[plan.id] || "month",
      title: plan.name,
    };
    return acc;
  }, {});

  // Format price based on billing cycle
  const formatPrice = (plan) => {
    if (!plan) return "";

    if (plan.price === "0") {
      return "Free";
    }

    if (planBillingCycles[plan.id] === "single") {
      return `$${plan.price}`;
    } else if (planBillingCycles[plan.id] === "month") {
      return `$${plan.price}/mo`;
    } else if (planBillingCycles[plan.id] === "year") {
      return `$${plan.price}/yr`;
    }

    return `$${plan.price}`;
  };

  // Get renewal period text
  const getRenewalText = (plan) => {
    if (!plan) return "";

    if (planBillingCycles[plan.id] === "single") {
      return "one-time payment";
    } else if (planBillingCycles[plan.id] === "month") {
      return "every month";
    } else if (planBillingCycles[plan.id] === "year") {
      return "every year";
    }

    return "";
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planId = params.get("selectedPlan");

    if (planId && plansObj[planId]) {
      setSelectedPlanId(planId);
      setSelectedPlan(plansObj[planId]);
    } else {
      // Default to elevate plan instead of aiProYearly
      setSelectedPlanId("elevate");
      setSelectedPlan(plansObj.elevate);
    }
  }, []);

  // console.log(promoId,"promoid")

  const handleCheckout = async () => {
    if (!selectedPlanId) {
      toast.success("Please select a plan before proceeding.");
      return;
    }

    const token = localStorage.getItem("jobSeekerLoginToken");
    if (!token) {
      toast.error("Authentication required. Please log in.");
      navigate("/login2"); // Redirect to login page if token is missing
      return;
    }

    // Map selectedPlan to the correct plan_id for API
    const planMapping = {
      freemium: 2,
      elevate: 3,
      promax: 4,
      ultraelite: 5,
    };
    const url = window.location.origin.includes("localhost")
      ? "https://novajobs.us"
      : window.location.origin;
    const planId = planMapping[selectedPlanId];

    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/payment/checkout`,
        {
          plan_id: planId,
          domain: url,
          promo_id: promoId || null, // Use promoId if available
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("API Response:", response.data);
      
      if (response.status === 200) {
        if (response.data?.url) {
          toast.success( "Payment successful! Redirecting...");
          // window.location.href = response.data.url;
          window.open(response.data.url, "_blank");
        } else {
          console.error("No URL found in response:", response.data);
          toast.error(response.data.message || "Unexpected response from the server. No URL returned.");
        }
      } else {
        throw new Error(response.data.message || "Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error(error.response?.data?.message || "Error processing payment.");
    }finally{
      setPromoId("")
    }
  };

  // const handleVerify = async () => {
  //   try {
  //     const res = await axios.post(
  //       `${BASE_URL}/api/jobseeker/verify-coupon`,
  //       {
  //         code: couponCode,
  //       },
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("jobSeekerLoginToken"),
  //         },
  //       }
  //     );
  //     console.log(res.data.data.promo_id, "Coupon verification response");
  //     if (res.data.status === "success" || res.data.code === 200) {
  //       toast.success(res.data.message || "Coupon Code Verified successfully");
  //       setPromoId(res.data.data.promo_id)
  //       setError("");
  //     } else {
  //       setError(res.data.message || "Invalid coupon code");
  //     }
  //   } catch (error) {
  //     toast.error(
  //       error.response.data.message || "Error verifying coupon code."
  //     );
  //     console.log(error);
  //   }finally{
  //     setCouponCode("")
  //   }
  // };

  return (
    <>
      <UserHeader2 />
      <PageContainer>
        <CardContainer>
          <ContentSection>
            <OrderReviewSection>
              <SectionTitle>Review your order</SectionTitle>
              <PlanName>
                <strong>Plan:</strong> {selectedPlan ? selectedPlan.name : ""}
              </PlanName>

              <FeaturesList>
                {selectedPlan &&
                  selectedPlan.features.map((feature, index) => (
                    <FeatureItem key={index}>
                      <CheckCircle color="#2563eb" size={18} />
                      <FeatureText>{feature}</FeatureText>
                    </FeatureItem>
                  ))}

                {selectedPlan &&
                  planBillingCycles[selectedPlan.id] !== "single" && (
                    <FeatureItem>
                      <CheckCircle color="#2563eb" size={18} />
                      <FeatureText>
                        Automatically renews {getRenewalText(selectedPlan)}.
                      </FeatureText>
                    </FeatureItem>
                  )}
              </FeaturesList>

              <PriceBox>
                Total due today
                <PriceAmount>
                  {selectedPlan ? formatPrice(selectedPlan) : ""}
                </PriceAmount>
              </PriceBox>
            </OrderReviewSection>

            {/* Terms and Conditions */}
            <TermsText>
              By clicking <strong>"Start applying"</strong> below, you agree to
              our
              <TermsLink href="#">Terms of Use</TermsLink>
              and
              <TermsLink href="#">Privacy Policy</TermsLink>. You also
              understand that you will be billed
              <strong> {selectedPlan ? formatPrice(selectedPlan) : ""}</strong>,
              which will automatically renew
              {selectedPlan && selectedPlan.id !== ""
                ? " " + getRenewalText(selectedPlan)
                : ""}
              .<strong> You can cancel at any time.</strong>
            </TermsText>

            {/* <div className="mb-3">
              <label className="form-label fw-semibold">Have a Coupon?</label>
              <div className="input-group gap-2">
                <input
                  type="text"
                  placeholder="Enter your Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="form-control"
                />
                <button
                  onClick={handleVerify}
                  disabled={!couponCode}
                  className="site-button btn-md-sm rounded"
                  type="button"
                >
                  Verify
                </button>
              </div>
              {error && (
                <div className="form-text text-danger mt-1">{error}</div>
              )}
            </div> */}

            {/* Start Applying Button */}
            <button  className="site-button w-100 btn-md-sm rounded bg-primary" onClick={handleCheckout}>Start applying</button>

            {/* Secure Checkout */}
            <SecureCheckoutLabel>
              <Lock color="#2563eb" size={20} />
              <SecureText>SECURE CHECKOUT</SecureText>
            </SecureCheckoutLabel>
          </ContentSection>
        </CardContainer>
      </PageContainer>
    </>
  );
}
