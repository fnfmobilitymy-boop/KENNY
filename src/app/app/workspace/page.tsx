import type { Metadata } from "next";
import { WorkspaceStudio } from "@/features/workspace/workspace-studio";
import "./workspace.css";
export const metadata: Metadata = {
  title: "AI Workspace — Kenny AI Business Studio · Local preview simulator",
  description:
    "A frontend-only workspace with deterministic samples. No real AI, tools, file processing or persistence.",
};
export default function WorkspacePage() {
  return <WorkspaceStudio />;
}
