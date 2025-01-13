import React, { useState, useEffect } from "react";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";

function PrivacyRights() {
    return (
        <>
            <Header />
            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-full bg-white p-t50 p-b20">
                        <div className="container">
                            <div className="m-b30">

                                <div className="job-bx">
                                    <h1 className="m-b5 " style={{ fontSize: "clamp(24px, 5vw, 30px)", fontWeight: 'bold' }}>Your Privacy Rights</h1>
                                    <p>At Nova US Jobs, we are dedicated to protecting your privacy and ensuring that you have control over your personal information. Here's how we empower you to exercise your privacy rights:
                                    </p>
                                   
                                    
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Access to Your Data:</h2>
                                        <p className="mb-0">
                                        You have the right to access the personal data we hold about you. This includes your account information, resume details, and any other information you have provided to us. You can review this information by logging into your account or by contacting our customer support team.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Correction of Inaccurate Data:</h2>
                                        <p className="mb-0">
                                        If you believe that any of the personal data we hold about you is inaccurate or incomplete, you have the right to request corrections. You can update your account information and resume details directly through your account settings or by contacting us for assistance.
                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Deletion of Your Data:</h2>
                                        <p className="mb-0">
                                        You have the right to request the deletion of your personal data from our systems. This includes your account information, resume, and any other information you have provided to us. Upon receiving a valid deletion request, we will securely erase your data from our databases, subject to any legal or contractual obligations requiring retention.
                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Restriction of Data Processing:</h2>
                                        <p className="mb-0">
                                        In certain circumstances, you may have the right to request the restriction of processing of your personal data. This means that we will temporarily suspend the processing of your data while we investigate your request or resolve any disputes regarding its accuracy or legality.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Objection to Data Processing:</h2>
                                        <p className="mb-0">
                                        You have the right to object to the processing of your personal data for direct marketing purposes or on grounds relating to your particular situation. We will promptly cease processing your data for such purposes upon receiving an objection, unless we have compelling legitimate grounds for continued processing.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Data Portability:</h2>
                                        <p className="mb-0">
                                        You have the right to receive a copy of your personal data in a structured, commonly used, and machine-readable format, and to transmit this data to another data controller, where technically feasible.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Withdrawal of Consent:</h2>
                                        <p className="mb-0">
                                        If you have provided consent for the processing of your personal data, you have the right to withdraw that consent at any time. Withdrawal of consent will not affect the lawfulness of processing based on consent before its withdrawal
                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Complaints:</h2>
                                        <p className="mb-0">If you believe that your privacy rights have been violated or that we have not adequately addressed your concerns regarding the processing of your personal data, you have the right to lodge a complaint with the relevant supervisory authority.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Privacy Settings:</h2>
                                        <p className="mb-0">
                                        We provide tools and settings that allow you to control the visibility of your resume and personal information on our platform. You can adjust your privacy settings to specify which information is shared publicly and which is kept private.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Customer Support:</h2>
                                        <p className="mb-0">Our customer support team is available to assist you with any questions, concerns, or requests related to your privacy rights. You can reach out to us at any time for assistance or guidance.

                                        </p>
                                    </div>
                                    <div className="candidate-title">

                                        <p className="mb-0">
                                        In summary, at Nova US Jobs, we respect your privacy rights and are committed to providing you with transparency, control, and support in managing your personal data. We encourage you to exercise your rights and to contact us if you have any questions or concerns about our privacy practices.
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

export default PrivacyRights;
