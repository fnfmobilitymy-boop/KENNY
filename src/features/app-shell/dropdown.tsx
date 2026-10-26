"use client";
import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
export function Dropdown({
  name,
  trigger,
  children,
  kind = "menu",
  className = "",
}: {
  name: string;
  trigger: ReactNode;
  children: ReactNode;
  kind?: "menu" | "listbox";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const popup = useRef<HTMLDivElement>(null);
  const id = useId();
  function close() {
    setOpen(false);
    button.current?.focus();
  }
  useEffect(() => {
    if (!open) return;
    (
      popup.current?.querySelector<HTMLElement>(
        '[role="option"][aria-selected="true"]',
      ) ||
      popup.current?.querySelector<HTMLElement>(
        '[role="menuitem"], [role="option"]',
      )
    )?.focus();
    function outside(e: PointerEvent) {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  return (
    <div
      className={`app-dropdown ${className}`}
      ref={root}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.preventDefault();
          e.stopPropagation();
          close();
        }
      }}
    >
      <Button
        variant="ghost"
        className="app-dropdown-trigger"
        ref={button}
        aria-label={name}
        aria-haspopup={kind}
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        {trigger}
      </Button>
      {open && (
        <div
          id={id}
          ref={popup}
          role={kind}
          aria-label={name}
          className="app-dropdown-panel"
          onClick={(event) => {
            if (
              (event.target as HTMLElement).closest(
                '[role="menuitem"], [role="option"]',
              )
            )
              close();
          }}
          onKeyDown={(e) => {
            const items = Array.from(
              e.currentTarget.querySelectorAll<HTMLElement>(
                '[role="menuitem"], [role="option"]',
              ),
            );
            const current = items.indexOf(
              document.activeElement as HTMLElement,
            );
            let next = current;
            if (e.key === "ArrowDown") next = (current + 1) % items.length;
            else if (e.key === "ArrowUp")
              next = (current - 1 + items.length) % items.length;
            else if (e.key === "Home") next = 0;
            else if (e.key === "End") next = items.length - 1;
            else return;
            e.preventDefault();
            items[next]?.focus();
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
