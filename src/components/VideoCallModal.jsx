import React from "react";
import { chat2 } from "../assets/whatsapp";

const VideoCallModal = ({ isOpen, onClose, type = "video" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-transparent rounded-lg w-[500px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center p-4 border-b border-gray-200 bg-white bg-opacity-90 backdrop-blur-sm">
          <div className="w-12 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
            <img 
              src={chat2} 
              alt="Contact" 
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Girlfriend</h4>
            <p className="text-sm text-gray-500">
              {type === "video" ? "Video Call" : "Voice Call"}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 text-center bg-white bg-opacity-90 backdrop-blur-sm">
          <div className="mb-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-3">
              {type === "video" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              )}
            </div>
            <p className="text-gray-600">Calling...</p>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center space-x-6">
            <button className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 bg-opacity-90 backdrop-blur-sm p-1 text-center">
          <button 
            onClick={onClose}
            className="text-blue-500 font-medium hover:text-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;