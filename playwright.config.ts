import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/browser",
  workers: 1,
  timeout: 30000,
  reporter: "list",
  outputDir: "/workspace/artifacts/kenny-m6/test-results",
  use: {
    baseURL: "http://127.0.0.1:3100",
    headless: true,
    colorScheme: "dark",
    launchOptions: {
      executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
      env: {
        ...process.env,
        XDG_CONFIG_HOME: "/tmp/kenny-browser-config",
        XDG_CACHE_HOME: "/tmp/kenny-browser-cache",
      },
    },
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run start -- --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
    timeout: 120000,
  },
});
