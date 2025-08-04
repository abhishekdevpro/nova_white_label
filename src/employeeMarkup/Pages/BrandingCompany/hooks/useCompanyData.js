"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useCompanyData = () => {
  const [companyData, setCompanyData] = useState({
    company_name: "",
    summery: "",
    title: "",
    about: "",
    video_urls: "",
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
    logo:null,
    media_content: [],
    inside_culture_images: [],
    inside_workplace_images: [],
    inside_people_images: [],
    pdf_urls: [],
  });

  const token =
    localStorage.getItem("employeeLoginToken") ||
    localStorage.getItem("vendorToken") ||
    localStorage.getItem("authToken");
  const BASE_IMAGE_URL = "https://apiwl.novajobs.us";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchCompanyData = async (
    setMakesUsUnique,
    setInsideCultureImages,
    setInsideWorkplaceImages,
    setInsidePeopleImages,
    setSelectedImages
  ) => {
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
        video_urls: data.video_urls || "",
        tagline: data.tagline || "",
        website_link: data.website_link || "",
        founded_date: data.founded_date || "",
        phone: data.phone || "",
        logo:data.logo,
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
        pdf_urls: data.pdf_urls || [],
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
      console.error("Error fetching company data:", error);
      // toast.error("Error fetching data")
    }
  };

  const handleAboutSave = async (event, selectedImages, selectedPdf) => {
    event.preventDefault();

    if (selectedImages.length > 3) {
      toast.error("Please ensure only 3 images are selected.");
      return;
    }

    const formData = new FormData();
    formData.append("title", companyData.title);
    formData.append("about", companyData.about);
    formData.append("summery", companyData.summery);
    formData.append("video_urls", companyData.video_urls);

    // Add images to form data
    selectedImages.forEach((image) => {
      formData.append("about_images_upload", image);
    });

    // Add PDF to form data if selected
    if (selectedPdf) {
      formData.append("pdf_upload", selectedPdf);
      console.log("Adding PDF to form data:", selectedPdf.name);
    }

    try {
      console.log("Sending form data with fields:", {
        title: companyData.title,
        about: companyData.about,
        summery: companyData.summery,
        video_urls: companyData.video_urls,
        imagesCount: selectedImages.length,
        hasPdf: !!selectedPdf,
      });

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

      console.log("API Response:", response.data);

      if (response.status === 200) {
        toast.success("About section updated successfully!");

        // Refresh company data to get updated PDF URLs
        setTimeout(() => {
          fetchCompanyData(
            () => {}, // setMakesUsUnique
            () => {}, // setInsideCultureImages
            () => {}, // setInsideWorkplaceImages
            () => {}, // setInsidePeopleImages
            () => {} // setSelectedImages
          );
        }, 1000);
      } else {
        toast.error("Failed to update about section. Please try again.");
      }
    } catch (error) {
      console.error("Error updating about section:", error);
      console.error("Error response:", error.response?.data);
      toast.error(
        `An error occurred: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleSave = async (event, makesUsUnique) => {
    event.preventDefault();
    // console.log(makesUsUnique,"vendor company branding page summary ");
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
      // company_industry_id: companyData.company_industry_id,
      join_us: companyData.join_us,
      // ...makesUsUnique.reduce(
      //   (acc, item) => ({
      //     ...acc,
      //     [item.key]: item.toogle,
      //     [`${item.key}_value`]: item.value,
      //   }),
      //   {},
      // ),
      ...(Array.isArray(makesUsUnique)
        ? makesUsUnique.reduce(
            (acc, item) => ({
              ...acc,
              [item.key]: item.toogle,
              [`${item.key}_value`]: item.value,
            }),
            {}
          )
        : {}),
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

  return {
    companyData,
    setCompanyData,
    handleInputChange,
    fetchCompanyData,
    handleSave,
    handleAboutSave,
  };
};
