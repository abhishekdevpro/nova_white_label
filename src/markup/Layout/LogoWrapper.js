// import { Link } from "react-router-dom";
// import { useLogo } from "../../Context/LogoContext";

// const LogoWrapper = () => {
//   const {logo} = useLogo();

//   return (
//     <div className="logo-header mostion">
//       <Link to="/">
//         {logo ? (
//           <img src={logo} className="logo" alt="Company Logo" />
//         ) : (
//           <span>Loading...</span> // Show text while logo loads
//         )}
//       </Link>
//     </div>
//   );
// };

// export default LogoWrapper;


import { Link } from "react-router-dom";
import { useLogo } from "../../Context/LogoContext";

const LogoWrapper = () => {
  const { logo } = useLogo();

  const employeeLoginToken = localStorage.getItem("employeeLoginToken");
  const vendorLoginToken = localStorage.getItem("vendorLoginToken");

  let linkPath = "/";
  if (employeeLoginToken) {
    linkPath = "/employer/company-profile";
  } else if (vendorLoginToken) {
    linkPath = "/vendor/vendorprofile";
  }

  return (
    <div className="logo-header mostion">
      <Link to={linkPath}>
        {logo ? (
          <img src={logo} className="logo" alt="Company Logo" />
        ) : (
          <span>Loading...</span>
        )}
      </Link>
    </div>
  );
};

export default LogoWrapper;
