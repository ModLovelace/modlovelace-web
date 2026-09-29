"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-sm border border-[#e3dfd4] dark:border-[#1f2228] bg-transparent opacity-40" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-8 h-8 rounded-sm border border-[#e3dfd4] dark:border-[#1f2228] bg-transparent hover:bg-[#eae6db] dark:hover:bg-[#181a1e] text-[#16171a] dark:text-[#eae7e1] flex items-center justify-center transition-colors"
      aria-label={isDark ? "Cambiar a modo papel Washi (claro)" : "Cambiar a modo tinta Sumi (oscuro)"}
    >
      {isDark ? <Sun className="w-3.5 h-3.5 text-[#e05244]" /> : <Moon className="w-3.5 h-3.5 text-[#16171a]" />}
    </button>
  );
}
