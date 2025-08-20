export default function ChatWithBio({ pp, contact, msg, time, unreadMsgs, active,bio }) {
  return (
    <div className="px-3 py-1">
      <div
        className={`flex flex-row items-center p-2 rounded-lg transition-colors
        ${active ? "bg-gray-200" : "hover:bg-gray-100"}`}
      >
        {/* Profile picture */}
        <img src={pp} alt={contact} className="w-10 h-10 rounded-full mr-3" />

        {/* Chat details */}
        <div className="flex flex-col flex-1">
          {/* First row: contact name + time */}
            <span className="font-medium">{contact}</span>

          {/* Second row: last message + unread count */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 truncate max-w-[200px]">{bio}</span>

          </div>
        </div>
      </div>
    </div>
  );
}
