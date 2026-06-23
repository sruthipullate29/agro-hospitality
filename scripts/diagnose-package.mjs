import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const endpoint = "http://127.0.0.1:7482/ingest/f7d09ab7-b4ee-4723-aaac-cc302df10b38";
const sessionId = "d35c8a";

function log(hypothesisId, message, data) {
  // #region agent log
  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": sessionId },
    body: JSON.stringify({
      sessionId,
      runId: process.env.DEBUG_RUN_ID || "pre-fix",
      hypothesisId,
      location: "scripts/diagnose-package.mjs",
      message,
      data,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
}

const rootPkgPath = resolve(root, "package.json");
const publicPkgPath = resolve(root, "public", "package.json");
const rootPkg = JSON.parse(readFileSync(rootPkgPath, "utf8"));

log("A", "root package identity", { name: rootPkg.name, scripts: Object.keys(rootPkg.scripts || {}) });
log("B", "public package exists", { exists: existsSync(publicPkgPath) });
log("C", "expected deps present", {
  hasVite: Boolean(rootPkg.devDependencies?.vite),
  hasReact: Boolean(rootPkg.dependencies?.react),
  hasDevScript: Boolean(rootPkg.scripts?.dev),
});

try {
  await import("vite");
  log("D", "vite resolvable", { ok: true });
} catch (e) {
  log("D", "vite resolvable", { ok: false, error: e.message });
}

console.log(`Package name: ${rootPkg.name}`);
console.log(`Scripts: ${Object.keys(rootPkg.scripts || {}).join(", ") || "(none)"}`);
