"use client"

const Navigation = ({ activeSection, scrollToSection }) => {
  const navItems = [
    { id: "about", label: "About" },
    { id: "benefits", label: "Benefits" },
    { id: "jobs", label: "Jobs" },
    { id: "gallery", label: "Gallery" },
    { id: "teams", label: "Team" },
  ]

  return (
    <div className="sticky-nav">
      <div className="nav-container">
        {navItems.map((item) => (
          <a
            key={item.id}
            className={`nav-link ${activeSection === item.id ? "active" : ""}`}
            onClick={() => scrollToSection(item.id)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}

export default Navigation
