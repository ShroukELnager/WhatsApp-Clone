// components/FavouritesList.jsx
import React from "react";
import { cat } from "../assets/whatsapp";

export default function FavouritesList() {
  // Fake favourites data (later you can fetch real data)
  const favourites = [
    { id: 1, name: "Alice", lastMsg: "See you soon!", img: cat },
    { id: 2, name: "Bob", lastMsg: "Let's meet tomorrow", img: cat },
  ];

  return (
    <div className="flex flex-col">
      {favourites.length > 0 ? (
        favourites.map((fav) => (
          <div
            key={fav.id}
            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <img
              src={fav.img}
              alt={fav.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{fav.name}</span>
              <span className="text-sm text-gray-500">{fav.lastMsg}</span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-10">
          ⭐ No favourites yet
        </p>
      )}
    </div>
  );
}
