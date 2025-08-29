import { useEffect, useState } from "react";

export default function EmojiGroupsList() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch("https://emojihub.yurace.pro/api/all?utm_source=chatgpt.com")
      .then(res => res.json())
      .then(data => {
        // استخرج القيم الفريدة من group
        const uniqueGroups = [...new Set(data.map(item => item.group))];
        setGroups(uniqueGroups);
      })
      .catch(err => console.error("Failed to fetch emojis:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Emoji Groups</h2>
      <ul className="list-disc list-inside">
        {groups.map((group, index) => (
          <li key={index}>{group}</li>
        ))}
      </ul>
    </div>
  );
}
