import type { NextConfig } from "next";
const pages = process.env.KENNY_PAGES === "1";
const config: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  ...(pages
    ? { output: "export", basePath: "/KENNY", trailingSlash: true }
    : {}),
};
export default config;
