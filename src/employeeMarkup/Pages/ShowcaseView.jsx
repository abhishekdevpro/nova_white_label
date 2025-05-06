import React from 'react';
import ShowcaseComponent from './showcase/Showcase';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const ShowcaseView = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <ShowcaseComponent />
      </div>
      <Footer />
    </>
  );
};

export default ShowcaseView; 