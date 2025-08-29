export default function Chat({
  pp,
  contact,
  msg,
  time,
  unreadMsgs,
  active,
  bio,
  onContextMenu,
  isArchived,
  isUnread,
}) {
  return (
    <div className="px-3 py-1">
      <div
        className={`flex flex-row items-center p-1 rounded-lg transition-colors
        ${active ? "bg-gray-200" : "hover:bg-gray-100"}`}
        onContextMenu={onContextMenu}
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

          {/* Second row: last message + Archive + unread */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 truncate max-w-[200px]">
              {msg}
            </span>

            <div className="flex items-center gap-2">
              {isArchived && (
                <span className="text-[11px] bg-green-700 text-white px-1 rounded">
                  Archive
                </span>
              )}

              {isUnread && (
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
              )}

              {unreadMsgs > 0 && (
                <span className="ml-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadMsgs}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
