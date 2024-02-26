"use client"

import {React, useState, useContext} from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { GiAtomicSlashes } from "react-icons/gi";
import { SynToggleContext } from '../utils/SynaptronToggle'

export default function Synaptron() {
    const { handleSynaptronToggle } = useContext(SynToggleContext);
    // function parseText(text) {
    //     const lines = text.split(/\n+/); // Split text into lines
    //     let parsedText = '';
    
    //     lines.forEach(line => {
    //         const headings = line.match(/\*\*(.*?)\*\*/g); // Extract text within **
    //         if (headings) {
    //             headings.forEach(heading => {
    //                 const headingText = heading.replace(/\*\*/g, ''); // Remove **
    //                 parsedText += `${headingText}`; // Create heading
    //             });
    //         } else {
    //             parsedText += `${line}`; // Create line
    //         }
    //     });
    
    //     return parsedText;
    // }
    const [chatContent, setChatContent] = useState([]);
    const [userQuery, setUserQuery] = useState("");

    const handleChatContentFilling = async (e) => {
        e.preventDefault()
    
        const response = await fetch('http://localhost:1231/',{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({userQuery})
        })
    
        const data = await response.json();
        setChatContent(prevChatContent => [...prevChatContent, data]);
        setUserQuery("")
    }
  return (
    <div className=''>
        <div className='synaptron-chat-content'>
            <div className='syn-div'>
                <button className='syn-close' onClick={handleSynaptronToggle}>
                    <IoCloseOutline color='lightslategray' fontSize='30px'/>
                </button>
                <img className='logo-syn' src="./synaptron-logo.png" />
            </div>

            <div className='syn-content'>
                {/* <div>User-{userQuery}</div>
                <GiAtomicSlashes className='nav-icon' /> */}
                {/* {parseText(chatContent)} */}
                <div>
                {chatContent.map((item, index) => (
                    <p key={index}>
                        <GiAtomicSlashes color='lightslategrey' className='nav-icon' /><br></br>
                        {item}
                        <br /><br />
                    </p>
                ))}
                </div>
            </div>

            <form onSubmit={handleChatContentFilling} className='synsb-div' id="synaptronInput">
                <input
                className='syn-searchbar'
                type="text"
                placeholder='chat with synaptron'
                onChange={(e) => setUserQuery(e.target.value)}
                value={userQuery}
                />
                <button type='submit'></button>
                <i className='synsb-below'><GiAtomicSlashes className='nav-icon' />Synaptron - powered by Gemini-AI</i>
            </form>
        </div>
    </div>
  )
}
