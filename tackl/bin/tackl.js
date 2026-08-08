#!/usr/bin/env node
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import pc from 'picocolors';
import prompts from 'prompts';
import * as tar from 'tar';

const OWNER = '12-studio';
const REPO = 'tackl';
const FALLBACK_REF = 'main';

const log = {
	info: m => console.log(pc.cyan('•'), m),
	ok: m => console.log(pc.green('✔'), m),
	warn: m => console.log(pc.yellow('▲'), m),
	error: m => console.log(pc.red('✖'), m),
	step: m => console.log(pc.blue('→'), m),
};

const showBanner = () => {
	const purple = str => `\x1b[38;5;99m${str}\x1b[0m`;
	console.log(
		pc.bold(
			purple(`
╔═════════════════════════════════════════════════╗
║                                                 ║
║    ████████╗ █████╗  ██████╗██╗  ██╗██╗         ║
║    ╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝██║         ║
║       ██║   ███████║██║     █████╔╝ ██║         ║
║       ██║   ██╔══██║██║     ██╔═██╗ ██║         ║
║       ██║   ██║  ██║╚██████╗██║  ██╗███████╗    ║
║       ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝    ║
║                                                 ║
║         The Ultimate Next.js Starter Kit        ║
║                                                 ║
╚═════════════════════════════════════════════════╝
	`)
		)
	);
};

// SECTION • Directory checks
// NOTE • The CLI scaffolds INTO the current directory — run it inside an
// empty (or freshly-initialised) git repo. These files are allowed to
// already exist without counting as "not empty".
const ALLOWED_EXISTING = new Set(['.git', '.gitignore', 'README.md', 'LICENSE', '.DS_Store']);

const dirIsScaffoldable = dir => {
	if (!fs.existsSync(dir)) return true;
	return fs.readdirSync(dir).every(entry => ALLOWED_EXISTING.has(entry));
};

// SECTION • Template ref resolution
// NOTE • Prefer the latest GitHub release so every scaffold is a tested,
// reproducible snapshot; fall back to main (with a warning) when no
// release exists. --ref overrides both.
const resolveRef = async explicitRef => {
	if (explicitRef) return { ref: explicitRef, source: 'flag' };
	try {
		const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/releases/latest`, {
			headers: { accept: 'application/vnd.github+json' },
		});
		if (res.ok) {
			const json = await res.json();
			if (json?.tag_name) return { ref: json.tag_name, source: 'release' };
		}
	} catch {}
	return { ref: FALLBACK_REF, source: 'fallback' };
};

// SECTION • Pruning
const rmrf = (root, rel) => {
	const p = path.join(root, rel);
	if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
};

const stripEnvBlock = (root, marker) => {
	const p = path.join(root, '.env.example');
	if (!fs.existsSync(p)) return;
	const lines = fs.readFileSync(p, 'utf8').split('\n');
	const out = [];
	let skipping = false;
	for (const line of lines) {
		if (line.startsWith(marker)) {
			skipping = true;
			continue;
		}
		if (skipping && line.trim() === '') {
			skipping = false;
			continue;
		}
		if (!skipping) out.push(line);
	}
	fs.writeFileSync(p, out.join('\n'));
};

const stripDeps = (root, deps) => {
	const p = path.join(root, 'package.json');
	if (!fs.existsSync(p)) return;
	const json = JSON.parse(fs.readFileSync(p, 'utf8'));
	for (const d of deps) {
		delete json.dependencies?.[d];
		delete json.devDependencies?.[d];
	}
	fs.writeFileSync(p, `${JSON.stringify(json, null, '\t')}\n`);
};

// NOTE • Everything that exists solely for the embedded Sanity Studio.
// app/api/draft-mode is NOT here — the draft routes are CMS-agnostic
// (they resolve through @cms/draft) and only go when no CMS is chosen.
const SANITY_STUDIO_PATHS = ['app/(studio)', 'sanity.config.ts', 'sanity'];
const SANITY_DEPS = ['next-sanity', 'sanity', '@sanity/vision'];

// NOTE • The two files the CLI rewires to the chosen adapter
const ADAPTER_ENTRIES = ['src/cms/index.ts', 'src/cms/draft.ts'];
const rewireAdapter = (root, adapter) => {
	for (const rel of ADAPTER_ENTRIES) {
		const p = path.join(root, rel);
		if (fs.existsSync(p)) {
			fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replaceAll(`'./dato`, `'./${adapter}`));
		}
	}
};

const CMS = {
	dato: {
		title: 'DatoCMS',
		prune: root => {
			rmrf(root, 'src/cms/sanity');
			rmrf(root, 'src/cms/none');
			rmrf(root, 'docs/Sanity');
			for (const p of SANITY_STUDIO_PATHS) rmrf(root, p);
			stripDeps(root, SANITY_DEPS);
			stripEnvBlock(root, '# CMS — Sanity');
		},
	},
	sanity: {
		title: 'Sanity',
		prune: root => {
			rmrf(root, 'src/cms/dato');
			rmrf(root, 'src/cms/none');
			rmrf(root, 'docs/DatoCMS');
			stripDeps(root, ['@datocms/cda-client', 'react-datocms', 'graphql', 'graphql-tag']);
			stripEnvBlock(root, '# CMS — DatoCMS');
			rewireAdapter(root, 'sanity');
		},
	},
	none: {
		title: 'No CMS',
		// NOTE • Same shape as the other choices — the '@cms' seam survives,
		// rewired to the stub adapter (src/cms/none), so app code and the
		// tsconfig alias stay valid and a CMS can be wired up later. Only the
		// CMS-specific files go: adapters, draft-mode routes, studio, docs.
		prune: root => {
			rmrf(root, 'src/cms/dato');
			rmrf(root, 'src/cms/sanity');
			rmrf(root, 'src/cms/draft.ts');
			rmrf(root, 'docs/Sanity');
			rmrf(root, 'docs/DatoCMS');
			rmrf(root, 'app/api/draft-mode');
			for (const p of SANITY_STUDIO_PATHS) rmrf(root, p);
			stripDeps(root, [...SANITY_DEPS, '@datocms/cda-client', 'react-datocms', 'graphql', 'graphql-tag']);
			stripEnvBlock(root, '# CMS — Sanity');
			stripEnvBlock(root, '# CMS — DatoCMS');
			rewireAdapter(root, 'none');
		},
	},
};

// NOTE • Repo-only cargo that should never land in a scaffolded project.
// .github is pruned file-by-file — the CI workflow (.github/workflows) ships
// with every scaffold so quality gates run from the first push.
const REPO_CARGO = [
	'tackl',
	'.github/FUNDING.yml',
	'.github/ISSUE_TEMPLATE.md',
	'.github/PULL_REQUEST_TEMPLATE.md',
	'bun.lock',
];

async function main() {
	const args = process.argv.slice(2);

	if (args.includes('--help') || args.includes('-h')) {
		console.log(`
${pc.bold('Tackl CLI')} - The ultimate Next.js starter kit

${pc.bold('Usage:')}
  Run inside an empty directory (or a freshly-initialised git repo):

  mkdir my-app && cd my-app
  bunx tackl

${pc.bold('Options:')}
  --cms <dato|sanity|none>   Skip the CMS prompt
  --name <name>              Package name (default: the directory name)
  --ref <tag|branch>         Template ref (default: latest release)
  --no-install               Skip dependency installation
  --no-git                   Skip git init (existing .git is always kept)
  -h, --help                 Show this help message

${pc.bold('Repository:')} https://github.com/${OWNER}/${REPO}
		`);
		process.exit(0);
	}

	const flagValue = name => {
		const i = args.indexOf(name);
		return i !== -1 ? args[i + 1] : undefined;
	};

	const targetDir = process.cwd();

	if (!dirIsScaffoldable(targetDir)) {
		log.error(
			'This directory is not empty. Run tackl inside an empty directory (a .git folder, .gitignore, README.md and LICENSE are fine).'
		);
		process.exit(1);
	}

	showBanner();

	// SECTION • Gather choices
	const cmsFlag = flagValue('--cms');
	if (cmsFlag && !CMS[cmsFlag]) {
		log.error(`Unknown --cms value "${cmsFlag}". Use dato, sanity or none.`);
		process.exit(1);
	}

	const answers = await prompts(
		[
			{
				type: cmsFlag ? null : 'select',
				name: 'cms',
				message: 'Which CMS should this project use?',
				choices: [
					{ title: 'DatoCMS', value: 'dato' },
					{ title: 'Sanity', value: 'sanity' },
					{ title: 'None', value: 'none' },
				],
				initial: 0,
			},
		].filter(q => q.type !== null),
		{
			onCancel: () => {
				log.warn('Cancelled.');
				process.exit(1);
			},
		}
	);

	const cms = cmsFlag || answers.cms;
	const rawName = flagValue('--name') || path.basename(targetDir);
	const projectName =
		rawName
			.toLowerCase()
			.replace(/[^a-z0-9\-._]/g, '-')
			.replace(/^[-.]+|[-.]+$/g, '') || 'tackl-app';
	const doInstall = !args.includes('--no-install');
	const doGit = !args.includes('--no-git');
	const hadGit = fs.existsSync(path.join(targetDir, '.git'));

	const { ref, source } = await resolveRef(flagValue('--ref'));
	if (source === 'fallback') log.warn(`No release found — using ${FALLBACK_REF} (untagged).`);

	console.log();
	log.step(`Scaffolding ${pc.bold(pc.cyan(projectName))} in ${pc.bold(targetDir)}`);
	log.step(`Template: ${pc.bold(pc.yellow(`${OWNER}/${REPO}@${ref}`))} · CMS: ${pc.bold(CMS[cms].title)}`);
	console.log();

	// NOTE • If the repo already has its own LICENSE, that choice wins —
	// stash it and restore it after extraction (the template ships MIT)
	const licensePath = path.join(targetDir, 'LICENSE');
	const existingLicense = fs.existsSync(licensePath) ? fs.readFileSync(licensePath, 'utf8') : null;

	// SECTION • Download + extract
	// NOTE • TACKL_TEMPLATE_TAR points at a local tarball — used by tests/CI
	const tmpTar = process.env.TACKL_TEMPLATE_TAR || path.join(os.tmpdir(), `tackl-${Date.now()}.tgz`);

	if (!process.env.TACKL_TEMPLATE_TAR) {
		const tarUrl = `https://codeload.github.com/${OWNER}/${REPO}/tar.gz/${encodeURIComponent(ref)}`;
		try {
			log.step('📥 Downloading template...');
			const res = await fetch(tarUrl);
			if (!res.ok) throw new Error(`Download failed: ${res.status} ${res.statusText}`);
			fs.writeFileSync(tmpTar, Buffer.from(await res.arrayBuffer()));
			log.ok('Template downloaded!');
		} catch (e) {
			log.error(`Download failed: ${e.message}`);
			log.error('Please check your internet connection and try again.');
			process.exit(1);
		}
	}

	try {
		log.step('📦 Extracting files...');
		await tar.x({ file: tmpTar, cwd: targetDir, strip: 1 });
		log.ok('Files extracted!');
	} catch (e) {
		log.error(`Extraction failed: ${e.message}`);
		process.exit(1);
	} finally {
		if (!process.env.TACKL_TEMPLATE_TAR) {
			try {
				fs.unlinkSync(tmpTar);
			} catch {}
		}
	}

	// SECTION • Prune
	log.step('🧹 Pruning template...');
	if (existingLicense !== null) {
		fs.writeFileSync(licensePath, existingLicense);
		log.info('Kept your existing LICENSE.');
	}
	for (const cargo of REPO_CARGO) rmrf(targetDir, cargo);
	for (const lock of ['yarn.lock', 'package-lock.json', 'pnpm-lock.yaml']) rmrf(targetDir, lock);
	CMS[cms].prune(targetDir);
	log.ok(`Template pruned for ${CMS[cms].title}.`);

	// SECTION • Patch package.json
	const pkgPath = path.join(targetDir, 'package.json');
	if (fs.existsSync(pkgPath)) {
		try {
			const json = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
			json.name = projectName;
			json.version = '0.1.0';
			delete json.repository;
			delete json.author;
			fs.writeFileSync(pkgPath, `${JSON.stringify(json, null, '\t')}\n`);
			log.ok('package.json updated.');
		} catch (e) {
			log.warn(`Could not update package.json: ${e.message}`);
		}
	}

	// SECTION • Git
	if (doGit && !hadGit) {
		try {
			log.step('🔧 Initialising git repository...');
			execSync('git init', { cwd: targetDir, stdio: 'ignore' });
			execSync('git branch -M main', { cwd: targetDir, stdio: 'ignore' });
			execSync('git add -A', { cwd: targetDir, stdio: 'ignore' });
			execSync('git commit -m "chore: scaffold with tackl" --no-verify', { cwd: targetDir, stdio: 'ignore' });
			log.ok('Git repository initialised!');
		} catch (e) {
			log.warn(`Git init failed: ${e.message}`);
		}
	} else if (hadGit) {
		log.info('Existing .git kept — review and commit the scaffold yourself.');
	}

	// SECTION • Install
	if (doInstall) {
		try {
			log.step('📦 Installing dependencies with bun...');
			execSync('bun install', { cwd: targetDir, stdio: 'inherit', env: { ...process.env, HUSKY: '0' } });
			log.ok('Dependencies installed!');
		} catch (e) {
			log.warn(`Install failed: ${e.message}`);
		}
	} else {
		log.info('Skipped dependency install.');
	}

	// SECTION • Sanity project link
	// NOTE • A Sanity scaffold isn't usable until a project id exists —
	// sanity's own init logs in, creates/links a project and writes .env.
	let sanityLinked = false;
	if (cms === 'sanity' && process.stdout.isTTY) {
		const { link } = await prompts({
			type: 'confirm',
			name: 'link',
			message: 'Link a Sanity project now? (opens a browser login, writes .env)',
			initial: true,
		});
		if (link) {
			try {
				execSync('bunx sanity@latest init --env .env', { cwd: targetDir, stdio: 'inherit' });
				sanityLinked = true;
				log.ok('Sanity project linked!');
			} catch (e) {
				log.warn(`sanity init did not complete: ${e.message}`);
			}
		}
	}

	console.log(`\n${pc.bold(pc.green('Success!'))} Project scaffolded.\n`);
	console.log('  Next steps:');
	let step = 1;
	if (cms === 'sanity' && !sanityLinked) {
		console.log(`  ${step++}) bunx sanity init --env .env   # create/link your Sanity project`);
	} else if (cms !== 'sanity') {
		console.log(`  ${step++}) cp .env.example .env   # then fill in your values`);
	}
	if (!doInstall) console.log(`  ${step++}) bun install`);
	console.log(`  ${step++}) bun run dev   # a first-run setup wizard walks you through your theme`);
	if (cms === 'sanity') console.log(`  ${step}) open http://localhost:3000/studio to start editing content`);
}

main().catch(e => {
	console.error(e);
	process.exit(1);
});
