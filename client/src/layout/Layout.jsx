import React from 'react'
import Sidebar from '../components/sidebar'

const Layout = ({ children }) => {
  return (
    <div className='flex w-full h-screen bg-amber-700'>
      <Sidebar />
      <div className='flex-1 overflow-auto'>
        {children}
      </div>
    </div>
  )
}

export default Layout