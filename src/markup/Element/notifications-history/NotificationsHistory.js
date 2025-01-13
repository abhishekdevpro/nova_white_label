import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Bell, MessageSquare, Briefcase } from "lucide-react";

// Styled Components
const Container = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #007bff;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #dc3545;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6c757d;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const NotificationContent = styled.div`
  flex-grow: 1;
  margin-left: 1rem;
`;

const NotificationMessage = styled.p`
  color: #1f2937;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const NotificationDate = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #e5e7eb;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #d1d5db;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NotificationsHistory = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch token safely
  const token = localStorage.getItem("jobSeekerLoginToken") || localStorage.getItem("employeeLoginToken") || '';


  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      
      // Add more robust error handling
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(
        "https://api.novajobs.us/api/employeer/notifications",
        {
          headers: { 
           
            'Content-Type': 'application/json'
          },
          timeout: 10000 // 10 second timeout
        }
      );

      if (response.data?.status === "success" && Array.isArray(response.data?.data)) {
        setNotifications(response.data.data);
        setError(null);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      // More detailed error handling
      const errorMessage = err.response 
        ? (err.response.data?.message || "Failed to fetch notifications")
        : (err.message || "An unexpected error occurred");
      
      setError(errorMessage);
      setNotifications([]);
      console.error("Notifications Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const getNotificationIcon = (type) => {
    const iconProps = { size: 24 };
    switch (type?.toLowerCase()) {
      case "job":
        return <Briefcase {...iconProps} color="#3b82f6" />;
      case "message":
        return <MessageSquare {...iconProps} color="#10b981" />;
      default:
        return <Bell {...iconProps} color="#6b7280" />;
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil((notifications?.length || 0) / notificationsPerPage);
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Render methods for different states
  const renderLoading = () => (
    <LoadingSpinner>
      <div className="spinner" />
    </LoadingSpinner>
  );

  const renderError = () => (
    <ErrorMessage>
      <h4>Oops! Something went wrong</h4>
      <p>{error || "Unable to load notifications"}</p>
    </ErrorMessage>
  );

  const renderEmptyState = () => (
    <EmptyState>
      <h4>No Notifications</h4>
      <p>You have no notifications at the moment.</p>
    </EmptyState>
  );

  const renderNotifications = () => (
    <>
      {currentNotifications.map((notification) => (
        <NotificationItem key={notification.id || Math.random()}>
          {getNotificationIcon(notification.type)}
          <NotificationContent>
            <NotificationMessage>
              {notification.message || "No message available"}
            </NotificationMessage>
            <NotificationDate>
              {formatDate(notification.created_at)}
            </NotificationDate>
          </NotificationContent>
        </NotificationItem>
      ))}

      <PaginationContainer>
        <PaginationButton 
          onClick={handlePreviousPage} 
          disabled={currentPage === 1}
        >
          Previous
        </PaginationButton>
        
        <span>Page {currentPage} of {totalPages}</span>
        
        <PaginationButton 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationButton>
      </PaginationContainer>
    </>
  );

  return (
    <Container>
      <Header>
        <Title>Notification History</Title>
      </Header>
      
      <Content>
        {loading 
          ? renderLoading() 
          : error 
            ? renderError()
            : notifications.length === 0 
              ? renderEmptyState()
              : renderNotifications()
        }
      </Content>
    </Container>
  );
};

export default NotificationsHistory;