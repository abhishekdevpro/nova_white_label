import React from "react";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";

function CookiesDigitalAdvertising() {
    return (
        <>
            <Header />
            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-full bg-white p-t50 p-b20">
                        <div className="container">
                            <div className="m-b30">

                                <div className="job-bx">
                                    <h1 className="m-b5 " style={{ fontSize: "clamp(24px, 5vw, 30px)", fontWeight: 'bold' }}>Cookies and Digital Advertising</h1>
                                    <p className="mb-0">
                                        Nova US Jobs utilizes cookies and digital advertising technologies to enhance user experience, personalize content, and optimize advertising efforts. Here's how we use cookies and digital advertising on our platform:

                                    </p>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Cookies:</h2>

                                        <div>
                                            <ul className="ml-5">
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}> What are Cookies?: </h3>
                                                    <p className="mb-2">Cookies are small text files stored on your device when you visit our website. They help us recognize your device, remember your preferences, and track your interactions with our platform.
                                                    </p>  </li>
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}> Types of Cookies: </h3>
                                                    <p className="mb-2"> We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a specified period) to collect and store different types of information.

                                                    </p>  </li>
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}> Purpose of Cookies:</h3>
                                                    <p className="mb-2">Cookies serve various purposes, including: </p>
                                                    <ul className="ml-5">
                                                        <li> Authentication: To authenticate users and prevent unauthorized access to accounts.
                                                        </li>
                                                        <li>Preferences: To remember user preferences, such as language and location settings.</li>
                                                        <li>Analytics: To gather information about how users interact with our website and analyze website traffic and usage patterns.</li>
                                                        <li>Advertising: To deliver personalized advertisements based on users' interests and behavior.</li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Third-Party Cookies:</h3>
                                                    <p className="mb-2">   We may allow third-party service providers, such as advertising networks and analytics companies, to place cookies on our website to facilitate their services. These cookies may track your browsing activity across different websites to provide targeted advertising.
                                                    </p>  </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Digital Advertising:</h2>

                                        <div>
                                            <ul className="ml-5">
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Targeted Advertising:</h3>
                                                    <p className="mb-2"> We use cookies and other tracking technologies to deliver targeted advertisements to users based on their interests, behavior, and demographic information. This allows us to show relevant ads that are more likely to be of interest to users.
                                                    </p> </li>
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Personalized Content: </h3>
                                                    <p className="mb-2">Cookies enable us to personalize the content of advertisements and promotional materials to better match users' preferences. This enhances the relevance and effectiveness of our advertising campaigns.
                                                    </p> </li>
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Opt-Out Options:</h3>
                                                    <p className="mb-2"> We are transparent about our use of cookies and digital advertising on our platform. Users are informed about the types of cookies used, their purposes, and their options for managing cookie preferences.


                                                    </p> </li>
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Data Privacy: </h3>
                                                    <p className="mb-2"> We prioritize the privacy and security of user data in our digital advertising practices. We comply with applicable data protection laws and regulations and ensure that user data is handled in accordance with our privacy policies.


                                                    </p>  </li>

                                            </ul>
                                        </div>
                                    </div>


                                    <div className="candidate-title">

                                        <p className="mb-0">
                                            In summary, Nova US Jobs uses cookies and digital advertising to enhance user experience and deliver personalized content and advertisements. We are committed to transparency, user privacy, and compliance with data protection laws in our digital advertising practices. Users have control over their cookie preferences and can opt out of targeted advertising if desired.


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

export default CookiesDigitalAdvertising;
