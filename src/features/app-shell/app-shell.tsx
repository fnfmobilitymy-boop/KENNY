"use client";
import { useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { AppPreviewProvider } from "./app-context";
import { AppSidebar } from "./app-sidebar";
import { AppTopbar } from "./app-topbar";
import { plannedModules } from "@/demo/dashboard";
import { normalizeAppPath } from "@/lib/app-navigation";
import { trapDialogFocus } from "@/lib/dialog-focus";
export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawer = useRef<HTMLDialogElement>(null);
  const path = normalizeAppPath(usePathname());
  const current =
    plannedModules.find((m) => path === `/app/${m.slug}`)?.name ||
    "AI Command Center";
  function openDrawer() {
    drawer.current?.showModal();
    setDrawerOpen(true);
  }
  return (
    <AppPreviewProvider>
      <div className="app-shell" data-collapsed={collapsed}>
        <div id="desktop-studio-sidebar" className="desktop-studio-sidebar">
          <AppSidebar />
        </div>
        <div className="app-shell-body">
          <AppTopbar
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
            onOpenDrawer={openDrawer}
            drawerOpen={drawerOpen}
          />
          <main id="main" className="app-main" tabIndex={-1}>
            <nav aria-label="Breadcrumb" className="app-breadcrumb">
              <ol>
                <li>
                  <Link href="/app">Studio</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{current}</li>
              </ol>
              <span className="app-demo-label">FRONTEND DEMO</span>
            </nav>
            {children}
            <footer className="app-footer">
              <span>Kenny AI Business Studio · Phase 1 demo</span>
              <span>Nothing here runs AI or saves business data.</span>
              <Link href="/">
                Public website <Icon name="diagonal" />
              </Link>
            </footer>
          </main>
        </div>
      </div>
      <dialog
        ref={drawer}
        id="studio-mobile-drawer"
        className="app-mobile-drawer"
        aria-label="Studio navigation drawer"
        onKeyDown={trapDialogFocus}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const r = e.currentTarget.getBoundingClientRect();
            if (e.clientX < r.left || e.clientX > r.right)
              drawer.current?.close();
          }
        }}
        onClose={() => {
          setDrawerOpen(false);
          document
            .querySelector<HTMLButtonElement>('[aria-label="Open navigation"]')
            ?.focus();
        }}
      >
        <Button
          variant="ghost"
          className="drawer-close app-icon-button"
          aria-label="Close navigation"
          onClick={() => drawer.current?.close()}
        >
          <Icon name="close" />
        </Button>
        <AppSidebar onNavigate={() => drawer.current?.close()} />
      </dialog>
    </AppPreviewProvider>
  );
}
