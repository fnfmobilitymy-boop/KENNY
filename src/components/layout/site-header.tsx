"use client";
import { Icon } from "@/components/ui/icon";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Brand } from "@/components/brand/brand";
import { ThemeToggle } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <header className="site-header" ref={header}>
      <div className="container nav-inner">
        <Brand />
        <div className="nav-controls">
          <ThemeToggle />
          <Button
            ref={toggle}
            variant="ghost"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? "Close" : "Menu"}{" "}
            <span aria-hidden="true">{open ? "×" : "☰"}</span>
          </Button>
        </div>
        <nav
          id="site-navigation"
          className={`site-nav ${open ? "is-open" : ""}`}
          aria-label="Main navigation"
          onClick={() => setOpen(false)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
          }}
        >
          <a href="#modules">Modules</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <Link href="/design-system">
            Design system <Icon name="diagonal" />
          </Link>
          <a className="nav-cta" href="#product-preview">
            Explore the concept <Icon name="diagonal" />
          </a>
        </nav>
      </div>
    </header>
  );
}
