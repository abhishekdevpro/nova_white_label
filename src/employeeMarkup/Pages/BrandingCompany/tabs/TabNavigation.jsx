

// // const TabNavigation = ({ tabs, activeTab, setActiveTab }) => {
// //   return (
// //     <div className="mb-4">
// //       <ul className="nav nav-tabs" role="tablist">
// //         {tabs.map((tab) => (
// //           <li key={tab.id} className="nav-item">
// //             <button
// //               className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
// //               onClick={() => setActiveTab(tab.id)}
// //               type="button"
// //               style={{
// //                 color: activeTab === tab.id ? "#1967d2" : "#6c757d",
// //                 borderBottom: activeTab === tab.id ? "2px solid #1967d2" : "none",
// //                 padding: "0.5rem 1rem",
// //                 fontWeight: activeTab === tab.id ? "600" : "400",
// //               }}
// //             >
// //               {tab.label}
// //             </button>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   )
// // }

// // export default TabNavigation


// const TabNavigation = ({ tabs, activeTab, setActiveTab }) => {
//   return (
//     <div className="mb-4 tab-nav-container">
//       <ul className="nav nav-tabs" role="tablist">
//         {tabs.map((tab) => (
//           <li key={tab.id} className="nav-item">
//             <button
//               className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
//               onClick={() => setActiveTab(tab.id)}
//               type="button"
//               style={{
//                 color: activeTab === tab.id ? "#1967d2" : "#6c757d",
//                 borderBottom: activeTab === tab.id ? "2px solid #1967d2" : "none",
//                 padding: "0.5rem 1rem",
//                 fontWeight: activeTab === tab.id ? "600" : "400",
//                 background: "none",
//               }}
//             >
//               {tab.label}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TabNavigation;

import React from "react";
import styled from "styled-components";

const TabNavContainer = styled.div`
  margin-bottom: 1rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabList = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 4px;
  margin: 0;
  padding-left: 0;
`;

const TabItem = styled.li`
  margin-right: 8px;
  list-style: none;
  flex-shrink: 0;
`;

const TabButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  color: ${(props) => (props.active ? "#1967d2" : "#6c757d")};
  border-bottom: ${(props) => (props.active ? "2px solid #1967d2" : "none")};
  cursor: pointer;
  white-space: nowrap;

  @media (max-width: 576px) {
    padding: 0.4rem 0.75rem;
    font-size: 14px;
  }
`;

const TabNavigation = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <TabNavContainer>
      <TabList role="tablist">
        {tabs.map((tab) => (
          <TabItem key={tab.id}>
            <TabButton
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              {tab.label}
            </TabButton>
          </TabItem>
        ))}
      </TabList>
    </TabNavContainer>
  );
};

export default TabNavigation;
