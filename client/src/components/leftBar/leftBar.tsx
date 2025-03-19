import React from 'react'
import { Link } from 'react-router'

export default function LeftBar() {
    return (
        <div className='flex flex-col justify-between h-screen items-center border-r border-gray-200 sticky top-0 min-w-[72px]'>
            <div className='flex flex-col gap-8 p-3'>
                <Link to="/" className="w-10 h-10 flex items-center justify-center">
                    <img src="/general/logo.png" alt="logo" className="w-5 h-5" />
                </Link>
                <Link to="/" className="w-10 h-10 hover:bg-gray-200 rounded-full flex items-center justify-center">
                    <img src="/general/home.svg" alt="home" className="w-5 h-5" />
                </Link>
                <Link to="create" className="w-10 h-10 hover:bg-gray-200 rounded-full flex items-center justify-center">
                    <img src="/general/create.svg" alt="create" className="w-5 h-5" />
                </Link>
                <Link to="" className="w-10 h-10 hover:bg-gray-200 rounded-full flex items-center justify-center">
                    <img src="/general/updates.svg" alt="updates" className="w-5 h-5" />
                </Link>
                <Link to="" className="w-10 h-10 hover:bg-gray-200 rounded-full flex items-center justify-center">
                    <img src="/general/messages.svg" alt="messages" className="w-5 h-5" />
                </Link>
            </div>
            <Link to="" className="w-10 h-10 hover:bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <img src="/general/settings.svg" alt="messages" className="w-5 h-5" />
            </Link>
        </div>
    )
}
