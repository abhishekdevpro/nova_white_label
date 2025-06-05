"use client"

const TabNavigation = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="mb-4">
      <ul className="nav nav-tabs" role="tablist">
        {tabs.map((tab) => (
          <li key={tab.id} className="nav-item">
            <button
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              type="button"
              style={{
                color: activeTab === tab.id ? "#1967d2" : "#6c757d",
                borderBottom: activeTab === tab.id ? "2px solid #1967d2" : "none",
                padding: "0.5rem 1rem",
                fontWeight: activeTab === tab.id ? "600" : "400",
              }}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TabNavigation
