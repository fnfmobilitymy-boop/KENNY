"use client";
import { useState } from "react";
import { Dropdown } from "./dropdown";
import { Icon } from "@/components/ui/icon";
export function NotificationMenu() {
  const [cleared, setCleared] = useState(false);
  return (
    <Dropdown
      name="Notifications"
      className="notification-menu"
      trigger={
        <>
          <Icon name="bell" />
          {!cleared && <span className="notification-dot" aria-hidden="true" />}
        </>
      }
    >
      {
        <>
          {!cleared ? (
            <>
              <button
                role="menuitem"
                tabIndex={-1}
                onClick={() => {
                  setCleared(true);
                }}
              >
                <span>
                  <strong>Sample review reminder</strong>
                  <small>
                    Demo only · No live notifications. Select to dismiss
                    locally.
                  </small>
                </span>
              </button>
            </>
          ) : (
            <button role="menuitem" tabIndex={-1}>
              <span>
                <strong>No demo notifications</strong>
                <small>Nothing was changed on a server.</small>
              </span>
            </button>
          )}
          <button
            role="menuitem"
            tabIndex={-1}
            onClick={() => {
              setCleared(!cleared);
            }}
          >
            <Icon name="bell" />
            {cleared
              ? "Restore demo notification"
              : "Clear preview notifications"}
          </button>
        </>
      }
    </Dropdown>
  );
}
