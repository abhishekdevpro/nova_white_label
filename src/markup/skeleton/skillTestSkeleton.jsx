import React from "react";

function LoadingBox() {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "14rem",
      width: "20rem",
      backgroundColor: "#fff",
      borderRadius: "0.75rem",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      border: "1px solid #e5e7eb",
    },
    shimmer: {
      position: "absolute",
      top: "0",
      left: "-100%",
      width: "100%",
      height: "100%",
      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)",
      animation: "shimmer 2s infinite ease-in-out",
    },
    skeletonContent: {
      width: "85%",
      height: "80%",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      padding: "16px",
    },
    skeletonLine: {
      height: "12px",
      backgroundColor: "#e5e7eb",
      borderRadius: "6px",
      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
    skeletonLineShort: {
      height: "12px",
      backgroundColor: "#e5e7eb",
      borderRadius: "6px",
      width: "70%",
      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      animationDelay: "0.3s",
    },
    skeletonHeader: {
      height: "20px",
      backgroundColor: "#d1d5db",
      borderRadius: "8px",
      marginBottom: "8px",
      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      animationDelay: "0.1s",
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
    loadingDots: {
      display: "flex",
      gap: "4px",
      position: "absolute",
      bottom: "16px",
      right: "16px",
    },
    dot: {
      width: "8px",
      height: "8px",
      backgroundColor: "#9ca3af",
      borderRadius: "50%",
      animation: "bounce 1.4s ease-in-out infinite both",
    },
  };

  // CSS animations as a style tag
  const animations = `
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
    
    @keyframes shimmer {
      0% {
        left: -100%;
      }
      100% {
        left: 100%;
      }
    }
    
    @keyframes bounce {
      0%, 80%, 100% {
        transform: scale(0);
      }
      40% {
        transform: scale(1);
      }
    }
  `;

  return (
    <>
      <style>{animations}</style>
      
      {/* Dark overlay background */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        gap: "24px"
      }}>
        
        {/* Single loading box */}
        <div role="status" style={styles.container}>
          {/* Shimmer effect */}
          <div style={styles.shimmer}></div>
          
          {/* Skeleton content */}
          <div style={styles.skeletonContent}>
            <div style={styles.skeletonHeader}></div>
            <div style={styles.skeletonLine}></div>
            <div style={styles.skeletonLine}></div>
            <div style={styles.skeletonLineShort}></div>
            <div style={styles.skeletonLine}></div>
            <div style={styles.skeletonLineShort}></div>
          </div>
          
          {/* Loading dots */}
          <div style={styles.loadingDots}>
            <div style={styles.dot}></div>
            <div style={{...styles.dot, animationDelay: "0.2s"}}></div>
            <div style={{...styles.dot, animationDelay: "0.4s"}}></div>
          </div>
          
          <span style={styles.visuallyHidden}>Loading content...</span>
        </div>
        
        {/* Warning text */}
        <div style={{
          color: "white",
          fontSize: "18px",
          fontWeight: "500",
          textAlign: "center",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
          maxWidth: "400px",
          lineHeight: "1.5"
        }}>
           Do not leave the screen, your test is processing...
        </div>
        
      </div>
    </>
  );
}

export default LoadingBox;