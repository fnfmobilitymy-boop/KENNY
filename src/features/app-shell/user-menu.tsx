"use client";
import Link from "next/link";
import { Dropdown } from "./dropdown";
import { Icon } from "@/components/ui/icon";
export function UserMenu() {
  return (
    <Dropdown
      name="Demo visitor menu"
      trigger={<span className="visitor-avatar">DV</span>}
    >
      {
        <>
          <button role="menuitem" tabIndex={-1}>
            <span>
              <strong>Demo visitor</strong>
              <small>No signed-in session</small>
            </span>
          </button>
          <Link role="menuitem" tabIndex={-1} href="/app/settings">
            <Icon name="settings" />
            Workspace settings · Coming soon
          </Link>
          <Link role="menuitem" tabIndex={-1} href="/login">
            Open login UI
          </Link>
          <Link role="menuitem" tabIndex={-1} href="/">
            Back to public website
          </Link>
        </>
      }
    </Dropdown>
  );
}
