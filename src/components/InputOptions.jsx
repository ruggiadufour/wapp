import React, { useState } from "react";
import Input from "./Input";

export default function InputOptions({
  options = [],
  loading = false,
  onSelectOption = () => {},
  ...props
}) {
  const [isFocused, setIsFocused] = useState(true);

  return (
    <div className="relative">
      <Input loading={loading} {...props} />
      {isFocused && (
        <div className="absolute text-white bottom-100 max-h-96 overflow-auto w-full mt-1">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelectOption(option)}
              className="bg-slate-700 hover:bg-gradient-to-r from-pink-600 to-purple-400 p-1 hover:cursor-pointer w-full text-left"
            >
              <div className="bg-slate-700 py-3 px-3">
                <span>{option.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
