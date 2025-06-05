import React from 'react';
import ShowcaseComponent from './showcase/Showcase';
import Header from '../Layout/Header';
import UserHeader from '../../markup/Layout/Header';
import Footer from '../../markup/Layout/Footer';

const ShowcaseView = () => {
  const token = localStorage.getItem("employeeLoginToken")
  return (
    <>
     {token ? <Header /> : <UserHeader />}
      <div className="min-h-screen bg-gray-50">
        <ShowcaseComponent />
      </div>
      <Footer />
    </>
  );
};

export default ShowcaseView; 