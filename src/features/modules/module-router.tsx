import type { PlannedModule } from "@/types/dashboard";
import { ComingSoon } from "./coming-soon";
import { WebsiteBuilder } from "./creative/website-builder";
import { ImageStudio } from "./creative/image-studio";
import { VideoStudio } from "./creative/video-studio";
import { Documents } from "./creative/documents";
import { Marketing } from "./growth/marketing";
import { SeoAds } from "./growth/seo-ads";
import { SalesAgent } from "./growth/sales";
import { Crm } from "./growth/crm";
import "./module-workspaces.css";
const modules = {
  marketing: Marketing,
  "seo-ads": SeoAds,
  sales: SalesAgent,
  crm: Crm,
  "website-builder": WebsiteBuilder,
  "image-studio": ImageStudio,
  "video-studio": VideoStudio,
  documents: Documents,
};
export function ModuleRouter({ module }: { module: PlannedModule }) {
  const Component = modules[module.slug as keyof typeof modules];
  return Component ? <Component /> : <ComingSoon module={module} />;
}
