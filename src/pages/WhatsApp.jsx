import React, { useEffect, useState } from 'react';
import LeftMenu from '../components/LeftMenu';
import ChatDetail from '../components/ChatDetail';
import RoundedBtn from '../components/commen/RoundedBtn';
import { FaWhatsapp } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineFlipCameraAndroid } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa6";
import { AiOutlineStar } from "react-icons/ai";
import { GoArchive } from "react-icons/go";
import { CiSettings } from "react-icons/ci";
import { IoChatbubbleOutline } from "react-icons/io5";
import { cat } from '../assets/whatsapp';
import { useDispatch, useSelector } from 'react-redux';
import FavouritesList from '../components/FavouritesList';
import { changeActivePage } from '../store/activePage';
import UnreadList from '../components/UnreadList';
import ArchiveList from '../components/ArchiveList';
import LoadingPage from '../components/LoadingePage';

export default function WhatsApp() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const activePage = useSelector((state) => state.ActivePage.activePage);
  const dispatchActivePage = useDispatch();
  const ArchiveCounter = useSelector((state) => state.Archive.counter);

  const handleChange = () => {
    dispatchActivePage(changeActivePage("Chat"));
  };

  useEffect(() => {
    const id = setTimeout(() => {
      if (progress >= 100) setLoading(false);
      else {
        const increment = Math.floor(Math.random() * 10) + 7;
        setProgress(progress + increment);
      }
    }, 300);

    return () => clearTimeout(id);
  }, [progress]);

  return (
    <>
      {loading ? (
        <LoadingPage progress={progress} />
      ) : (
        <div className="flex flex-col h-screen bg-[#F3F3F3] overflow-hidden">

          {/* Header */}
          <div className="flex items-center ml-1 h-8">
            <RoundedBtn icon={<FaWhatsapp size={24} color="#4DA07A" />} />
            <span className="text-[15px] text-gray-800 ml-1">WhatsApp</span>
          </div>

          {/* Main content */}
          <div className="flex flex-row flex-1 overflow-hidden h-[calc(100vh-3rem)]">

            {/* Sidebar */}
            <div className="w-10 flex flex-col justify-between items-center p-2 bg-[#F3F3F3] h-full">

              {/* top icons */}
              <div className="flex flex-col items-center gap-2">
                <RoundedBtn icon={<IoMdMenu size={20} />} />
                <RoundedBtn icon={<IoChatbubbleOutline size={20} />} onClick={handleChange} />
                <RoundedBtn icon={<IoCallOutline size={20} disabled className='text-gray-500 opacity-80 cursor-not-allowed' />} />
                <RoundedBtn icon={<MdOutlineFlipCameraAndroid size={20} disabled className='text-gray-500 opacity-80 cursor-not-allowed' />} />
                <RoundedBtn icon={<FaRegCircle size={20} color="blue" disabled className='text-gray-500 opacity-80 cursor-not-allowed' />} />
              </div>

              {/* bottom icons */}
              <div className="flex flex-col items-center gap-2 relative">
                <RoundedBtn icon={<AiOutlineStar size={20} disabled className='text-gray-500 opacity-80 cursor-not-allowed' />} />

                {/* Archive with Badge */}
                <div className="relative flex items-center justify-center">
                  <RoundedBtn
                    icon={<GoArchive size={20} />}
                    onClick={() => dispatchActivePage(changeActivePage("Archive"))}
                  />
                  {ArchiveCounter > 0 && (
                    <span
                      className="absolute top-1 right-1 bg-green-600 text-white text-[10px] font-bold rounded-full w-3 h-3 flex items-center justify-center shadow-md"
                    >
                      {ArchiveCounter}
                    </span>
                  )}
                </div>

                <hr className="w-full my-2" />
                <RoundedBtn icon={<CiSettings size={20} disabled className='text-gray-500 opacity-80 cursor-not-allowed' />} />

                {/* Profile image */}
                <button className="w-8 h-8 rounded-full overflow-hidden hover:opacity-80 transition">
                  <img src={cat} alt="profile" className="w-full h-full object-cover" />
                </button>
              </div>
            </div>

            {/* LeftMenu */}
            <div className="bg-white min-w-[300px] max-w-[380px] flex flex-col rounded-l-[20px] overflow-hidden h-full">
              {activePage === "Favourite" ? (
                <FavouritesList />
              ) : activePage === "Chat" ? (
                <LeftMenu />
              ) : activePage === "Unread" ? (
                <UnreadList />
              ) : activePage === "Archive" ? (
                <ArchiveList />
              ) : null}
            </div>

            {/* ChatDetail */}
            <div className="bg-white flex-1 rounded-r-[20px] overflow-hidden h-full max-[450px]:hidden">
              <ChatDetail />
            </div>

          </div>
        </div>
      )}
    </>
  );
}
