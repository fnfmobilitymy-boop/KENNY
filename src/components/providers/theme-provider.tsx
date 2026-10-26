"use client";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
function subscribe(callback: () => void) {
  window.addEventListener("kenny-theme", callback);
  return () => window.removeEventListener("kenny-theme", callback);
}
function snapshot() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, snapshot, () => "dark");
  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("kenny-theme", next);
    } catch {}
    window.dispatchEvent(new Event("kenny-theme"));
  }
  return (
    <Button
      variant="ghost"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? "◐ Light" : "◑ Dark"}
    </Button>
  );
}
