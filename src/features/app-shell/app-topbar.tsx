"use client";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ThemeToggle } from "@/components/providers/theme-provider";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { CommandSearch } from "./command-search";
import { NotificationMenu } from "./notification-menu";
import { UserMenu } from "./user-menu";
export function AppTopbar({
  collapsed,
  onCollapse,
  onOpenDrawer,
  drawerOpen,
}: {
  collapsed: boolean;
  onCollapse: () => void;
  onOpenDrawer: () => void;
  drawerOpen: boolean;
}) {
  return (
    <header className="app-topbar">
      <Button
        variant="ghost"
        className="desktop-sidebar-toggle app-icon-button"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!collapsed}
        aria-controls="desktop-studio-sidebar"
        onClick={onCollapse}
      >
        <Icon name="collapse" />
      </Button>
      <Button
        variant="ghost"
        className="mobile-sidebar-toggle app-icon-button"
        aria-label="Open navigation"
        aria-expanded={drawerOpen}
        aria-controls="studio-mobile-drawer"
        onClick={onOpenDrawer}
      >
        <Icon name="menu" />
      </Button>
      <WorkspaceSwitcher />
      <div className="app-topbar-actions">
        <CommandSearch />
        <ThemeToggle />
        <NotificationMenu />
        <UserMenu />
      </div>
    </header>
  );
}
