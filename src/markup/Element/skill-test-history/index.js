import SkillHistoryTable from "./TestHistory";
import Footer from "../../Layout/Footer";
import UserHeader2 from "../../Layout/Header2";
import FixedHeader from "../../Layout/fixedHeader";
import Profilesidebar from "../Profilesidebar";

const SkillTestHistory = () => {
  return (
    <>
      <div>
        <UserHeader2 />
        <FixedHeader />

        <div className="page-content bg-white">
          <div className="content-block">
            <div className="section-full bg-white browse-job p-t50 p-b20">
              <div className="container">
                <div className="row">
                  <Profilesidebar data={"skill-test-history"} />
                  <div className="col-xl-9 col-lg-9 m-b30 mx-2">
                    <div className="job-bx job-profile">
                      {/* <Skilltest history/> */}
                      <SkillHistoryTable />
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

export default SkillTestHistory;
