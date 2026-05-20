"use client";

import { useState, useRef } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  large?: boolean;
}

export default function SearchBar({ value, onChange, placeholder, large = false }: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: large ? 680 : "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "white",
          borderRadius: large ? 20 : 14,
          border: `2px solid ${focused ? "#16a34a" : "#e2f0e8"}`,
          boxShadow: focused
            ? "0 8px 32px rgba(22,163,74,0.2)"
            : "0 4px 16px rgba(22,163,74,0.08)",
          transition: "all 0.25s ease",
          overflow: "hidden",
          padding: large ? "0.75rem 1.25rem" : "0.5rem 1rem",
        }}
      >
        <Search
          size={large ? 22 : 18}
          style={{ color: focused ? "#16a34a" : "#9ca3af", flexShrink: 0, transition: "color 0.2s" }}
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder || "ابحث عن دواء بالاسم التجاري أو العلمي..."}
          dir="auto"
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: large ? 17 : 14,
            color: "#1a2e1c",
            padding: "0 0.75rem",
            fontFamily: "inherit",
          }}
          aria-label="البحث عن دواء"
        />
        {value && (
          <button
            onClick={() => { onChange(""); inputRef.current?.focus(); }}
            style={{
              background: "#f0fdf4",
              border: "none",
              borderRadius: "50%",
              width: 28,
              height: 28,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6b7c6e",
              flexShrink: 0,
            }}
            aria-label="مسح البحث"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
