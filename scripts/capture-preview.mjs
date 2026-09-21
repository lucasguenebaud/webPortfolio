import { mkdir } from "node:fs/promises";
import puppeteer from "puppeteer-core";
import { preview } from "vite";

const server = await preview({ preview: { host: "127.0.0.1", port: 0 } });
const browser = await puppeteer.launch({
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  headless: true,
});
try {
  await mkdir("artifacts", { recursive: true });
  const page = await browser.newPage();
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
    { name: "prefers-color-scheme", value: "light" },
  ]);
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(`http://127.0.0.1:${server.httpServer.address().port}`, {
    waitUntil: "networkidle0",
  });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    await Promise.all(
      [...document.images].map((img) => {
        img.loading = "eager";
        return img.decode().catch(() => {});
      }),
    );
  });
  await page.screenshot({ path: "artifacts/desktop-hero.png" });
  await page.screenshot({
    path: "artifacts/desktop-light.png",
    fullPage: true,
  });
  await page.click(".theme-toggle");
  await page.screenshot({ path: "artifacts/desktop-dark.png", fullPage: true });
  await page.click(".theme-toggle");
  await page.setViewport({ width: 390, height: 844 });
  await page.screenshot({ path: "artifacts/mobile-light.png", fullPage: true });
} finally {
  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));
}
