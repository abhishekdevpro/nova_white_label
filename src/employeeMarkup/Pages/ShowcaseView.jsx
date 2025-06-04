import React from 'react';
import ShowcaseComponent from './showcase/Showcase';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import UserHeader from '../../markup/Layout/Header';

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