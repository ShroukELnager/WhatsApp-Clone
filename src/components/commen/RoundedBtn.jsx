// RoundedBtn.jsx
import React from 'react'

export default function RoundedBtn({ icon, onClick, color, header }) {
  return (
    <button
  onClick={onClick}
  className="w-10 h-10 flex items-center justify-center rounded-full transition hover:bg-gray-200"
  style={color ? { backgroundColor: color } : {}}
>

      {icon}
      {header && <span className="ml-2 text-sm">{header}</span>}
    </button>
  )
}
