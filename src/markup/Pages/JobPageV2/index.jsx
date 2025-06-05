import React from 'react'
import UserHeader from '../../Layout/Header'
import Footer from '../../Layout/Footer'
import JobPage from './JobPage'

const index = () => {
  return (
    <>
      <UserHeader />
      <div className="min-h-screen bg-gray-50">
       <JobPage />
      </div>
      <Footer />
    </>
  )
}

export default index