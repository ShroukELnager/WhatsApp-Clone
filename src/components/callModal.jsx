import React from "react";
import { IoMdCall } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { pp } from "../assets/whatsapp";

export default function CallEndedModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] text-white rounded-xl w-96 p-6 flex flex-col items-center relative">
        {/* Profile Picture */}
        <img
          src={pp}
          alt="chat profile"
          className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4"
        />

        {/* Name */}
        <h2 className="text-xl font-semibold">Shrouk</h2>
        <p className="text-gray-400 mt-1">Call Start</p>

        {/* Buttons */}
        <div className="flex mt-6 w-full justify-around">
          {/* Message Button */}
          <button className="flex flex-col items-center gap-1 text-gray-300 hover:text-white">
            <BsChatDots size={24} />
            <span className="text-sm">Message</span>
          </button>

          {/* Call Again */}
          <button className="flex flex-col items-center gap-1 text-white bg-green-500 p-3 rounded-full hover:bg-green-600">
            <IoMdCall size={24} />
            <span className="text-sm">Calling</span>
          </button>

          {/* Close */}
          <button
            className="flex flex-col items-center gap-1 text-gray-300 hover:text-white"
            onClick={onClose}
          >
            <AiOutlineClose size={24} />
            <span className="text-sm">Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
