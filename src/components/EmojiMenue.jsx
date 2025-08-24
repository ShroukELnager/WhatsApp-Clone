import { useState, useEffect } from "react";

export default function EmojiMenu({ onSelect }) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch("https://emoji-api.com/emojis?access_key=61fd6b21a58ce59d14a3fa1cfc6e37c787e50d08")
      .then(res => res.json())
      .then(data => {
        // extract unique groups
        const uniqueGroups = [...new Set(data.map(item => item.group))];
        setGroups(uniqueGroups);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="w-80 bg-white border border-gray-300 rounded-lg p-2 h-[220px] overflow-y-auto">
      <div className="grid grid-cols-2 gap-2">
        {groups.map((group, i) => (
          <button
            key={i}
            className="w-full py-2 px-3 text-left hover:bg-gray-100 rounded text-sm font-medium"
            onClick={() => onSelect?.(group)}
          >
            {group}
          </button>
        ))}
      </div>
    </div>
  );
}
