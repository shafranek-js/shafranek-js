import { readFileSync } from "node:fs";
import { PROJECTS } from "./profile-data.mjs";

const names = new Set(PROJECTS.map(p => p.slug.toLowerCase()));
if (names.size !== PROJECTS.length) throw new Error("Duplicate featured repository names.");
for (const lang of ["en", "ru"]) {
  const readme = readFileSync(lang === "en" ? "README.md" : "README.ru.md", "utf8");
  for (const asset of [`hero-${lang}.svg`, `overview-${lang}.svg`, ...PROJECTS.map(p => `tile-${p.slug}-${lang}.svg`)]) {
    const path = `dist/${asset}`;
    const svg = readFileSync(path, "utf8");
    if (!svg.startsWith("<svg ") || !svg.includes("</svg>")) throw new Error(`Invalid SVG shell: ${path}`);
    if (!readme.includes(path)) throw new Error(`Unreferenced asset: ${path}`);
  }
  for (const project of PROJECTS) {
    if (!readme.includes(`https://github.com/shafranek-js/${project.slug}`)) {
      throw new Error(`Missing repository link: ${project.slug} (${lang})`);
    }
  }
}
console.log("Profile assets and links verified.");
