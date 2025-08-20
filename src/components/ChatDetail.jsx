import React, { useEffect, useRef, useState } from 'react';
import { chat3 } from '../assets/whatsapp';
import RoundedBtn from './commen/RoundedBtn';
import { messagesData } from '../data/whatsapp';
import { VscSearch } from "react-icons/vsc";
import { IoVideocamOutline, IoCallOutline } from "react-icons/io5";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { GiPaperClip } from "react-icons/gi";
import { IoMicOutline } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";

import Message from './message';
import { getTime } from '../logic/whatsapp';

export default function ChatDetail() {
    const [messages, setMessages] = useState(messagesData);
    const [typing, setTyping] = useState(false);

    const inputRef = useRef(null)
    const bottomRef = useRef(null)


    const addMessage=(msg)=>{
        const newMessage=[...messages,msg]
        setMessages(newMessage)
    }

    const handleSwitching = () => {
        if (inputRef.current.value.length > 0) {
            setTyping(true);
        } else {
            setTyping(false);
        }
    };


    const handleSubmit=()=>
    {if (inputRef.current.value.length > 0)
    {   
        addMessage({
            msg:inputRef.current.value,
            time:getTime(),
            sent:true
        })
        inputRef.current.value="";
        inputRef.current.focus();
        setTyping(false);

    }}

     useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

    // useEffect(() => {
    // const listener = (e) => {
    //   if (e.code === "Enter") handleInputSubmit();
    // };

    // document.addEventListener("keydown", listener);
    // return () => document.removeEventListener("keydown", listener);
//   });


    return (
        <div className="flex flex-col h-screen border-l border-gray-300 ">

            {/* Navbar */}
            <div className="flex-shrink-0 flex items-center justify-between h-[65px] mt-[52px] bg-white px-4 border-b border-gray-300">
                {/* Profile Info */}
                <div className="flex items-center space-x-3">
                    <img
                        src={chat3}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className='flex flex-col'>
                        <span className="font-medium text-gray-800">Dad</span>
                        <span className="text-[15px] text-gray-800">online</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-1">
                    <div className='flex border rounded-sm'>
                        <RoundedBtn icon={<IoVideocamOutline size={20} />} />
                        <RoundedBtn icon={<IoCallOutline size={20} />} />
                    </div>
                    <RoundedBtn icon={<VscSearch size={20} />} />
                </div>
            </div>

            {/* Chat Section (Scrollable) */}
            <div
                className="bg-[url('assets/images/bg.jpeg')] bg-contain overflow-y-scroll flex-1"
                style={{ padding: "3% 7%" }}
            >
                {messages.map((msg, i) => (
                    <Message
                        msg={msg.msg}
                        time={msg.time}
                        isLink={msg.isLink}
                        img={msg.img}
                        sent={msg.sent}
                        key={i}
                    />
                ))}
                <div   ref={bottomRef}/>
            </div>

            {/* Send Message Section */}
            <div className="flex-shrink-0 h-[55px] bg-white border-t border-gray-300 flex items-center px-4 space-x-2 ">
                <RoundedBtn icon={<HiOutlineEmojiHappy size={20} />} />
                <RoundedBtn icon={<GiPaperClip size={20} />} />
                <input
                    type="text"
                    placeholder="Type a message"
                    ref={inputRef}
                    onChange={handleSwitching}
                    className="flex-1 border rounded-full px-3 py-2 outline-none"
                />
                {/* Mic/Send btn */}
                <span className="ml-2">
                    {typing ? (
                        <RoundedBtn icon={<IoMdSend />}  onClick={handleSubmit}/>
                    ) : (
                        <RoundedBtn icon={<IoMicOutline />} />
                    )}


                </span>
            </div>

        </div>
    );
}
