import React from "react";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";

function RetentionPeriod() {
    return (
        <>
            <Header />
            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-full bg-white p-t50 p-b20">
                        <div className="container">
                            <div className="m-b30">

                                <div className="job-bx">
                                    <h1 className="m-b5 " style={{ fontSize: "clamp(24px, 5vw, 30px)", fontWeight: 'bold' }}>Retention Period and Resume Visibility/Security</h1>
                                    <p className="mb-0">
                                        At Nova US Jobs, we prioritize the privacy and security of our users' data, particularly concerning resumes and personal information. Here's how we manage retention periods and ensure the visibility and security of resumes:

                                    </p>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Retention Period:</h2>
                                        <p className="">We adhere to transparent and responsible data retention practices, ensuring that resumes and associated personal information are retained only for the necessary duration. The retention period for resumes and personal data is determined by the following factors:</p>
                                        <div>
                                            <ul className="ml-5">
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}> Purpose of Data Use: </h3>
                                                    <p className="mb-2">We retain resumes and personal information for as long as necessary to fulfill the purposes for which they were collected. This includes facilitating job applications, matching candidates with suitable employment opportunities, and complying with legal requirements.</p>  </li>
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}> User Preferences: </h3>
                                                    <p className="mb-2">Users have control over their resume visibility and may choose to keep their resumes visible to employers and recruiters or private and accessible only to themselves. The retention period may vary depending on the visibility settings selected by the user.
                                                    </p>  </li>
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}> Inactive Accounts:</h3>
                                                    <p className="mb-2">If a user's account becomes inactive or is terminated, we may retain their resume and personal information for a limited period thereafter, as required for administrative, legal, or archival purposes.

                                                    </p>  </li>
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}> Data Minimization:</h3>
                                                    <p className="mb-2">   We practice data minimization and only retain resumes and personal information for as long as necessary to achieve the specified purposes. Once the retention period expires, we securely dispose of or anonymize the data in accordance with our data retention policies.
                                                    </p>  </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Resume Visibility/Security:</h2>
                                        <p>Ensuring the visibility and security of resumes is essential to maintaining user trust and confidentiality. Here's how we handle resume visibility and security:
                                        </p>
                                        <div>
                                            <ul className="ml-5">
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>User Control:</h3>
                                                    <p className="mb-2">  Users have granular control over the visibility of their resumes and personal information. They can choose whether to make their resumes visible to employers and recruiters or keep them private and accessible only to themselves.
                                                    </p> </li>
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Privacy Settings: </h3>
                                                    <p className="mb-2"> We provide robust privacy settings and options for users to customize the visibility of their profiles and resumes. This includes the ability to specify which information is shared publicly and which is kept private.

                                                    </p> </li>
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}> Opt-In Consent:</h3>
                                                    <p className="mb-2"> We obtain explicit consent from users before sharing their resumes or personal information with third-party employers or recruiters. Users have the option to opt in or out of resume sharing and can revoke consent at any time.
                                                    </p> </li>
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}> Security Measures: </h3>
                                                    <p className="mb-2"> Resumes and personal information stored on our platform are encrypted to protect against unauthorized access, interception, or disclosure. We implement industry-standard encryption protocols and security measures to safeguard user data.

                                                    </p>  </li>
                                                    <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}> Access Controls:</h3>
                                                    <p className="mb-2"> Access to resumes and personal information is restricted to authorized personnel who require access for legitimate business purposes, such as facilitating job matches, providing customer support, and ensuring platform functionality.

                                                    </p> </li>
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}> Data Portability and Deletion: </h3>
                                                    <p className="mb-2">Users have the right to request a copy of their resume and personal information in a portable format or request deletion from our platform at any time. We promptly fulfill such requests and ensure that deleted data is permanently removed from our systems.

                                                    </p>  </li>
                                            </ul>
                                        </div>
                                    </div>
                                   

                                    <div className="candidate-title">

                                        <p className="mb-0">
                                        In summary, Nova US Jobs is committed to maintaining the privacy, security, and integrity of user resumes and personal information. Through transparent retention practices, user-controlled visibility settings, and robust security measures, we strive to protect user data and uphold the trust placed in us by our users.

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

export default RetentionPeriod;
