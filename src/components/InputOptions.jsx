import React, { useEffect, useState } from "react";
import { debounce } from "../utils/helpers";
import Input from "./Input";

let onDebouncedChange = () => {};

export default function InputOptions({
  options = [],
  loading = false,
  onSelectOption = () => {},
  ...props
}) {
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    onDebouncedChange = debounce((value) => setShowOptions(value), 1000);
  });

  function onInteraction(status) {
    if (!status) {
      onDebouncedChange(false);
    } else {
      setShowOptions(status);
    }
  }

  return (
    <div
      className="relative"
      onFocus={() => onInteraction(true)}
      onBlur={() => onInteraction(false)}
    >
      <Input loading={loading} {...props} />
      {showOptions && (
        <div className="absolute z-10 text-white bottom-100 max-h-96 overflow-auto w-full pt-1">
          {options.map((option) => (
            <button
              onFocus={() => onInteraction(true)}
              onBlur={() => onInteraction(true)}
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
