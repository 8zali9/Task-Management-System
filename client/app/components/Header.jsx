"use client"

import Link from 'next/link'
import {React, useState} from 'react'

export default function Header() {
    const [sidebarToggle, setSidebarToggle] = useState(false)
    const [themeToggle, setThemeToggle] = useState(false)

    const handleSidebarToggle = () => {
        setSidebarToggle(!sidebarToggle)
    }

    const handleThemeToggle = () => {
        setThemeToggle(!themeToggle)
        if (!themeToggle) {
            document.body.style.backgroundColor = '#222';
        } else {
            document.body.style.backgroundColor = '#fff';
        }
    }

  return (
    <header>
        <nav>
            <div className='brand-div'>
                <button className="sidebar-toggle" onClick={handleSidebarToggle}>
                    =
                </button>
                <Link className='brand-name' href='/'>TMS Home</Link>
            </div>
            <div className='nav-side'>
                <Link href='/'>User Profile</Link>
                <button className="theme-toggle" onClick={handleThemeToggle}>
                    Theme
                </button>
            </div>
        </nav>
        <div className='sidebar'>
            <div className={`navbar ${sidebarToggle ? 'shown' : ''}`}>
                <Link href='/'>My Tasks</Link>
                <Link href='/'>My Groups</Link>
            </div>
        </div>
    </header>
  )
}
