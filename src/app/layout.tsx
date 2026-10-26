import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./landing.css";
const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
  fallback: ["Arial"],
  adjustFontFallback: "Arial",
});
const space = localFont({
  src: "../../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-space",
  display: "swap",
  weight: "300 700",
  fallback: ["Arial"],
  adjustFontFallback: "Arial",
});
export const metadata: Metadata = {
  title: "Kenny AI Business Studio — A new space for your next idea",
  description:
    "Explore Kenny AI Business Studio: a planned connected studio for business, creativity and AI collaboration. Phase 1 product preview.",
};
const themeScript = `try{var t=localStorage.getItem('kenny-theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}catch{}`;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${space.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
