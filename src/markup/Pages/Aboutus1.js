
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "./../Layout/Header";
// import Footer from "./../Layout/Footer";
// import Introductions from "../../adminPanel/CMS/About/Introductions";
// import ForJobseeker from "../../adminPanel/CMS/About/ForJobseeker";
// import ForEmployer from "../../adminPanel/CMS/About/ForEmployer";
// import Novajobsus from "../../adminPanel/CMS/About/Novajobsus";
// import MoreServices from "../../adminPanel/CMS/About/MoreServices";
// import FullPageLoader from "../skeleton/FullPageLoader";
// import { useLogo } from "../../Context/LogoContext";

// function AboutUs() {
//   const [sections, setSections] = React.useState([]);
//   const [loading, setLoading] = useState(false);
//   const {isPartner} = useLogo()
//   console.log(isPartner,"llll");
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const url = window.location.origin.includes("localhost")
//     ? "https://novajobs.us"
//     : window.location.origin;

//   const ApiUrl = isPartner? "https://apiwl.novajobs.us/api/admin/get-aboutus-content" : `https://apiwl.novajobs.us/api/jobseeker/about-us?domain=${url}`
//   // Fetch data from the GET API
//   const fetchContent = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//        ApiUrl
//       );
//       const data = response.data;
//       console.log(data,"llllhdvbhjsd cdjgvcsjhdsvj");
//       setSections(data.data || []);
//       // Fallback content if fields are empty or null
//     } catch (error) {
//       console.error("Error fetching content:", error);
//       // alert("An error occurred while fetching content.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchContent();
//   }, []);

//   const getSectionData = (id) => {
//     console.log("sections", sections);
//     return sections.find((section) => section.id === id);
//   };
//   return (
//     <>
//       {loading && <FullPageLoader isLoading={loading} />}
//       <Header />
//       <div className="page-content bg-white">
//         <div className="content-block">
//           <div className="section-full bg-white p-t50 p-b20">
//             <div className="container">
//               <div className="m-b30">
//                 <div className="job-bx">
//                   <div className=" justify-content-center ">
//                     {sections.length ? (
//                       <>
//                         <Introductions introductionData={getSectionData(1)} />
//                         <ForJobseeker forJobseekerData={getSectionData(2)} />
//                         <ForEmployer forEmployerData={getSectionData(3)} />
//                         <Novajobsus novaJobsusData={getSectionData(4)} />
//                         <MoreServices moreServicesData={getSectionData(5)} />
//                       </>
//                     ) : null}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default AboutUs;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import Introductions from "../../adminPanel/CMS/About/Introductions";
import ForJobseeker from "../../adminPanel/CMS/About/ForJobseeker";
import ForEmployer from "../../adminPanel/CMS/About/ForEmployer";
import Novajobsus from "../../adminPanel/CMS/About/Novajobsus";
import MoreServices from "../../adminPanel/CMS/About/MoreServices";
import FullPageLoader from "../skeleton/FullPageLoader";
import { useLogo } from "../../Context/LogoContext";

function AboutUs() {
  const [sections, setSections] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [isSimpleContent, setIsSimpleContent] = useState(false);
  const [simpleContentData, setSimpleContentData] = useState({ title: '', content: '' });

  
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const url = window.location.origin.includes("localhost")
    ? "https://novajobs.us"
    : window.location.origin;
  // const url = "https://toder231.novajobs.us/"
  const ApiUrl = `https://apiwl.novajobs.us/api/admin/get-aboutus-content?domain=${url}`
    

  // Fetch data from the GET API
  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(ApiUrl);
      const data = response.data;
      console.log(data, "llllhdvbhjsd cdjgvcsjhdsvj");

      // Check if this is the partner API (returns sections array)
      if (url==="https://novajobs.us") {
        setSections(data.data || []);
        setIsSimpleContent(false);
      } else {
        // This is the jobseeker API - check if it returns title and content
        if (data.data && (data.data.title || data.data.content)) {
          setSimpleContentData({
            title: data.data.title || '',
            content: data.data.content || ''
          });
          setIsSimpleContent(true);
        } else {
          // Fallback to sections if title/content not available
          setSections(data.data || []);
          setIsSimpleContent(false);
        }
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      // alert("An error occurred while fetching content.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const getSectionData = (id) => {
    console.log("sections", sections);
    return sections.find((section) => section.id === id);
  };

  return (
    <>
      {loading && <FullPageLoader isLoading={loading} />}
      <Header />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="m-b30">
                <div className="job-bx">
                  <div className=" justify-content-center ">
                    {isSimpleContent ? (
                      // Render simple title and content
                      <div className="about-simple-content">
                        {simpleContentData.title && (
                          <h2 className="m-b20">{simpleContentData.title}</h2>
                        )}
                        {simpleContentData.content && (
                          <div 
                            className="content-text"
                            dangerouslySetInnerHTML={{ __html: simpleContentData.content }}
                          />
                        )}
                      </div>
                    ) : (
                      // Render sections components
                      sections.length ? (
                        <>
                          <Introductions introductionData={getSectionData(1)} />
                          <ForJobseeker forJobseekerData={getSectionData(2)} />
                          <ForEmployer forEmployerData={getSectionData(3)} />
                          <Novajobsus novaJobsusData={getSectionData(4)} />
                          <MoreServices moreServicesData={getSectionData(5)} />
                        </>
                      ) : <p className="text-center">
                        No Content available
                      </p>
                    )}
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
}

export default AboutUs;