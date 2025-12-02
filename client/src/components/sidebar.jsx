import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-64 h-full bg-white shadow-md p-4'>
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <nav className='flex flex-col gap-4'>
        <Link to="/" className='text-gray-700 hover:text-blue-600'>Home</Link>
        <Link to="/journal" className='text-gray-700 hover:text-blue-600'>Journal</Link>
        <Link to="/student-portal" className='text-gray-700 hover:text-blue-600'>Student Portal</Link>
        <Link to="/login" className='text-gray-700 hover:text-blue-600'>Login</Link>
        <Link to="/register" className='text-gray-700 hover:text-blue-600'>Register</Link>
      </nav>
    </div>
  )
}

export default Sidebar
