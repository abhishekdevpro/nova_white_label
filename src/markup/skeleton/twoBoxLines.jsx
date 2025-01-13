import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function TwoBoxWithLinesSkeleton() {
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
    heightLeft: {
      height: "60px",
      marginTop: "10px",
    },
    heightInput: {
      height: "30px",
      marginTop: "10px",
    },
  };

  const array = [0, 1, 2, 3];
  return (
    <div className="container h-100">
      <div className="container">
        <div className="d-flex justify-content-center align-items-center  ">
          <div className="col-lg-2  col-md-5 col-12  ">
            <div className="form-group" style={styles.heightInput}>
              <Skeleton height="100%" containerClassName="avatar-skeleton" />
            </div>
          </div>

          <div className="col-lg-2  col-md-5 col-12 ">
            <div className="form-group" style={styles.heightInput}>
              <Skeleton height="100%" containerClassName="avatar-skeleton" />
            </div>
          </div>

          <div className="col-lg-2  col-md-5 col-12  ">
            <div className="form-group" style={styles.heightInput}>
              <Skeleton height="100%" containerClassName="avatar-skeleton" />
            </div>
          </div>

          <div className="col-lg-2  col-md-5 col-12 ">
            <div className="form-group" style={styles.heightInput}>
              <Skeleton height="100%" containerClassName="avatar-skeleton" />
            </div>
          </div>
          <div className="col-lg-2  col-md-5 col-12 ">
            <div className="form-group" style={styles.heightInput}>
              <Skeleton height="100%" containerClassName="avatar-skeleton" />
            </div>
          </div>
          <div className="col-lg-2  col-md-5 col-12  ">
            <div className="form-group" style={styles.heightInput}>
              <Skeleton height="100%" containerClassName="avatar-skeleton" />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="d-flex" style={{ gap: "12px", marginBottom: "20px" }}>
          <div
            className="p-2 "
            style={{
              width: "75%",
              height: "50px",
              alignItems: "center",
            }}>
            <Skeleton height="100%" containerClassName="avatar-skeleton" />
          </div>
          <div
            className="p-2"
            style={{
              width: "15%",
              height: "50px",
              alignItems: "center",
            }}>
            <Skeleton height="100%" containerClassName="avatar-skeleton" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4 col-lg-5 m-b30">
          <div style={styles.heightLeft}>
            <Skeleton height="100%" containerClassName="avatar-skeleton" />
          </div>
          <div style={styles.heightLeft}>
            <Skeleton height="100%" containerClassName="avatar-skeleton" />
          </div>
          <div style={styles.heightLeft}>
            <Skeleton height="100%" containerClassName="avatar-skeleton" />
          </div>
          <div style={styles.heightLeft}>
            <Skeleton height="100%" containerClassName="avatar-skeleton" />
          </div>
          <div style={styles.heightLeft}>
            <Skeleton height="100%" containerClassName="avatar-skeleton" />
          </div>
          <div style={styles.heightLeft}>
            <Skeleton height="100%" containerClassName="avatar-skeleton" />
          </div>
          <div style={styles.heightLeft}>
            <Skeleton height="100%" containerClassName="avatar-skeleton" />
          </div>
          <div style={styles.heightLeft}>
            <Skeleton height="100%" containerClassName="avatar-skeleton" />
          </div>
          <div style={styles.heightLeft}>
            <Skeleton height="100%" containerClassName="avatar-skeleton" />
          </div>
          <div style={styles.heightLeft}>
            <Skeleton height="100%" containerClassName="avatar-skeleton" />
          </div>
          <div style={styles.heightLeft}>
            <Skeleton height="100%" containerClassName="avatar-skeleton" />
          </div>
        </div>
        <div className="col-xl-8 col-lg-7 m-b30">
          <Skeleton height="100%" containerClassName="avatar-skeleton" />
        </div>
      </div>
    </div>
  );
}

export default TwoBoxWithLinesSkeleton;
