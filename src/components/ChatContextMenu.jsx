// src/components/ChatContextMenu.jsx
import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite } from "../store/FavouriteSlice";
import { MdOutlineMarkChatUnread, MdFavoriteBorder } from "react-icons/md";
import { BsArchive } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { addArchive, removeArchive } from "../store/ArchiveSlice";
import { addUnread, removeUnread } from "../store/unreadList";
import { AiOutlineAudioMuted } from "react-icons/ai";
import { VscGitStashPop } from "react-icons/vsc";
import { GrClearOption } from "react-icons/gr";

const MenuItem = ({ icon, label, danger, onClick, disabled }) => (
  <button
    onClick={disabled ? undefined : onClick} 
    disabled={disabled} // HTML disabled attribute
    className={`flex items-center gap-2 w-full px-3 py-2 ${
      danger ? "text-red-600" : "text-gray-700"
    } text-sm whitespace-nowrap ${
      disabled ? "text-gray-400 opacity-70 cursor-not-allowed" : "hover:bg-gray-100"
    }`}
  >
    {icon}
    {label}
  </button>
);

const ChatContextMenu = ({ position, onClose, chatData }) => {
  const menuRef = useRef(null);
  const [menuPos, setMenuPos] = useState(position);
  const dispatch = useDispatch();

  const isFavourite = useSelector((state) =>
    state.Favourite.Favourites.some((c) => c.contact === chatData?.contact)
  );
  const isArchive = useSelector((state) =>
    state.Archive.archiveList.some((c) => c.contact === chatData?.contact)
  );
  const isUnread = useSelector((state) =>
    state.Unread.unreadList.some((c) => c.contact === chatData?.contact)
  );

  // Auto-adjust position to avoid overflow
  useEffect(() => {
    if (!position) return;
    const menuHeight = 260;
    const menuWidth = 220;
    let newY = position.y;
    let newX = position.x;

    if (window.innerHeight - position.y < menuHeight) newY = position.y - menuHeight;
    if (window.innerWidth - position.x < menuWidth) newX = position.x - menuWidth;

    setMenuPos({ x: newX, y: newY });
  }, [position]);

  // Close if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!position) return null;

  return createPortal(
    <div
      ref={menuRef}
      className="fixed bg-white shadow-md rounded-md py-1 z-50 w-56 border border-gray-200 font-sans text-sm"
      style={{
        top: menuPos?.y,
        left: menuPos?.x,
      }}
    >
      <MenuItem
        icon={<MdOutlineMarkChatUnread size={14} />}
        label={isUnread ? "Mark as read" : "Mark as unread"}
        onClick={() => {
          if (isUnread) {
            dispatch(removeUnread(chatData));
          } else {
            dispatch(addUnread(chatData));
          }
          onClose();
        }}
      />

      <MenuItem
        icon={<MdFavoriteBorder size={14} />}
        label={isFavourite ? "Remove from Favourites" : "Add to Favourites"}
        onClick={() => {
          if (isFavourite) {
            dispatch(removeFavourite(chatData));
          } else {
            dispatch(addFavourite(chatData));
          }
          onClose();
        }}
      />

      <div className="border-t border-gray-100 my-1"></div>

      <MenuItem
        icon={<AiOutlineAudioMuted size={14} />}
        label="Mute"
        disabled
      />

      <MenuItem
        icon={<BsArchive size={14} />}
        label={isArchive ? "Remove from archives" : "Add to archives"}
        onClick={() => {
          if (isArchive) {
            dispatch(removeArchive(chatData));
          } else {
            dispatch(addArchive(chatData));
          }
          onClose();
        }}
      />

      <div className="border-t border-gray-100 my-1"></div>

      <MenuItem
        icon={<GrClearOption size={14} />}
        label="Clear"
        disabled
      />
      <MenuItem
        icon={<RiDeleteBin6Line size={14} />}
        label="Delete"
        danger
        disabled
      />

      <div className="border-t border-gray-100 my-1"></div>

      <MenuItem
        icon={<VscGitStashPop size={14} />}
        label="Pop-out"
        disabled
      />
    </div>,
    document.body
  );
};

export default ChatContextMenu;
