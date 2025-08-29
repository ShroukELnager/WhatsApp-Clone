import React, { useState } from 'react';
import { chatsData } from '../data/whatsapp';
import Chat from './chat';
import { useSelector } from "react-redux";

export default function ChatsWithFilter({ searchTerm, onContextMenu }) {
  const [chats] = useState(chatsData);

  const archiveList = useSelector((state) => state.Archive.archiveList);
  const unreadList = useSelector((state) => state.Unread.unreadList); 

  const filteredChats = chats.filter(chat =>
    chat.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.msg.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {filteredChats.length > 0 ? (
        filteredChats.map((chat, i) => {
          const isArchived = archiveList.some((c) => c.contact === chat.contact);
          const isUnread = unreadList.some((c) => c.contact === chat.contact);

          return (
            <Chat
              pp={chat.pp}
              contact={chat.contact}
              msg={chat.msg}
              time={chat.time}
              unreadMsgs={chat.unreadMsgs}
              active={i === 2}
              bio={chat.bio}
              key={i}
              isArchived={isArchived}
              isUnread={isUnread} 
              onContextMenu={(e) => onContextMenu && onContextMenu(e, chat)}
            />
          );
        })
      ) : (
        <p className="text-center text-gray-400 mt-5">No chats found</p>
      )}
    </div>
  );
}
