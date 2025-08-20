import React, { useEffect, useRef, useState } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  value?: string | number;
  onChange: (v: string | number) => void;
  options: Option[];
  className?: string;
  buttonClass?: string;
  menuClass?: string;
}

export function Select({ value, onChange, options, className = "", buttonClass = "", menuClass = "" }: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const selected = options.find((o) => String(o.value) === String(value));

  return (
    <div ref={ref} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className={`flex items-center justify-between gap-2 ${buttonClass} focus:outline-none focus:ring-2 focus:ring-lime-400 rounded`}
      >
        <span className="truncate">{selected?.label ?? "Select"}</span>
        <svg className="h-4 w-4 text-lime-200" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          tabIndex={-1}
          className={`absolute right-0 mt-2 w-56 max-h-60 overflow-auto rounded shadow-lg ring-1 ring-black/30 z-50 ${menuClass}`}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={String(opt.value) === String(value)}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-white/5 ${String(opt.value) === String(value) ? "bg-white/6" : ""}`}
            >
              <span className="text-lime-200">{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;
