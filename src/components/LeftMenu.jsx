// src/components/LeftMenu.jsx
import React, { useState, useRef, useEffect } from "react";
import RoundedBtn from "./commen/RoundedBtn";
import { SlNote } from "react-icons/sl";
import { BsFilter } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { FaRegKeyboard } from "react-icons/fa";
import { MdOutlineMarkChatUnread, MdFavoriteBorder, MdOutlinePersonOff } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { GrGroup } from "react-icons/gr";
import { GoPencil } from "react-icons/go";

import { cat } from "../assets/whatsapp";
import ChatsWithFilter from "./ChatsWithFilter";
import FrequantlyChats from "./frequantlyContact";
import ChatWithoutFilter from "./ChatWithoutFilter";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeActivePage } from "../store/activePage";
import ChatContextMenu from "./ChatContextMenu"; 

export default function LeftMenu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openNewChat, setOpenNewChat] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);

  const newChatRef = useRef(null);
  const filterRef = useRef(null);
  const filterMenuRef = useRef(null);

  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(changeActivePage("Favourite"));
  };

  const handleChatContextMenu = (e, chat) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      chatData: chat,
    });
  };
  const closeContextMenu = () => setContextMenu(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (newChatRef.current && !newChatRef.current.contains(e.target)) {
        setOpenNewChat(false);
      }
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target) &&
        filterMenuRef.current &&
        !filterMenuRef.current.contains(e.target)
      ) {
        setOpenFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative h-screen bg-white min-w-[240px] max-w-[500px] flex flex-col">
      {/* Top Bar */}
      <div className="flex justify-between p-3 relative z-10">
        <div className="text-lg font-semibold">Chats</div>
        <div className="flex relative">
          {/* New Chat Button */}
          <div className="relative" ref={newChatRef}>
            <RoundedBtn
              icon={<SlNote />}
              onClick={() => {
                setOpenNewChat((prev) => !prev);
                setOpenFilter(false);
              }}
            />
          </div>

          {/* Filter Button */}
          <div className="relative ml-2" ref={filterRef}>
            <RoundedBtn
              icon={<BsFilter />}
              onClick={() => {
                setOpenFilter((prev) => !prev);
                setOpenNewChat(false);
              }}
            />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-3 flex justify-start w-full mb-2 z-0">
        <div className="flex items-center border border-gray-300 rounded-lg shadow-sm w-full h-8 px-2 focus-within:border-[#4DA07A]">
          <BiSearch size={14} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="flex-1 bg-transparent text-[13px] text-[#939393] focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Chats List */}
      <div className="flex-1 overflow-y-auto z-0">
        <ChatsWithFilter searchTerm={searchTerm} onContextMenu={handleChatContextMenu} />
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ChatContextMenu
          position={contextMenu}
          onClose={closeContextMenu}
          chatData={contextMenu.chatData}
        />
      )}

      {/*  New Chat Dropdown */}
      {openNewChat &&
        createPortal(
          <div className="absolute left-[250px] top-[110px] w-[310px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[70vh] overflow-y-auto">
            <h2 className="px-4 py-2 text-lg font-semibold">New chat</h2>

            {/* Search Input */}
            <div className="px-3 flex justify-start w-full mb-2">
              <div className="flex items-center border border-gray-300 rounded-lg w-full h-8 px-2">
                <input
                  type="text"
                  placeholder="Search name or number"
                  className="flex-1 bg-transparent text-[15px] text-[#939393] focus:outline-none"
                />
                <FaRegKeyboard size={15} className="text-gray-500 mr-2" />
              </div>
            </div>

            <div className="border-t border-gray-200 my-1"></div>

            {/* New Group */}
            <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-[15px] font-bold hover:bg-[#f0f2f5]">
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300">
                <GrGroup size={18} />
              </div>
              New group
            </button>

            {/* Contacts */}
            <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-[15px] font-bold hover:bg-[#f0f2f5]">
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300">
                <RiContactsLine size={18} />
              </div>
              Contacts
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 w-full px-4 py-2">
              <div className="w-10 h-10 rounded-full border border-gray-300 overflow-hidden">
                <img src={cat} alt="profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-bold">Me (You)</span>
                <span className="text-[13px] text-gray-700">Message yourself</span>
              </div>
            </div>

            {/* Frequently Contacted */}
            <p className="text-gray-700 px-4 pt-2 text-xs">Frequently contacted</p>
            <div className="max-h-48 overflow-y-auto">
              <FrequantlyChats />
            </div>

            {/* All Contacts */}
            <p className="text-gray-700 px-4 pt-2 text-xs">All contacts</p>
            <div className="max-h-96 overflow-y-auto">
              <ChatWithoutFilter />
            </div>
          </div>,
          document.body
        )}

      {/* ✅ Filter Dropdown */}
     {openFilter &&
  createPortal(
    <div
      ref={filterMenuRef}
      className="absolute left-[250px] top-[110px] w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2 max-h-[80vh] overflow-y-auto"
    >
      <p className="px-4 py-2 text-xs font-semibold text-gray-500">Filter chats by</p>

      <button
        className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f0f2f5]"
        onClick={() => dispatch(changeActivePage("Unread"))}
      >
        <MdOutlineMarkChatUnread size={18} /> Unread
      </button>

      <button
        className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f0f2f5]"
        onClick={handleChange}
      >
        <MdFavoriteBorder size={18} /> Favorites
      </button>

      <button
        disabled
        className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-500 opacity-80 cursor-not-allowed"
      >
        <RiContactsLine size={18} /> Contacts
      </button>
      <button
        disabled
        className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-500 opacity-80 cursor-not-allowed"
      >
        <MdOutlinePersonOff size={18} /> Non-contacts
      </button>
      <button
        disabled
        className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-500 opacity-80 cursor-not-allowed"
      >
        <GrGroup size={18} /> Groups
      </button>
      <button
        disabled
        className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-500 opacity-80 cursor-not-allowed"
      >
        <GoPencil size={18} /> Drafts
      </button>
    </div>,
    document.body
  )}

    </div>
  );
}
