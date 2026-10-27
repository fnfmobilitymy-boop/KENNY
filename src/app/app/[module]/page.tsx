import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { plannedModules } from "@/demo/dashboard";
import { ModuleRouter } from "@/features/modules/module-router";
export const dynamicParams = false;
export function generateStaticParams() {
  return plannedModules
    .filter((entry) => entry.slug !== "workspace")
    .map((entry) => ({ module: entry.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string }>;
}): Promise<Metadata> {
  const { module } = await params;
  const info = plannedModules.find((m) => m.slug === module);
  return {
    title: `${info?.name || "Module"} — Kenny AI Business Studio · Local demo prototype`,
  };
}
export default async function ModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  const info = plannedModules.find((m) => m.slug === module);
  if (!info) notFound();
  return <ModuleRouter module={info} />;
}
