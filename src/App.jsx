import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Profilepagehome from "./markup/Layout/Profilepagehome";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import Homepage from "./markup/Pages/Homepage1";
import Homepage2 from "./markup/Pages/Homepage2";
import Jobprofile from "./markup/Pages/Jobprofile";
import Jobmyresume from "./markup/Pages/Jobmyresume";
import Jobsappliedjob from "./markup/Pages/Jobsappliedjob";
import Jobsalert from "./markup/Pages/Jobsalert";
import Jobsavedjobs from "./markup/Pages/Jobsavedjobs";
import MyResumes from "./markup/Pages/MyResumes";
import Jobcvmanager from "./markup/Pages/Jobcvmanager";
import Changepasswordpage from "./markup/Pages/Changepasswordpage";
import Companyprofile from "./markup/Pages/Companyprofile";
import Companyresume from "./markup/Pages/Companyresume";
import Componypostjobs from "./markup/Pages/Componypostjobs";
import Companymanage from "./markup/Pages/Companymanage";
import Companytransactions from "./markup/Pages/Companytransactions";
import Browsecandidates from "./markup/Pages/Browsecandidates";
import Aboutus from "./markup/Pages/Aboutus";
import Jobdetail from "./markup/Pages/Jobdetail";
import Companies from "./markup/Pages/Companies";
import Freejobalerts from "./markup/Pages/Freejobalerts";
import Browsejoblist from "./markup/Pages/Browsejoblist";
import Browsejobgrid from "./markup/Pages/Browsejobgrid";
import Browsejobfilterlist from "./markup/Pages/Browsejobfilterlist";
import Browsejobfiltergrid from "./markup/Pages/Browsejobfiltergrid";
import Categoryalljob from "./markup/Pages/Categoryalljob";
import Categorycompanyjob from "./markup/Pages/Categorycompanyjob";
import Categorydesignationsjob from "./markup/Pages/Categorydesignationsjob";
import Categoryjobs from "./markup/Pages/Categoryjobs";
import Categorylocationjobs from "./markup/Pages/Categorylocationjobs";
import Categoryskilljobs from "./markup/Pages/Categoryskilljobs";
import Portfoliogrid2 from "./markup/Pages/Portfoliogrid2";
import Loginpage1 from "./markup/Pages/Loginpage1";
import Loginpage2 from "./markup/Pages/Loginpage2";
import Loginpage3 from "./markup/Pages/Loginpage3";
import Register1 from "./markup/Pages/Register1";
import Register2 from "./markup/Pages/Register2";
import Error404 from "./markup/Pages/Error404";
import Contact from "./markup/Pages/Contact";
import Blogclassic from "./markup/Pages/Blogclassic";
import Blogclassicsidebar from "./markup/Pages/Blogclassicsidebar";
import Blogdetailgrid from "./markup/Pages/Blogdetailgrid";
import Blogdetailgridsidebar from "./markup/Pages/Blogdetailgridsidebar";
import Blogleftimg from "./markup/Pages/Blogleftimg";
import Blogdetail from "./markup/Pages/Blogdetail";
import ScrollToTop from "./markup/Element/ScrollToTop";
import UserPrivateRoute from "./markup/protectedRoute";
import ApplicantsJobPage from "./markup/Pages/ApplicantsJobPage";
import EmployeeJobPage from "./employeeMarkup/Pages/JobPage";
import "./css/plugins.css";
import "./css/style.css";
import "./css/templete.css";
import "./css/skin/skin-1.css";
import "./plugins/slick/slick.min.css";
import "./plugins/slick/slick-theme.min.css";
import "./css/share.css";
import "bootstrap/dist/css/bootstrap.min.css";

import EmployeeLogin from "./employeeMarkup/Pages/Loginpage2";
import EmployeeRegister1 from "./employeeMarkup/Pages/Register1";
import EmployeeHomepage from "./employeeMarkup/Pages/Homepage1";
import EmployeeJobProfile from "./employeeMarkup/Pages/Jobprofile";
import EmployeePrivateRoute from "./employeeMarkup/protectedRoute";
import EmployeeApplicantsJobPage from "./employeeMarkup/Pages/ApplicantJobPage";
import EmployeeJobmyresume from "./employeeMarkup/Pages/Jobmyresume";
import EmployeeJobsappliedjob from "./employeeMarkup/Pages/Jobsappliedjob";
import EmployeeJobsalert from "./employeeMarkup/Pages/Jobsalert";
import EmployeeJobsavedjobs from "./employeeMarkup/Pages/Jobsavedjobs";
import EmployeeJobcvmanager from "./employeeMarkup/Pages/Jobcvmanager";
import EmployeeChangepasswordpage from "./employeeMarkup/Pages/Changepasswordpage";
import EmployeeCompanyprofile from "./employeeMarkup/Pages/Companyprofile";
import EmployeeCompanyresume from "./employeeMarkup/Pages/Companyresume";
import EmployeeComponypostjobs from "./employeeMarkup/Pages/Componypostjobs";
import EmployeeCompanymanage from "./employeeMarkup/Pages/Companymanage";
import EmployeeCompanytransactions from "./employeeMarkup/Pages/Companytransactions";
import EmployeeBrowsecandidates from "./employeeMarkup/Pages/Browsecandidates";
import EmployeeAboutus from "./employeeMarkup/Pages/Aboutus";
import EmployeeJobdetail from "./employeeMarkup/Pages/Jobdetail";
import EmployeeCompanies from "./employeeMarkup/Pages/Companies";
import EmployeeFreejobalerts from "./employeeMarkup/Pages/Freejobalerts";
import EmployeeBrowsejoblist from "./employeeMarkup/Pages/Browsejoblist";
import EmployeeBrowsejobgrid from "./employeeMarkup/Pages/Browsejobgrid";
import EmployeeBrowsejobfilterlist from "./employeeMarkup/Pages/Browsejobfilterlist";
import EmployeeBrowsejobfiltergrid from "./employeeMarkup/Pages/Browsejobfiltergrid";
import EmployeeCategoryalljob from "./employeeMarkup/Pages/Categoryalljob";
import EmployeeCategorydesignationsjob from "./employeeMarkup/Pages/Categorydesignationsjob";
import EmployeeCategoryjobs from "./employeeMarkup/Pages/Categoryjobs";
import EmployeeCategorylocationjobs from "./employeeMarkup/Pages/Categorylocationjobs";
import EmployeeCategoryskilljobs from "./employeeMarkup/Pages/Categoryskilljobs";
import EmployeePortfoliogrid2 from "./employeeMarkup/Pages/Portfoliogrid2";
import EmployeeRegister2 from "./employeeMarkup/Pages/Register2";
import EmployeeError404 from "./employeeMarkup/Pages/Error404";
import EmployeeContact from "./employeeMarkup/Pages/Contact";
import EmployeeBlogclassic from "./employeeMarkup/Pages/Blogclassic";
import EmployeeBlogclassicsidebar from "./employeeMarkup/Pages/Blogclassicsidebar";
import EmployeeBlogdetailgrid from "./employeeMarkup/Pages/Blogdetailgrid";
import EmployeeBlogdetailgridsidebar from "./employeeMarkup/Pages/Blogdetailgridsidebar";
import EmployeeBlogleftimg from "./employeeMarkup/Pages/Blogleftimg";
import EmployeeBlogdetail from "./employeeMarkup/Pages/Blogdetail";
import JobPage from "./markup/Pages/JobPage";
import ProfilePage from "./employeeMarkup/Pages/ProfilePage";
import SkillTest from "./markup/Pages/SkillTest";
import EducationPage from "./markup/Pages/EducationPage";
import EmployeeCategorycompanyjob from "./employeeMarkup/Pages/Categorycompanyjob";
import Messages from "./markup/Element/messages/index";
import TermOfUse from "./markup/Pages/TermOfUse";
import DataPrivacyFramework from "./markup/Pages/DataPrivacyFramework";
import CookingAdvertising from "./markup/Pages/Cooking&Advertising";
import DataSharingHelps from "./markup/Pages/DataSharingHelps";
import ScopePrivacyNotice from "./markup/Pages/ScopePrivacyNotice";
import InformationNovaUsJobs from "./markup/Pages/InformationNovaUsJobs";
import RetentionPeriod from "./markup/Pages/RetentionPeriod";
import CookiesDigitalAdvertising from "./markup/Pages/Cookies&DigitalAdvertising";
import PrivacyRights from "./markup/Pages/PrivacyRights";
import InternationalTransfer from "./markup/Pages/InternationalTransfer";
import GeneralContactInformation from "./markup/Pages/GeneralContactInformation";
import SecurityCenterAccountManagement from "./markup/Pages/SecurityCenterAccountManagement";
import EmailScams from "./markup/Pages/EmailScams";
import OnlineInterviewScams from "./markup/Pages/OnlineInterviewScams";
import SecurityBugReporting from "./markup/Pages/SecurityBugReporting";
import AccessibilityCenter from "./markup/Pages/AccessibilityCenter";
import HowItWorksEmployee from "./markup/Pages/HowItWorksEmployee";
import HowItWorksCandidates from "./markup/Pages/HowItWorksCandidates";
import CompanyPage from "./markup/Pages/CompanyPageView";
import EmailVerification from "./markup/Pages/EmailVerification";
import NewPasswordSet from "./markup/Pages/NewPasswordSet";
import ForgotPassword from "./markup/Pages/ForgotPassword";
import ForgotPasswordemployee from "./employeeMarkup/Pages/ForgotPasswordemployee";
import ResetPassword from "./markup/Pages/ResetPassword";
import ResetPasswordemployee from "./employeeMarkup/Pages/ResetPasswordemployee";
import ResumeSecurity from "./markup/Pages/ResumeSecurity";
import LandingPage from "./employeeMarkup/Pages/LandingPage";
import Verifyemail from "./markup/Pages/Verifyemail";
import Aboutus1 from "./markup/Pages/Aboutus1";
import Novajobs from "./markup/Pages/Novajobs";
import Jobreferral from "./markup/Element/Jobreferral";
import VerifyEmailemployee from "./employeeMarkup/Pages/Verifyemailemploye";
import ShowcaseView from "./employeeMarkup/Pages/ShowcaseView";

import Admin from "./adminPanel/Admin";
import Vendor from "./adminPanel/Vendor";
import User from "./adminPanel/User";
import Dashboard from "./adminPanel/Dashboard";
import Employee from "./adminPanel/Employee";
import Wallet from "./adminPanel/Wallet";
import Addteam from "./adminPanel/Addteam";
import AssignRole from "./adminPanel/AssignRole";
import AssignTask from "./adminPanel/Assigntask";
import JobSeekers from "./adminPanel/JobSeekers";
import Jobs from "./adminPanel/Jobs";
import Notifications from "./adminPanel/Notifications";
import Team from "./adminPanel/Team";
import Adminlogin from "./adminPanel/Adminlogin";
import PrivateRouteadmin from "./adminPanel/PrivateRouteadmin";
import Addvendor from "./adminPanel/Addvendor";
import Editadmin from "./adminPanel/Editadmin";
import Listteam from "./adminPanel/Listteam";
import Listnumber from "./adminPanel/Listnumber";
import Listvendor from "./adminPanel/Listvendor";
import Jobslist from "./adminPanel/Joblist";
import Jobseekerlist from "./adminPanel/Jobseekerlist";
import Employeelist from "./adminPanel/Employeelist";
import CompanyListAdmin from "./adminPanel/CompanyListAdmin";
import CompanyNameAdmin from "./adminPanel/CompanyNameAdmin";

import VerifyEmail from "./vendor/VerifyEmail";
import Vendorlogin from "./vendor/Vendorlogin";
import PrivateRoutevendor from "./vendor/PrivateRoutevendor";
import VendorCompanyprofile from "./vendor/Vendorprofile";
import VendorCompanySideBar from "./vendor/Vendorsidebar";
import VendorComponypostjobs from "./vendor/Vendorpostjob";
import Vendorwallet from "./vendor/Vendorwallet";
import VendorCompanymanage from "./vendor/Vendormanagejob";
import Vendorapplicant from "./vendor/Vendorapplicant";
import VendorChangepasswordpage from "./vendor/VendorChangepasswordpage";
import Vendorbulkuploadjobopeneing from "./vendor/Vendorbulkuploadjobopeneing copy";
import Vendorbulkuploadjobseeker from "./vendor/Vendorbulkuploadjobseeker";
import Vendorregistration from "./vendor/Vendorregistration";
import JobPagethirdparty from "./markup/Pages/JobPagethirdparty";

import Transactions from "./markup/Pages/Transactions";
import Vendorplan from "./vendor/Vendorplan";
import Jobadd from "./adminPanel/Jobadd";
import Community from "./markup/Element/community/index";
import NotificationPage from "./markup/Element/notifications-history";
import SkillTestHistory from "./markup/Element/skill-test-history";

import AboutusForm from "./adminPanel/CMS/About";
import WhiteLabelForm from "./vendor/WhiteLabel";
import WhiteLabelLanding from "./vendor/WhiteLanding/index";
import WhiteStart from "./vendor/WhiteLabelSignUp/index";
import Editor from "./vendor/Editor";
import VendorSetting from "./vendor/vendorSettings";
import Gauth from "./markup/Pages/G-Auth";
import LoginCode from "./markup/Pages/Login-code";
import { LogoProvider } from "./Context/LogoContext";
import LoginEmployerCode from "./employeeMarkup/Pages/EmployerLoginCode";
import EmployerGauth from "./employeeMarkup/Pages/EmployerG-auth";
import UltraAuraCourses from "./markup/Element/UltraAuraCourses";
import JobSeekerDashboard from "./markup/Pages/JobSeekerDashboard";
import axios from "axios";
import Payment from "./vendor/Payments/Payemnts";
import PlansPage from "./vendor/Payments/Plans";
import ResumeList from "./adminPanel/ResumeList";
import BrandingCompany from "./employeeMarkup/Pages/BrandingCompany/SocialNetworkBox.jsx";
import Branding from "./vendor/Branding";
import Subscription from "./markup/Pages/Payments/Subscription";
import PaymentPlans from "./markup/Pages/Payments/PaymentPlans";
import PaymentPage from "./markup/Pages/Payments/PaymentDetails";
import PaymentFailurePage from "./markup/Pages/Payments/payment-failed";
import PaymentSuccessPage from "./markup/Pages/Payments/Payment-success";
import SinglePostPage from "./markup/Element/community/SinglePost";
import JobPage2 from "../src/markup/Pages/JobPageV2/index.jsx";
import JobDetails from "../src/markup/Pages/JobPageV2/JobDetails";
import CompanyList from "./markup/Pages/CompaniesListing/index.jsx";
import UploadDocuments from "./markup/Pages/UploadedDocuments.jsx";
import BrandingAdmin from "./adminPanel/Branding.js";
import GoogleTranslate from "./GoogleTranslate.js";
import ApplyForm from "./markup/ApplyForm/index.jsx";
import ProfileComplete from "./markup/Pages/ProfileComplete.js";
import GoogleOneTapLoginJobseeker from "./components/GoogleOneTapJobseeker.jsx";
import SubscriptionPlan from "./vendor/Subscription/index.jsx";
import VendorDashboard from "./vendor/VendorDashboard.jsx";
import CurrentUserPlan from "./markup/Pages/CurrentUserPlan.js";
import JobSeekerDetails from "./employeeMarkup/Pages/candidate-profile/index.jsx";
import MockInterviewPage from "./markup/Pages/practice-interview/index.jsx";
import InterviewList from "./markup/Element/Interview-list/InterviewList.jsx";
import InterviewResult from "./markup/Element/Interview-list/InterviewResult.jsx";
import AddCoupon from "./adminPanel/Coupon/index.jsx";
import CouponListPage from "./adminPanel/CouponList/index.jsx";
import InterviewPage from "./markup/Pages/InterviewPage.js";
function App() {
  const dispatch = useDispatch();

  const updateFavicon = (faviconUrl) => {
    let link = document.querySelector("link[rel~='icon']");

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    link.href = faviconUrl;
  };
  const url = window.location.origin.includes("localhost")
    ? "https://novajobs.us"
    : window.location.origin;
  useEffect(() => {
    const fetchFavicon = async () => {
      try {
        const response = await axios.get(
          `https://apiwl.novajobs.us/api/jobseeker/general-info?domain=${url}`
        ); // Replace with your actual API
        if (
          response.data.data.success === "sucsess" ||
          response.data.data.code === 200
        ) {
          updateFavicon(response.data.data.favicon.image);
        }
      } catch (error) {
        console.error("Error fetching favicon:", error);
      }
    };

    fetchFavicon();
  }, []);

  return (
    <>
      {/* <GoogleTranslate /> */}
      <GoogleOneTapLoginJobseeker />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="services" element={<LandingPage />} />
        <Route path="novajobs" element={<Novajobs />} />
        {/* <Route path="aboutus-form" element={<AboutusForm />} /> */}
        <Route path="aboutus" element={<Aboutus1 />} />
        <Route path="Profilepagehome" element={<Profilepagehome />} />
        <Route path="/*" element={<Error404 />} />
        <Route path="about-us" element={<Aboutus />} />
        <Route path="privacy-policy" element={<PrivacyRights />} />
        <Route path="cookies-policy" element={<CookiesDigitalAdvertising />} />
        <Route path="interview-page" element={<InterviewPage/>} />
        <Route path="terms-and-conditions" element={<TermOfUse />} />
        <Route path="accessibility-center" element={<AccessibilityCenter />} />
        <Route path="transaction" element={<Transactions />} />

        <Route path="/admin/login" element={<Adminlogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRouteadmin>
              {" "}
              <Dashboard />{" "}
            </PrivateRouteadmin>
          }
        />
         <Route
          path="/admin/add-coupon"
          element={
            <PrivateRouteadmin>
              {" "}
              <AddCoupon />{" "}
            </PrivateRouteadmin>
          }
        />
         <Route
          path="/admin/edit-coupon/:id"
          element={
            <PrivateRouteadmin>
              {" "}
              <AddCoupon />{" "}
            </PrivateRouteadmin>
          }
        />
         <Route
          path="/admin/coupon-list"
          element={
            <PrivateRouteadmin>
              {" "}
              <CouponListPage />{" "}
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRouteadmin>
              <User />{" "}
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/vendor"
          element={
            <PrivateRouteadmin>
              <Vendor />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/resumelist"
          element={
            <PrivateRouteadmin>
              <ResumeList />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/branding"
          element={
            <PrivateRouteadmin>
              <BrandingAdmin />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/employer"
          element={
            <PrivateRouteadmin>
              <Employee />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/employeelist"
          element={
            <PrivateRouteadmin>
              <Employeelist />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/wallet"
          element={
            <PrivateRouteadmin>
              <Wallet />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/addteam"
          element={
            <PrivateRouteadmin>
              <Addteam />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/assignrole"
          element={
            <PrivateRouteadmin>
              <AssignRole />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/assigntask"
          element={
            <PrivateRouteadmin>
              <AssignTask />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/jobseekers"
          element={
            <PrivateRouteadmin>
              <JobSeekers />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/aboutus"
          element={
            <PrivateRouteadmin>
              <AboutusForm />
            </PrivateRouteadmin>
          }
        />

        <Route
          path="/admin/freevance/aboutus"
          element={
            <PrivateRouteadmin>
              <AboutusForm projectName={"/freevance"} />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/paradigmshift/aboutus"
          element={
            <PrivateRouteadmin>
              <AboutusForm projectName={"/paradigmshift"} />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/legitzone/aboutus"
          element={
            <PrivateRouteadmin>
              <AboutusForm projectName={"/legitzone"} />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/homecare/aboutus"
          element={
            <PrivateRouteadmin>
              <AboutusForm projectName={"/homecare"} />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <PrivateRouteadmin>
              <Jobs />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <PrivateRouteadmin>
              <Notifications />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/team"
          element={
            <PrivateRouteadmin>
              <Team />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/addvendor"
          element={
            <PrivateRouteadmin>
              <Addvendor />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/edit"
          element={
            <PrivateRouteadmin>
              <Editadmin />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/listvendor"
          element={
            <PrivateRouteadmin>
              <Listvendor />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/team/list-team"
          element={
            <PrivateRouteadmin>
              <Listteam />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/team/list-number"
          element={
            <PrivateRouteadmin>
              <Listnumber />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/listalljobs"
          element={
            <PrivateRouteadmin>
              <Jobslist />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/listalljobseeker"
          element={
            <PrivateRouteadmin>
              <Jobseekerlist />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/CompanyListAdmin"
          element={
            <PrivateRouteadmin>
              <CompanyListAdmin />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/CompanyNameAdmin"
          element={
            <PrivateRouteadmin>
              <CompanyNameAdmin />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/addjob"
          element={
            <PrivateRouteadmin>
              <Jobadd />
            </PrivateRouteadmin>
          }
        />
        <Route
          path="/admin/addjob/:id"
          element={
            <PrivateRouteadmin>
              <Jobadd />
            </PrivateRouteadmin>
          }
        />

        <Route path="/vendor/verify" element={<VerifyEmail />} />
        <Route path="white-label" element={<WhiteLabelLanding />} />
        <Route path="white-label-started" element={<WhiteStart />} />
        <Route path="/vendor">
          <Route path="login" element={<Vendorlogin />} />
          <Route path="payments" element={<Payment />} />
          <Route path="payment/plans" element={<PlansPage />} />
          <Route path="subscription" element={<SubscriptionPlan />} />
          <Route
            path="vendorprofile"
            element={
              <PrivateRoutevendor>
                {" "}
                <VendorCompanyprofile />{" "}
              </PrivateRoutevendor>
            }
          />
          <Route
            path="branding"
            element={
              <PrivateRoutevendor>
                <BrandingCompany />
              </PrivateRoutevendor>
            }
          />
          <Route
            path="branding-company"
            element={
              <PrivateRoutevendor>
                <ShowcaseView />
              </PrivateRoutevendor>
            }
          />
          <Route
            path="form"
            element={
              <PrivateRoutevendor>
                {" "}
                <WhiteLabelForm />{" "}
              </PrivateRoutevendor>
            }
          />
          <Route
            path="setting"
            element={
              <PrivateRoutevendor>
                {" "}
                <VendorSetting />{" "}
              </PrivateRoutevendor>
            }
          />
          <Route
            path="vendorcompanySideBar"
            element={
              <PrivateRoutevendor>
                <VendorCompanySideBar />{" "}
              </PrivateRoutevendor>
            }
          />
          <Route
            path="vendorcomponypostjobs/:id"
            element={
              <PrivateRoutevendor>
                <EmployeeComponypostjobs />
              </PrivateRoutevendor>
            }
          />
          <Route
            path="vendorwallet"
            element={
              <PrivateRoutevendor>
                <Vendorwallet />
              </PrivateRoutevendor>
            }
          />
          <Route
            path="vendorcompanymanage/:id"
            element={
              <PrivateRoutevendor>
                <VendorCompanymanage />
              </PrivateRoutevendor>
            }
          />
          <Route
            path="vendorapplicant/:id"
            element={
              <PrivateRoutevendor>
                <Vendorapplicant />
              </PrivateRoutevendor>
            }
          />
          <Route
            path="vendorchangepasswordpage"
            element={
              <PrivateRoutevendor>
                <VendorChangepasswordpage />
              </PrivateRoutevendor>
            }
          />
          <Route
            path="vendorbulkuploadjobopeneing"
            element={
              <PrivateRoutevendor>
                <Vendorbulkuploadjobopeneing />
              </PrivateRoutevendor>
            }
          />
          <Route
            path="vendorbulkuploadjobseeker"
            element={
              <PrivateRoutevendor>
                <Vendorbulkuploadjobseeker />
              </PrivateRoutevendor>
            }
          />
          <Route
            path="editors"
            element={
              <PrivateRoutevendor>
                <Editor />
              </PrivateRoutevendor>
            }
          />
          <Route
            path="vendorplan"
            element={
              <PrivateRoutevendor>
                <Vendorplan />
              </PrivateRoutevendor>
            }
          />
          <Route
            path="dashboard"
            element={
              <PrivateRoutevendor>
                <VendorDashboard />
              </PrivateRoutevendor>
            }
          />
          <Route path="vendorregistration" element={<Vendorregistration />} />
        </Route>

        <Route path="gauth" element={<Gauth />} />
        <Route path="payment-success" element={<PaymentSuccessPage />} />
        <Route path="payment-failed" element={<PaymentFailurePage />} />
        <Route path="community" element={<Community />} />
        <Route path="community/:postId" element={<SinglePostPage />} />
        <Route path="company-list" element={<CompanyList />} />
        <Route path="company-details/:companyId" element={<ShowcaseView />} />
        <Route path="/user">
          <Route path="" element={<Homepage />} />
          <Route path="login" element={<Loginpage2 />} />
          <Route path="login-code" element={<LoginCode />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="register" element={<Register1 />} />
          <Route path="register-2" element={<Register2 />} />
          <Route path="verify/:token" element={<Verifyemail />} />
          <Route
            path="subscription"
            element={
              <UserPrivateRoute>
                <Subscription />
              </UserPrivateRoute>
            }
          />
          <Route
            path="payment-plans"
            element={
              <UserPrivateRoute>
                <PaymentPlans />
              </UserPrivateRoute>
            }
          />
          <Route
            path="upload-documents"
            element={
              <UserPrivateRoute>
                <UploadDocuments />
              </UserPrivateRoute>
            }
          />
          <Route
            path="plan-details"
            element={
              <UserPrivateRoute>
                <PaymentPage />
              </UserPrivateRoute>
            }
          />
          <Route
            path="jobs-profile"
            element={
              <UserPrivateRoute>
                <Jobprofile />
              </UserPrivateRoute>
            }
          />
          <Route
            path="current-plan"
            element={
              <UserPrivateRoute>
                <CurrentUserPlan />
              </UserPrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <UserPrivateRoute>
                <ProfileComplete />
              </UserPrivateRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <UserPrivateRoute>
                <JobSeekerDashboard />
              </UserPrivateRoute>
            }
          />
          <Route
            path="skill-test"
            element={
              <UserPrivateRoute>
                <SkillTest />
              </UserPrivateRoute>
            }
          />
          <Route
            path="skill-test-history"
            element={
              <UserPrivateRoute>
                <SkillTestHistory />
              </UserPrivateRoute>
            }
          />
          <Route
            path="interview-list"
            element={
              <UserPrivateRoute>
                <InterviewList />
              </UserPrivateRoute>
            }
          />
          <Route
            path="interview-view-result/:jobId"
            element={
              <UserPrivateRoute>
                <InterviewResult />
              </UserPrivateRoute>
            }
          />
          <Route
            path="education-page"
            element={
              <UserPrivateRoute>
                <EducationPage />
              </UserPrivateRoute>
            }
          />
          {/* <Route path="job/:id" element={<JobPage2 />} /> */}
          {/* <Route path="job/:id" element={<JobPage />} /> */}
          <Route path="jobs" element={<JobPage2 />} />
          <Route path="jobs/:jobId" element={<JobDetails />} />
          <Route path="practice-interview/:jobId" element={<MockInterviewPage />} />
          <Route path="apply/:id" element={<ApplyForm />} />
          <Route path="jobthirdparty" element={<JobPagethirdparty />} />
          <Route
            path="applicant-job"
            element={
              <UserPrivateRoute>
                <ApplicantsJobPage />
              </UserPrivateRoute>
            }
          />{" "}
          <Route
            path="category-company-jobs"
            element={
              <UserPrivateRoute>
                <Categorycompanyjob />
              </UserPrivateRoute>
            }
          />
          <Route
            path="jobs-my-resume"
            element={
              <UserPrivateRoute>
                <Jobmyresume />
              </UserPrivateRoute>
            }
          />
          <Route
            path="jobs-applied-job"
            element={
              <UserPrivateRoute>
                <Jobsappliedjob />
              </UserPrivateRoute>
            }
          />
          <Route
            path="ultraaura-courses"
            element={
              <UserPrivateRoute>
                <UltraAuraCourses />
              </UserPrivateRoute>
            }
          />
          <Route
            path="jobs-alerts"
            element={
              <UserPrivateRoute>
                <NotificationPage />
              </UserPrivateRoute>
            }
          />
          <Route
            path="jobs-referral"
            element={
              <UserPrivateRoute>
                <Jobreferral />
              </UserPrivateRoute>
            }
          />
          <Route path="company/:id" element={<CompanyPage />} />
          <Route
            path="messages"
            element={
              <UserPrivateRoute>
                <Messages />
              </UserPrivateRoute>
            }
          />
          <Route
            path="community"
            element={
              <UserPrivateRoute>
                <Community />
              </UserPrivateRoute>
            }
          />
          <Route
            path="community/:postId"
            element={
              <UserPrivateRoute>
                <SinglePostPage />
              </UserPrivateRoute>
            }
          />
          <Route
            path="jobs-saved-jobs"
            element={
              <UserPrivateRoute>
                <Jobsavedjobs />
              </UserPrivateRoute>
            }
          />
          <Route
            path="resume-list"
            element={
              <UserPrivateRoute>
                <MyResumes />
              </UserPrivateRoute>
            }
          />
          <Route
            path="jobs-cv-manager"
            element={
              <UserPrivateRoute>
                <Jobcvmanager />
              </UserPrivateRoute>
            }
          />
          <Route
            path="jobs-change-password"
            element={
              <UserPrivateRoute>
                <Changepasswordpage />
              </UserPrivateRoute>
            }
          />
          <Route
            path="company-profile"
            element={
              <UserPrivateRoute>
                <Companyprofile />
              </UserPrivateRoute>
            }
          />
          <Route
            path="company-resume"
            element={
              <UserPrivateRoute>
                <Companyresume />
              </UserPrivateRoute>
            }
          />
          <Route
            path="company-post-jobs"
            element={
              <UserPrivateRoute>
                <Componypostjobs />
              </UserPrivateRoute>
            }
          />
          <Route
            path="company-manage-job"
            element={
              <UserPrivateRoute>
                <Companymanage />
              </UserPrivateRoute>
            }
          />
          <Route
            path="company-transactions"
            element={
              <UserPrivateRoute>
                <Companytransactions />
              </UserPrivateRoute>
            }
          />
          <Route
            path="browse-candidates"
            element={
              <UserPrivateRoute>
                <Browsecandidates />
              </UserPrivateRoute>
            }
          />
          <Route
            path="job-page"
            element={
              <UserPrivateRoute>
                <JobPage />
              </UserPrivateRoute>
            }
          />
          <Route path="job-detail/:id" element={<Jobdetail />} />
          <Route
            path="companies"
            element={
              <UserPrivateRoute>
                <Companies />
              </UserPrivateRoute>
            }
          />
          <Route
            path="free-job-alerts"
            element={
              <UserPrivateRoute>
                <Freejobalerts />
              </UserPrivateRoute>
            }
          />
          <Route
            path="browse-job-list"
            element={
              <UserPrivateRoute>
                <Browsejoblist />
              </UserPrivateRoute>
            }
          />
          <Route
            path="browse-job-grid"
            element={
              <UserPrivateRoute>
                <Browsejobgrid />
              </UserPrivateRoute>
            }
          />
          <Route
            path="browse-job-filter-list"
            element={
              <UserPrivateRoute>
                <Browsejobfilterlist />
              </UserPrivateRoute>
            }
          />
          <Route
            path="browse-job-filter-grid"
            element={
              <UserPrivateRoute>
                <Browsejobfiltergrid />
              </UserPrivateRoute>
            }
          />
          <Route
            path="category-all-jobs"
            element={
              <UserPrivateRoute>
                <Categoryalljob />
              </UserPrivateRoute>
            }
          />
          <Route
            path="category-designations-jobs"
            element={
              <UserPrivateRoute>
                <Categorydesignationsjob />
              </UserPrivateRoute>
            }
          />
          <Route
            path="category-jobs"
            element={
              <UserPrivateRoute>
                <Categoryjobs />
              </UserPrivateRoute>
            }
          />
          <Route
            path="category-location-jobs"
            element={
              <UserPrivateRoute>
                <Categorylocationjobs />
              </UserPrivateRoute>
            }
          />
          <Route
            path="category-skill-jobs"
            element={
              <UserPrivateRoute>
                <Categoryskilljobs />
              </UserPrivateRoute>
            }
          />
          <Route
            path="portfolio-grid-2"
            element={
              <UserPrivateRoute>
                <Portfoliogrid2 />
              </UserPrivateRoute>
            }
          />
          <Route
            path="register-2"
            element={
              <UserPrivateRoute>
                <Register2 />
              </UserPrivateRoute>
            }
          />
          <Route
            path="verify"
            element={
              <UserPrivateRoute>
                <Verifyemail />
              </UserPrivateRoute>
            }
          />
          <Route
            path="contact"
            element={
              <UserPrivateRoute>
                <Contact />
              </UserPrivateRoute>
            }
          />
          <Route
            path="blog-classic"
            element={
              <UserPrivateRoute>
                <Blogclassic />
              </UserPrivateRoute>
            }
          />
          <Route
            path="blog-classic-sidebar"
            element={
              <UserPrivateRoute>
                <Blogclassicsidebar />
              </UserPrivateRoute>
            }
          />
          <Route
            path="blog-detailed-grid"
            element={
              <UserPrivateRoute>
                <Blogdetailgrid />
              </UserPrivateRoute>
            }
          />
          <Route
            path="blog-detailed-grid-sidebar"
            element={
              <UserPrivateRoute>
                <Blogdetailgridsidebar />
              </UserPrivateRoute>
            }
          />
          <Route
            path="blog-left-img"
            element={
              <UserPrivateRoute>
                <Blogleftimg />
              </UserPrivateRoute>
            }
          />
          <Route
            path="blog-details"
            element={
              <UserPrivateRoute>
                <Blogdetail />
              </UserPrivateRoute>
            }
          />
          <Route
            path="email-verification"
            element={
              // <UserPrivateRoute>
              <EmailVerification />
              // </UserPrivateRoute>
            }
          />
          <Route
            path="new-password-set"
            element={
              <UserPrivateRoute>
                <NewPasswordSet />
              </UserPrivateRoute>
            }
          />
          <Route path="*" element={<Error404 />} />
        </Route>

        {/* routes for empployees */}

        <Route path="/employer">
          <Route path="gauth" element={<EmployerGauth />} />
          <Route path="verify/:token" element={<VerifyEmailemployee />} />
          <Route path="forgot-password" element={<ForgotPasswordemployee />} />
          <Route
            path="reset-password/:token"
            element={<ResetPasswordemployee />}
          />
          <Route path="showcase" element={<ShowcaseView />} />

          <Route path="login" element={<EmployeeLogin />} />
          <Route path="login-code" element={<LoginEmployerCode />} />
          <Route path="register" element={<EmployeeRegister1 />} />
          <Route path="register-2" element={<EmployeeRegister2 />} />

          <Route
            path="jobs-profile"
            element={
              <EmployeePrivateRoute>
                <EmployeeJobProfile />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="category-company-jobs"
            element={
              <EmployeePrivateRoute>
                <EmployeeCategorycompanyjob />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="applicant-job"
            element={
              <EmployeePrivateRoute>
                <EmployeeApplicantsJobPage />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="jobs-my-resume"
            element={
              <EmployeePrivateRoute>
                <EmployeeJobmyresume />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="jobs-applied-job"
            element={
              <EmployeePrivateRoute>
                <EmployeeJobsappliedjob />
              </EmployeePrivateRoute>
            }
          />

          <Route
            path="jobs-alerts"
            element={
              <EmployeePrivateRoute>
                <NotificationPage />
              </EmployeePrivateRoute>
            }
          />

          <Route
            path="jobs-saved-jobs"
            element={
              <EmployeePrivateRoute>
                <EmployeeJobsavedjobs />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="jobs-cv-manager"
            element={
              <EmployeePrivateRoute>
                <EmployeeJobcvmanager />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="jobs-change-password"
            element={
              <EmployeePrivateRoute>
                <EmployeeChangepasswordpage />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="company-profile"
            element={
              <EmployeePrivateRoute>
                <EmployeeCompanyprofile />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="branding-company"
            element={
              <EmployeePrivateRoute>
                <BrandingCompany />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="messages"
            element={
              <EmployeePrivateRoute>
                <Messages />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="community"
            element={
              <EmployeePrivateRoute>
                <Community />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="company-resume/:id"
            element={
              <EmployeePrivateRoute>
                <EmployeeCompanyresume />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="company-post-jobs/:id"
            element={
              <EmployeePrivateRoute>
                <EmployeeComponypostjobs />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="company-manage-job/:id"
            element={
              <EmployeePrivateRoute>
                <EmployeeCompanymanage />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="company-transactions"
            element={
              <EmployeePrivateRoute>
                <EmployeeCompanytransactions />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="browse-candidates"
            element={
              <EmployeePrivateRoute>
                <EmployeeBrowsecandidates />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="candidate-profile/:id"
            element={
              <EmployeePrivateRoute>
                <JobSeekerDetails />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="about-us"
            element={
              <EmployeePrivateRoute>
                <EmployeeAboutus />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="job-detail"
            element={
              <EmployeePrivateRoute>
                <EmployeeJobdetail />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="companies"
            element={
              <EmployeePrivateRoute>
                <EmployeeCompanies />
              </EmployeePrivateRoute>
            }
          />

          <Route
            path="free-job-alerts"
            element={
              <EmployeePrivateRoute>
                <EmployeeFreejobalerts />
              </EmployeePrivateRoute>
            }
          />

          <Route
            path="browse-job-list"
            element={
              <EmployeePrivateRoute>
                <EmployeeBrowsejoblist />
              </EmployeePrivateRoute>
            }
          />

          <Route
            path="browse-job-grid"
            element={
              <EmployeePrivateRoute>
                <EmployeeBrowsejobgrid />
              </EmployeePrivateRoute>
            }
          />

          <Route
            path="browse-job-filter-list"
            element={
              <EmployeePrivateRoute>
                <EmployeeBrowsejobfilterlist />
              </EmployeePrivateRoute>
            }
          />

          <Route
            path="browse-job-filter-grid"
            element={
              <EmployeePrivateRoute>
                <EmployeeBrowsejobfiltergrid />
              </EmployeePrivateRoute>
            }
          />

          <Route
            path="category-all-jobs"
            element={
              <EmployeePrivateRoute>
                <EmployeeCategoryalljob />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="category-designations-jobs"
            element={
              <EmployeePrivateRoute>
                <EmployeeCategorydesignationsjob />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="category-jobs"
            element={
              <EmployeePrivateRoute>
                <EmployeeCategoryjobs />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="category-location-jobs"
            element={
              <EmployeePrivateRoute>
                <EmployeeCategorylocationjobs />
              </EmployeePrivateRoute>
            }
          />

          <Route
            path="category-skill-jobs"
            element={
              <EmployeePrivateRoute>
                <EmployeeCategoryskilljobs />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="portfolio-grid-2"
            element={
              <EmployeePrivateRoute>
                <EmployeePortfoliogrid2 />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="register-2"
            element={
              <EmployeePrivateRoute>
                <EmployeeRegister2 />
              </EmployeePrivateRoute>
            }
          />

          <Route
            path="contact"
            element={
              <EmployeePrivateRoute>
                <EmployeeContact />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="blog-classic"
            element={
              <EmployeePrivateRoute>
                <EmployeeBlogclassic />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="blog-classic-sidebar"
            element={
              <EmployeePrivateRoute>
                <EmployeeBlogclassicsidebar />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="blog-detailed-grid"
            element={
              <EmployeePrivateRoute>
                <EmployeeBlogdetailgrid />
              </EmployeePrivateRoute>
            }
          />
          <Route
            path="blog-detailed-grid-sidebar"
            element={
              <EmployeePrivateRoute>
                <EmployeeBlogdetailgridsidebar />
              </EmployeePrivateRoute>
            }
          />

          <Route
            path="resume-security"
            element={
              // <EmployeePrivateRoute>
              <ResumeSecurity />
              // </EmployeePrivateRoute>
            }
          />
          <Route
            path="data-privacy-framework"
            element={
              // <EmployeePrivateRoute>
              <DataPrivacyFramework />
              // </EmployeePrivateRoute>
            }
          />

          <Route
            path="cooking-advertising-overview"
            element={
              // <EmployeePrivateRoute>
              <CookingAdvertising />
              // </EmployeePrivateRoute>
            }
          />
          <Route
            path="data-sharing-helps-you"
            element={
              // <EmployeePrivateRoute>
              <DataSharingHelps />
              // </EmployeePrivateRoute>
            }
          />

          <Route
            path="scope-privacy-notice"
            element={
              // <EmployeePrivateRoute>
              <ScopePrivacyNotice />
              // </EmployeePrivateRoute>
            }
          />
          <Route
            path="information-novaus-jobs"
            element={
              // <EmployeePrivateRoute>
              <InformationNovaUsJobs />
              // </EmployeePrivateRoute>
            }
          />

          <Route
            path="retention-period-resume-visibility"
            element={
              // <EmployeePrivateRoute>
              <RetentionPeriod />
              // </EmployeePrivateRoute>
            }
          />
          <Route
            path="cookies-digital-advertising"
            element={
              // <EmployeePrivateRoute>
              <CookiesDigitalAdvertising />
              // </EmployeePrivateRoute>
            }
          />
          <Route
            path="privacy-rights"
            element={
              // <EmployeePrivateRoute>
              <PrivacyRights />
              // </EmployeePrivateRoute>
            }
          />

          <Route
            path="international-transfer-of-personal-information"
            element={
              // <EmployeePrivateRoute>
              <InternationalTransfer />
              // </EmployeePrivateRoute>
            }
          />
          <Route
            path="general-contact-information"
            element={
              // <EmployeePrivateRoute>
              <GeneralContactInformation />
              // </EmployeePrivateRoute>
            }
          />
          <Route
            path="security-center-account-management"
            element={
              // <EmployeePrivateRoute>
              <SecurityCenterAccountManagement />
              // </EmployeePrivateRoute>
            }
          />
          <Route
            path="safeguard-from-email-scams"
            element={
              // <EmployeePrivateRoute>
              <EmailScams />
              // </EmployeePrivateRoute>
            }
          />
          <Route
            path="online-interview-scams"
            element={
              // <EmployeePrivateRoute>
              <OnlineInterviewScams />
              // </EmployeePrivateRoute>
            }
          />
          <Route
            path="security-bug-reporting"
            element={
              // <EmployeePrivateRoute>
              <SecurityBugReporting />
              // </EmployeePrivateRoute>
            }
          />

          <Route
            path="howitworks-for-employee"
            element={
              // <EmployeePrivateRoute>
              <HowItWorksEmployee />
              // </EmployeePrivateRoute>
            }
          />
          <Route
            path="howitworks-for-candidates"
            element={
              // <EmployeePrivateRoute>
              <HowItWorksCandidates />
              // </EmployeePrivateRoute>
            }
          />
          <Route path="profilepage/:id" element={<ProfilePage />} />
          {/* edgvhdsbbv */}

          <Route
            path="blog-left-img"
            element={
              <EmployeePrivateRoute>
                <EmployeeBlogleftimg />
              </EmployeePrivateRoute>
            }
          />

          <Route
            path="blog-details"
            element={
              <EmployeePrivateRoute>
                <EmployeeBlogdetail />
              </EmployeePrivateRoute>
            }
          />

          <Route path="candidate-listing" element={<EmployeeJobPage />} />
          <Route path="*" element={<EmployeeError404 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

// docker build . -t abhishekdevpro/novawl_fe:1.0
// docker push abhishekdevpro/novawl_fe:1.0
