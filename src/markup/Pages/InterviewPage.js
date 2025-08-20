import React from "react";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";

function InterviewPage() {
    return (
        <>
            <Header />
            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-full bg-white p-t50 p-b20">
                        <div className="container">
                            <div className="m-b30">
                                <div className="job-bx">
                                    <h1 className="m-b5" style={{ fontSize: "clamp(24px, 5vw, 30px)", fontWeight: 'bold' }}> Practice Interview</h1>
                                    <p className="mb-4">
                                        Sharpen your interview skills in a safe, AI-powered environment. Choose the format that matches your needs and comfort level:
                                    </p>

                                    <div className="candidate-title">
                                        <h2 className="mb-3" style={{ fontSize: "22px" }}>1 Text-to-Text (Chat Mode)</h2>
                                        <div className="ml-4 mb-4">
                                            <ul className="list-unstyled">
                                                <li>• Interact with an AI interviewer through a simple chat interface.</li>
                                                <li>• Answer common and role-specific interview questions in writing.</li>
                                                <li>• Get instant feedback on grammar, clarity, and structure.</li>
                                            </ul>
                                            <p className="text-black"> Best for: Improving written communication and preparing for email/video screening rounds.</p>
                                        </div>

                                        <h2 className="mb-3" style={{ fontSize: "22px" }}>2 Audio-to-Audio (Voice Mode)</h2>
                                        <div className="ml-4 mb-4">
                                            <ul className="list-unstyled">
                                                <li>• Speak directly with our AI interviewer using your microphone.</li>
                                                <li>• Experience real-time, voice-based mock interviews.</li>
                                                <li>• Receive feedback on tone, pronunciation, and communication skills.</li>
                                            </ul>
                                            <p className="text-black"> Best for: Practicing phone interviews and enhancing confidence in spoken English.</p>
                                        </div>

                                        <h2 className="mb-3" style={{ fontSize: "22px" }}>3 Text/Audio-to-Video (Full Mock Interview Mode)</h2>
                                        <div className="ml-4 mb-4">
                                            <ul className="list-unstyled">
                                                <li>• Participate in a simulated video interview where questions are asked in text or voice.</li>
                                                <li>• Respond live on video, just like in real interview platforms (HireVue, VidCruiter, etc.).</li>
                                                <li>• Get AI-driven feedback on body language, eye contact, facial expressions, and delivery.</li>
                                            </ul>
                                            <p className="text-black"> Best for: Practicing real-world video interviews with recruiters and hiring managers.</p>
                                        </div>

                                        <h2 className="mb-3" style={{ fontSize: "22px" }}> Smart Feedback & Insights</h2>
                                        <div className="ml-4 mb-4">
                                            <ul className="list-unstyled">
                                                <li>• AI-generated scorecard with strengths and areas of improvement.</li>
                                                <li>• Replay & review your answers to self-assess performance.</li>
                                                <li>• Personalized tips to improve confidence, communication, and impact.</li>
                                            </ul>
                                        </div>

                                        <div className="mt-4">
                                            <p className="mb-0">
                                                With our Practice Interview tool, you can prepare at your own pace, in the format you prefer, and walk into your next real interview with confidence.
                                            </p>
                                        </div>
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

export default InterviewPage;
