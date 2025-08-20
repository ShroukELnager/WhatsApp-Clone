import React from "react";

function Message({ msg, time, isLink, img, sent }) {
  return (
    // Message container
    <div
      className={`flex flex-col rounded-lg w-fit my-2 text-[#000] ${
        sent ? "bg-[#dcf8c6] ml-auto" : "bg-[#FFF] mr-auto"
      }`}
      style={{ maxWidth: "280px" }}
    >
      {/* Image message */}
      {img ? (
        <div className="relative">
          <img
            src={img}
            alt="img_message"
            className="rounded-md max-w-[260px] w-full"
          />
          <p className="absolute right-2 bottom-1 text-[#8796a1] text-[11px]">
            {time}
          </p>
        </div>
      ) : (
        // Text / Link message
        <div className="px-2 py-1">
          {isLink ? (
            <a
              href={msg}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[14px] underline hover:text-[#53beec] truncate"
              style={{
                maxWidth: "240px",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
              }}
            >
              {msg}
            </a>
          ) : (
            <p className="text-[14px] leading-snug m-0">{msg}</p>
          )}
          {/* Time directly under message, aligned right */}
          <p className="text-[#8796a1] text-[10px] text-right m-0">{time}</p>
        </div>
      )}
    </div>
  );
}

export default Message;
