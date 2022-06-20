import React from "react";

export default function Input({ loading = false, ...props }) {
  return (
    <div className="p-1 rounded-sm bg-gradient-to-r from-purple-400 to-pink-600">
      <input
        className="p-1 rounded-sm text-gray-200 placehoder:text-white outline-0 bg-slate-600"
        type="text"
        {...props}
      />
      {loading && (
        <span className="absolute right-[10px] top-1/4 translate-x-[-50%] translate-y-[-50%] origin-center animate-bounce">
          ⏳️
        </span>
      )}
    </div>
  );
}
