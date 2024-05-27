import React from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <div className='flex min-h-screen'>
      <div>
        <Sidebar></Sidebar>
      </div>
      <div className='flex-1 ml-64'>
       <div className='p-5'>
        <Outlet></Outlet>
       </div>
      </div>
    </div>
  )
}

export default Dashboard
