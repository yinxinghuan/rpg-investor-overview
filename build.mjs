import { execFileSync } from 'node:child_process';
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import './generate-concepts.mjs';

await rm(new URL('./dist/', import.meta.url), { recursive: true, force: true });
await mkdir(new URL('./dist/', import.meta.url), { recursive: true });
await cp(new URL('./public/', import.meta.url), new URL('./dist/', import.meta.url), { recursive: true });

let commit = process.env.GITHUB_SHA || 'local-preview';
try { if (commit === 'local-preview') commit = execFileSync('git', ['rev-parse', 'HEAD'], {encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']}).trim(); } catch {}
await writeFile(new URL('./dist/release.json', import.meta.url), JSON.stringify({commit, versions: ['A', 'C'], feature: 'art-reuse-generation-flow'}, null, 2));
