import React from "react";
import Skeleton from "react-loading-skeleton";

function SimpleLoadingSkeleton() {
  const style = {
    pulse: {
      animation: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      display: "flex",
      flexDirection: "column",
      gap: "7px",
      alignItems: "center",
    },
    barLarge: {
      height: "10px",
      width: "400px",

      borderRadius: "9999px",
      maxWidth: "640px",
      marginBottom: "10px",
      margin: "0 auto",
    },
    barMedium: {
      width: "300px",

      height: "10px",
      backgroundColor: "#d1d5db",
      borderRadius: "9999px",
      maxWidth: "540px",
      margin: "0 auto",
    },
    iconContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "16px",
    },
    icon: {
      width: "60px",
      height: "60px",

      marginRight: "16px",
    },
    smallBar: {
      width: "80px",
      height: "10px",
      backgroundColor: "#e5e7eb",
      borderRadius: "9999px",
      marginRight: "12px",
    },
    smallerBar: {
      width: "96px",
      height: "8px",
      backgroundColor: "#e5e7eb",
      borderRadius: "9999px",
    },
  };

  return (
    <div className="candidate-detail">
      <div className="canditate-des text-center">
        <div style={style.icon}>
          <Skeleton
            circle
            baseColor="#c5cbd1"
            height="100%"
            containerClassName="avatar-skeleton"
          />
        </div>
      </div>
      <div className="">
        <Skeleton
          height="10%"
          baseColor="#c5cbd1"
          containerClassName="avatar-skeleton"
        />

        <p className="m-b15">
          <Skeleton
            height="10%"
            baseColor="#c5cbd1"
            containerClassName="avatar-skeleton"
          />
        </p>
        <ul className="clearfix">
          <li>
            <Skeleton
              height="10%"
              baseColor="#c5cbd1"
              containerClassName="avatar-skeleton"
            />
          </li>

          <li>
            <Skeleton
              height="10%"
              baseColor="#c5cbd1"
              containerClassName="avatar-skeleton"
            />
          </li>

          <li>
            <Skeleton
              height="10%"
              baseColor="#c5cbd1"
              containerClassName="avatar-skeleton"
            />
          </li>
          <li>
            <Skeleton
              height="10%"
              baseColor="#c5cbd1"
              containerClassName="avatar-skeleton"
            />
          </li>
        </ul>
        <div className="progress-box m-t10">
          <div className="progress-info" style={style.barMedium}>
            <Skeleton
              height="10%"
              baseColor="#c5cbd1"
              containerClassName="avatar-skeleton"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleLoadingSkeleton;
