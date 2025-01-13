import React, { useState, useEffect } from "react";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";

function ResumeSecurity() {
    return (
        <>
            <Header />
            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-full bg-white p-t50 p-b20">
                        <div className="container">
                            <div className="m-b30">

                                <div className="job-bx">
                                    <h1 className="m-b5 " style={{ fontSize: "clamp(24px, 5vw, 30px)", fontWeight: 'bold' }}>Resume Security</h1>
                                    <p>At Nova US Jobs, we understand the importance of maintaining the security and confidentiality of your resume. Here's how we ensure the security of your resume on our platform:
                                    </p>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Encryption:</h2>
                                        <p className="mb-0"> Your resume and personal information are encrypted using industry-standard encryption protocols during transmission and storage. This encryption helps protect your data from unauthorized access, interception, or disclosure by encrypting it into a format that can only be deciphered with the appropriate decryption key.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Access Controls:</h2>
                                        <p className="mb-0">Access to your resume is strictly controlled and limited to authorized personnel who require access for legitimate business purposes, such as facilitating job matches or providing customer support. Our access control mechanisms ensure that only designated individuals with the necessary permissions can view or modify your resume.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Secure Storage:</h2>
                                        <p className="mb-0"> Your resume is stored securely within our systems, which are hosted on reputable and secure servers with robust security measures in place. We employ physical, technical, and administrative safeguards to prevent unauthorized access, tampering, or loss of your data.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>User Authentication:</h2>
                                        <p className="mb-0">
                                        To access your resume and personal information, you must authenticate yourself using your account credentials, such as your username and password. Additionally, we offer optional two-factor authentication (2FA) to provide an extra layer of security by requiring a second form of verification, such as a code sent to your mobile device.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Privacy Settings:</h2>
                                        <p className="mb-0">
                                        You have control over the visibility of your resume and personal information on our platform. You can choose to make your resume visible to employers and recruiters or keep it private and accessible only to yourself. Our privacy settings allow you to customize who can view your profile and contact you.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Data Minimization:</h2>
                                        <p className="mb-0">
                                        We adhere to the principle of data minimization, meaning we only collect and retain the information necessary to provide our services and fulfill our contractual obligations. We do not collect more information than is required, and we securely dispose of or anonymize your data once it is no longer needed
                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Third-Party Access:</h2>
                                        <p className="mb-0">
                                        We do not share your resume or personal information with third parties without your explicit consent, except as required by law or as necessary to provide our services. Any third-party access to your resume is strictly controlled and subject to contractual agreements that ensure the security and confidentiality of your data.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Data Portability and Deletion:</h2>
                                        <p className="mb-0">
                                        You have the right to request a copy of your resume in a portable format or request the deletion of your resume from our platform at any time. Upon receiving such requests, we will promptly fulfill them and securely erase your data from our systems.

                                        </p>
                                    </div>
                                   
                                 
                                    <div className="candidate-title">

                                        <p className="mb-0">
                                        At Nova US Jobs, we are committed to maintaining the highest standards of resume security to protect your personal information and ensure your peace of mind. Your trust is essential to us, and we continuously strive to uphold the integrity and confidentiality of your resume throughout your job search journey.

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

export default ResumeSecurity;
