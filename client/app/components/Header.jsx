"use client"

import Link from 'next/link'
import {React, useState} from 'react'
import { FaTasks, FaBars, FaSignOutAlt } from "react-icons/fa";
import { MdGroups, MdLightMode, MdNightsStay, MdAccountCircle } from "react-icons/md";
import { GiAtomicSlashes } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";

export default function Header() {
    const [sidebarToggle, setSidebarToggle] = useState(true)
    const [themeToggle, setThemeToggle] = useState(false)
    const [synaptronToggle, setSynaptronToggle] = useState(false)
    const [synSbToggle, setSynSbToggle] = useState(false)

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

    const handleSynaptronToggle = () => {
        setSynaptronToggle(!synaptronToggle)
    }

    const handleSynSbToggle = () => {
        setSynSbToggle(!synSbToggle)
    }

  return (
    <header>
        <div className={`synaptron-chat ${synaptronToggle ? 'shown' : ''}`}>
            {synaptronToggle ? 
                <div className='synaptron-chat-content'>
                    <div className='syn-div'>
                        <button className='syn-close' onClick={handleSynaptronToggle}>
                            <IoCloseOutline color='lightslategray' fontSize='30px'/>
                        </button>
                        <img className='logo-syn' src="./synaptron-logo.png" />
                    </div>
                    <div className='synsb-div'>
                        <input onClick={handleSynSbToggle}
                        className={`syn-searchbar ${synSbToggle ? 'contract' : ''}`} 
                        type="text"
                        placeholder='synaptron'
                        />
                        <i className='synsb-below'>Synaptron - powered by Gemini-AI</i>
                    </div>
                </div>
             : 
            null}
        </div>

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
                    <Link href='/profile' className='nav-div'>
                        <strong className='nav-link-name'>Profile</strong>
                        <MdAccountCircle className='nav-icon' />
                    </Link>
                    <Link href='/tasks' className='nav-div'>
                        <strong className='nav-link-name'>Tasks</strong>
                        <FaTasks className='nav-icon' />
                    </Link>
                    <Link href='/groups' className='nav-div'>
                        <strong className='nav-link-name'>Groups</strong>
                        <MdGroups className='nav-icon' />
                    </Link>
                    <button className="nav-div" onClick={handleSynaptronToggle}>
                        <strong className='nav-link-name'>Synaptron</strong>
                        <GiAtomicSlashes className='nav-icon' />
                    </button>
                </div>
                <Link href='/login' className={`signlog-btn ${sidebarToggle ? 'hide-navd-btn' : ''}`}>
                    <strong>{sidebarToggle ? <FaSignOutAlt className='signlog-icon' /> : 'Login'}</strong>
                </Link>
            </div>
        </div>
    </header>
  )
}
