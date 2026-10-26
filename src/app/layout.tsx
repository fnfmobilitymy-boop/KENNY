import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "KENNY — Design foundation",
  description: "KENNY AI platform · Phase 1 design system preview",
};
const themeScript = `try{var t=localStorage.getItem('kenny-theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}catch{}`;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
