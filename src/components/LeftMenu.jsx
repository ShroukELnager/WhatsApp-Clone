// LeftMenu.jsx
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

export default function LeftMenu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openNewChat, setOpenNewChat] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const newChatRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (newChatRef.current && !newChatRef.current.contains(e.target)) {
        setOpenNewChat(false);
      }
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setOpenFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-white min-w-[240px] max-w-[500px] ">
      <div className="flex justify-between p-3">
        <div className="text-lg">Chats</div>
        <div className="flex relative">
          <div className="relative" ref={newChatRef}>
            <RoundedBtn
              icon={<SlNote />}
              onClick={() => {
                setOpenNewChat(prev => !prev);
                setOpenFilter(false);
              }}
            />

            {openNewChat && (
              <div className="absolute left-0 top-full mt-2 bg-white w-[350px] border border-gray-200 rounded-lg shadow-lg z-50 py-2 max-h-[calc(100vh-100px)] overflow-y-auto">
                <h2 className="px-4 py-2 text-lg font-semibold">New chat</h2>

                <div className="px-3 flex justify-start w-full mb-2">
                  <div className="flex items-center border-x border-t border-gray-300 border-b-2 border-b-gray-300 rounded-lg shadow-2xl w-full h-8 px-2 focus-within:border-b-2 focus-within:border-b-[#4DA07A]">
                    <input
                      type="text"
                      placeholder="Search name or number"
                      className="flex-1 bg-transparent text-[15px] text-[#939393] focus:outline-none"
                    />
                    <FaRegKeyboard size={15} className="text-gray-500 mr-2" />
                  </div>
                </div>

                <div className="border-t border-gray-200 my-1"></div>

                <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-[15px] font-bold hover:bg-[#f0f2f5]">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300">
                    <GrGroup size={18} />
                  </div>
                  New group
                </button>

                <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-[15px] font-bold hover:bg-[#f0f2f5]">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300">
                    <RiContactsLine size={18} />
                  </div>
                  Contacts
                </button>

                <div className="flex items-center gap-3 w-full px-4 py-2">
                  <div className="w-10 h-10 rounded-full border border-gray-300 overflow-hidden">
                    <img src={cat} alt="profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold">Me (You)</span>
                    <span className="text-[13px] text-gray-700">Message yourself</span>
                  </div>
                </div>

                <p className="text-gray-700 px-4 pt-2 text-xs">Frequently contacted</p>
                <FrequantlyChats />

                <p className="text-gray-700 px-4 pt-2 text-xs">All contacts</p>
                <ChatWithoutFilter />
              </div>
            )}
          </div>

          <div className="relative" ref={filterRef}>
            <RoundedBtn
              icon={<BsFilter />}
              onClick={() => {
                setOpenFilter(prev => !prev);
                setOpenNewChat(false);
              }}
            />

            {openFilter && (
              <div className="absolute left-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
                <p className="px-4 py-2 text-xs font-semibold text-gray-500">Filter chats by</p>
                <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f0f2f5]">
                  <MdOutlineMarkChatUnread size={18} /> Unread
                </button>
                <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f0f2f5]">
                  <MdFavoriteBorder size={18} /> Favorites
                </button>
                <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f0f2f5]">
                  <RiContactsLine size={18} /> Contacts
                </button>
                <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f0f2f5]">
                  <MdOutlinePersonOff size={18} /> Non-contacts
                </button>
                <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f0f2f5]">
                  <GrGroup size={18} /> Groups
                </button>
                <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f0f2f5]">
                  <GoPencil size={18} /> Drafts
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-3 flex justify-start w-full mb-2">
        <div className="flex items-center border-x border-t border-gray-300 border-b-2 border-b-gray-300 rounded-lg shadow-2xl w-full h-8 px-2 focus-within:border-b-2 focus-within:border-b-[#4DA07A]">
          <BiSearch size={15} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="flex-1 bg-transparent text-[15px] text-[#939393] focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ChatsWithFilter searchTerm={searchTerm} />
      </div>
    </div>
  );
}
