import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaRss,
  FaInstagram,
} from "react-icons/fa";

const Editor = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [layoutAlignment, setLayoutAlignment] = useState("center");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [content, setContent] = useState({
    logo: "https://novajobs.us/static/media/NovaUS.649f79957e5090a75022.png",
    bgImage:
      "https://static.zohocdn.com/recruit/images/cover1.0e02dce62a260cd1dbbafeacf59e558a.jpg",
    heading: "We are always hiring",
    subHeading: `Explore current openings below. We hire for 
      Salesforce developers, front-end developers & many more.`,
    buttons: { label: "View Openings", link: "#" },
    menu: [
      { label: "HOME", link: "#" },
      { label: "JOBS", link: "#" },
      { label: "BLOG", link: "#" },
    ],
    icons: [
      { icon: <FaFacebook />, link: "#", enabled: true },
      { icon: <FaLinkedin />, link: "#", enabled: true },
      { icon: <FaTwitter />, link: "#", enabled: true },
      { icon: <FaYoutube />, link: "#", enabled: true },
      { icon: <FaRss />, link: "#", enabled: true },
    ],
    transparency: 50,
  });

  const adjustTransparency = (amount) => {
    setContent((prev) => ({
      ...prev,
      transparency: Math.max(0, Math.min(100, prev.transparency + amount)),
    }));
  };
  const availableIcons = [
    { label: "Facebook", component: <FaFacebook /> },
    { label: "LinkedIn", component: <FaLinkedin /> },
    { label: "Twitter", component: <FaTwitter /> },
    { label: "YouTube", component: <FaYoutube /> },
    { label: "RSS", component: <FaRss /> },
    { label: "Instagram", component: <FaInstagram /> },
  ];

  const handleContentChange = (key, value) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const handleMenuChange = (index, key, value) => {
    const updatedMenu = [...content.menu];
    updatedMenu[index][key] = value;
    setContent((prev) => ({ ...prev, menu: updatedMenu }));
  };

  const handleIconChange = (index, key, value) => {
    const updatedIcons = [...content.icons];
    updatedIcons[index][key] = value;
    setContent((prev) => ({ ...prev, icons: updatedIcons }));
  };

  const handleDeleteMenu = (index) => {
    const updatedMenu = content.menu.filter((_, i) => i !== index);
    setContent((prev) => ({ ...prev, menu: updatedMenu }));
  };

  const handleDeleteIcon = (index) => {
    const updatedIcons = content.icons.filter((_, i) => i !== index);
    setContent((prev) => ({ ...prev, icons: updatedIcons }));
  };

  const handleCancel = () => {
    setSelectedElement(null);
  };

  const handleUpdate = () => {
    console.log("Updated content:", { ...content, layoutAlignment });

    setSelectedElement(null);
  };

  return (
    <div className="d-flex flex-column flex-md-row position-relative">
      {/* Mobile Menu Button */}
      <button
        className="d-md-none btn btn-primary position-fixed"
        style={{ top: "10px", right: "10px", zIndex: 1000 }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar bg-light p-3 ${
          isSidebarOpen ? "d-block" : "d-none"
        } d-md-block`}
        style={{
          width: "100%",
          maxWidth: "300px",
          position: isSidebarOpen ? "fixed" : "relative",
          top: 0,
          left: 0,
          height: "100vh",
          overflowY: "auto",
          zIndex: 999,
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Edit Options</h5>
          <button
            className="btn-close"
            onClick={() => setSelectedElement(null)}
          ></button>
        </div>

        {selectedElement === "editLayout" && (
          <div style={{ marginTop: "20px" }}>
            <label>Select Layout Alignment:</label>
            <div className="btn-group mb-3" role="group">
              <button
                className={`btn ${
                  layoutAlignment === "left"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setLayoutAlignment("left")}
              >
                Left
              </button>
              <button
                className={`btn ${
                  layoutAlignment === "center"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setLayoutAlignment("center")}
              >
                Center
              </button>
              <button
                className={`btn ${
                  layoutAlignment === "right"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setLayoutAlignment("right")}
              >
                Right
              </button>
            </div>
          </div>
        )}
        {selectedElement === "editText" && (
          <div>
            <label>Edit Heading:</label>
            <input
              type="text"
              className="form-control mb-2"
              value={content.heading}
              onChange={(e) => handleContentChange("heading", e.target.value)}
            />
            <label>Edit Subheading:</label>
            <textarea
              className="form-control mb-2"
              rows="3"
              value={content.subHeading}
              onChange={(e) =>
                handleContentChange("subHeading", e.target.value)
              }
            ></textarea>
            <label>Edit Button Text:</label>
            <input
              type="text"
              className="form-control mb-2"
              value={content.buttons.label}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  buttons: { ...prev.buttons, label: e.target.value },
                }))
              }
            />
            <label>Edit Button URL:</label>
            <input
              type="text"
              className="form-control"
              value={content.buttons.link}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  buttons: { ...prev.buttons, link: e.target.value },
                }))
              }
            />
          </div>
        )}

        {selectedElement === "logo" && (
          <div>
            <label>Upload Logo:</label>
            <input
              type="file"
              className="form-control mb-2"
              onChange={(e) =>
                handleContentChange(
                  "logo",
                  URL.createObjectURL(e.target.files[0])
                )
              }
            />
            <button
              className="btn btn-danger mt-2"
              onClick={() => handleContentChange("logo", "")}
            >
              Delete Logo
            </button>
          </div>
        )}
        {selectedElement === "menu" && (
          <div>
            <label>Edit Menu:</label>
            {content.menu.map((menuItem, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  className="form-control mb-1"
                  value={menuItem.label}
                  onChange={(e) =>
                    handleMenuChange(index, "label", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="form-control"
                  value={menuItem.link}
                  onChange={(e) =>
                    handleMenuChange(index, "link", e.target.value)
                  }
                />
                <button
                  className="btn btn-danger btn-sm mt-1"
                  onClick={() => handleDeleteMenu(index)}
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              className="btn btn-primary mt-3"
              onClick={() =>
                setContent((prev) => ({
                  ...prev,
                  menu: [...prev.menu, { label: "New Menu", link: "#" }],
                }))
              }
            >
              Add Menu
            </button>
          </div>
        )}
        {selectedElement === "icons" && (
          <div>
            <label>Edit Social Media Icons:</label>
            {content.icons.map((icon, index) => (
              <div
                key={index}
                className="d-flex align-items-center mb-2 border p-2"
                style={{ borderStyle: "dotted" }}
              >
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={icon.enabled}
                  onChange={(e) =>
                    handleIconChange(index, "enabled", e.target.checked)
                  }
                />
                <select
                  className="form-select me-2"
                  onChange={(e) =>
                    handleIconChange(
                      index,
                      "icon",
                      availableIcons.find((ic) => ic.label === e.target.value)
                        .component
                    )
                  }
                >
                  {availableIcons.map((ic) => (
                    <option
                      key={ic.label}
                      value={ic.label}
                      selected={
                        icon.icon.type.displayName ===
                        ic.component.type.displayName
                      }
                    >
                      {ic.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Link"
                  value={icon.link}
                  onChange={(e) =>
                    handleIconChange(index, "link", e.target.value)
                  }
                />
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleDeleteIcon(index)}
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              className="btn btn-primary mt-3"
              onClick={() =>
                setContent((prev) => ({
                  ...prev,
                  icons: [
                    ...prev.icons,
                    { icon: <FaFacebook />, link: "#", enabled: true },
                  ],
                }))
              }
            >
              Add Icon
            </button>
          </div>
        )}

        {selectedElement === "bgImage" && (
          <div>
            <label>Upload Image:</label>
            <input
              type="file"
              className="form-control mb-2"
              onChange={(e) =>
                handleContentChange(
                  "bgImage",
                  URL.createObjectURL(e.target.files[0])
                )
              }
            />

            <label>Background Color:</label>
            <input
              type="color"
              className="form-control mb-2"
              value={content.bgColor}
              onChange={(e) => handleContentChange("bgColor", e.target.value)}
            />

            <label>Text Color:</label>
            <input
              type="color"
              className="form-control mb-2"
              value={content.textColor}
              onChange={(e) =>
                handleContentChange("textColor", e.target.value)
              }
            />

            <label>Transparency:</label>
            <div className="d-flex align-items-center mb-2">
              <button
                className="btn btn-outline-secondary me-2"
                onClick={() => adjustTransparency(-10)}
              >
                Decrease
              </button>
              <input
                type="range"
                className="form-range me-2"
                min="0"
                max="100"
                step="1"
                value={content.transparency}
                onChange={(e) =>
                  handleContentChange(
                    "transparency",
                    parseInt(e.target.value, 10)
                  )
                }
              />
              <button
                className="btn btn-outline-secondary"
                onClick={() => adjustTransparency(10)}
              >
                Increase
              </button>
            </div>
            <p>Transparency: {content.transparency}%</p>
          </div>
        )}

        <div className="mt-3">
          <button className="btn btn-secondary me-2" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>

      {/* Main Editor */}
      <div
        className={`editor bg-white p-3 p-md-5 flex-grow-1 ${
          isSidebarOpen ? "d-none" : "d-block"
        } d-md-block`}
      >
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ position: "absolute", right: "-20px", top: "-24px" }}
          >
            <i className="bi bi-three-dots"></i> {/* Three-dot icon */}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li
              className="dropdown-item pointer"
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedElement("bgImage")}
            >
              Change Background Image
            </li>
            <li
              style={{ cursor: "pointer" }}
              className="dropdown-item pointer"
              onClick={() => setSelectedElement("editText")}
            >
              Edit Text
            </li>
            <li
              style={{ cursor: "pointer" }}
              className="dropdown-item pointer"
              onClick={() => setSelectedElement("editLayout")}
            >
              Edit Layout
            </li>
          </ul>
        </div>

        {/* Header */}
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-3">
          {/* Logo */}
          <div
            onClick={() => setSelectedElement("logo")}
            style={{ cursor: "pointer" }}
            className="mb-3 mb-md-0"
          >
            {content.logo ? (
              <img
                src={content.logo}
                alt="Logo"
                style={{ maxWidth: "150px", width: "100%" }}
                className="logo"
              />
            ) : (
              <p>Click to add a logo</p>
            )}
          </div>

          {/* Menu */}
          <div
            className="menu d-flex flex-wrap justify-content-center gap-2 gap-md-3"
            onClick={() => setSelectedElement("menu")}
            style={{ cursor: "pointer" }}
          >
            {content.menu.map((menuItem, index) => (
              <a
                key={index}
                href={menuItem.link}
                className="text-decoration-none menu-itemm"
                style={{
                  transition: "all 0.2s linear",
                  borderRadius: "0",
                  color: "#000",
                  cursor: "pointer",
                  display: "inline-block",
                  fontSize: "14px",
                  fontWeight: "600",
                  padding: "5px 10px",
                }}
              >
                {menuItem.label}
              </a>
            ))}
          </div>

          {/* Social Media Icons */}
          <div
            className="icons d-flex flex-wrap justify-content-center gap-2 gap-md-3 mt-3 mt-md-0"
            onClick={() => setSelectedElement("icons")}
            style={{ cursor: "pointer" }}
          >
            {content.icons
              .filter((icon) => icon.enabled)
              .map((icon, index) => (
                <a
                  key={index}
                  href={icon.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none"
                  style={{ color: "#001f54", cursor: "pointer" }}
                >
                  {icon.icon}
                </a>
              ))}
          </div>
        </div>

        {/* Background Section */}
        <div
          className="bg-section position-relative d-flex justify-content-center align-items-center"
          style={{
            backgroundImage: `url(${content.bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
            minHeight: "300px",
          }}
        >
          {/* Background Overlay */}
          <div
            style={{
              backgroundColor: content.bgColor,
              opacity: content.transparency / 100,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            }}
          ></div>

          {/* Content */}
          <div
            className="text-center text-white position-relative p-3"
            style={{ zIndex: 2, color: content.textColor, maxWidth: "100%" }}
          >
            <h1 className="h3 h-md-1">{content.heading}</h1>
            <p className="mb-3">{content.subHeading}</p>
            <a href={content.buttons.link}>
              <button className="btn btn-primary">
                {content.buttons.label}
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
