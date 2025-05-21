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
      name: "Freemium",
      price: "0",
      isPopular: false,
      isDark: false,
      features: [
        "Job Search",
        "Job Apply",
        "AI Dashboard",
        "Limited AI Resume Builder",
        "Access to Free Courses",
        "Profile Listing",
      ],
    },
  {
    id: "elevate",
    name: "Elevate",
    price: "18.95",
    isPopular: true,
    isDark: false,
    features: [
      "Everything in Freemium",
      "Advanced Job Search",
      "Advanced AI Resume Builder",
      "Access to Advanced Courses",
      "AI Skill Test",
      <span className="d-inline-flex align-items-center gap-11">
        Access to{" "}
        <a href="https://ultraaura.education/" target="_blank" rel="noopener noreferrer" >
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
    name: "Pro Max",
    price: "48.95",
    isPopular: false,
    isDark: false,
    features: [
      "Everything in Elevate",
      "Career coach interactions",
      "Certification included",
      <span className="flex items-center gap-1">
        Access to{" "}
         <a href="https://ultraaura.education/" target="_blank" rel="noopener noreferrer" >
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
    name: "Ultra Elite",
    price: "98.95",
    isPopular: false,
    isDark: true,
    features: [
      "Everything in Pro Max",
      "Trainer access (as needed)",
      "Certification included (after course request & eligibility)",
      <span className="flex items-center gap-1">
        Access to{" "}
         <a href="https://ultraaura.education/" target="_blank" rel="noopener noreferrer" >
          <img
          src="https://ultraaura.education/static/media/Ultra_Aura.cabb61de498b919d72f4.png"
          alt="UltraAura"
          className="h-2 w-5 inline-block"
          style={{
            height: "2rem",
            width: "auto",
            display: "inline-block",
            color:"white"
          }}
        />
        </a>
      </span>,
    ],
  },
];
