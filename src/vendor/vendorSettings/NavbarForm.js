import { useState, useEffect } from "react"
import axios from "axios"
import { Plus, Trash2, Upload } from "lucide-react"
import { toast } from "react-toastify"
import "./Form-style.css"

const NavbarManagementForm = () => {
  const [logo, setLogo] = useState(null)
  const [logoPreview, setLogoPreview] = useState("")
  const [menuItems, setMenuItems] = useState([{ icon: "", label: "", route: "" }])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [favicon, setFavicon] = useState(null)
  const [faviconPreview, setFaviconPreview] = useState(null)

  // Handle favicon file selection
  const handleFaviconChange = (e) => {
    if (e.target.files[0]) {
      setFavicon(e.target.files[0])
      setFaviconPreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  const token = localStorage.getItem("vendorToken")

  // Fetch existing navbar data
  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const response = await axios.get("https://apiwl.novajobs.us/api/admin/general-info", {
          headers: {
            Authorization: token,
          },
        })
        // console.log(response.data.data,"lll");
        if (response.data.data) {
          setLogoPreview(response.data.data.navigation.logo)
          setFaviconPreview(response.data.data.favicon.image)
          if (response.data.data.menuItems) {
            // setMenuItems(response.data.data.menuItems);
          }
        }
      } catch (error) {
        console.error("Error fetching navbar data:", error)
        toast.error("Failed to fetch existing navbar data")
      }
    }

    fetchNavbarData()
  }, [])

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        setError("Logo file size should not exceed 2MB")
        return
      }

      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file")
        return
      }

      setLogo(file)
      setError("")
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMenuItemChange = (index, field, value) => {
    const newMenuItems = [...menuItems]
    newMenuItems[index][field] = value
    setMenuItems(newMenuItems)
  }

  const addMenuItem = () => {
    setMenuItems([...menuItems, { icon: "", label: "", route: "" }])
  }

  const removeMenuItem = (index) => {
    const newMenuItems = menuItems.filter((_, i) => i !== index)
    setMenuItems(newMenuItems)
  }

  const handleLogoSubmit = async () => {
    if (!logo) {
      setError("Please select a logo file")
      return
    }

    setIsLoading(true)
    const formData = new FormData()
    formData.append("logo_upload", logo)

    try {
      const response = await axios.put("https://apiwl.novajobs.us/api/admin/navigation", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.status === 200) {
        toast.success("Logo updated successfully")
        setError("")
      }
    } catch (error) {
      console.error("Error updating logo:", error)
      setError(error.response?.data?.message || "Failed to update logo")
      toast.error("Failed to update logo")
    } finally {
      setIsLoading(false)
    }
  }

  const handleMenuSubmit = async () => {
    // Validate menu items
    const hasEmptyFields = menuItems.some((item) => !item.icon || !item.label || !item.route)
    if (hasEmptyFields) {
      setError("All menu item fields are required")
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post(
        "",
        { menuItems },
        {
          headers: {
            Authorization: token,
          },
        },
      )

      if (response.status === 200) {
        toast.success("Menu items updated successfully")
        setError("")
      }
    } catch (error) {
      console.error("Error updating menu items:", error)
      setError(error.response?.data?.message || "Failed to update menu items")
      toast.error("Failed to update menu items")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFaviconSubmit = async () => {
    if (!favicon) return

    setIsLoading(true)

    const formData = new FormData()
    formData.append("favicon_upload", favicon)

    try {
      const response = await axios.put("https://apiwl.novajobs.us/api/admin/update-favicon", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      })

      if (response.status === 200) {
        toast.success("Favicon updated successfully")
      } else {
        toast.error("Failed to update favicon")
      }
    } catch (error) {
      console.error("Error uploading favicon:", error)
      toast.error(error.response?.data?.message || "Error uploading favicon")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h1 className="title">Navbar Management</h1>
      <div className="section">
        <h2 className="section-title1">Favicon Management</h2>
        <div className="form-group">
          <label className="label">Favicon</label>
          <div className="logo-container">
            {console.log(faviconPreview,"faviconPreview")}
            {faviconPreview && (
              <div className="preview-wrapper">
                <img className="logo-preview" src={faviconPreview || "/placeholder.svg"} alt="Favicon preview" />
                <button className="delete-preview" onClick={() => {
                  setFavicon(null);
                  setFaviconPreview(null);
                }}>
                <Trash2 size={16}  />
                </button>
              </div>
              
            )}
            <div className="file-input-wrapper">
              <input
                className="file-input"
                type="file"
                accept="image/x-icon,image/png,image/svg+xml"
                onChange={handleFaviconChange}
                id="favicon-upload"
              />
              <label className="file-input-label" htmlFor="favicon-upload">
                <Upload size={20} />
                Choose Favicon
              </label>
            </div>
          </div>
          <button className="update-button" onClick={handleFaviconSubmit} disabled={!favicon || isLoading}>
            Update Favicon
          </button>
        </div>
      </div>
      {/* Logo Section */}
      <div className="section">
        <h2 className="section-title1">Logo Management</h2>
        <div className="form-group">
          <label className="label">Logo</label>
          <div className="logo-container">
            {logoPreview && (
              <div className="preview-wrapper">
                <img className="logo-preview" src={logoPreview || "/placeholder.svg"} alt="Logo preview" />
                <button className="delete-preview" onClick={() => {
                  setLogo(null);
                  setLogoPreview(null);
                }}>
                  <Trash2 size={16} />
                </button>
              </div>
            )}
            <div className="file-input-wrapper">
              <input className="file-input" type="file" accept="image/*" onChange={handleLogoChange} id="logo-upload" />
              <label className="file-input-label" htmlFor="logo-upload">
                <Upload size={20} />
                Choose Logo
              </label>
            </div>
          </div>
          <button className="update-button" onClick={handleLogoSubmit} disabled={!logo || isLoading}>
            Update Logo
          </button>
        </div>
      </div>

      {/* Menu Items Section */}
      {/* <div className="section">
        <h2 className="section-title1">Menu Items</h2>
        {menuItems.map((item, index) => (
          <div className="menu-item-container" key={index}>
            <div className="form-group">
              <label className="label">Icon (Material Icon Name)</label>
              <input
                className="input"
                type="text"
                value={item.icon}
                onChange={(e) => handleMenuItemChange(index, "icon", e.target.value)}
                placeholder="e.g., home, person, work"
              />
            </div>
            <div className="form-group">
              <label className="label">Label</label>
              <input
                className="input"
                type="text"
                value={item.label}
                onChange={(e) => handleMenuItemChange(index, "label", e.target.value)}
                placeholder="Menu item label"
              />
            </div>
            <div className="form-group">
              <label className="label">Route</label>
              <input
                className="input"
                type="text"
                value={item.route}
                onChange={(e) => handleMenuItemChange(index, "route", e.target.value)}
                placeholder="/route-path"
              />
            </div>
            {menuItems.length > 1 && (
              <button className="remove-button" onClick={() => removeMenuItem(index)}>
                <Trash2 size={20} />
              </button>
            )}
          </div>
        ))}

        <button className="add-button" onClick={addMenuItem}>
          <Plus size={20} style={{ marginRight: "0.5rem" }} />
          Add Menu Item
        </button>

        <button className="update-button" onClick={handleMenuSubmit} disabled={isLoading} style={{ marginTop: "1rem" }}>
          Update Menu Items
        </button>
      </div> */}

      {error && <p className="error-text">{error}</p>}
    </div>
  )
}

export default NavbarManagementForm

