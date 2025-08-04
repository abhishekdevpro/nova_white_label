
import { useEffect, useState } from "react";
import Footer from "../../Layout/Footer";
import UserHeader2 from "../../Layout/Header2";
import Profilesidebar from "../Profilesidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { formatDate } from "../../../adminPanel/utils/DateUtils";
import { useNavigate } from "react-router-dom";

const InterviewList = () => {
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('practice'); // 'practice' or 'ondemand'
  const token = localStorage.getItem("jobSeekerLoginToken");
  const navigate = useNavigate();

  const getInterviewList = async (type) => {
    setLoading(true);
    try {
      const endpoint = type === 'practice' 
        ? '/api/jobseeker/interview/practice/lists'
        : '/api/jobseeker/interview/ondemand/lists';

      const res = await axios.get(
        `https://apiwl.novajobs.us${endpoint}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res.data.code === 200 || res.data.status === "success") {
        setInterviewList(res.data.data || []);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch interview questions."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewResult = (id)=>{
    if (activeTab==="practice"){
        navigate(`/user/interview-view-result/${id}`)
    }
    else navigate(`/user/interview-view-result/${id}/?on_demand=true`)
  }

  useEffect(() => {
    getInterviewList(activeTab);
  }, [activeTab]);

  return (
    <>
      <div>
        <UserHeader2 />
        <div className="page-content bg-white">
          <div className="content-block">
            <div className="section-full bg-white browse-job p-t50 p-b20">
              <div className="container">
                <div className="row">
                  <Profilesidebar data={"interview"} />
                  <div className="col-xl-9 col-12 m-b30">
                    <div className="job-bx job-profile">
                      <div className="job-bx-title">
                        <h5 className="text-uppercase">Interview List</h5>
                      </div>

                      {/* Toggle Buttons */}
                      <div className="btn-group w-100 mb-4">
                        <button 
                          className={`btn ${activeTab === 'practice' ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setActiveTab('practice')}
                        >
                          Practice Interviews
                        </button>
                        <button 
                          className={`btn ${activeTab === 'ondemand' ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setActiveTab('ondemand')}
                        >
                          Interviews
                        </button>
                      </div>

                      <div className="job-bx-wrapper" style={{maxHeight: 'calc(100vh)', overflowY: 'auto', overflowX:"hidden", scrollbarWidth:"none"}}>
                        {loading ? (
                          <div className="d-flex align-items-center justify-content-center min-vh-50">
                            <div className="spinner-border text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>
                        ) : interviewList.length > 0 ? (
                          interviewList?.map((item, index) => (
                            <div
                              className="job-bx-title d-flex flex-column flex-md-row justify-content-between align-items-start"
                              key={index}
                            >
                              <div>
                                <h5 className="text-uppercase">
                                  <span className="text-primary">#{index + 1}</span>{" "}
                                  {activeTab === 'practice' ? 'Practice' : ''} Interview {index + 1}
                                </h5>
                                <p className="text-muted small m-b0">
                                  {formatDate(item.created_at)}
                                </p>
                              </div>
                              <div className=" mt-3">
                                <button 
                                  onClick={() => handleViewResult(item.id)} 
                                  className="site-button small w-100 w-md-100"
                                >
                                  View Results
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center p-4">
                            <p>No {activeTab === 'practice' ? 'practice' : 'live'} interviews found.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default InterviewList;