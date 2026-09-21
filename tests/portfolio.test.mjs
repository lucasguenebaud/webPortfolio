import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import puppeteer from "puppeteer-core";
import { preview } from "vite";

const resume = JSON.parse(
  readFileSync(new URL("../src/data/resume.json", import.meta.url), "utf8"),
);
const executablePath =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].find(existsSync);

test("production portfolio: content, responsive navigation, theme and CV", async () => {
  assert.ok(executablePath, "Install Chrome or set PUPPETEER_EXECUTABLE_PATH");
  const server = await preview({
    preview: { host: "127.0.0.1", port: 0, open: false },
  });
  let browser;
  try {
    browser = await puppeteer.launch({ executablePath, headless: true });
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const base = `http://127.0.0.1:${server.httpServer.address().port}`;
    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: "light" },
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
    await page.setViewport({ width: 1440, height: 1000 });
    await page.goto(base, { waitUntil: "networkidle0" });
    await page.waitForSelector("h1");
    assert.equal(await page.$$eval("h1", (nodes) => nodes.length), 1);
    const body = await page.$eval("body", (el) => el.textContent);
    for (const job of resume.work)
      for (const text of [job.name, job.position, ...job.highlights])
        assert.ok(body.includes(text), `Missing CV content: ${text}`);
    assert.ok(body.includes("Chevalue"));
    assert.deepEqual(
      await page.$$eval('a[href^="#"]', (nodes) =>
        nodes
          .filter((a) => !document.getElementById(a.hash.slice(1)))
          .map((a) => a.hash),
      ),
      [],
    );
    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewport({ width, height: 900 });
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `Horizontal overflow at ${width}px`,
      );
    }
    await page.setViewport({ width: 390, height: 844 });
    await page.click("#menu-toggle");
    assert.equal(
      await page.$eval("#menu-toggle", (el) =>
        el.getAttribute("aria-expanded"),
      ),
      "true",
    );
    await page.keyboard.press("Escape");
    assert.equal(
      await page.$eval("#menu-toggle", (el) =>
        el.getAttribute("aria-expanded"),
      ),
      "false",
    );
    await page.click("#menu-toggle");
    await page.click('nav a[href="#experience"]');
    assert.equal(
      await page.$eval("#menu-toggle", (el) =>
        el.getAttribute("aria-expanded"),
      ),
      "false",
    );
    assert.equal(new URL(page.url()).hash, "#experience");
    await page.click(".theme-toggle");
    assert.equal(await page.$eval("html", (el) => el.dataset.theme), "dark");
    await page.reload({ waitUntil: "networkidle0" });
    assert.equal(await page.$eval("html", (el) => el.dataset.theme), "dark");
    assert.equal(
      await page.$eval(
        ".hero-art img",
        (el) => getComputedStyle(el).animationName,
      ),
      "none",
    );
    await page.$eval(".full-stack summary", (el) => el.click());
    assert.equal(await page.$eval(".full-stack", (el) => el.open), true);
    assert.deepEqual(
      await page.$$eval("img", (nodes) =>
        nodes
          .filter((img) => img.complete && !img.naturalWidth)
          .map((img) => img.src),
      ),
      [],
    );
    const pdf = await fetch(`${base}/cv/cv.pdf`);
    assert.equal(pdf.status, 200);
    assert.equal(
      Buffer.from(await pdf.arrayBuffer())
        .subarray(0, 5)
        .toString(),
      "%PDF-",
    );
    const html = await fetch(`${base}/cv/cv.html`);
    assert.equal(html.status, 200);
    assert.ok((await html.text()).includes("Decathlon"));
    assert.deepEqual(errors, []);
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve) => server.httpServer.close(resolve));
  }
});
