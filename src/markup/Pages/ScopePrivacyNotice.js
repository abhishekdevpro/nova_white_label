import React, { useState, useEffect } from "react";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";

function ScopePrivacyNotice() {
    return (
        <>
            <Header />
            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-full bg-white p-t50 p-b20">
                        <div className="container">
                            <div className="m-b30">

                                <div className="job-bx">
                                    <h1 className="m-b5 " style={{ fontSize: "clamp(24px, 5vw, 30px)", fontWeight: 'bold' }}>Scope of this Privacy Notice</h1>
                                    <p>This Privacy Notice outlines the scope and application of our data privacy practices at Nova US Jobs ("the Company") and explains how we collect, use, disclose, and protect your personal data. The scope of this Privacy Notice encompasses:
 </p>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Website and Services:</h2>
                                        <p className="mb-0">This Privacy Notice applies to all aspects of our website, including but not limited to browsing, searching for jobs, creating user accounts, submitting job applications, and accessing personalized content and features.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Data Collection and Processing:</h2>
                                        <p className="mb-0">It covers the collection, processing, and storage of personal data obtained through various channels, including our website, mobile applications, communication platforms, and interactions with our customer support team.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Data Sharing and Transfers:</h2>
                                        <p className="mb-0">This Privacy Notice addresses the sharing of personal data with third-party service providers, business partners, and other entities involved in supporting our operations, as well as the transfer of data across international borders, including transfers between the European Union and the United States.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Cookies and Tracking Technologies:</h2>
                                        <p className="mb-0">
                                        It includes information about our use of cookies, web beacons, and similar tracking technologies to collect data about your browsing behavior, preferences, and interactions with our website, as well as your options for managing cookie preferences and opting out of tracking.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Data Security and Retention:</h2>
                                        <p className="mb-0">
                                        This Privacy Notice outlines our efforts to safeguard personal data against unauthorized access, disclosure, alteration, or destruction, as well as our policies and procedures for retaining data for as long as necessary to fulfill the purposes for which it was collected.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>User Rights and Choices:</h2>
                                        <p className="mb-0">
                                        It explains your rights regarding the collection, use, and disclosure of your personal data, including the right to access, correct, delete, or restrict the processing of your data, as well as your options for managing preferences related to marketing communications and data sharing. </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Compliance and Updates:</h2>
                                        <p className="mb-0">
                                        This Privacy Notice addresses our commitment to compliance with applicable data protection laws and regulations, including the General Data Protection Regulation (GDPR) in the European Union and the regulations governing data privacy in the United States. It also covers our procedures for updating and revising this Privacy Notice to reflect changes in our practices or legal requirements.

                                        </p>
                                    </div>
                                    
                                 
                                    <div className="candidate-title">

                                        <p className="mb-0">
                                        In summary, the scope of this Privacy Notice is comprehensive and covers all aspects of our data privacy practices at Nova US Jobs. By accessing or using our website and services, you acknowledge and consent to the collection, use, and disclosure of your personal data as described in this Privacy Notice.

                                        </p>
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

export default ScopePrivacyNotice;
