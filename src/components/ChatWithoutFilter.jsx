import React, { useState } from 'react';
import {chatsData} from '../data/whatsapp';
import ChatWithBio from './chatWithBio';

export default function ChatWithoutFilter() {
  const [chats, setChat] = useState(chatsData);

  return (
    <div className='flex flex-col overflow-y-auto h-100'>
      {chats.map((chat, i) => {
        return (
          <ChatWithBio
            pp={chat.pp}
            contact={chat.contact}
            msg={chat.msg}
            time={chat.time}
            unreadMsgs={chat.unreadMsgs}
            active={i === 3}
            bio={chat.bio}
            key={i}
          />
          )})}
    </div>
  );
}
