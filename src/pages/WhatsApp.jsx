// WhatsApp.jsx
import React from 'react'
import LeftMenu from '../components/LeftMenu'
import ChatDetail from '../components/ChatDetail'
import RoundedBtn from '../components/commen/RoundedBtn'
import { FaWhatsapp } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineFlipCameraAndroid } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa6";
import { AiOutlineStar } from "react-icons/ai";
import { GoArchive } from "react-icons/go";
import { CiSettings } from "react-icons/ci";
import { IoChatbubbleOutline } from "react-icons/io5";
import { cat} from '../assets/whatsapp';

export default function WhatsApp() {
  return (
    <div className="flex flex-col h-screen bg-[#F3F3F3] overflow-hidden ">
      {/* Header */}
      <div className="flex items-center ml-1  ">
        <RoundedBtn icon={<FaWhatsapp size={24} color="#4DA07A" />} />
        <span className="text-[15px] text-gray-800 ml-1">WhatsApp</span>
      </div>

      {/* Main content */}
      <div className="flex flex-row flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-[50px] flex flex-col justify-between items-center p-2 bg-[#F3F3F3] ">
          {/* top icons */}
          <div className="flex flex-col items-center">
            <RoundedBtn icon={<IoChatbubbleOutline size={20} />} />
            <RoundedBtn icon={<IoMdMenu size={20} />} />
            <RoundedBtn icon={<IoCallOutline size={20} />} />
            <RoundedBtn icon={<MdOutlineFlipCameraAndroid size={20} />} />
            <RoundedBtn icon={<FaRegCircle size={20} color="blue" />} />
          </div>

          {/* bottom icons */}
          <div className="flex flex-col items-center">
            <RoundedBtn icon={<AiOutlineStar size={20} />} />
            <RoundedBtn icon={<GoArchive size={20} />} />
            <hr className="w-full my-2" />
            <RoundedBtn icon={<CiSettings size={20} />} />

            {/* Profile image as icon */}
            <button className="w-10 h-10 rounded-full overflow-hidden hover:opacity-80 transition">
              <img
                src={cat}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        {/* LeftMenu */}
        <div className="bg-white min-w-[300px] max-w-[380px] flex flex-col rounded-l-[20px] overflow-hidden">
          <LeftMenu />
        </div>

        {/* ChatDetail */}
        <div className="bg-[#222f35] flex-1 rounded-r-[20px] overflow-hidden ml-[69px]">
          <ChatDetail />
        </div>
      </div>
    </div>
  );
}

