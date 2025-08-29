// // src/components/UnreadList.jsx
// import React from "react";
// import { useSelector } from "react-redux";
// import TopNAvBar from "./TopNav";
// import Chat from "./chat";
// import { chatsData } from "../data/whatsapp";

// export default function UnreadList() {
//   const markedList = useSelector((state) => state.Unread.unreadList || []);

//   // Chats that have unreadMsgs > 0 (from your data source)
//   const chatsWithUnreadMsgs = chatsData.filter(
//     (c) => Number(c.unreadMsgs) > 0
//   );

//   // Combine both sets (chatsWithUnreadMsgs + markedList) and dedupe by contact
//   const mapByContact = new Map();
//   chatsWithUnreadMsgs.forEach((c) => mapByContact.set(c.contact, c));
//   markedList.forEach((m) => mapByContact.set(m.contact, m)); // ensure marked chats included

//   const combined = Array.from(mapByContact.values());

//   return (
//     <div className="flex flex-col h-10">
//       <TopNAvBar />

//       <div className="flex-1 flex justify-center items-start">
//         {combined.length === 0 ? (
//           <p className="mt-32 text-gray-500 text-lg font-medium">No unread yet</p>
//         ) : (
//           <div className="w-full -top-[200px]">
//             {combined.map((chat, i) => (
//               <Chat
//                 key={i}
//                 pp={chat.pp}
//                 contact={chat.contact}
//                 msg={chat.msg}
//                 time={chat.time}
//                 unreadMsgs={chat.unreadMsgs}
//                 bio={chat.bio}
//                 // mark the green dot only if this chat is in the markedList
//                 isUnread={markedList.some((u) => u.contact === chat.contact)}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// src/components/UnreadList.jsx
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////






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
