// src/components/FavouritesList.jsx
import React from "react";
import { useSelector } from "react-redux";
import TopNAvBar from "./TopNav";
import Chat from "./chat";

export default function FavouritesList() {
  const Favourites = useSelector((state) => state.Favourite.Favourites);

  return (
    <div className="flex flex-col h-10">
      <TopNAvBar />

      <div className="flex-1">
        {Favourites.length === 0 ? (
          <p className="text-center mt-32 text-gray-500 text-lg font-medium">
            No Favourites yet
          </p>
        ) : (
          <div className="w-full">
            {Favourites.map((chat, i) => (
              <Chat
                key={i}
                pp={chat.pp}
                contact={chat.contact}
                msg={chat.msg}
                time={chat.time}
                unreadMsgs={chat.unreadMsgs}
                bio={chat.bio}
                isFavourite={true} 
                isUnread={chat.isUnread}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
