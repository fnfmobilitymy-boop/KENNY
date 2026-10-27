"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { plannedModules } from "@/demo/dashboard";
import { searchPages } from "@/lib/app-navigation";
import { trapDialogFocus } from "@/lib/dialog-focus";
const entries = [
  {
    href: "/app",
    name: "Dashboard",
    group: "OVERVIEW",
    description: "AI Command Center · Demo",
  },
  {
    href: "/onboarding",
    name: "Organization setup",
    group: "PREVIEW",
    description: "Eight-step frontend setup preview",
  },
  ...plannedModules.map((m) => ({
    href: `/app/${m.slug}`,
    name: m.name,
    group: m.group,
    description: `${m.availability === "prototype" ? "Local prototype" : "Coming soon"} · ${m.description}`,
  })),
];
export function CommandSearch() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [query, setQuery] = useState("");
  const results = searchPages(query, entries);
  useEffect(() => {
    function shortcut(e: KeyboardEvent) {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key.toLowerCase() === "k" &&
        !document.querySelector("dialog[open]")
      ) {
        e.preventDefault();
        dialog.current?.showModal();
      }
    }
    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, []);
  return (
    <>
      <Button
        variant="ghost"
        ref={trigger}
        className="command-trigger"
        aria-label="Search pages and modules"
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
      >
        <Icon name="search" />
        <span>Search your studio</span>
        <kbd>Ctrl K</kbd>
      </Button>
      <dialog
        ref={dialog}
        className="command-dialog"
        aria-labelledby="command-title"
        onKeyDown={trapDialogFocus}
        onClose={() => {
          setQuery("");
          trigger.current?.focus();
        }}
      >
        <div className="command-dialog-header">
          <div>
            <p className="eyebrow">FIND YOUR NEXT STEP</p>
            <h2 id="command-title">Search your studio.</h2>
          </div>
          <Button
            variant="ghost"
            aria-label="Close search"
            onClick={() => dialog.current?.close()}
          >
            <Icon name="close" />
          </Button>
        </div>
        <label className="field">
          <span>Find a page or module</span>
          <input
            type="search"
            autoFocus
            placeholder="Try website, images or settings…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                dialog.current
                  ?.querySelector<HTMLElement>(".command-result")
                  ?.focus();
              }
            }}
          />
        </label>
        <p className="command-result-count" role="status">
          {results.length} {results.length === 1 ? "result" : "results"} ·
          Modules open local frontend prototypes. No AI service is connected.
        </p>
        <ul
          className="command-results"
          onKeyDown={(e) => {
            const items = Array.from(
              e.currentTarget.querySelectorAll<HTMLAnchorElement>("a"),
            );
            const current = items.indexOf(
              document.activeElement as HTMLAnchorElement,
            );
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              e.preventDefault();
              items[
                (current + (e.key === "ArrowDown" ? 1 : items.length - 1)) %
                  items.length
              ]?.focus();
            }
          }}
        >
          {results.map((result) => (
            <li key={result.href}>
              <Link
                className="command-result"
                href={result.href}
                onClick={() => dialog.current?.close()}
              >
                <Icon name="diagonal" />
                <span>
                  <strong>{result.name}</strong>
                  <small>{result.description}</small>
                </span>
                <span className="search-group">{result.group}</span>
              </Link>
            </li>
          ))}
        </ul>
        {!results.length && (
          <div className="search-empty">
            <Icon name="search" />
            <h3>No matching pages.</h3>
            <p>Try a module name, such as “image”, or clear your search.</p>
            <Button variant="secondary" onClick={() => setQuery("")}>
              Clear search
            </Button>
          </div>
        )}
        <p className="command-footnote">
          Page search only. No AI request or business data search is performed.
        </p>
      </dialog>
    </>
  );
}
