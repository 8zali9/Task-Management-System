"use client"

import {React, useState, useContext, useEffect} from 'react'
import Link from 'next/link'
import { FaTasks, FaBars, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { MdGroups, MdAccountCircle, MdPersonAddAlt1  } from "react-icons/md";
import { GiAtomicSlashes } from "react-icons/gi";
import { SynToggleContext } from '../../utils/SynaptronToggle'
import { AuthContext } from '../../utils/TokenProvider'
import { ToggleNavBtnsContext } from '../../utils/ToggleNavBtns'

async function fetchUserName(){
    const name = await localStorage.getItem('userName')
    const nameParts = name?.split(' ');
    const firstName = nameParts[0];
    return firstName.charAt(0).toUpperCase() + firstName.charAt(1);
}

export default function Sidebar() {
  const {
    toggleProfileBtn, toggleTasksBtn, toggleGroupsBtn,
    handleProfileBtnToggle, handleTasksBtnToggle, handleGroupsBtnToggle,
  } = useContext(ToggleNavBtnsContext)
  const { tokenIsPresent } = useContext(AuthContext);
  const { handleSynaptronToggle } = useContext(SynToggleContext);
  const [sidebarToggle, setSidebarToggle] = useState(true)
  const [authBtns, setAuthbtnsToggle] = useState(true)
  const [profileName, setProfileName] = useState("Account")

  useEffect(() => {
    async function fetchingUserName() {
        const fetchedName = await fetchUserName()
        if(fetchedName){
            await setAuthbtnsToggle(false)
        }
        else{
            await setAuthbtnsToggle(true)
        }
        setProfileName(fetchedName)
    }
    fetchingUserName()
  }, [tokenIsPresent]);

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
                <div className='logo' href='/'>
                    <img className='logo-tm' src="./logo.png" />
                </div>
            </div>

            <div className='nav-side'>
              {tokenIsPresent ? profileName : <MdAccountCircle color='#1b1420ee' />}
            </div>
        </nav>

        <div className='sidebar'>
            <div className={`navbar ${sidebarToggle ? 'shown' : ''}`}>
                {
                    !authBtns &&
                    <div className='nav-up-links'>

                        <Link 
                        onClick={handleProfileBtnToggle} 
                        href='/profile' 
                        className={`nav-div ${toggleProfileBtn ? 'nav-selected-btn' : ''}`}>
                            <strong className='nav-link-name'>Profile</strong>
                            <MdAccountCircle className='nav-icon' />
                        </Link>

                        <Link 
                        onClick={handleTasksBtnToggle} 
                        href='/tasks' 
                        className={`nav-div ${toggleTasksBtn ? 'nav-selected-btn' : ''}`}>
                            <strong className='nav-link-name'>Tasks</strong>
                            <FaTasks className='nav-icon' />
                        </Link>

                        <Link 
                        onClick={handleGroupsBtnToggle} 
                        href='/groups' 
                        className={`nav-div ${toggleGroupsBtn ? 'nav-selected-btn' : ''}`}>
                            <strong className='nav-link-name'>Groups</strong>
                            <MdGroups className='nav-icon' />
                        </Link>

                        <button className="nav-div" onClick={handleSynaptronToggle}>
                            <strong className='nav-link-name'>Synaptron</strong>
                            <GiAtomicSlashes className='nav-icon' />
                        </button>

                    </div>
                }
                {
                    authBtns &&
                    <div className='auth-btns'> 
                        <Link href='/register' className={`signlog-btn ${sidebarToggle ? 'hide-navd-btn' : ''}`}>
                            <strong>{sidebarToggle ? <MdPersonAddAlt1 className='signlog-icon' /> : 'Register'}</strong>
                        </Link>
                        <Link href='/login' className={`signlog-btn ${sidebarToggle ? 'hide-navd-btn' : ''}`}>
                            <strong>{sidebarToggle ? <FaSignInAlt className='signlog-icon' /> : 'Login'}</strong>
                        </Link>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}
