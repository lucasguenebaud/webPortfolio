import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import path from "node:path";
const root = fileURLToPath(new URL("../", import.meta.url));
const source = path.resolve(root, "../web");
// Rebuild first so the downloads match the structured CV.
const cli = path.join(source, "node_modules/resume-cli/build/main.js");
await mkdir(path.join(source, "dist"), { recursive: true });
for (const format of ["html", "pdf"]) {
  const result = spawnSync(
    process.execPath,
    [cli, "export", `dist/cv.${format}`, "--theme", "elegant-pink"],
    { cwd: source, stdio: "inherit" },
  );
  if (result.status !== 0)
    throw new Error(
      "CV rendering failed. Run npm ci in ../web before syncing.",
    );
}
const content = await readFile(path.join(source, "resume.json"), "utf8");
JSON.parse(content);
await mkdir(path.join(root, "src/data"), { recursive: true });
await mkdir(path.join(root, "public/cv"), { recursive: true });
await writeFile(path.join(root, "src/data/resume.json"), content);
for (const format of ["html", "pdf"])
  await copyFile(
    path.join(source, `dist/cv.${format}`),
    path.join(root, `public/cv/cv.${format}`),
  );
console.log("Synced current CV data, HTML and PDF from ../web.");
