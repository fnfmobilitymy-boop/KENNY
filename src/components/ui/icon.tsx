import type { SVGProps } from "react";
const paths = {
  arrow: "M5 12h14m-6-6 6 6-6 6",
  diagonal: "M6 18 18 6M6 6h12v12",
  down: "M12 4v16m-6-6 6 6 6-6",
  command: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  workspace: "M4 4h16v12H9l-5 4V4zm4 4h8m-8 4h5",
  website:
    "M3 4h18v16H3zM3 9h18M7 6.5h.01M10 6.5h.01M7 13l-2 2 2 2m10-4 2 2-2 2",
  image: "M3 4h18v16H3zM3 16l6-6 5 5 3-3 4 4M17 8h.01",
  video: "M4 5h16v14H4zM10 9l5 3-5 3V9z",
  marketing: "M4 10h5l10-5v14L9 14H4v-4zm3 4 2 6h3l-2-6",
  sales: "M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM4 21v-2a8 8 0 0 1 16 0v2",
  workflow:
    "M4 3h6v6H4zM14 15h6v6h-6zM7 9v7a2 2 0 0 0 2 2h5M10 6h5a2 2 0 0 1 2 2v7",
  insights: "M4 20V10h4v10m4 0V4h4v16m4 0v-7M2 20h20",
  knowledge: "M4 4h12l4 4v12H4zM14 4v6h6M8 14h8m-8 3h5",
  operations: "M4 4h16v16H4zM9 4v16M4 10h16",
  settings: "M12 3 21 8v8l-9 5-9-5V8l9-5zm3 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z",
  check: "M5 12l4 4L19 6",
  sparkle: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3z",
} as const;
export type IconName = keyof typeof paths;
export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
