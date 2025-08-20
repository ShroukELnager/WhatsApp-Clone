import React, { useState } from 'react';
import { chatsData } from '../data/whatsapp';
import Chat from './chat';

export default function ChatsWithFilter({ searchTerm }) {
  const [chats] = useState(chatsData);

  const filteredChats = chats.filter(chat =>
    chat.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.msg.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {filteredChats.length > 0 ? (
        filteredChats.map((chat, i) => (
          <Chat
            pp={chat.pp}
            contact={chat.contact}
            msg={chat.msg}
            time={chat.time}
            unreadMsgs={chat.unreadMsgs}
            active={i === 3}
            bio={chat.bio}
            key={i}
          />
        ))
      ) : (
        <p className="text-center text-gray-400 mt-5">No chats found</p>
      )}
    </div>
  );
}
