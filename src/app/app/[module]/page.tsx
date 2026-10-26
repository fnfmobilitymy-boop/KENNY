import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { plannedModules } from "@/demo/dashboard";
import { ComingSoon } from "@/features/modules/coming-soon";
export const dynamicParams = false;
export function generateStaticParams() {
  return plannedModules.map((module) => ({ module: module.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string }>;
}): Promise<Metadata> {
  const { module } = await params;
  const info = plannedModules.find((m) => m.slug === module);
  return {
    title: `${info?.name || "Module"} — Kenny AI Business Studio · Coming soon`,
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
  return <ComingSoon module={info} />;
}
