import React, { useEffect, useRef, useState } from "react";
import { chat3 } from "../assets/whatsapp";
import RoundedBtn from "./commen/RoundedBtn";
import { messagesData } from "../data/whatsapp";
import { VscSearch } from "react-icons/vsc";
import { IoVideocamOutline, IoCallOutline, IoMicOutline } from "react-icons/io5";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { GiPaperClip } from "react-icons/gi";
import { IoMdSend } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import { MdOutlineEmojiEmotions, MdOutlineInsertPhoto, MdOutlineDraw } from "react-icons/md";
import { LuDog } from "react-icons/lu";
import { CiPizza, CiBasketball, CiClock2 } from "react-icons/ci";
import { MdDirectionsCar } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { VscSymbolOperator } from "react-icons/vsc";
import { RiFlag2Line } from "react-icons/ri";
import { IoDocumentTextOutline, IoCameraOutline } from "react-icons/io5";
import { BiPoll } from "react-icons/bi";

import Message from "./message";
import { getTime } from "../logic/whatsapp";

export default function ChatDetail() {
  const [messages, setMessages] = useState(messagesData);
  const [typing, setTyping] = useState(false);
  const [openEmojis, setOpenEmojis] = useState(false);
  const [Emojis, setEmojis] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("smileys-emotion");
  const [searchTerm, setSearchTerm] = useState("");
  const [openVariant, setOpenVariant] = useState(null);
  const [openAttach, setOpenAttach] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const emjiRef = useRef(null);
  const fileInputRef = useRef(null);

  // Add new message to chat
  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  // Detect typing to show send button
  const handleSwitching = () => {
    setTyping(inputRef.current.value.length > 0 || attachedFile);
  };

  // Handle sending message
  const handleSubmit = () => {
    if (!inputRef.current.value && !attachedFile) return;

    let msgObj = {
      msg: inputRef.current.value,
      time: getTime(),
      sent: true,
    };

    // Include file if attached
    if (attachedFile) {
      if (attachedFile.type === "image") msgObj.img = attachedFile.url;
      else msgObj.file = { url: attachedFile.url, name: attachedFile.file.name };
    }

    addMessage(msgObj);

    // Clear input and attachment after sending
    inputRef.current.value = "";
    setAttachedFile(null);
    setTyping(false);
  };

  // Auto-scroll to bottom when new messages added
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch emojis from API
  useEffect(() => {
    fetch("https://emoji-api.com/emojis?access_key=ee0105bc430ec087e9698be8aec2881b534d2730")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setEmojis(data))
      .catch(() => setEmojis([]));
  }, []);

  // Close emoji or attach menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emjiRef.current && !emjiRef.current.contains(e.target)) {
        setOpenEmojis(false);
        setOpenVariant(null);
      }
      if (openAttach && !e.target.closest(".attach-menu")) setOpenAttach(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openAttach]);

  const EmojiGroups = [
    { name: "all", icon: <CiClock2 /> },
    { name: "smileys-emotion", icon: <MdOutlineEmojiEmotions /> },
    { name: "people-body", icon: <FaRegLightbulb /> },
    { name: "animals-nature", icon: <LuDog /> },
    { name: "food-drink", icon: <CiPizza /> },
    { name: "travel-places", icon: <MdDirectionsCar /> },
    { name: "activities", icon: <CiBasketball /> },
    { name: "objects", icon: <FaRegLightbulb /> },
    { name: "symbols", icon: <VscSymbolOperator /> },
    { name: "flags", icon: <RiFlag2Line /> },
  ];

  // Filter emojis for current group & search term
  const filteredEmojis = Emojis.filter(
    (emoji) => (selectedGroup === "all" || emoji.group === selectedGroup) &&
               emoji.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setAttachedFile({
      file,
      url,
      type: file.type.startsWith("image/") ? "image" : "document",
    });

    setTyping(true);
    setOpenAttach(false); // Close menu immediately after selecting file
  };

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
          <div className="flex border rounded-sm">
            <RoundedBtn icon={<IoVideocamOutline size={20} className="max-sm:hidden" />} />
            <RoundedBtn icon={<IoCallOutline size={20} className="max-sm:hidden" />} />
          </div>
          <RoundedBtn icon={<VscSearch size={20} className="max-sm:hidden"/>} />
        </div>
      </div>

      {/* Chat Section */}
      <div className="bg-[url('assets/images/bg.jpeg')] bg-contain overflow-y-scroll flex-1 p-4">
        {messages.map((msg, i) => (
          <Message key={i} {...msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Section */}
      <div className="flex-shrink-0 bg-white border-t border-gray-300 flex flex-col px-4 py-2 relative">
        {/* Preview attached file */}
        {attachedFile && (
          <div className="flex items-center mb-2 space-x-2 bg-gray-100 p-2 rounded">
            {attachedFile.type === "image" ? (
              <img src={attachedFile.url} className="w-16 h-16 object-cover rounded" />
            ) : (
              <span className="text-gray-700">{attachedFile.file.name}</span>
            )}
            <button className="text-red-500 font-bold" onClick={() => setAttachedFile(null)}>✕</button>
          </div>
        )}

        <div className="flex items-center space-x-2">
          {/* Emoji Button */}
          <div className="relative" ref={emjiRef}>
            <RoundedBtn
              icon={<HiOutlineEmojiHappy size={20} onClick={() => setOpenEmojis(!openEmojis)} />}
            />
            {openEmojis && (
              <div className="absolute bottom-full mb-2 w-[500px] bg-white border border-gray-300 rounded-lg h-[350px] shadow-lg flex flex-col">
                <div className="bg-white sticky top-0 z-10 p-3 border-b border-gray-200">
                  <div className="flex items-center border border-gray-300 rounded-lg w-full h-8 px-2 shadow-sm">
                    <BiSearch size={15} className="text-gray-500 mr-2" />
                    <input
                      type="text"
                      placeholder="Search emojis..."
                      className="flex-1 bg-transparent text-[15px] text-[#939393] focus:outline-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <p className="text-[14px] text-gray-500 mt-2">{selectedGroup}</p>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                  <div className="grid grid-cols-11 gap-1">
                    {filteredEmojis.map((emoji, i) => (
                      <button
                        key={emoji.slug || i}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded"
                        onClick={() => {
                          inputRef.current.value += emoji.character;
                          setTyping(true);
                        }}
                      >
                        {emoji.character}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-200 bg-white p-2 flex justify-around">
                  {EmojiGroups.map((group) => (
                    <RoundedBtn key={group.name} icon={group.icon} onClick={() => setSelectedGroup(group.name)} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Attach Button */}
          <div className="relative attach-menu">
            <RoundedBtn icon={<GiPaperClip size={20} />} onClick={() => setOpenAttach(!openAttach)} />
            {openAttach && (
              <div className="absolute bottom-full mb-2 left-0 bg-white shadow-lg border border-gray-200 rounded-lg w-48 flex flex-col py-2 z-50">
                {/* Each option closes menu after selection */}
                {[
                  { icon: MdOutlineInsertPhoto, label: "Photos & videos" },
                  { icon: IoCameraOutline, label: "Camera" },
                  { icon: IoDocumentTextOutline, label: "Document" },
                  { icon: BiPoll, label: "Poll" },
                  { icon: MdOutlineDraw, label: "Drawing" },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700 text-sm"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <item.icon size={18} /> {item.label}
                  </button>
                ))}
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
              </div>
            )}
          </div>

          {/* Text Input */}
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
      </div>
    </div>
  );
}
