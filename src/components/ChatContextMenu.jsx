// src/components/ChatContextMenu.jsx
import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite } from "../store/FavouriteSlice";
import { MdOutlineMarkChatUnread, MdFavoriteBorder, MdOutlinePushPin } from "react-icons/md";
import { BsArchive } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { addArchive, removeArchive } from "../store/ArchiveSlice";
import { addUnread, removeUnread } from "../store/unreadList";

const MenuItem = ({ icon, label, danger, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 ${
      danger ? "text-red-600" : "text-gray-700"
    } text-sm whitespace-nowrap`} // prevent line break
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
  const isArchive = useSelector((state) => state.Archive.archiveList)
    .some((c) => c.contact === chatData?.contact);
  const isUnread = useSelector((state) => state.Unread.unreadList)
    .some((c) => c.contact === chatData?.contact);

  // Auto-adjust position to avoid overflow
  useEffect(() => {
    if (!position) return;
    const menuHeight = 260; // bigger since items got taller
    const menuWidth = 220;  // increase width
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
      {/* <MenuItem icon={<MdOutlinePushPin size={14} />} label="Pin to top" /> */}
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

      {/* <MenuItem icon={<AiOutlineAudioMuted size={14} />} label="Mute" /> */}
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

      {/* <MenuItem icon={<GrClearOption size={14} />} label="Clear" /> */}
      <MenuItem icon={<RiDeleteBin6Line size={14} />} label="Delete" danger />

      <div className="border-t border-gray-100 my-1"></div>

      {/* <MenuItem icon={<VscGitStashPop size={14} />} label="Pop-out" /> */}
    </div>,
    document.body
  );
};


export default ChatContextMenu;
