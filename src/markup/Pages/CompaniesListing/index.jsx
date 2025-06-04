import React from 'react'
import UserHeader from '../../Layout/Header'
import Footer from '../../Layout/Footer'
import CompanyList from './CompanyList'

const index = () => {
  return (
    <>
      <UserHeader />
      <div className="min-h-screen bg-gray-50">
        <CompanyList />
      </div>
      <Footer />
    </>
  )
}

export default index