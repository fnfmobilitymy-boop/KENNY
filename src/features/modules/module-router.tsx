import type { PlannedModule } from "@/types/dashboard";
import { ComingSoon } from "./coming-soon";
import { WebsiteBuilder } from "./creative/website-builder";
import { ImageStudio } from "./creative/image-studio";
import { VideoStudio } from "./creative/video-studio";
import { Documents } from "./creative/documents";
import "./module-workspaces.css";
const modules = {
  "website-builder": WebsiteBuilder,
  "image-studio": ImageStudio,
  "video-studio": VideoStudio,
  documents: Documents,
};
export function ModuleRouter({ module }: { module: PlannedModule }) {
  const Component = modules[module.slug as keyof typeof modules];
  return Component ? <Component /> : <ComingSoon module={module} />;
}
