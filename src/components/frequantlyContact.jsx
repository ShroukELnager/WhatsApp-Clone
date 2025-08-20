import React, { useState } from 'react';
import {frequantContact} from '../data/whatsapp';
import ChatWithBio from './chatWithBio';

export default function FrequantlyChats() {
  const [chats, setChat] = useState(frequantContact);

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
