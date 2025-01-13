import { connect, useDispatch } from "react-redux";
import { Link, useNavigate, withRouter } from "react-router-dom";
import React from "react";
import { logout } from "../../store/actions/AuthActions";
import { isAuthenticated } from "../../store/selectors/AuthSelectors";

function LogoutPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("employeeLoginToken");
    navigate("/");
  };
  return (
    <>
      <button
        to={"#"}
        title="READ MORE"
        className="site-button"
        onClick={onLogout}
      >
        <i className="fa fa-lock"></i> Logout
      </button>
    </>
  );
}
// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: isAuthenticated(state),
//   };
// };

export default LogoutPage;
