import React, { useState, useEffect } from "react";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";

function CookingAdvertising() {
    return (
        <>
            <Header />
            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-full bg-white p-t50 p-b20">
                        <div className="container">
                            <div className="m-b30">

                                <div className="job-bx">
                                    <h1 className="m-b5 " style={{ fontSize: "clamp(24px, 5vw, 30px)", fontWeight: 'bold' }}>Cookies and Advertising Overview</h1>
                                    <p className="mb-0">Nova US Jobs (the "Company") utilizes cookies and advertising technologies to enhance user experience, provide personalized content, and improve the effectiveness of our advertising efforts. This overview outlines how we use cookies and advertising on our website:

                                    </p>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Cookies:</h2>
                                        <div>

                                            <ul className="ml-5">
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>What are Cookies?:</h3>
                                                    <p className="mb-2"> Cookies are small text files that are placed on your device when you visit our website. They allow us to recognize your device and store information about your preferences and activities.</p>
                                                </li>
                                                <li>

                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>  Types of Cookies:</h3>
                                                    <p className="mb-2">We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a specified period) to collect and store different types of information.</p>
                                                </li>
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>  Purpose of Cookies:</h3>
                                                    <p className="mb-2">Cookies are used for various purposes, including:</p>
                                                    <div>

                                                        <ul className="ml-5">
                                                            <li>
                                                                Authentication: To authenticate users and prevent unauthorized access to accounts.
                                                            </li>
                                                            <li>
                                                                Preferences: To remember user preferences, such as language and location settings.
                                                            </li>
                                                            <li>
                                                                Analytics: To gather information about how users interact with our website and to analyze website traffic and usage patterns.

                                                            </li>
                                                            <li>
                                                                Advertising: To deliver personalized advertisements based on users' interests and behavior.
                                                            </li>

                                                        </ul>
                                                    </div>
                                                </li>
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Third-Party Cookies:</h3>
                                                    <p className="mb-2">We may also allow third-party service providers, such as advertising networks and analytics companies, to place cookies on our website to facilitate their services.
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Advertising:</h2>
                                        <div>

                                            <ul className="ml-5">
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Targeted Advertising:</h3>
                                                    <p className="mb-2"> We may use cookies and other tracking technologies to deliver targeted advertisements to users based on their interests and behavior. This may involve displaying advertisements on our website or on third-party websites and platforms.
                                                    </p>
                                                </li>
                                                <li>

                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Personalized Content:</h3>
                                                    <p className="mb-2">Cookies enable us to personalize the content of advertisements and promotional materials to better match users' interests and preferences.</p>
                                                </li>
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Opt-Out Options:</h3>
                                                    <p className="mb-2">Users have the option to opt out of targeted advertising by adjusting their browser settings or by using opt-out mechanisms provided by third-party advertising networks.
                                                    </p>

                                                </li>
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Third-Party Cookies:</h3>
                                                    <p className="mb-2">We may also allow third-party service providers, such as advertising networks and analytics companies, to place cookies on our website to facilitate their services.
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Data Collection and Privacy:</h2>
                                        <div>

                                            <ul className="ml-5">
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Data Collection:</h3>
                                                    <p className="mb-2">We may collect and store certain information through cookies, such as IP addresses, browser types, device identifiers, and browsing activities. However, we do not collect personally identifiable information without user consent.
                                                    </p>
                                                </li>
                                                <li>

                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Privacy Protection:</h3>
                                                    <p className="mb-2"> We are committed to protecting the privacy and security of user data. We adhere to applicable data protection laws and regulations, and we have implemented appropriate safeguards to prevent unauthorized access, disclosure, or misuse of user information.
                                                    </p>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>User Control and Consent:</h2>
                                        <div>

                                            <ul className="ml-5">
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Consent:</h3>
                                                    <p className="mb-2"> By using our website, you consent to the use of cookies and other tracking technologies as described in this overview.

                                                    </p>
                                                </li>
                                                <li>

                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Opt-Out:</h3>
                                                    <p className="mb-2"> Users have the ability to manage cookie preferences and opt out of certain types of tracking by adjusting their browser settings or using opt-out mechanisms provided by third-party service providers.

                                                    </p>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Updates and Changes:</h2>
                                        <div>

                                            <ul className="ml-5">
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Policy Updates:</h3>
                                                    <p className="mb-2">
                                                        We may update this Cookies and Advertising Overview from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on our website, and users are encouraged to review this overview periodically for the latest information.
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="candidate-title">

                                        <p className="mb-0">
                                            By providing this Cookies and Advertising Overview, Nova US Jobs aims to inform users about our use of cookies and advertising technologies and to ensure transparency and user control over their data privacy preferences.
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

export default CookingAdvertising;
