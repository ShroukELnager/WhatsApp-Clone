// ChatDetail.js
import React, { useEffect, useRef, useState } from "react";
import { chat3 } from "../assets/whatsapp";
import RoundedBtn from "./commen/RoundedBtn";
import { messagesData } from "../data/whatsapp";
import { VscSearch } from "react-icons/vsc";
import { 
    IoVideocamOutline, 
    IoCallOutline, 
    IoMicOutline, 
    IoCameraOutline, 
    IoDocumentTextOutline 
} from "react-icons/io5";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { GiPaperClip } from "react-icons/gi";
import { IoMdSend } from "react-icons/io";
import { BiPoll } from "react-icons/bi";
import { MdOutlineInsertPhoto, MdOutlineDraw } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";

import Message from "./message";
import Modal from "./VideoCallModal";  
import { getTime } from "../logic/whatsapp";

export default function ChatDetail() {
    const [messages, setMessages] = useState(messagesData);
    const [typing, setTyping] = useState(false);
    const [openAttach, setOpenAttach] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState(""); // "video" | "call"

    const inputRef = useRef(null);
    const bottomRef = useRef(null);
    const fileInputRef = useRef(null);
    const attachRef = useRef(null);

    // Add a new message
    const addMessage = (msg) => {
        setMessages((prev) => [...prev, msg]);
    };

    // Handle typing state
    const handleSwitching = () => {
        setTyping(inputRef.current.value.length > 0);
    };

    // Send text message
    const handleSubmit = () => {
        if (inputRef.current.value.length > 0) {
            addMessage({
                msg: inputRef.current.value,
                time: getTime(),
                sent: true,
            });
            inputRef.current.value = "";
            setTyping(false);
        }
    };

    // Auto scroll to bottom whenever messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Handle file upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileURL = URL.createObjectURL(file);

        let msgObj = {
            msg: "",
            time: getTime(),
            sent: true,
        };

        if (file.type.startsWith("image/")) {
            msgObj.img = fileURL;
        } else if (file.type.startsWith("video/")) {
            msgObj.file = { url: fileURL, name: file.name, type: "video" };
        } else {
            msgObj.file = { url: fileURL, name: file.name, type: "document" };
        }

        addMessage(msgObj);
        setOpenAttach(false);
    };

    // Close attachment menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (attachRef.current && !attachRef.current.contains(e.target)) {
                setOpenAttach(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col h-screen border-l border-gray-300">
            {/* Navbar */}
            <div className="flex-shrink-0 flex items-center justify-between h-[65px] mt-[32px] bg-white px-3 border-b border-gray-300">
                <div className="flex items-center space-x-3">
                    <img src={chat3} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-800">Dad</span>
                        <span className="text-[15px] text-gray-800">online</span>
                    </div>
                </div>
                <div className="flex items-center space-x-1">
                    <div className="flex border rounded-md">
                        <div className="flex items-center rounded-md ">
                            {/* Video button -> open modal */}
                            <RoundedBtn 
                                icon={<IoVideocamOutline size={20} />} 
                                onClick={() => {  
                                    setModalType("video"); 
                                    setOpenModal(true); 
                                }}
                            />

                            {/* Vertical line */}
                            <div className="w-px h-5 bg-gray-300 mx-1"></div>

                            {/* Call button -> open modal */}
                            <RoundedBtn 
                                icon={<IoCallOutline size={20} />} 
                                onClick={() => {  
                                    setModalType("call"); 
                                    setOpenModal(true); 
                                }}
                            />
                        </div>
                    </div>
                    <RoundedBtn icon={<VscSearch size={20} />} />
                </div>
            </div>

            {/* Chat messages */}
            <div className="bg-[url('assets/images/bg.jpeg')] bg-contain overflow-y-scroll flex-1 p-4">
                {messages.map((msg, i) => (
                    <Message key={i} {...msg} />
                ))}
                <div ref={bottomRef} />
            </div>

            {/* Input section */}
            <div className="flex-shrink-0 h-[55px] bg-white border-t border-gray-300 flex items-center px-4 space-x-2 relative">
                {/* Emoji button */}
                <RoundedBtn icon={<HiOutlineEmojiHappy size={20} />} />

                {/* Attachments */}
                <div className="relative" ref={attachRef}>
                    <RoundedBtn
                        icon={<GiPaperClip size={20} />}
                        onClick={() => setOpenAttach((prev) => !prev)}
                    />
                    {openAttach && (
                        <div className="absolute bottom-full mb-2 left-0 bg-white shadow-lg border rounded-xl w-48 flex flex-col py-1 z-50">
                            <button
                                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 text-gray-800 text-sm"
                                onClick={() => {
                                    fileInputRef.current.click();
                                    setOpenAttach(false);
                                }}
                            >
                                <MdOutlineInsertPhoto size={18} /> Photos & videos
                            </button>

                            <button
                                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 text-gray-800 text-sm"
                                onClick={() => {
                                    setOpenAttach(false);
                                }}
                            >
                                <IoCameraOutline size={18} /> Camera
                            </button>

                            <button
                                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 text-gray-800 text-sm"
                                onClick={() => {
                                    fileInputRef.current.click();
                                    setOpenAttach(false);
                                }}
                            >
                                <IoDocumentTextOutline size={18} /> Document
                            </button>

                            <button
                                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 text-gray-800 text-sm"
                                onClick={() => {
                                    fileInputRef.current.click();
                                    setOpenAttach(false);
                                }}
                            >
                                <RiContactsLine size={18} /> Contact
                            </button>

                            <button
                                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 text-gray-800 text-sm"
                                onClick={() => {
                                    setOpenAttach(false);
                                }}
                            >
                                <BiPoll size={18} /> Poll
                            </button>

                            <button
                                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 text-gray-800 text-sm"
                                onClick={() => {
                                    setOpenAttach(false);
                                }}
                            >
                                <MdOutlineDraw size={18} /> Drawing
                            </button>

                            {/* Hidden Input */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                    )}
                </div>

                {/* Text input */}
                <input
                    type="text"
                    placeholder="Type a message"
                    ref={inputRef}
                    onChange={handleSwitching}
                    className="flex-1 border rounded-full px-3 py-2 outline-none"
                />

                {/* Send / Mic */}
                {typing ? (
                    <RoundedBtn icon={<IoMdSend />} onClick={handleSubmit} />
                ) : (
                    <RoundedBtn icon={<IoMicOutline />} />
                )}
            </div>

            {/* ✅ Modal usage */}
            <Modal isOpen={openModal} onClose={() => setOpenModal(false)} type={modalType} />
               
        </div>
    );
}