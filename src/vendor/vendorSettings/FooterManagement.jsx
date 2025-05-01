
"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import ReactQuill from "react-quill"
import "./Form-style.css"

const FooterManagementForm = () => {
  const [terms, setTerms] = useState({ title: "", description: "" })
  const [privacy, setPrivacy] = useState({ title: "", description: "" })
  const [cookie, setCookie] = useState({ title: "", description: "" })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const token = localStorage.getItem("vendorToken")

  useEffect(() => {
    fetchTermsAndCondition()
    fetchPrivacyPolicy()
    fetchCookiePolicy()
  }, [])

  const fetchData = async (url, setter) => {
    try {
      const response = await axios.get(url, { headers: { Authorization: token } })
      setter(response.data.data || { title: "", description: "" })
    } catch (error) {
      console.error("Error fetching data:", error)
     
    }
  }

  const fetchTermsAndCondition = () => fetchData("https://apiwl.novajobs.us/api/admin/terms-and-condition", setTerms)
  const fetchPrivacyPolicy = () => fetchData("https://apiwl.novajobs.us/api/admin/privacy-and-policy", setPrivacy)
  const fetchCookiePolicy = () => fetchData("https://apiwl.novajobs.us/api/admin/cookie-and-policy", setCookie)

  const updateData = async (url, data, successMessage) => {
    if (!data.title.trim()) {
      setError("Title is required")
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.put(url, data, {
        headers: { Authorization: token, "Content-Type": "application/json" },
      })
      if (response.status === 200) {
        toast.success(successMessage)
        setError("")
      }
    } catch (error) {
      console.error("Error updating data:", error)
      toast.error(error.response?.data?.message || "Failed to update data")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h1 className="title">Footer Management</h1>

      {[
        {
          title: "Terms & Condition",
          state: terms,
          setState: setTerms,
          updateFunc: () =>
            updateData(
              "https://apiwl.novajobs.us/api/admin/update-terms-and-condition",
              terms,
              "Terms & Condition updated successfully",
            ),
        },
        {
          title: "Privacy Policy",
          state: privacy,
          setState: setPrivacy,
          updateFunc: () =>
            updateData(
              "https://apiwl.novajobs.us/api/admin/update-privacy-and-policy",
              privacy,
              "Privacy Policy updated successfully",
            ),
        },
        {
          title: "Cookie Policy",
          state: cookie,
          setState: setCookie,
          updateFunc: () =>
            updateData(
              "https://apiwl.novajobs.us/api/admin/update-cookie-and-policy",
              cookie,
              "Cookie Policy updated successfully",
            ),
        },
      ].map(({ title, state, setState, updateFunc }) => (
        <div className="section" key={title}>
          <h2 className="section-title1">{title}</h2>
          <div className="form-group">
            <label className="label">Title</label>
            <input
              className="input"
              type="text"
              value={state.title}
              onChange={(e) => setState({ ...state, title: e.target.value })}
              placeholder={`Enter ${title.toLowerCase()} title`}
            />
          </div>
          <div className="form-group">
            <label className="label">Description</label>
            <ReactQuill
              theme="snow"
              value={state.description}
              onChange={(content) => setState({ ...state, description: content })}
              placeholder={`Enter ${title.toLowerCase()} description`}
            />
          </div>
          <button className="update-button" onClick={updateFunc} disabled={isLoading}>
            Update {title}
          </button>
        </div>
      ))}
      {/* <div className="section">
        <h2 className="section-title1">Footer Data</h2>
        <div className="form-group">
          <label className="label">Address</label>
          <input className="input" type="text" placeholder="Enter the Address" />
        </div>
        <div className="form-group">
          <label className="label">Email</label>
          <input className="input" type="text" placeholder="Enter the Address" />
        </div>
        <div className="form-group">
          <label className="label">Photo</label>
          <input className="input" type="file" placeholder="Enter the Address" />
        </div>
      </div> */}
    </div>
  )
}

export default FooterManagementForm

