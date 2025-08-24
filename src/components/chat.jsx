export default function Chat({ pp, contact, msg, time, unreadMsgs, active, bio, onContextMenu }) {
  return (
    <div className="px-3 py-1">
      <div
        className={`flex flex-row items-center p-3 rounded-lg transition-colors
        ${active ? "bg-gray-200" : "hover:bg-gray-100"}`}
        onContextMenu={onContextMenu} // 👈 هنا نمسك كليك يمين
      >
        {/* Profile picture */}
        <img src={pp} alt={contact} className="w-10 h-10 rounded-full mr-3" />

        {/* Chat details */}
        <div className="flex flex-col flex-1">
          {/* First row: contact name + time */}
          <div className="flex justify-between items-center">
            <span className="font-medium">{contact}</span>
            <span className="text-xs text-gray-500">{time}</span>
          </div>

          {/* Second row: last message + unread count */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 truncate max-w-[200px]">{msg}</span>

            {unreadMsgs > 0 && (
              <span className="ml-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadMsgs}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
