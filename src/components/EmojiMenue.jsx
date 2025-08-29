import { useState, useEffect } from "react";

export default function EmojiMenu({ onSelect }) {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://emojihub.yurace.pro/api/all?utm_source=chatgpt.com")
      .then((res) => res.json())
      .then((data) => {
        // extract unique groups
        const uniqueGroups = [...new Set(data.map(item => item.group))];
        setGroups(uniqueGroups);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="w-80 p-2 text-center">Loading...</div>;

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
