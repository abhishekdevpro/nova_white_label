import React from 'react';
import { Navbar, Nav, Badge, Button } from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";
import { FaBell } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

const CustomNavbar = () => {
  const notifications = 5;
  const location = useLocation();

  const handleLogout = () => {
    // Clear authentication token or perform necessary logout actions
    localStorage.removeItem('authToken');
    // Redirect to admin login screen
    <Navigate to="/admin/login" />
    return ;
  };

  // Check if the user is on the login screen
  const isLoginScreen = location.pathname === '/admin/login';

  return (
    <Navbar bg="white" variant="white" className='py-3 border-bottom'>
      <Navbar.Brand as={Link} to="/">
        <img
          style={{ width: "110px" }}
          src={require("../images/logo/NovaUS.png")}
          className="logo"
          alt="img"
        />
      </Navbar.Brand>

      {!isLoginScreen && ( // Hide notifications and logout button on login screen
        <Nav className="ml-auto align-items-center">
          <Nav.Link href="#" className="mr-4">
            <FaBell size={20} />
            <Badge variant="danger" className="ml-1">
              {notifications}
            </Badge>
          </Nav.Link>

          <Link to={"/admin/login"}>
          <Button  onClick={handleLogout} style={{backgroundColor:'#1C2957'}} className='text-white px-4'>
            Logout
          </Button>
          </Link>
        </Nav>
      )}
    </Navbar>
  );
};

export default CustomNavbar;
