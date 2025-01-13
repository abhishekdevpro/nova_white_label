import React, { useState, useEffect } from "react";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";

function SecurityCenterAccountManagement() {
    return (
        <>
            <Header />
            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-full bg-white p-t50 p-b20">
                        <div className="container">
                            <div className="m-b30">

                                <div className="job-bx">
                                    <h1 className="m-b5 " style={{ fontSize: "clamp(24px, 5vw, 30px)", fontWeight: 'bold' }}>Security Center: Account Management</h1>
                                    <p className="mb-0">
                                        Ensuring the security of your account is a top priority at Nova US Jobs. Our Security Center provides you with the tools and resources to manage and enhance the security of your account. Here's how you can effectively manage your account security:
                                    </p>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Password Management:</h2>
                                        <div>

                                            <ul className="ml-5">
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Strong Passwords:</h3>
                                                    <p className="mb-2"> Choose a strong and unique password for your Nova US Jobs account. Avoid using easily guessable passwords and consider using a combination of letters, numbers, and special characters.
                                                    </p>
                                                </li>
                                                <li>

                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Regular Updates:</h3>
                                                    <p className="mb-2">Regularly update your password to reduce the risk of unauthorized access to your account. We recommend changing your password periodically, especially if you suspect any security breaches or suspicious activities.</p>
                                                </li>
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}> Password Storage:</h3>
                                                    <p className="mb-2">Never share your password with anyone else, and avoid storing it in easily accessible locations. Use a reputable password manager to securely store and manage your passwords.
                                                    </p>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Two-Factor Authentication (2FA):</h2>
                                        <div>

                                            <ul className="ml-5">
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Enable 2FA:</h3>
                                                    <p className="mb-2">Enhance the security of your account by enabling two-factor authentication (2FA). 2FA adds an extra layer of protection by requiring a second form of verification, such as a one-time code sent to your mobile device, in addition to your password.

                                                    </p>
                                                </li>
                                                <li>

                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Secure Authentication Methods:</h3>
                                                    <p className="mb-2">Choose secure authentication methods for 2FA, such as authenticator apps or hardware security keys, rather than relying solely on SMS-based verification.
                                                    </p>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Account Settings:</h2>
                                        <div>

                                            <ul className="ml-5">
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Privacy Settings:</h3>
                                                    <p className="mb-2">Review and adjust your privacy settings to control the visibility of your account and personal information. You can customize who can view your profile, contact you, or access your resume.

                                                    </p>
                                                </li>
                                                <li>

                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Notification Preferences:</h3>
                                                    <p className="mb-2"> Manage your notification preferences to receive alerts about account activity, job recommendations, and important updates. You can choose to receive notifications via email, mobile push notifications, or SMS.

                                                    </p>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Device Management:</h2>
                                        <div>

                                            <ul className="ml-5">
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Authorized Devices:</h3>
                                                    <p className="mb-2"> Keep track of the devices that are authorized to access your Nova US Jobs account. Regularly review the list of authorized devices and revoke access for any devices you no longer use or recognize.

                                                    </p>
                                                </li>
                                                <li>

                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Device Security:</h3>
                                                    <p className="mb-2"> Ensure that your devices are protected with up-to-date security software and configurations. Avoid accessing your account from public or unsecured networks, and always log out of your account when using shared devices.

                                                    </p>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Security Alerts and Monitoring:</h2>
                                        <div>

                                            <ul className="ml-5">
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Alerts:</h3>
                                                    <p className="mb-2">
                                                    Stay informed about security-related events and activities affecting your account. We proactively monitor for suspicious login attempts, unusual account activity, and other security threats, and notify you promptly if any potential security issues are detected.

                                                    </p>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Monitoring:</h3>
                                                    <p className="mb-2">
                                                    Our security team continuously monitors our systems and infrastructure for potential vulnerabilities and threats. We employ advanced security measures and adhere to industry best practices to safeguard your account and data.
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="candidate-title">
                                        <h2 className="mb-0" style={{ fontSize: "22px" }}>Reporting Security Concerns:</h2>
                                        <div>

                                            <ul className="ml-5">
                                                <li>
                                                    <h3 className="mb-0" style={{ fontSize: "18px" }}>Contact Support:</h3>
                                                    <p className="mb-2">
                                                    If you encounter any security concerns, suspicious activities, or unauthorized access to your account, please contact our customer support team immediately. We take all reports of security incidents seriously and investigate them promptly to ensure the integrity of our platform and protect our users.

                                                    </p>
                                                    
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="candidate-title">

                                        <p className="mb-0">
                                            By actively managing your account security through our Security Center, you can help protect your personal information and prevent unauthorized access to your Nova US Jobs account. We are committed to providing a secure and trustworthy platform for your job search and recruitment needs, and we appreciate your collaboration in maintaining a safe online environment.

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

export default SecurityCenterAccountManagement;
