// src/components/ArchiveList.jsx
import React from "react";
import { useSelector } from "react-redux";
import TopNAvBar from "./TopNav";
import Chat from "./chat"; 

export default function ArchiveList() {
  const archiveList = useSelector((state) => state.Archive.archiveList);

  return (
    <div className="flex flex-col h-10 ">
      <TopNAvBar />

      <div className="flex-1">
        {archiveList.length === 0 ? (
          <p className="text-center mt-10 text-gray-500 text-lg font-medium">
            No archives yet
          </p>
        ) : (
          <div className="w-full">
            {archiveList.map((chat, i) => (
              <Chat
                key={i}
                pp={chat.pp}
                contact={chat.contact}
                msg={chat.msg}
                time={chat.time}
                unreadMsgs={chat.unreadMsgs}
                bio={chat.bio}
                isArchived={true} 
                isUnread={chat.isUnread}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
