import React, { useState, useEffect } from "react";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";

function TermOfUse() {
    return (
        <>
            <Header />
            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-full bg-white p-t50 p-b20">
                        <div className="container">
                            <div className="m-b30">

                                <div className="job-bx">
                                    <h1 className="m-b5 " style={{ fontSize: "clamp(24px, 5vw, 30px)", fontWeight: 'bold' }}>Terms of Use for Nova US Jobs</h1>
                                    <p>Welcome to Nova US Jobs (the "Website"). These Terms of Use ("Terms") govern your access to and use of the Website. By accessing or using the Website, you agree to comply with these Terms. If you do not agree with these Terms, you should not access or use the Website.
                                    </p>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Acceptance of Terms:</h2>
                                        <p className="mb-0">By accessing or using the Website, you agree to be bound by these Terms and any additional terms and conditions posted on the Website.
                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Use of the Website:</h2>
                                        <p className="mb-0">The Website is provided for informational purposes and to facilitate job searching and hiring. You agree to use the Website only for lawful purposes and in accordance with these Terms.
                                            You are responsible for ensuring that your use of the Website complies with all applicable laws and regulations.
                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>User Accounts:</h2>
                                        <p className="mb-0">In order to access certain features of the Website,
                                            you may be required to create an account. You agree to provide accurate and complete
                                            information when creating your account and to update your information as necessary to
                                            ensure its accuracy. You are responsible for maintaining the confidentiality of your
                                            account and password and for restricting access to your account. You agree to accept responsibility for all activities that occur under your account.
                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>User Content:</h2>
                                        <p className="mb-0">
                                            You may have the opportunity to submit content to the Website, such as job postings or resumes. By submitting content to the Website, you grant Nova US Jobs a non-exclusive, worldwide, royalty-free, perpetual,
                                            irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative
                                            works from, distribute, and display such content in any media.
                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Intellectual Property:</h2>
                                        <p className="mb-0">
                                            The Website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio,
                                            and the design, selection, and arrangement thereof) are owned by Nova US Jobs, its licensors, or other providers of such material and are protected by United States and international copyright, trademark,
                                            patent, trade secret, and other intellectual property or proprietary rights laws.
                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Third-Party Links:</h2>
                                        <p className="mb-0">
                                            The Website may contain links to third-party websites or resources. These links are provided for your convenience only and do not imply any endorsement by Nova US Jobs of such third-party websites or resources. You acknowledge and agree that Nova US Jobs is not responsible or liable for the availability or accuracy of such websites or resources, or for any content, products, or services available from such websites or resources.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Disclaimer of Warranties:</h2>
                                        <p className="mb-0">
                                            The website is provided on an "as is" and "as available" basis, without any warranties
                                            of any kind, either express or implied. To the fullest extent permitted by law, nova us jobs disclaims
                                            all warranties, express or implied, including but not limited to warranties of merchantability, fitness
                                            for a particular purpose, and noninfringement of intellectual property rights.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Limitation of Liability:</h2>
                                        <p className="mb-0">
                                        In no event shall nova us jobs, its affiliates, or their licensors, service providers, employees, 
                                        agents, officers, or directors be liable for any indirect, special, incidental, consequential, or punitive 
                                        damages, arising out of or in connection with your use of the website or any content, products, or services made 
                                        available through the website, whether based on warranty, contract, tort (including negligence), 
                                        or any other legal theory, even if nova us jobs has been informed of the possibility of such damages.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Indemnification:</h2>
                                        <p className="mb-0">
                                            You agree to indemnify, defend, and hold harmless Nova US Jobs, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Website.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Governing Law and Jurisdiction:</h2>
                                        <p className="mb-0">These Terms shall be governed by and construed in accordance with the laws of the United States and the State of [South Carolina], without giving effect to any choice or conflict of law provision or rule.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Changes to Terms:</h2>
                                        <p className="mb-0">
                                            Nova US Jobs reserves the right to modify or revise these Terms at any time, in its sole discretion, by posting the revised Terms on the Website. Your continued use of the Website after any such changes constitutes your acceptance of the new Terms.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Contact Us:</h2>
                                        <p className="mb-0">If you have any questions about these Terms, please contact us at
                                            contact@novausjobs.com.

                                        </p>
                                    </div>
                                    <div className="candidate-title">

                                        <p className="mb-0">
                                            By using Nova US Jobs, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.
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

export default TermOfUse;
