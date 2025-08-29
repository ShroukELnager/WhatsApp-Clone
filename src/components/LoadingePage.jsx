import React from "react";
import { BsWhatsapp } from "react-icons/bs";
import { FaLock } from "react-icons/fa";

function LoadingPage({ progress }) {
    return (
        <div className="flex flex-col justify-center items-center bg-[#F0F2F5] w-screen h-screen">
            {/* WhatsApp Icon */}
            <span className="text-[#b4b8b9] text-7xl my-12">
                <BsWhatsapp />
            </span>

            {/* Loading bar */}
            <div className="w-[320px] h-[3px] bg-[#d9dadc] rounded-full overflow-hidden mb-6">
                <div
                    className="h-full bg-[#4daf7c]  transition-all duration-300 ease-in-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Text section */}
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-[#687782] text-sm font-medium">Organizing messages</h1>

                <div className="flex items-center gap-2 text-[#687782] text-xs">
                    <FaLock className="text-[#4daf7c]" />
                    <p className="m-0">End-to-end encrypted</p>
                </div>

            </div>
        </div>
    );
}

export default LoadingPage;
