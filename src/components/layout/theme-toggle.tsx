"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Laptop, Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="h-8 px-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] opacity-40 flex items-center gap-1.5 text-xs">
        <Laptop className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Sistema</span>
      </div>
    );
  }

  const options = [
    { value: "system", label: "Sistema", icon: Laptop },
    { value: "light", label: "Claro", icon: Sun },
    { value: "dark", label: "Oscuro", icon: Moon },
  ];

  const currentOption =
    options.find((opt) => opt.value === theme) || options[0];
  const CurrentIcon = currentOption.icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 px-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--border)]/40 text-[var(--foreground)] flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer shadow-xs"
        aria-label="Seleccionar tema visual"
        aria-expanded={isOpen}
      >
        <CurrentIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span className="hidden sm:inline">{currentOption.label}</span>
        <ChevronDown
          className={`w-3 h-3 text-[var(--muted)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 rounded-xl border border-[var(--border)] bg-[var(--card)] py-1 shadow-lg z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-2 py-1 text-[10px] uppercase font-mono text-[var(--muted)] tracking-wider border-b border-[var(--border)] mb-1">
            Tema Visual
          </div>

          {options.map((option) => {
            const Icon = option.icon;
            const isSelected = theme === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setTheme(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-2.5 py-1.5 flex items-center justify-between text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-medium"
                    : "text-[var(--foreground)] hover:bg-[var(--border)]/40"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{option.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
