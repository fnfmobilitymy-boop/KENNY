"use client";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { demoWorkspaces } from "@/demo/dashboard";
import type { DemoWorkspace } from "@/types/dashboard";
const Context = createContext<{
  workspace: DemoWorkspace;
  setWorkspace: (id: string) => void;
} | null>(null);
export function AppPreviewProvider({ children }: { children: ReactNode }) {
  const [workspaceId, setWorkspaceId] = useState(demoWorkspaces[0].id);
  const workspace =
    demoWorkspaces.find((w) => w.id === workspaceId) || demoWorkspaces[0];
  return (
    <Context.Provider value={{ workspace, setWorkspace: setWorkspaceId }}>
      {children}
    </Context.Provider>
  );
}
export function useAppPreview() {
  const context = useContext(Context);
  if (!context) throw Error("App preview provider is required.");
  return context;
}
