"use client";
import { Dropdown } from "./dropdown";
import { useAppPreview } from "./app-context";
import { demoWorkspaces } from "@/demo/dashboard";
import { Icon } from "@/components/ui/icon";
export function WorkspaceSwitcher() {
  const { workspace, setWorkspace } = useAppPreview();
  return (
    <Dropdown
      name={`Switch demo workspace: ${workspace.name}`}
      kind="listbox"
      className="workspace-switcher"
      trigger={
        <>
          <span className="app-workspace-avatar">{workspace.initials}</span>
          <span className="workspace-trigger-copy">
            <strong>{workspace.name}</strong>
            <small>Demo workspace</small>
          </span>
          <Icon name="chevron" />
        </>
      }
    >
      {
        <>
          {demoWorkspaces.map((w) => (
            <button
              key={w.id}
              role="option"
              aria-selected={w.id === workspace.id}
              tabIndex={-1}
              onClick={() => {
                setWorkspace(w.id);
              }}
            >
              <span className="app-workspace-avatar">{w.initials}</span>
              <span>
                <strong>{w.name}</strong>
                <small>{w.description} · Demo</small>
              </span>
              {workspace.id === w.id && <Icon name="check" />}
            </button>
          ))}
        </>
      }
    </Dropdown>
  );
}
