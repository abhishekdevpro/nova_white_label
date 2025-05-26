// export const plans = [
// {
//   id: "freemium",
//   name: "Freemium",
//   price: "0",
//   isPopular: false,
//   isDark: false,
//   features: [
//     "Job Search",
//     "Job Apply",
//     "AI Dashboard",
//     "Limited AI Resume Builder",
//     "Access to Free Courses",
//     "Profile Listing",
//   ],
// },
//     {
//       id: "elevate",
//       name: "Elevate",
//       price: "18.95",
//       isPopular: true,
//       isDark: false,
//       features: [
//         "Everything in Freemium",
//         "Advanced Job Search",
//         "Advanced AI Resume Builder",
//         "Access to Advanced Courses",
//         "AI Skill Test",
//         "Access to UltraAura"
//       ],
//     },
//     {
//       id: "promax",
//       name: "Pro Max",
//       price: "48.95",
//       isPopular: false,
//       isDark: false,
//       features: [
//         "Everything in Elevate",
//         "Career coach interactions",
//         "Certification included",
//         "Access to UltraAura"
//       ],
//     },
//     {
//       id: "ultraelite",
//       name: "Ultra Elite",
//       price: "98.95",
//       isPopular: false,
//       isDark: true,
//       features: [
//         "Everything in Pro Max",
//         "Trainer access (as needed)",
//         "Certification included (after course request & eligibility)",
//         "Access to UltraAura"
//       ],
//     },
//   ];

export const plans = [
  {
    id: "freemium",
    name: "Launch Plan",
    price: "18.95",
    isPopular: false,
    isDark: false,
    features: [
      "Create & Update Profile",
      "1-Click Apply to Jobs",
      "AI Resume + Cover Letter Builder",
      "AI Skill Tests & Career Suggestions",
      "Save Multiple Resumes",

      "Real-Time Application Tracking",

      "Chat with Recruiters",

      "Earn Rewards via Referrals",
      // "Access to Free C "Profile Listing",
      <span className="flex items-center gap-1">
        Access to Edtech{" "}
        <a
          href="https://ultraaura.education/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://ultraaura.education/static/media/Ultra_Aura.cabb61de498b919d72f4.png"
            alt="UltraAura"
            className="h-2 w-5 inline-block"
            style={{
              height: "2rem",
              width: "auto",
              display: "inline-block",
              color: "white",
            }}
          />
        </a>
      </span>,
    ],
  },
  {
    id: "elevate",
    name: "Lift Plan",
    price: "38.95",
    isPopular: true,
    isDark: false,
    features: [
      "Everything in Launch, plus:",
      "AI Interview Prep (Basic Q&A)",
      "Job Fit Score & Smart Recommendations",
      // "Access to Advanced Courses",
      "Auto-Fill Applications",
      "Skill Match & Goal Path",

      "AI Application Tracker",

      "Resume Feedback (AI)",

      "Enhanced Notifications & Alerts",
      <span className="d-inline-flex align-items-center gap-11">
        Access to Edtech{" "}
        <a
          href="https://ultraaura.education/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://ultraaura.education/static/media/Ultra_Aura.cabb61de498b919d72f4.png"
            alt="UltraAura"
            className="h-2 w-5 inline-block"
            style={{
              height: "2rem",
              width: "auto",
              display: "inline-block",
            }}
          />
        </a>
      </span>,
    ],
  },
  {
    id: "promax",
    name: "Thrive Plan",
    price: "78.95",
    isPopular: false,
    isDark: false,
    features: [
      "Everything in Lift, plus:",
      "Monthly Career Coach Interactions / Monitoring",
      "Resume Review (Human-verified)",
      "Job Strategy & LinkedIn Branding Toolkit",

      "Certification Access via UltraAura",
      "Career Progress Tracker",
      "Shareable Digital Badges",

      <span className="flex items-center gap-1">
        Access to Edtech{" "}
        <a
          href="https://ultraaura.education/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://ultraaura.education/static/media/Ultra_Aura.cabb61de498b919d72f4.png"
            alt="UltraAura"
            className="h-2 w-5 inline-block"
            style={{
              height: "2rem",
              width: "auto",
              display: "inline-block",
            }}
          />
        </a>
      </span>,
    ],
  },
  {
    id: "ultraelite",
    name: "Ascend Plan ",
    price: "148.95",
    isPopular: false,
    isDark: true,
    features: [
      "Everything in Thrive, plus:",
      "Career Coaching & Trainer Monitoring",
      "Dedicated Personal Career Mentor",
      "AI Branding & Executive Resume Enhancement",
      "Unlimited Access UltraAura",
      "Verified & physical Certifications",
      "Priority Job Matching + Employer Alerts",
      "Beta Access to Exclusive Tools & Pilots",
      "Enterprise-Grade Career Dashboard",
      <span className="flex items-center gap-1">
        Access to Edtech{" "}
        <a
          href="https://ultraaura.education/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://ultraaura.education/static/media/Ultra_Aura.cabb61de498b919d72f4.png"
            alt="UltraAura"
            className="h-2 w-5 inline-block"
            style={{
              height: "2rem",
              width: "auto",
              display: "inline-block",
              color: "white",
            }}
          />
        </a>
      </span>,
    ],
  },
];
