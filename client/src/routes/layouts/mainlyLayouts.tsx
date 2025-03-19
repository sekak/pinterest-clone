import React from 'react'
import { Outlet } from 'react-router'
import TopBar from '../../components/topBar/topBar'
import LeftBar from '../../components/leftBar/leftBar'

export default function MainlyLayouts() {
  return (
    <div className='flex'>
      <LeftBar />
      <div className='flex flex-col flex-1 gap-2'>
        <TopBar />
        <Outlet />
      </div>
    </div>
  )
}
