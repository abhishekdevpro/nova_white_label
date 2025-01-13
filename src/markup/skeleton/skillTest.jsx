import React from "react";

function LoadingBox() {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "14rem",
      width: "20rem",
      backgroundColor: "#d1d5db",
      borderRadius: "0.5rem",
      animation: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
    visuallyHidden: {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
      border: "0",
    },
  };
  const array = [0, 1, 2, 3, 4, 5];
  return (
    <div className="row justify-content-center " style={{ gap: "12px" }}>
      {array.map((item, index) => {
        return (
          <div role="status" style={styles.container}>
            <span style={styles.visuallyHidden}>Loading...</span>
          </div>
        );
      })}
    </div>
  );
}

export default LoadingBox;
