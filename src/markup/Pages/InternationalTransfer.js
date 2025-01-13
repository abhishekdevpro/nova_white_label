import React from "react";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";

function InternationalTransfer() {
    return (
        <>
            <Header />
            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-full bg-white p-t50 p-b20">
                        <div className="container">
                            <div className="m-b30">

                                <div className="job-bx">
                                    <h1 className="m-b5 " style={{ fontSize: "clamp(24px, 5vw, 30px)", fontWeight: 'bold' }}>International Transfers of Personal Information</h1>
                                    <p>Nova US Jobs recognizes that your personal information may be transferred across international borders as part of our operations. Here's how we handle international transfers of personal information and ensure the protection of your data:
                                    </p>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Legal Basis for Transfers:</h2>
                                        <p className="mb-0">
                                            When transferring personal information from one country to another, we ensure that there is a valid legal basis for the transfer. This may include obtaining your explicit consent, entering into standard contractual clauses (SCCs) approved by the European Commission, or relying on other lawful mechanisms permitted by applicable data protection laws.
                                        </p>
                                    </div>

                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>EU-U.S. Privacy Shield Framework:</h2>
                                        <p className="mb-0">
                                            For transfers of personal data from the European Union (EU) to the United States (U.S.), Nova US Jobs complies with the EU-U.S. Privacy Shield Framework. We have certified our adherence to the Privacy Shield principles, which provide a legal basis for the transfer of personal data between the EU and the U.S. while ensuring adequate protection for the data.
                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Standard Contractual Clauses (SCCs):</h2>
                                        <p className="mb-0">
                                            In cases where the EU-U.S. Privacy Shield Framework does not apply or is not sufficient, we rely on standard contractual clauses (SCCs) approved by the European Commission to ensure the legality and security of international data transfers. These clauses establish contractual obligations between Nova US Jobs and our overseas partners or service providers to protect the transferred data.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Data Protection Measures:</h2>
                                        <p className="mb-0">
                                            Regardless of the legal mechanism used for international transfers, we implement appropriate data protection measures to safeguard your personal information during transit and while it is stored in foreign jurisdictions. These measures include encryption, access controls, and security protocols to prevent unauthorized access or disclosure of your data.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Data Subject Rights:</h2>
                                        <p className="mb-0">
                                            When your personal information is transferred internationally, you retain the same rights and protections afforded to you under applicable data protection laws. This includes the right to access, rectify, delete, or restrict the processing of your data, as well as the right to lodge complaints with supervisory authorities.

                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Transparency and Accountability:</h2>
                                        <p className="mb-0">
                                            Nova US Jobs is transparent about our international data transfer practices and takes accountability for ensuring compliance with applicable data protection laws and regulations. We provide clear information to users about how their personal information may be transferred internationally and the measures taken to protect their data.
                                        </p>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Data Retention:</h2>
                                        <p className="mb-0">
                                            When personal information is transferred internationally, we adhere to our established data retention policies and only retain the data for as long as necessary to fulfill the purposes for which it was collected or as required by law. We securely dispose of or anonymize the data once the retention period expires.
                                        </p>
                                    </div>
                                 
                             
                                    <div className="candidate-title">

                                        <p className="mb-0">
                                        In summary, Nova US Jobs takes the necessary precautions to ensure the lawful and secure transfer of personal information across international borders. We comply with applicable data protection laws, utilize legal mechanisms such as the EU-U.S. Privacy Shield Framework and standard contractual clauses, implement data protection measures, and maintain transparency and accountability in our international data transfer practices. Your privacy and the security of your personal information are our top priorities, no matter where in the world your data may be transferred.

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

export default InternationalTransfer;
