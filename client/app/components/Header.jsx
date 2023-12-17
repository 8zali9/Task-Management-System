"use client"

import Link from 'next/link'
import {React, useState} from 'react'
import { FaTasks, FaBars, FaSignOutAlt } from "react-icons/fa";
import { MdGroups, MdLightMode, MdNightsStay, MdAccountCircle } from "react-icons/md";

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
                    <FaBars className='sidebar-toggle-btn'/>
                </button>
                <Link className='logo' href='/'>
                    <img className='logo-tm' src="./logo.png" />
                </Link>
            </div>

            <div className='nav-side'>
                <button className={`theme-toggle ${themeToggle ? 'dark-theme' : 'light-theme'}`} onClick={handleThemeToggle}>
                    {themeToggle ? <MdNightsStay className='dark-theme' /> : <MdLightMode className='light-theme' /> }
                </button>
            </div>
        </nav>

        <div className='sidebar'>
            <div className={`navbar ${sidebarToggle ? 'shown' : ''}`}>
                <div className='nav-up-links'>
                    <Link className='nav-div' href='/'>
                        <strong className='nav-link-name'>Profile</strong>
                        <MdAccountCircle className='nav-icon' />
                    </Link>
                    <Link href='/' className='nav-div'>
                        <strong className='nav-link-name'>Tasks</strong>
                        <FaTasks className='nav-icon' />
                    </Link>
                    <Link href='/' className='nav-div'>
                        <strong className='nav-link-name'>Groups</strong>
                        <MdGroups className='nav-icon' />
                    </Link>
                </div>
                <button className={`signlog-btn ${sidebarToggle ? 'hide-navd-btn' : ''}`}>
                    <strong>{sidebarToggle ? <FaSignOutAlt className='signlog-icon' /> : 'Logout'}</strong>
                </button>
            </div>
        </div>
    </header>
  )
}
