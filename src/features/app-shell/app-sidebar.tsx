"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "@/components/brand/brand";
import { Icon } from "@/components/ui/icon";
import { plannedModules } from "@/demo/dashboard";
import { normalizeAppPath } from "@/lib/app-navigation";
const groups = ["OVERVIEW", "CREATE", "GROW", "MANAGE", "ACCOUNT"] as const;
export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = normalizeAppPath(usePathname());
  return (
    <aside className="app-sidebar">
      <div className="app-sidebar-brand">
        <Brand />
        <span className="sidebar-preview-label">BUSINESS OPERATING STUDIO</span>
      </div>
      <nav aria-label="Studio navigation">
        {groups.map((group) => (
          <section className="app-nav-group" key={group}>
            <h2>{group}</h2>
            <ul>
              {group === "OVERVIEW" && (
                <li>
                  <Link
                    href="/app"
                    aria-label="Dashboard"
                    title="Dashboard"
                    aria-current={pathname === "/app" ? "page" : undefined}
                    onClick={onNavigate}
                  >
                    <Icon name="command" />
                    <span>Dashboard</span>
                  </Link>
                </li>
              )}
              {plannedModules
                .filter((module) => module.group === group)
                .map((module) => (
                  <li key={module.slug}>
                    <Link
                      href={`/app/${module.slug}`}
                      title={`${module.name} · Coming soon`}
                      aria-label={`${module.name} · Coming soon`}
                      aria-current={
                        pathname === `/app/${module.slug}` ? "page" : undefined
                      }
                      onClick={onNavigate}
                    >
                      <Icon name={module.icon} />
                      <span>{module.name}</span>
                      <span className="nav-planned-dot" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </nav>
      <div className="app-sidebar-footer">
        <span className="tiny-dot" />
        <span>
          Frontend demo
          <br />
          <small>No live services</small>
        </span>
      </div>
    </aside>
  );
}
