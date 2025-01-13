import React from "react";
import { Modal } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

function JobPageSkeleton() {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "14rem",
      width: "20rem",
      margin: "20px",
      backgroundColor: "#d1d5db",
      borderRadius: "0.5rem",
      animation: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
    first: {
      height: "100px",
      marginBottom: "30px",
    },
    second: {
      height: "300px",
      marginBottom: "30px",
    },
    third: {
      height: "400px",
    },
  };

  const array = [0, 1, 2, 3];
  return (
    <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12">
      <div style={styles.first}>
        <Skeleton height="100%" containerClassName="avatar-skeleton" />
      </div>
      <div style={styles.second}>
        <Skeleton height="100%" containerClassName="avatar-skeleton" />
      </div>

      <div style={styles.third}>
        <Skeleton height="100%" containerClassName="avatar-skeleton" />
      </div>
    </div>
  );
}

export default JobPageSkeleton;
