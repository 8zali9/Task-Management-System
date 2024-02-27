"use client"

import {React, useState, useContext, useEffect} from 'react'
import Link from 'next/link'
import { FaTasks, FaBars, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { MdGroups, MdAccountCircle } from "react-icons/md";
import { GiAtomicSlashes } from "react-icons/gi";
import { SynToggleContext } from '../utils/SynaptronToggle'

export default function Sidebar() {
  const { handleSynaptronToggle } = useContext(SynToggleContext);
  const [sidebarToggle, setSidebarToggle] = useState(true)
  const [profileName, setProfileName] = useState("Account")

  async function fetchUserName(){
    const name = await localStorage.getItem('userName')
    setProfileName(name)
  }
  useEffect(() => {
    fetchUserName()
  }, [profileName]);

  const handleSidebarToggle = () => {
    setSidebarToggle(!sidebarToggle)
  }

  return (
    <div>
        <nav>
            <div className='brand-div'>
                <button className="sidebar-toggle" onClick={handleSidebarToggle}>
                    <FaBars fontWeight='bolder' fontSize='15px' className='sidebar-toggle-btn'/>
                </button>
                <Link className='logo' href='/'>
                    <img className='logo-tm' src="./logo.png" />
                </Link>
            </div>

            <div className='nav-side'>
                {profileName}
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
                    <strong>{sidebarToggle ? <FaSignInAlt className='signlog-icon' /> : 'Login'}</strong>
                </Link>
            </div>
        </div>
    </div>
  )
}
