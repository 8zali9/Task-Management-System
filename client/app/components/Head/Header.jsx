"use client"

import {React, useContext} from 'react'
import Synaptron from '../synaptron'
import { SynToggleContext } from '../../utils/SynaptronToggle'
import Sidebar from './Sidebar';

export default function Header() {
    const { synaptronToggle } = useContext(SynToggleContext);

  return (
    <header>
        <div className={`synaptron-chat ${synaptronToggle ? 'shown' : ''}`}>
            {synaptronToggle ? 
                <Synaptron />
             : 
            null}
        </div>
        
        <Sidebar />
    </header>
  )
}
