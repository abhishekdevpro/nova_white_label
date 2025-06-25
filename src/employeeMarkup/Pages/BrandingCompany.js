import React, { useEffect, useState } from "react";
import axios from "axios";
import Switch from "../../components/ui/switch";
import { Plus, Trash2 } from "lucide-react";
import LogoCoverUploader from "./LogoCoverUploader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WatchWhatWeSaySection from "./WTS";
import TeamMemberManager from "./Teams";
import Header2 from "../Layout/Header2";
import Footer from "../../markup/Layout/Footer";
import CompanySideBar from "../Layout/companySideBar";

const SocialNetworkBox = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [selectedImages, setSelectedImages] = useState([]);
  const [companyData, setCompanyData] = useState({
    company_name: "",
    summery: "",
    title: "",
    about: "",
    company_size_id: 1,
    email: "",
    company_type_id: 1,
    tagline: "",
    website_link: "",
    founded_date: "",
    phone: "",
    country_id: 231,
    state_id: 3919,
    city_id: 48132,
    zip_code: "",
    address: "",
    facebook_link: "",
    twitter_link: "",
    google_link: "",
    linkedin_link: "",
    company_industry_id: 1,
    join_us: "",
    media_content: [],
    inside_culture_images: [],
    inside_workplace_images: [],
    inside_people_images: [],
  });

  const [makesUsUnique, setMakesUsUnique] = useState([]);
  // const token = localStorage.getItem("employeeLoginToken");
  const token =
    localStorage.getItem("employeeLoginToken") ||
    localStorage.getItem("authToken");

  const BASE_IMAGE_URL = "https://apiwl.novajobs.us";

  const [insideCultureImages, setInsideCultureImages] = useState([]);
  const [insideWorkplaceImages, setInsideWorkplaceImages] = useState([]);
  const [insidePeopleImages, setInsidePeopleImages] = useState([]);

  const [teamMembers, setTeamMembers] = React.useState([]);
  const [editingId, setEditingId] = React.useState(null);
  const [tempMember, setTempMember] = React.useState({
    name: "",
    description: "",
    image: null,
  });
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const tabs = [
    { id: "basic", label: "Basic Information" },
    { id: "about", label: "About Company" },
    { id: "images", label: "Inside Company Images" },
    { id: "team", label: "Team Members" },
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedImages.length > 3) {
      toast.error("You can only upload up to 3 images");
      return;
    }
    setSelectedImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addMediaContent = () => {
    setCompanyData((prev) => ({
      ...prev,
      media_content: [
        ...prev.media_content,
        {
          id: Date.now(),
          type: "video",
          file: null,
          description: "",
        },
      ],
    }));
  };

  const removeMediaContent = (id) => {
    setCompanyData((prev) => ({
      ...prev,
      media_content: prev.media_content.filter((item) => item.id !== id),
    }));
  };

  const handleMediaTypeChange = (id, type) => {
    setCompanyData((prev) => ({
      ...prev,
      media_content: prev.media_content.map((item) =>
        item.id === id ? { ...item, type } : item
      ),
    }));
  };

  const handleMediaDescriptionChange = (id, description) => {
    setCompanyData((prev) => ({
      ...prev,
      media_content: prev.media_content.map((item) =>
        item.id === id ? { ...item, description } : item
      ),
    }));
  };

  const handleInsideImageUpload = (e, type) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      toast.error(`You can only upload up to 3 ${type} images`);
      return;
    }
    switch (type) {
      case "culture":
        setInsideCultureImages(files);
        break;
      case "workplace":
        setInsideWorkplaceImages(files);
        break;
      case "people":
        setInsidePeopleImages(files);
        break;
      default:
        break;
    }
  };

  const removeInsideImage = (index, type) => {
    switch (type) {
      case "culture":
        setInsideCultureImages((prev) => prev.filter((_, i) => i !== index));
        break;
      case "workplace":
        setInsideWorkplaceImages((prev) => prev.filter((_, i) => i !== index));
        break;
      case "people":
        setInsidePeopleImages((prev) => prev.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };

  const handleInsideImagesSave = async (type) => {
    const formData = new FormData();
    let images, endpoint, uploadKey;

    switch (type) {
      case "culture":
        images = insideCultureImages;
        endpoint = "/company-inside-culture";
        uploadKey = "inside_culture_images_upload";
        break;
      case "workplace":
        images = insideWorkplaceImages;
        endpoint = "/company-inside-workplace";
        uploadKey = "inside_workplace_images_upload";
        break;
      case "people":
        images = insidePeopleImages;
        endpoint = "/company-inside-people";
        uploadKey = "inside_people_images_upload";
        break;
      default:
        return;
    }

    images.forEach((image, index) => {
      formData.append(`${uploadKey}`, image);
      formData.append("image_indexes", index.toString());
    });

    try {
      const response = await axios.patch(
        `https://apiwl.novajobs.us/api/employeer${endpoint}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success(`${type} images updated successfully!`);
      } else {
        toast.error(`Failed to update ${type} images. Please try again.`);
      }
    } catch (error) {
      console.error(`Error updating ${type} images:`, error);
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://apiwl.novajobs.us/api/employeer/company",
          {
            headers: { Authorization: token },
          }
        );
        const data = response.data?.data || {};

        setCompanyData((prev) => ({
          ...prev,
          company_name: data.company_name || "",
          title: data.title || "",
          summery: data.summery || "",
          about: data.about || "",
          tagline: data.tagline || "",
          website_link: data.website_link || "",
          founded_date: data.founded_date || "",
          phone: data.phone || "",
          country_id: data.country_id || "",
          state_id: data.state_id || "",
          city_id: data.city_id || "",
          zip_code: data.zip_code || "",
          address: data.address || "",
          facebook_link: data.facebook_link || "",
          twitter_link: data.twitter_link || "",
          google_link: data.google_link || "",
          linkedin_link: data.linkedin_link || "",
          company_industry_id: data.company_industry_id || "",
          join_us: data.join_us || "",
          email: data.email || "",
          about_images: data.about_images || [],
          inside_culture_images: data.inside_culture_images || [],
          inside_workplace_images: data.inside_workplace_images || [],
          inside_people_images: data.inside_people_images || [],
        }));

        setMakesUsUnique([
          {
            title: "Health Insurance",
            key: "health_insurance",
            toogle: data.health_insurance || false,
            value: data.health_insurance_value || "",
          },
          {
            title: "24 hour Wellness Center",
            key: "wellness_center",
            toogle: data.wellness_center || false,
            value: data.wellness_center_value || "",
          },
          {
            title: "Cafeteria",
            key: "cafeteria",
            toogle: data.cafeteria || false,
            value: data.cafeteria_value || "",
          },
          {
            title: "Maternity and Paternity Leave",
            key: "maternity_leave",
            toogle: data.maternity_leave || false,
            value: data.maternity_leave_value || "",
          },
          {
            title: "Recreational Area",
            key: "recreational_area",
            toogle: data.recreational_area || false,
            value: data.recreational_area_value || "",
          },
          {
            title: "Life Insurance",
            key: "life_insurance",
            toogle: data.life_insurance || false,
            value: data.life_insurance_value || "",
          },
          {
            title: "Personal Accident Insurance",
            key: "personal_accident_insurance",
            toogle: data.personal_accident_insurance || false,
            value: data.personal_accident_insurance_value || "",
          },
        ]);

        setInsideCultureImages(data.inside_culture_images || []);
        setInsideWorkplaceImages(data.inside_workplace_images || []);
        setInsidePeopleImages(data.inside_people_images || []);
        // Show about images as previews if present
        if (data.about_images && data.about_images.length > 0) {
          setSelectedImages(
            data.about_images
              .filter((img) => !!img)
              .map((img) =>
                typeof img === "string" && !img.startsWith("http")
                  ? BASE_IMAGE_URL + img
                  : img
              )
          );
        } else {
          setSelectedImages([]);
        }
      } catch (error) {
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, [token]);

  const handleAboutSave = async (event) => {
    event.preventDefault();

    if (selectedImages.length > 3) {
      toast.error("Please ensure only 3 images are selected.");
      return;
    }

    const formData = new FormData();
    formData.append("title", companyData.title);
    formData.append("about", companyData.about);
    formData.append("summery", companyData.summery);
    formData.append("company_name", companyData.company_name);
    formData.append("email", companyData.email);
    selectedImages.forEach((image) => {
      formData.append("about_images_upload", image);
    });

    try {
      const response = await axios.patch(
        "https://apiwl.novajobs.us/api/employeer/company-about",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("About section updated successfully!");
      } else {
        toast.error("Failed to update about section. Please try again.");
      }
    } catch (error) {
      console.error("Error updating about section:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const dataToUpdate = {
      company_name: companyData.company_name,
      summery: companyData.summery,
      title: companyData.title,
      about: companyData.about,
      company_size_id: companyData.company_size_id,
      email: companyData.email,
      company_type_id: companyData.company_type_id,
      tagline: companyData.tagline,
      website_link: companyData.website_link,
      founded_date: companyData.founded_date,
      phone: companyData.phone,
      country_id: companyData.country_id,
      state_id: companyData.state_id,
      city_id: companyData.city_id,
      zip_code: companyData.zip_code,
      address: companyData.address,
      facebook_link: companyData.facebook_link,
      twitter_link: companyData.twitter_link,
      google_link: companyData.google_link,
      linkedin_link: companyData.linkedin_link,
      company_industry_id: companyData.company_industry_id,
      join_us: companyData.join_us,
      ...makesUsUnique.reduce(
        (acc, item) => ({
          ...acc,
          [item.key]: item.toogle,
          [`${item.key}_value`]: item.value,
        }),
        {}
      ),
    };

    try {
      await axios.patch(
        "https://apiwl.novajobs.us/api/employeer/company-additional",
        dataToUpdate,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      toast.success("Company data updated successfully");
    } catch (error) {
      toast.error("Error updating company data");
    }
  };

  const SectionTitle = ({ children }) => (
    <h4 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
      {children}
    </h4>
  );

  const FormSection = ({ children, className = "" }) => (
    <div className={`space-y-6 mb-8 ${className}`}>{children}</div>
  );

  // Modern About Company tab styles
  const aboutTabStyles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: none; }
    }
    .modern-label {
      font-weight: 600;
      font-size: 1.08rem;
      color: #3a4664;
      letter-spacing: 0.03em;
      margin-bottom: 10px;
      display: block;
    }
    .modern-input:focus, .modern-file:focus {
      border: 1.5px solid #1967d2 !important;
      outline: none;
      box-shadow: 0 0 0 2px #e3eaf5;
    }
    .modern-divider {
      border-bottom: 1px solid #e3eaf5;
      margin: 32px 0 24px 0;
    }
    .modern-save-btn {
      background: linear-gradient(90deg, #1967d2 0%, #3b82f6 100%);
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 15px 38px;
      font-weight: 700;
      font-size: 1.13rem;
      box-shadow: 0 4px 16px rgba(25,103,210,0.10);
      cursor: pointer;
      transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 18px;
    }
    .modern-save-btn:hover {
      background: linear-gradient(90deg, #155ab6 0%, #2563eb 100%);
      box-shadow: 0 8px 24px rgba(25,103,210,0.13);
      transform: translateY(-2px) scale(1.03);
    }
  `;

  const addTeamMember = () => {
    setEditingId("new");
    setTempMember({ name: "", description: "", image: null });
  };
  const saveTeamMember = async () => {
    // Prepare FormData for API
    const formData = new FormData();
    formData.append("name", tempMember.name);
    formData.append("description", tempMember.description);
    if (tempMember.image) {
      formData.append("image", tempMember.image);
    }
    try {
      const response = await axios.post(
        "https://apiwl.novajobs.us/api/employeer/company-teams",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Team member saved successfully!");
        if (editingId === "new") {
          setTeamMembers((prev) => [
            ...prev,
            { id: Date.now(), ...tempMember },
          ]);
        } else {
          setTeamMembers((prev) =>
            prev.map((m) => (m.id === editingId ? { ...m, ...tempMember } : m))
          );
        }
        setEditingId(null);
        setTempMember({ name: "", description: "", image: null });
        forceUpdate();
      } else {
        toast.error("Failed to save team member.");
      }
    } catch (error) {
      toast.error("Error saving team member.");
    }
  };
  const cancelEdit = () => {
    setEditingId(null);
    setTempMember({ name: "", description: "", image: null });
    forceUpdate();
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: aboutTabStyles }} />
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="d-flex">
                <CompanySideBar active="branding" />
                <div className="col-xl-9 col-lg-9 m-b30">
                  <div className="job-bx submit-resume">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Company Branding
                      </h5>
                    </div>
                    <form>
                      {/* Tab Navigation */}
                      <div className="mb-4">
                        <ul className="nav nav-tabs" role="tablist">
                          {tabs.map((tab) => (
                            <li key={tab.id} className="nav-item">
                              <button
                                className={`nav-link ${
                                  activeTab === tab.id ? "active" : ""
                                }`}
                                onClick={() => setActiveTab(tab.id)}
                                type="button"
                                style={{
                                  color:
                                    activeTab === tab.id
                                      ? "#1967d2"
                                      : "#6c757d",
                                  borderBottom:
                                    activeTab === tab.id
                                      ? "2px solid #1967d2"
                                      : "none",
                                  padding: "0.5rem 1rem",
                                  fontWeight:
                                    activeTab === tab.id ? "600" : "400",
                                }}
                              >
                                {tab.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tab Content */}
                      <div className="tab-content">
                        {/* Basic Information Tab */}
                        <div
                          className={`tab-pane fade ${
                            activeTab === "basic" ? "show active" : ""
                          }`}
                        >
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <h4 className="font-bold text-lg mb-3">
                                  Basic Information
                                </h4>
                                <div className="row">
                                  <div className="col-lg-12 mb-3">
                                    <label>Company Name</label>
                                    <input
                                      type="text"
                                      name="company_name"
                                      value={companyData.company_name || ""}
                                      onChange={handleInputChange}
                                      className="form-control"
                                      placeholder="Enter company name"
                                    />
                                  </div>
                                </div>
                                {/* What Makes Us Unique Section */}
                                <h4 className="font-bold text-lg mt-4 mb-3">
                                  What Makes Us Unique
                                </h4>
                                <div className="row">
                                  {makesUsUnique.map((item, idx) => (
                                    <div
                                      className="col-md-6 mb-3"
                                      key={item.key}
                                    >
                                      <div className="d-flex align-items-center mb-1">
                                        <label
                                          className="me-2 mb-0"
                                          style={{ fontWeight: 500 }}
                                        >
                                          {item.title}
                                        </label>
                                        <Switch
                                          checked={item.toogle}
                                          onChange={(checked) => {
                                            setMakesUsUnique((prev) =>
                                              prev.map((el, i) =>
                                                i === idx
                                                  ? { ...el, toogle: checked }
                                                  : el
                                              )
                                            );
                                          }}
                                          className="me-2"
                                        />
                                      </div>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={item.value}
                                        onChange={(e) => {
                                          setMakesUsUnique((prev) =>
                                            prev.map((el, i) =>
                                              i === idx
                                                ? {
                                                    ...el,
                                                    value: e.target.value,
                                                  }
                                                : el
                                            )
                                          );
                                        }}
                                        placeholder={item.title}
                                      />
                                    </div>
                                  ))}
                                </div>
                                {/* Join Us Section */}
                                <h4 className="font-bold text-lg mt-4 mb-3">
                                  Join Us
                                </h4>
                                <div className="mb-3">
                                  <label>Career Opportunities</label>
                                  <ReactQuill
                                    theme="snow"
                                    value={companyData.join_us || ""}
                                    onChange={(value) =>
                                      setCompanyData((prev) => ({
                                        ...prev,
                                        join_us: value,
                                      }))
                                    }
                                    className="h-48 mb-12"
                                  />
                                </div>
                                {/* Social Media & Website Section */}
                                <h4 className="font-bold text-lg mt-4 mb-3">
                                  Social Media & Website
                                </h4>
                                <div className="row">
                                  <div className="col-md-6 mb-3">
                                    <label>Facebook</label>
                                    <input
                                      type="text"
                                      name="facebook_link"
                                      value={companyData.facebook_link || ""}
                                      onChange={handleInputChange}
                                      className="form-control"
                                      placeholder="Facebook"
                                    />
                                  </div>
                                  <div className="col-md-6 mb-3">
                                    <label>Linkedin</label>
                                    <input
                                      type="text"
                                      name="linkedin_link"
                                      value={companyData.linkedin_link || ""}
                                      onChange={handleInputChange}
                                      className="form-control"
                                      placeholder="Linkedin"
                                    />
                                  </div>
                                  <div className="col-md-6 mb-3">
                                    <label>Twitter</label>
                                    <input
                                      type="text"
                                      name="twitter_link"
                                      value={companyData.twitter_link || ""}
                                      onChange={handleInputChange}
                                      className="form-control"
                                      placeholder="Twitter"
                                    />
                                  </div>
                                  <div className="col-md-6 mb-3">
                                    <label>Website</label>
                                    <input
                                      type="text"
                                      name="website_link"
                                      value={companyData.website_link || ""}
                                      onChange={handleInputChange}
                                      className="form-control"
                                      placeholder="Website"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* About Company Tab */}
                        <div
                          className={`tab-pane fade ${
                            activeTab === "about" ? "show active" : ""
                          }`}
                        >
                          <div
                            style={{
                              maxWidth: 700,
                              margin: "0 auto",
                              animation: "fadeInUp 0.7s",
                              transition: "box-shadow 0.2s",
                            }}
                          >
                            <h4
                              style={{
                                fontWeight: 800,
                                fontSize: 15,
                                marginBottom: 5,
                                color: "#1a237e",
                                letterSpacing: 0.3,
                              }}
                            >
                              About Company
                            </h4>
                            <div style={{ marginBottom: 0 }}>
                              <label className="modern-label">
                                Company Title
                              </label>
                              <input
                                type="text"
                                name="title"
                                value={companyData.title || ""}
                                onChange={handleInputChange}
                                className="form-control modern-input"
                                placeholder="Enter company title"
                                style={{
                                  borderRadius: 10,
                                  border: "1.5px solid #dbeafe",
                                  padding: "14px 18px",
                                  fontSize: 17,
                                  width: "100%",
                                  marginTop: 4,
                                  background: "#fafdff",
                                  transition: "border 0.2s, box-shadow 0.2s",
                                }}
                              />
                            </div>
                            <div className="modern-divider"></div>
                            <div style={{ marginBottom: 0 }}>
                              <label className="modern-label">Summary</label>
                              <ReactQuill
                                theme="snow"
                                value={companyData.summery || ""}
                                onChange={(value) =>
                                  setCompanyData((prev) => ({
                                    ...prev,
                                    summery: value,
                                  }))
                                }
                                className="h-48 mb-12 modern-input"
                                style={{
                                  borderRadius: 10,
                                  border: "1.5px solid #dbeafe",
                                  marginTop: 4,
                                  background: "#fafdff",
                                  minHeight: 120,
                                  transition: "border 0.2s, box-shadow 0.2s",
                                }}
                              />
                            </div>
                            <div className="modern-divider"></div>
                            <div style={{ marginBottom: 0 }}>
                              <label className="modern-label">
                                Description
                              </label>
                              <ReactQuill
                                theme="snow"
                                value={companyData.about || ""}
                                onChange={(value) =>
                                  setCompanyData((prev) => ({
                                    ...prev,
                                    about: value,
                                  }))
                                }
                                className="h-48 mb-12 modern-input"
                                style={{
                                  borderRadius: 10,
                                  border: "1.5px solid #dbeafe",
                                  marginTop: 4,
                                  background: "#fafdff",
                                  minHeight: 120,
                                  transition: "border 0.2s, box-shadow 0.2s",
                                }}
                              />
                            </div>
                            <div className="modern-divider"></div>
                            <div style={{ marginBottom: 0 }}>
                              <label className="modern-label">
                                Images (Max: 3)
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="form-control mb-2 modern-file"
                                multiple
                                style={{
                                  borderRadius: 10,
                                  border: "1.5px solid #dbeafe",
                                  padding: "12px 14px",
                                  fontSize: 16,
                                  background: "#fafdff",
                                  marginTop: 4,
                                  transition: "border 0.2s, box-shadow 0.2s",
                                }}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={handleAboutSave}
                              className="modern-save-btn"
                            >
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#fff"
                                    d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.17a2 2 0 0 1 1.41.59l3.83 3.83A2 2 0 0 1 20 8.83V19a2 2 0 0 1-2 2ZM7 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.83a2 2 0 0 0-.59-1.41l-3.83-3.83A2 2 0 0 0 14.17 3H7Zm5 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
                                  ></path>
                                </svg>
                              </span>
                              Save About Section
                            </button>
                          </div>
                        </div>

                        {/* Inside Company Images Tab */}
                        <div
                          className={`tab-pane fade ${
                            activeTab === "images" ? "show active" : ""
                          }`}
                        >
                          <div className="row m-b30">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <div className="row">
                                  {/* Culture Images */}
                                  <div className="col-lg-4 col-md-6">
                                    <div className="form-group">
                                      <label>Culture Images</label>
                                      <div className="d-flex flex-wrap gap-2 mb-3">
                                        {insideCultureImages.map(
                                          (image, index) => (
                                            <div
                                              key={index}
                                              className="position-relative"
                                            >
                                              <img
                                                src={
                                                  typeof image === "string"
                                                    ? `${BASE_IMAGE_URL}${image}`
                                                    : URL.createObjectURL(image)
                                                }
                                                alt="Culture"
                                                className="img-thumbnail"
                                                style={{
                                                  width: "100px",
                                                  height: "100px",
                                                  objectFit: "cover",
                                                }}
                                              />
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  removeInsideImage(
                                                    index,
                                                    "culture"
                                                  )
                                                }
                                                className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                              >
                                                ×
                                              </button>
                                            </div>
                                          )
                                        )}
                                      </div>
                                      {insideCultureImages.length < 3 && (
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) =>
                                            handleInsideImageUpload(
                                              e,
                                              "culture"
                                            )
                                          }
                                          className="form-control mb-3"
                                          multiple
                                        />
                                      )}
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleInsideImagesSave("culture")
                                        }
                                        className="btn btn-primary d-flex align-items-center gap-2"
                                        style={{
                                          backgroundColor: "#1967d2",
                                          border: "none",
                                          boxShadow:
                                            "0 2px 4px rgba(0,0,0,0.1)",
                                          transition: "all 0.3s ease",
                                        }}
                                      >
                                        <i className="fa-solid fa-save"></i>
                                        Save Culture Images
                                      </button>
                                    </div>
                                  </div>
                                  {/* Workplace Images */}
                                  <div className="col-lg-4 col-md-6">
                                    <div className="form-group">
                                      <label>Workplace Images</label>
                                      <div className="d-flex flex-wrap gap-2 mb-3">
                                        {insideWorkplaceImages.map(
                                          (image, index) => (
                                            <div
                                              key={index}
                                              className="position-relative"
                                            >
                                              <img
                                                src={
                                                  typeof image === "string"
                                                    ? `${BASE_IMAGE_URL}${image}`
                                                    : URL.createObjectURL(image)
                                                }
                                                alt="Workplace"
                                                className="img-thumbnail"
                                                style={{
                                                  width: "100px",
                                                  height: "100px",
                                                  objectFit: "cover",
                                                }}
                                              />
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  removeInsideImage(
                                                    index,
                                                    "workplace"
                                                  )
                                                }
                                                className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                              >
                                                ×
                                              </button>
                                            </div>
                                          )
                                        )}
                                      </div>
                                      {insideWorkplaceImages.length < 3 && (
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) =>
                                            handleInsideImageUpload(
                                              e,
                                              "workplace"
                                            )
                                          }
                                          className="form-control mb-3"
                                          multiple
                                        />
                                      )}
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleInsideImagesSave("workplace")
                                        }
                                        className="btn btn-primary d-flex align-items-center gap-2"
                                        style={{
                                          backgroundColor: "#1967d2",
                                          border: "none",
                                          boxShadow:
                                            "0 2px 4px rgba(0,0,0,0.1)",
                                          transition: "all 0.3s ease",
                                        }}
                                      >
                                        <i className="fa-solid fa-save"></i>
                                        Save Workplace Images
                                      </button>
                                    </div>
                                  </div>
                                  {/* People Images */}
                                  <div className="col-lg-4 col-md-6">
                                    <div className="form-group">
                                      <label>People Images</label>
                                      <div className="d-flex flex-wrap gap-2 mb-3">
                                        {insidePeopleImages.map(
                                          (image, index) => (
                                            <div
                                              key={index}
                                              className="position-relative"
                                            >
                                              <img
                                                src={
                                                  typeof image === "string"
                                                    ? `${BASE_IMAGE_URL}${image}`
                                                    : URL.createObjectURL(image)
                                                }
                                                alt="People"
                                                className="img-thumbnail"
                                                style={{
                                                  width: "100px",
                                                  height: "100px",
                                                  objectFit: "cover",
                                                }}
                                              />
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  removeInsideImage(
                                                    index,
                                                    "people"
                                                  )
                                                }
                                                className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                              >
                                                ×
                                              </button>
                                            </div>
                                          )
                                        )}
                                      </div>
                                      {insidePeopleImages.length < 3 && (
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) =>
                                            handleInsideImageUpload(e, "people")
                                          }
                                          className="form-control mb-3"
                                          multiple
                                        />
                                      )}
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleInsideImagesSave("people")
                                        }
                                        className="btn btn-primary d-flex align-items-center gap-2"
                                        style={{
                                          backgroundColor: "#1967d2",
                                          border: "none",
                                          boxShadow:
                                            "0 2px 4px rgba(0,0,0,0.1)",
                                          transition: "all 0.3s ease",
                                        }}
                                      >
                                        <i className="fa-solid fa-save"></i>
                                        Save People Images
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Team Members Tab */}
                        <div
                          className={`tab-pane fade ${
                            activeTab === "team" ? "show active" : ""
                          }`}
                        >
                          <div
                            style={{
                              maxWidth: 420,
                              margin: "0 auto",
                              paddingTop: 32,
                            }}
                          >
                            {editingId !== null ? (
                              <div
                                style={{
                                  background: "#fff",
                                  borderRadius: 16,
                                  boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                                  padding: 32,
                                  marginBottom: 32,
                                  minWidth: 320,
                                }}
                              >
                                <input
                                  type="text"
                                  value={tempMember.name}
                                  onChange={(e) =>
                                    setTempMember((prev) => ({
                                      ...prev,
                                      name: e.target.value,
                                    }))
                                  }
                                  placeholder="Name"
                                  style={{
                                    width: "100%",
                                    padding: "12px 16px",
                                    borderRadius: 8,
                                    border: "1.5px solid #e0e0e0",
                                    fontSize: 17,
                                    marginBottom: 18,
                                    background: "#fafbfc",
                                  }}
                                />
                                <ReactQuill
                                  theme="snow"
                                  value={tempMember.description}
                                  onChange={(val) =>
                                    setTempMember((prev) => ({
                                      ...prev,
                                      description: val,
                                    }))
                                  }
                                  style={{
                                    height: 120,
                                    marginBottom: 18,
                                    borderRadius: 8,
                                    border: "1.5px solid #e0e0e0",
                                    background: "#fafbfc",
                                  }}
                                />
                                <div
                                  style={{
                                    fontWeight: 700,
                                    marginBottom: 8,
                                    color: "#222",
                                  }}
                                >
                                  Update Photo
                                </div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    setTempMember((prev) => ({
                                      ...prev,
                                      image: e.target.files[0],
                                    }))
                                  }
                                  style={{ marginBottom: 24 }}
                                />
                                <div
                                  style={{
                                    display: "flex",
                                    gap: 16,
                                    marginTop: 12,
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={saveTeamMember}
                                    style={{
                                      background: "#22c55e",
                                      color: "#fff",
                                      border: "none",
                                      borderRadius: 8,
                                      padding: "10px 28px",
                                      fontWeight: 700,
                                      fontSize: 18,
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 8,
                                      cursor: "pointer",
                                      boxShadow:
                                        "0 2px 8px rgba(34,197,94,0.08)",
                                      transition: "background 0.2s",
                                    }}
                                  >
                                    <svg
                                      width="20"
                                      height="20"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        fill="#fff"
                                        d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.17a2 2 0 0 1 1.41.59l3.83 3.83A2 2 0 0 1 20 8.83V19a2 2 0 0 1-2 2ZM7 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.83a2 2 0 0 0-.59-1.41l-3.83-3.83A2 2 0 0 0 14.17 3H7Zm5 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
                                      ></path>
                                    </svg>
                                    <span>Save</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={cancelEdit}
                                    style={{
                                      background: "#6b7280",
                                      color: "#fff",
                                      border: "none",
                                      borderRadius: 8,
                                      padding: "10px 28px",
                                      fontWeight: 700,
                                      fontSize: 18,
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 8,
                                      cursor: "pointer",
                                      boxShadow:
                                        "0 2px 8px rgba(107,114,128,0.08)",
                                      transition: "background 0.2s",
                                    }}
                                  >
                                    <svg
                                      width="20"
                                      height="20"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        fill="#fff"
                                        d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4Z"
                                      ></path>
                                    </svg>
                                    <span>Cancel</span>
                                  </button>
                                </div>
                              </div>
                            ) : null}
                            <button
                              type="button"
                              onClick={addTeamMember}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 320,
                                margin: "0 auto",
                                padding: "16px 0",
                                background: "#3b82f6",
                                borderRadius: 10,
                                color: "white",
                                fontWeight: 700,
                                fontSize: 20,
                                boxShadow: "0 4px 16px rgba(59,130,246,0.10)",
                                transition:
                                  "background 0.2s, box-shadow 0.2s, transform 0.1s",
                                marginTop: 32,
                                marginBottom: 32,
                                border: "none",
                                cursor: "pointer",
                                gap: 12,
                              }}
                            >
                              <svg
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="#fff"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 5v14m7-7H5"
                                />
                              </svg>
                              Add New Team Member
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="row mt-4">
                        <div className="col-lg-12">
                          <div className="form-group text-end">
                            {activeTab !== "about" &&
                              activeTab !== "images" &&
                              activeTab !== "team" && (
                                <button
                                  type="submit"
                                  onClick={handleSave}
                                  className="btn btn-primary btn-lg d-flex align-items-center gap-2"
                                  style={{
                                    backgroundColor: "#1967d2",
                                    border: "none",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                    transition: "all 0.3s ease",
                                    padding: "0.75rem 1.5rem",
                                    fontSize: "1.1rem",
                                  }}
                                >
                                  <i className="fa-solid fa-save"></i>
                                  Save All Changes
                                </button>
                              )}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SocialNetworkBox;
