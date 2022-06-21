import React from "react";

export default function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`rounded-sm text-white px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-600 ${className}`}
    >
      {children}
    </button>
  );
}
