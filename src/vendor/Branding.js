import React, { useEffect, useState } from "react";
import axios from "axios";
import Switch from "../components/ui/switch";
import { Plus, Trash2 } from 'lucide-react';
import LogoCoverUploader from "./LogoCoverUploader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WatchWhatWeSaySection from "./WTS";
import TeamMemberManager from "./Teams";
import VendorHeader from "../markup/Layout/VendorHeader";
import VendorCompanySideBar from "./Vendorsidebar";
import Footer from "../markup/Layout/Footer";


const SocialNetworkBox = () => {
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
  const token = localStorage.getItem("vendorToken");
  const BASE_IMAGE_URL = "https://apiwl.novajobs.us"

  const [insideCultureImages, setInsideCultureImages] = useState([]);
  const [insideWorkplaceImages, setInsideWorkplaceImages] = useState([]);
  const [insidePeopleImages, setInsidePeopleImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedImages.length > 3) {
      toast.error("You can only upload up to 3 images");
      return;
    }
    setSelectedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addMediaContent = () => {
    setCompanyData(prev => ({
      ...prev,
      media_content: [
        ...prev.media_content,
        {
          id: Date.now(),
          type: 'video',
          file: null,
          description: '',
        }
      ]
    }));
  };

  const removeMediaContent = (id) => {
    setCompanyData(prev => ({
      ...prev,
      media_content: prev.media_content.filter(item => item.id !== id)
    }));
  };

  const handleMediaTypeChange = (id, type) => {
    setCompanyData(prev => ({
      ...prev,
      media_content: prev.media_content.map(item =>
        item.id === id ? { ...item, type } : item
      )
    }));
  };

  const handleMediaDescriptionChange = (id, description) => {
    setCompanyData(prev => ({
      ...prev,
      media_content: prev.media_content.map(item =>
        item.id === id ? { ...item, description } : item
      )
    }));
  };

  const handleInsideImageUpload = (e, type) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      toast.error(`You can only upload up to 3 ${type} images`);
      return;
    }
    switch (type) {
      case 'culture':
        setInsideCultureImages(files);
        break;
      case 'workplace':
        setInsideWorkplaceImages(files);
        break;
      case 'people':
        setInsidePeopleImages(files);
        break;
      default:
        break;
    }
  };

  const removeInsideImage = (index, type) => {
    switch (type) {
      case 'culture':
        setInsideCultureImages(prev => prev.filter((_, i) => i !== index));
        break;
      case 'workplace':
        setInsideWorkplaceImages(prev => prev.filter((_, i) => i !== index));
        break;
      case 'people':
        setInsidePeopleImages(prev => prev.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };

  const handleInsideImagesSave = async (type) => {
    const formData = new FormData();
    let images, endpoint, uploadKey;

    switch (type) {
      case 'culture':
        images = insideCultureImages;
        endpoint = '/company-inside-culture';
        uploadKey = 'inside_culture_images_upload';
        break;
      case 'workplace':
        images = insideWorkplaceImages;
        endpoint = '/company-inside-workplace';
        uploadKey = 'inside_workplace_images_upload';
        break;
      case 'people':
        images = insidePeopleImages;
        endpoint = '/company-inside-people';
        uploadKey = 'inside_people_images_upload';
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
        const response = await axios.get("https://apiwl.novajobs.us/api/employeer/company", {
          headers: { Authorization: token }
        });
        const data = response.data?.data || {};
        setCompanyData(prev => ({
          ...prev,
          ...data,
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
      ...companyData,
      ...makesUsUnique.reduce((acc, item) => ({
        ...acc,
        [item.key]: item.toogle,
        [`${item.key}_value`]: item.value,
      }), {}),
    };

    try {
      await axios.put("https://apiwl.novajobs.us/api/employeer/company", dataToUpdate, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      toast.success("Company data updated successfully");
    } catch (error) {
      toast.error("Error updating company data");
    }
  };

  const SectionTitle = ({ children }) => (
    <h4 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">{children}</h4>
  );

  const FormSection = ({ children, className = "" }) => (
    <div className={`space-y-6 mb-8 ${className}`}>{children}</div>
  );

  return (
    <>
      <VendorHeader />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="d-flex">
                <VendorCompanySideBar active="branding" />
                <div className="col-xl-9 col-lg-9 m-b30">
                  <div className="job-bx submit-resume">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Company Branding
                      </h5>
                    </div>
                    <form>
                      {/* Basic Info Section */}
                      <div className="row m-b30">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
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
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Tagline</label>
                            <input
                              type="text"
                              name="tagline"
                              value={companyData.tagline || ""}
                              onChange={handleInputChange}
                              className="form-control"
                              placeholder="Enter company tagline"
                            />
                          </div>
                        </div>
                      </div>

                      {/* About Section */}
                      <div className="row mb-8">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="font-weight-bold text-xl text-gray-800">About Company</label>
                            <div className="space-y-8 mt-4">
                              <div className="form-group">
                                <label className="block text-gray-600 mb-2 text-lg">Company Title</label>
                                <input
                                  type="text"
                                  name="title"
                                  value={companyData.title || ""}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                  placeholder="Enter company title"
                                />
                              </div>
                              <div className="form-group">
                                <label className="block text-gray-600 mb-2 text-lg">Summary</label>
                                <ReactQuill
                                  theme="snow"
                                  value={companyData.summery || ""}
                                  onChange={(value) => setCompanyData(prev => ({...prev, summery: value}))}
                                  className="h-48 mb-8 border border-gray-300 rounded-lg"
                                />
                              </div>
                              <div className="form-group">
                                <label className="block text-gray-600 mb-2 text-lg">Description</label>
                                <ReactQuill
                                  theme="snow"
                                  value={companyData.about || ""}
                                  onChange={(value) => setCompanyData(prev => ({...prev, about: value}))}
                                  className="h-48 mb-8 border border-gray-300 rounded-lg"
                                />
                              </div>
                              <div className="form-group">
                                <label className="block text-gray-600 mb-2 text-lg">Upload Images (Max: 3)</label>
                                <div className="flex flex-wrap gap-4 mb-4">
                                  {selectedImages.map((image, index) => (
                                    <div key={index} className="relative">
                                      <img
                                        src={URL.createObjectURL(image)}
                                        alt="Uploaded"
                                        className="w-24 h-24 object-cover rounded-lg shadow-md"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ))}
                                </div>
                                {selectedImages.length < 3 && (
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    multiple
                                  />
                                )}
                                <button
                                  type="button"
                                  onClick={handleAboutSave}
                                  className="mt-4 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-all duration-300 ease-in-out shadow-md"
                                >
                                  Save About Section
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Inside Company Images Section */}
                      <div className="row m-b30">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="font-weight-700">Inside Company Images</label>
                            <div className="row">
                              {/* Culture Images */}
                              <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                  <label>Culture Images</label>
                                  <div className="d-flex flex-wrap gap-2 mb-3">
                                    {insideCultureImages.map((image, index) => (
                                      <div key={index} className="position-relative">
                                        <img
                                          src={typeof image === 'string' ? `${BASE_IMAGE_URL}${image}` : URL.createObjectURL(image)}
                                          alt="Culture"
                                          className="img-thumbnail"
                                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        />
                                        <button
                                          type="button"
                                          onClick={() => removeInsideImage(index, 'culture')}
                                          className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                        >
                                          ×
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                  {insideCultureImages.length < 3 && (
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => handleInsideImageUpload(e, 'culture')}
                                      className="form-control mb-3"
                                      multiple
                                    />
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => handleInsideImagesSave('culture')}
                                    className="btn btn-primary d-flex align-items-center gap-2"
                                    style={{
                                      backgroundColor: '#1967d2',
                                      border: 'none',
                                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                      transition: 'all 0.3s ease',
                                      color: 'white'
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
                                    {insideWorkplaceImages.map((image, index) => (
                                      <div key={index} className="position-relative">
                                        <img
                                          src={typeof image === 'string' ? `${BASE_IMAGE_URL}${image}` : URL.createObjectURL(image)}
                                          alt="Workplace"
                                          className="img-thumbnail"
                                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        />
                                        <button
                                          type="button"
                                          onClick={() => removeInsideImage(index, 'workplace')}
                                          className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                        >
                                          ×
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                  {insideWorkplaceImages.length < 3 && (
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => handleInsideImageUpload(e, 'workplace')}
                                      className="form-control mb-3"
                                      multiple
                                    />
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => handleInsideImagesSave('workplace')}
                                    className="btn btn-primary d-flex align-items-center gap-2"
                                    style={{
                                      backgroundColor: '#1967d2',
                                      border: 'none',
                                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                      transition: 'all 0.3s ease',
                                      color: 'white'
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
                                    {insidePeopleImages.map((image, index) => (
                                      <div key={index} className="position-relative">
                                        <img
                                          src={typeof image === 'string' ? `${BASE_IMAGE_URL}${image}` : URL.createObjectURL(image)}
                                          alt="People"
                                          className="img-thumbnail"
                                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        />
                                        <button
                                          type="button"
                                          onClick={() => removeInsideImage(index, 'people')}
                                          className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                        >
                                          ×
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                  {insidePeopleImages.length < 3 && (
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => handleInsideImageUpload(e, 'people')}
                                      className="form-control mb-3"
                                      multiple
                                    />
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => handleInsideImagesSave('people')}
                                    className="btn btn-primary d-flex align-items-center gap-2"
                                    style={{
                                      backgroundColor: '#1967d2',
                                      border: 'none',
                                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                      transition: 'all 0.3s ease',
                                      color: 'white'
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

                      {/* Watch What We Have to Say Section */}
                      <div className="row m-b30">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="font-weight-700">Watch What We Have to Say</label>
                            <WatchWhatWeSaySection />
                          </div>
                        </div>
                      </div>

                      {/* Team Members Section */}
                      <div className="row m-b30">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="font-weight-700">Our Team</label>
                            <TeamMemberManager />
                          </div>
                        </div>
                      </div>

                      {/* What Makes Us Unique Section */}
                      <div className="row m-b30">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="font-weight-700">What Makes Us Unique</label>
                            <div className="row">
                              {makesUsUnique.map((item, index) => (
                                <div key={index} className="col-lg-6 col-md-6 mb-4">
                                  <div className="form-group p-3 border rounded" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                      <label className="font-weight-600 mb-0">{item.title}</label>
                                      <div className="d-flex align-items-center">
                                        <span className="me-4 pe-2" style={{ fontSize: '0.9rem', color: item.toogle ? '#28a745' : '#6c757d' }}>
                                          {item.toogle ? 'Enabled' : 'Disabled'}
                                        </span>
                                        <div className="form-check form-switch" style={{ transform: 'scale(1.2)' }}>
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={item.toogle}
                                            onChange={(e) => {
                                              setMakesUsUnique(prev =>
                                                prev.map((val, i) =>
                                                  i === index ? { ...val, toogle: e.target.checked } : val
                                                )
                                              );
                                            }}
                                            style={{
                                              backgroundColor: item.toogle ? '#28a745' : '#6c757d',
                                              borderColor: item.toogle ? '#28a745' : '#6c757d',
                                              cursor: 'pointer'
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    {item.toogle && (
                                      <div className="mt-3">
                                        <textarea
                                          value={item.value}
                                          onChange={(e) => {
                                            setMakesUsUnique(prev =>
                                              prev.map((val, i) =>
                                                i === index ? { ...val, value: e.target.value } : val
                                              )
                                            );
                                          }}
                                          className="form-control"
                                          placeholder={`Describe ${item.title}`}
                                          rows="3"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Join Us Section */}
                      <div className="row m-b30">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="font-weight-700">Join Us</label>
                            <ReactQuill
                              theme="snow"
                              value={companyData.join_us || ""}
                              onChange={(value) => setCompanyData(prev => ({...prev, join_us: value}))}
                              className="h-48 mb-12"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Social Links Section */}
                      <div className="row m-b30">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="font-weight-700">Social Media & Website</label>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                  <label>Facebook</label>
                                  <input
                                    type="text"
                                    name="facebook_link"
                                    value={companyData.facebook_link || ""}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Facebook profile URL"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                  <label>LinkedIn</label>
                                  <input
                                    type="text"
                                    name="linkedin_link"
                                    value={companyData.linkedin_link || ""}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="LinkedIn profile URL"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                  <label>Twitter</label>
                                  <input
                                    type="text"
                                    name="twitter_link"
                                    value={companyData.twitter_link || ""}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Twitter profile URL"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                  <label>Website</label>
                                  <input
                                    type="text"
                                    name="website_link"
                                    value={companyData.website_link || ""}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Company website URL"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="col-lg-12 col-md-12">
                        <div className="clearfix font-bold">
                          <button
                            type="submit"
                            onClick={handleSave}
                            className="site-button button-sm px-4 py-2 text-bolder"
                            style={{
                              backgroundColor: '#1967d2',
                              color: 'white',
                              border: 'none',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            Save All Changes
                          </button>
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