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
    function parseText(text) {
        if (typeof text !== "string") {
            // Convert to string if it's not already
            text = String(text);
        }
        
        let parsedText = [];
        let segments = text.split("$l$");
        for (let segment of segments) {
            if (segment.trim() !== "") {
                parsedText.push(segment.trim());
            }
        }
        return parsedText;
    }
    

    const [chatContent, setChatContent] = useState([]);
    const [userQuery, setUserQuery] = useState("");
    const [loading, setLoading] = useState(false)

    const handleChatContentFilling = async (e) => {
        setLoading(true)
        e.preventDefault()
    
        const response = await fetch('http://localhost:1231/',{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({userQuery})
        })
    
        const data = await response.json();
        setChatContent(prevChatContent => [...prevChatContent, data]);
        setLoading(false)
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
                {parseText(chatContent)}
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
                {loading && <GiAtomicSlashes className={`${loading ? 'loading' : ''}`} />}
                <input
                className='syn-searchbar'
                type="text"
                placeholder='chat with synaptron'
                onChange={(e) => setUserQuery(e.target.value)}
                value={userQuery}
                />
                <button type='submit'></button>
                <div className='synsb-below'>
                    <GiAtomicSlashes className='nav-icon' />
                    <i>Synaptron - powered by Gemini-AI</i>
                </div>
            </form>
        </div>
    </div>
  )
}
