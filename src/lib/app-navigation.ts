export interface SearchEntry {
  href: string;
  name: string;
  description: string;
  group: string;
}
export function searchPages(
  query: string,
  entries: readonly SearchEntry[],
): SearchEntry[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return entries.filter((entry) =>
    terms.every((term) =>
      `${entry.name} ${entry.description} ${entry.group}`
        .toLowerCase()
        .includes(term),
    ),
  );
}
export function normalizeAppPath(path: string) {
  return path.replace(/^\/KENNY(?=\/|$)/, "").replace(/\/+$/, "") || "/";
}
