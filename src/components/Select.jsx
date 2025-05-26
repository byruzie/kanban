import { useEffect, useRef, useState } from "react";

export const Select = ({ list, onChange, selected }) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  // fecha a lista de opções ao clicar fora das opções
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="relative w-[142px]">
      <div
        onClick={() => setOpen(!open)}
        className={`flex items-center border justify-between border-neutral-200 pl-2 pr-1 py-1 rounded-sm cursor-pointer text-neutral-800 font-light ${
          selected ? selected.name : "text-gray-400"
        }`}
      >
        {selected ? selected.name : "Select an option"}
        <span className="material-symbols-outlined text-neutral-400">
          keyboard_arrow_down
        </span>
      </div>
      {open && (
        <ul className="absolute w-[154px] z-10 bg-neutral-50 border border-neutral-200 mt-1 rounded-sm shadow">
          {list.map((option) => (
            <li
              key={option.id}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className="px-3 py-2 hover:bg-neutral-100 cursor-pointer flex items-center gap-2 font-base"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
