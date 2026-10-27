import type { ComponentType } from "react";
import type { ModuleSlug, PlannedModule } from "@/types/dashboard";
import { WebsiteBuilder } from "./creative/website-builder";
import { ImageStudio } from "./creative/image-studio";
import { VideoStudio } from "./creative/video-studio";
import { Documents } from "./creative/documents";
import { Marketing } from "./growth/marketing";
import { SeoAds } from "./growth/seo-ads";
import { SalesAgent } from "./growth/sales";
import { Crm } from "./growth/crm";
import { Booking } from "./operations/booking";
import { Ecommerce } from "./operations/ecommerce";
import { Automations } from "./operations/automations";
import { Analytics } from "./operations/analytics";
import { Billing } from "./account/billing";
import { Settings } from "./account/settings";
import "./module-workspaces.css";
const modules: Record<Exclude<ModuleSlug, "workspace">, ComponentType> = {
  billing: Billing,
  settings: Settings,
  booking: Booking,
  ecommerce: Ecommerce,
  automations: Automations,
  analytics: Analytics,
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
  if (!Component) throw new Error("Module route has no prototype renderer.");
  return <Component />;
}
