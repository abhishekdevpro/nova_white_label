import React, { useState } from 'react';

import '../../css/Profile.css'
import Header from "./../Layout/Header";
import Footer from '../Layout/Footer';
const CompanyPage = () => {
    const [activeTab, setActiveTab] = useState('home');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };
    return (
        <>
            <Header />

            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-full bg-white p-t50 p-b20">
                        <div className="container">
                            <div className='row'>
                                <div className='col-lg-8 col-md-8 col-sm-12 col-12'>
                                    <div className="profile-summary">
                                        <div className='p-content' >
                                            <div className='profile-card'>
                                                <img src='/static/media/pic1.63e5cf4e.jpg' alt="Profile" className="cover-picture" />
                                                <img style={{borderRadius:"0%" , marginInlineStart:'25px'}}
                                                src='/static/media/pic1.63e5cf4e.jpg' alt="Profile" className="profile-picture" />
                                            </div>
                                            <div style={{ padding: '10px 30px' }}>
                                                <h2 className='mb-0'>HITORI TECH</h2>
                                                <h6 className='mb-0'>Mobile App Development | Web App Development</h6>
                                                <p className='mb-0'>Software Development . USA, rajasthan . 135 followers . 11-50 employees</p>

                                                <div className="job-time m-t15 m-b10">
                                                    <a className="mr-1" href="#"><span style={{ padding: '5px 15px', borderRadius: '100px' }}>+ Follow</span></a>

                                                </div>

                                                <div>
                                                    <div className="tab-buttons">
                                                        <button className={activeTab === 'home' ? 'active' : ''} onClick={() => handleTabClick('home')}>Home</button>
                                                        <button className={activeTab === 'about' ? 'active' : ''} onClick={() => handleTabClick('about')}>About</button>
                                                        <button className={activeTab === 'posts' ? 'active' : ''} onClick={() => handleTabClick('posts')}>Posts</button>
                                                        <button className={activeTab === 'jobs' ? 'active' : ''} onClick={() => handleTabClick('jobs')}>Jobs</button>
                                                        <button className={activeTab === 'people' ? 'active' : ''} onClick={() => handleTabClick('people')}>People</button>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='mt-4 profile-summary' style={{ padding: '10px 30px' }}>
                                        <div className="candidate-info company-info">
                                            <div className="tab-content">
                                                {activeTab === 'home' &&
                                                    <div>
                                                        <h4 className='mb-2 mt-4'>About</h4>
                                                        <p>We pride ourselves on every project we have put together for our valued customers and with our dedication to delivering the very best. As a team, we've built a long list of satisfied and happy customers. We are able to work with many different types of websites and applications including:</p>
                                                    </div>
                                                }
                                                {activeTab === 'about' &&
                                                    <div>
                                                        <h4 className='mb-2 mt-4'>Overview</h4>
                                                        <p>
                                                            We pride ourselves on every project we have put together for our valued customers and with our dedication to delivering the very best. As a team, we've built a long list of satisfied and happy customers. We are able to work with many different types of websites and applications including:

                                                        </p>
                                                        <div className='mb-2 mt-4'>
                                                            <h6 className="mb-0 d-flex justify-content-between align-items-center">
                                                                Industry</h6>

                                                            <p className="mb-0" style={{ color: "#1c2957" }}>
                                                                Software Development
                                                            </p>

                                                        </div>
                                                        <div className='mb-2 mt-4'>
                                                            <h6 className="mb-0 d-flex justify-content-between align-items-center">
                                                                Company size</h6>

                                                            <p className="mb-0" style={{ color: "#1c2957" }}>
                                                                11-50 employees
                                                            </p>
                                                            <p className="mb-0" style={{ color: "#1c2957" }}>
                                                                6 associated members
                                                            </p>
                                                        </div>
                                                        <div className='mb-2 mt-4'>
                                                            <h6 className="mb-0 d-flex justify-content-between align-items-center">
                                                                Headquarters</h6>

                                                            <p className="mb-0" style={{ color: "#1c2957" }}>
                                                                USA, rajasthan
                                                            </p>

                                                        </div>
                                                    </div>
                                                }
                                                {activeTab === 'posts' &&
                                                    <div>

                                                        <div className="candidate-info company-info">

                                                            <h4 className='mb-2 mt-4'>Recent job openings</h4>
                                                            <div className="job-list-container" >
                                                                <div className='d-flex justify-content-start aligns-item-center '>
                                                                    <div>
                                                                        <i className="fa fa-user-o" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div className='ml-2'>
                                                                        <h6 className="mb-0 ">
                                                                            Associate Dev-Ops Internship</h6>

                                                                        <p className="" style={{ color: "#1c2957" }}>
                                                                            USA,Rajasthan,India
                                                                        </p>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {activeTab === 'jobs' &&
                                                    <div>
                                                        <div className="candidate-info company-info">

                                                            <h4 className='mb-2 mt-4'>Recent job openings</h4>
                                                            <div className="job-list-container" >
                                                                <div className='d-flex justify-content-start aligns-item-center '>
                                                                    <div>
                                                                        <i className="fa fa-user-o" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div className='ml-2'>
                                                                        <h6 className="mb-0 ">
                                                                            Associate Dev-Ops Internship</h6>

                                                                        <p className="" style={{ color: "#1c2957" }}>
                                                                            USA,Rajasthan,India
                                                                        </p>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {activeTab === 'people' &&
                                                    <div className='mt-4 profile-summary' style={{ padding: '10px 30px' }}>
                                                        <div className="candidate-info company-info" >
                                                            <h6 className='mb-2 mt-2'>4 associated members</h6>
                                                            <div className="job-list-container mt-2" style={{ borderBottom: '1px solid gray' }}>
                                                                <div className='d-flex justify-content-start aligns-item-center '>
                                                                    <div>
                                                                        <i className="fa fa-user-o" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div className='ml-2'>
                                                                        <h6 className="mb-0 d-flex justify-content-between align-items-center">
                                                                            ABC</h6>
                                                                        <p className="mb-0" style={{ color: "#1c2957" }}>
                                                                            I help people understand and apply AI
                                                                        </p>
                                                                        <div className="job-time m-t15 m-b10">
                                                                            <a className="mr-1" href="#"><span style={{ padding: '5px 15px', borderRadius: '100px' }} >+ Follow</span></a>

                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="job-list-container mt-2" style={{ borderBottom: '1px solid gray' }}>
                                                                <div className='d-flex justify-content-start aligns-item-center '>
                                                                    <div>
                                                                        <i className="fa fa-user-o" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div className='ml-2'>
                                                                        <h6 className="mb-0 d-flex justify-content-between align-items-center">
                                                                            ABC</h6>
                                                                        <p className="mb-0" style={{ color: "#1c2957" }}>
                                                                            I help people understand and apply AI
                                                                        </p>
                                                                        <div className="job-time m-t15 m-b10">
                                                                            <a className="mr-1" href="#"><span style={{ padding: '5px 15px', borderRadius: '100px' }} >+ Follow</span></a>

                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="job-list-container mt-2" style={{ borderBottom: '1px solid gray' }}>
                                                                <div className='d-flex justify-content-start aligns-item-center '>
                                                                    <div>
                                                                        <i className="fa fa-user-o" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div className='ml-2'>
                                                                        <h6 className="mb-0 d-flex justify-content-between align-items-center">
                                                                            ABC</h6>
                                                                        <p className="mb-0" style={{ color: "#1c2957" }}>
                                                                            I help people understand and apply AI
                                                                        </p>
                                                                        <div className="job-time m-t15 m-b10">
                                                                            <a className="mr-1" href="#"><span style={{ padding: '5px 15px', borderRadius: '100px' }} >+ Follow</span></a>

                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="job-list-container mt-2" style={{ borderBottom: '1px solid gray' }}>
                                                                <div className='d-flex justify-content-start aligns-item-center '>
                                                                    <div>
                                                                        <i className="fa fa-user-o" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div className='ml-2'>
                                                                        <h6 className="mb-0 d-flex justify-content-between align-items-center">
                                                                            ABC</h6>
                                                                        <p className="mb-0" style={{ color: "#1c2957" }}>
                                                                            I help people understand and apply AI
                                                                        </p>
                                                                        <div className="job-time m-t15 m-b10">
                                                                            <a className="mr-1" href="#"><span style={{ padding: '5px 15px', borderRadius: '100px' }} >+ Follow</span></a>

                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                }
                                            </div>

                                        </div>
                                    </div>

                                    <div className='mt-4 profile-summary' style={{ padding: '10px 30px' }}>
                                        <div className="candidate-info company-info">

                                            <h4 className='mb-2 mt-4'>Recent job openings</h4>
                                            <div className="job-list-container" >
                                                <div className='d-flex justify-content-start aligns-item-center '>
                                                    <div>
                                                        <i className="fa fa-user-o" aria-hidden="true"></i>
                                                    </div>
                                                    <div className='ml-2'>
                                                        <h6 className="mb-0 ">
                                                            Associate Dev-Ops Internship</h6>

                                                        <p className="" style={{ color: "#1c2957" }}>
                                                            USA,Rajasthan,India
                                                        </p>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className=' col-lg-4 col-md-4 col-sm-12 col-12'>
                                    <div className=' profile-summary' style={{ padding: '10px 30px' }}>
                                        <div className="candidate-info company-info">

                                            <div className="job-list-container text-center" >
                                                <p className="" style={{ color: "#1c2957", fontSize: '13px', lineHeight: '20px' }}>
                                                    Abc, unlock your full potential with linkedin premium
                                                </p>
                                                <div className='d-flex justify-content-around aligns-item-center '>
                                                    <div>
                                                        <i className="fa fa-user-o" aria-hidden="true"></i>
                                                    </div>
                                                    <div>
                                                        <i className="fa fa-user-o" aria-hidden="true"></i>
                                                    </div>
                                                </div>


                                                <p className="mb-2 mt-2" style={{ color: "#1c2957", fontSize: '15px', lineHeight: '20px' }}>
                                                    See who's viewed your profile in the last 90 days
                                                </p>
                                                <div className="job-time m-t15 m-b10">
                                                    <a className="mr-1" href="#"><span style={{ padding: '5px 15px', borderRadius: '100px' }} >Try for free</span></a>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-4 profile-summary' style={{ padding: '10px 30px' }}>
                                        <div className="candidate-info company-info" >
                                            <h6 className='mb-2 mt-2'>Pages people also viewed</h6>
                                            <div className="job-list-container mt-2" style={{ borderBottom: '1px solid gray' }}>
                                                <div className='d-flex justify-content-start aligns-item-center '>
                                                    <div>
                                                        <i className="fa fa-user-o" aria-hidden="true"></i>
                                                    </div>
                                                    <div className='ml-2'>
                                                        <h6 className="mb-0 d-flex justify-content-between align-items-center">
                                                            ABC</h6>
                                                        <p className="mb-0" style={{ color: "#1c2957" }}>
                                                        IT Services and IT Consulting
                                                        </p>
                                                        <p className="mb-0" style={{ color: "#1c2957" }}>
                                                       5,329,878 followers
                                                        </p>
                                                        <div className="job-time m-t15 m-b10">
                                                            <a className="mr-1" href="#"><span style={{ padding: '5px 15px', borderRadius: '100px' }} >+ Follow</span></a>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="job-list-container mt-2" style={{ borderBottom: '1px solid gray' }}>
                                                <div className='d-flex justify-content-start aligns-item-center '>
                                                    <div>
                                                        <i className="fa fa-user-o" aria-hidden="true"></i>
                                                    </div>
                                                    <div className='ml-2'>
                                                        <h6 className="mb-0 d-flex justify-content-between align-items-center">
                                                            ABC</h6>
                                                            <p className="mb-0" style={{ color: "#1c2957" }}>
                                                        IT Services and IT Consulting
                                                        </p>
                                                        <p className="mb-0" style={{ color: "#1c2957" }}>
                                                       5,329,878 followers
                                                        </p>
                                                        <div className="job-time m-t15 m-b10">
                                                            <a className="mr-1" href="#"><span style={{ padding: '5px 15px', borderRadius: '100px' }} >+ Follow</span></a>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="job-list-container mt-2" style={{ borderBottom: '1px solid gray' }}>
                                                <div className='d-flex justify-content-start aligns-item-center '>
                                                    <div>
                                                        <i className="fa fa-user-o" aria-hidden="true"></i>
                                                    </div>
                                                    <div className='ml-2'>
                                                        <h6 className="mb-0 d-flex justify-content-between align-items-center">
                                                            ABC</h6>
                                                            <p className="mb-0" style={{ color: "#1c2957" }}>
                                                        IT Services and IT Consulting
                                                        </p>
                                                        <p className="mb-0" style={{ color: "#1c2957" }}>
                                                       5,329,878 followers
                                                        </p>
                                                        <div className="job-time m-t15 m-b10">
                                                            <a className="mr-1" href="#"><span style={{ padding: '5px 15px', borderRadius: '100px' }} >+ Follow</span></a>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="job-list-container mt-2" style={{ borderBottom: '1px solid gray' }}>
                                                <div className='d-flex justify-content-start aligns-item-center '>
                                                    <div>
                                                        <i className="fa fa-user-o" aria-hidden="true"></i>
                                                    </div>
                                                    <div className='ml-2'>
                                                        <h6 className="mb-0 d-flex justify-content-between align-items-center">
                                                            ABC</h6>
                                                            <p className="mb-0" style={{ color: "#1c2957" }}>
                                                        IT Services and IT Consulting
                                                        </p>
                                                        <p className="mb-0" style={{ color: "#1c2957" }}>
                                                       5,329,878 followers
                                                        </p>
                                                        <div className="job-time m-t15 m-b10">
                                                            <a className="mr-1" href="#"><span style={{ padding: '5px 15px', borderRadius: '100px' }} >+ Follow</span></a>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
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

export default CompanyPage;
