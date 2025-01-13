import React from "react";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";

function GeneralContactInformation() {
    return (
        <>
            <Header />
            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-full bg-white p-t50 p-b20">
                        <div className="container">
                            <div className="m-b30">

                                <div className="job-bx">
                                    <h1 className="m-b5 " style={{ fontSize: "clamp(24px, 5vw, 30px)", fontWeight: 'bold' }}>General Contact Information</h1>
                                    <p className="mb-0">
                                        If you have any questions, concerns, or inquiries regarding privacy, data protection, or any other aspect of our services at Nova US Jobs, we encourage you to reach out to us using the following contact information:

                                    </p>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Customer Support:</h2>
                                        <p>Our dedicated customer support team is available to assist you with any privacy-related queries or issues you may have. You can contact our customer support representatives via email, phone, or live chat during our operating hours.</p>
                                        <div>
                                            <ul className="ml-5">
                                                <li>
                                                    Email: contact@novausjobs.com
                                                </li>
                                                <li>
                                                    Phone: Please contact your SPOC assigned
                                                </li>
                                                <li>
                                                    Live Chat: Available on our website during business hours
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Mailing Address:</h2>
                                        <p >If you prefer to contact us by mail, you can send correspondence to our headquarters at the following address:</p>
                                        <p className="mb-0">  Nova US Jobs</p>
                                        <p className="mb-0">1509,</p>
                                        <p className="mb-0">Lady St, </p>
                                        <p className="mb-0"> Columbia, SC, 29201</p>
                                        <p className="mb-0"> United States</p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Data Protection Officer (DPO):</h2>
                                        <p> We have designated a Data Protection Officer (DPO) who is responsible for overseeing our compliance with data protection laws and regulations, including the handling of privacy-related inquiries and complaints. You can contact our DPO directly using the following email address:
                                        </p>
                                        <div>
                                            <ul className="ml-5">
                                                <li>
                                                    Email: contact@novausjobs.com
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Feedback and Suggestions:</h2>
                                        <p >We welcome your feedback and suggestions for improving our privacy practices and services. If you have any ideas or recommendations, please don't hesitate to share them with us.</p>
                                        <div>
                                            <ul className="ml-5">
                                                <li>
                                                    Email: contact@novausjobs.com
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Website:</h2>
                                        <p >You can also visit our website and navigate to the "Contact Us" or "Support" section to submit a contact form or find additional contact information.

                                        </p>

                                    </div>
                                    <div className="candidate-title">

                                        <p className="">
                                            Regardless of the method you choose to reach out to us, rest assured that your privacy and confidentiality will be respected. Our team is committed to addressing your inquiries promptly and providing assistance in accordance with our privacy policies and procedures.
                                        </p>
                                        <p className="mb-0">Thank you for entrusting Nova US Jobs with your privacy concerns. We look forward to assisting you and ensuring that your experience with our platform is safe, secure, and satisfactory.
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

export default GeneralContactInformation;
