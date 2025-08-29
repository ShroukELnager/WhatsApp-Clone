
// src/components/UnreadList.jsx
import React from "react";
import { useSelector } from "react-redux";
import TopNAvBar from "./TopNav";
import Chat from "./chat";

export default function UnreadList() {
  const unreadList = useSelector((state) => state.Unread.unreadList);

  return (
    <div className="flex flex-col h-10">
      <TopNAvBar />

      <div className="flex-1 flex justify-center items-start">
        {unreadList.length === 0 ? (
          <p className="mt-32 text-gray-500 text-lg font-medium">
            No unread yet
          </p>
        ) : (
          <div className="w-full -top-[200px]">
            {unreadList.map((chat, i) => (
              <Chat
                key={i}
                pp={chat.pp}
                contact={chat.contact}
                msg={chat.msg}
                time={chat.time}
                unreadMsgs={chat.unreadMsgs}
                bio={chat.bio}
                isUnread={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
