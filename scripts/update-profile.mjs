import { mkdir, writeFile } from "node:fs/promises";
import { OWNER, PROJECTS } from "./profile-data.mjs";
import { renderCard, renderHero, renderOverview } from "./render-svg.mjs";

// Read only public repositories; do not report unverifiable download or user totals.
async function fetchPublicRepos() {
  const headers = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "shafranek-js-profile-builder"
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const all = [];
  for (let page = 1; page <= 20; page++) {
    const url = `https://api.github.com/users/${OWNER}/repos?type=owner&per_page=100&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API HTTP ${response.status} on page ${page}`);
    const result = await response.json();
    if (!Array.isArray(result)) throw new Error("GitHub API returned non-array repositories.");
    all.push(...result.filter(r => !r.private));
    if (result.length < 100) return all;
  }
  throw new Error("Pagination limit reached; refusing to publish incomplete metrics.");
}

const repositories = await fetchPublicRepos();
const byName = new Map(repositories.map(r => [r.name.toLowerCase(), r]));
const featured = {};
for (const project of PROJECTS) {
  const repo = byName.get(project.slug.toLowerCase());
  if (!repo) throw new Error(`Missing featured public repo: ${project.slug}`);
  featured[project.slug] = {
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    pushedAt: repo.pushed_at
  };
}

const stats = {
  schemaVersion: 1,
  refreshedOn: new Date().toISOString().slice(0, 10),
  publicRepositoryCount: repositories.length,
  totalStars: repositories.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0),
  featured
};
await mkdir("dist", { recursive: true });
for (const lang of ["en", "ru"]) {
  await writeFile(`dist/hero-${lang}.svg`, renderHero(lang), "utf8");
  await writeFile(`dist/overview-${lang}.svg`, renderOverview(lang, stats, PROJECTS.length), "utf8");
  for (const project of PROJECTS) {
    await writeFile(`dist/tile-${project.slug}-${lang}.svg`, renderCard(project, lang, featured[project.slug]), "utf8");
  }
}
await writeFile("stats.json", JSON.stringify(stats, null, 2) + "\n", "utf8");
console.log(`Rendered ${PROJECTS.length} projects; public repos: ${stats.publicRepositoryCount}; stars: ${stats.totalStars}`);
