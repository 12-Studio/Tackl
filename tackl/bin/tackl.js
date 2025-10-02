#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import pc from 'picocolors';
import prompts from 'prompts';
import * as tar from 'tar';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OWNER = '12-studio';
const REPO = 'tackl';
const DEFAULT_REF = 'main';

const log = {
	info: m => console.log(pc.cyan('•'), m),
	ok: m => console.log(pc.green('✔'), m),
	warn: m => console.log(pc.yellow('▲'), m),
	error: m => console.log(pc.red('✖'), m),
	step: m => console.log(pc.blue('→'), m),
	success: m => console.log(pc.green('🎉'), m),
};

const showBanner = () => {
	const purple = str => `\x1b[38;5;99m${str}\x1b[0m`; // Deep vibrant purple
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

async function main() {
	const args = process.argv.slice(2);

	// Handle help flag
	if (args.includes('--help') || args.includes('-h')) {
		console.log(`
${pc.bold('Tackl CLI')} - The ultimate Next.js starter kit

${pc.bold('Usage:')}
  tackl [project-name] [options]

${pc.bold('Options:')}
  --no-install       Skip dependency installation (default: install)
  --no-git           Skip git initialization (default: init)
  -h, --help         Show this help message

${pc.bold('Examples:')}
  tackl my-app                    # Creates project with npm install + git init
  tackl my-app --no-install       # Creates project with git init only
  tackl my-app --no-git           # Creates project with npm install only
  tackl my-app --no-install --no-git  # Creates project only

${pc.bold('Repository:')} https://github.com/12-studio/tackl
		`);
		process.exit(0);
	}

	const argName = args.find(a => !a.startsWith('-'));

	const initial = {
		name: argName,
		ref: DEFAULT_REF, // Always use main branch
		install: !args.includes('--no-install'), // Default: true (install)
		git: !args.includes('--no-git'), // Default: true (init git)
	};

	// Filter out null prompts
	const promptQuestions = [
		{
			type: initial.name ? null : 'text',
			name: 'name',
			message: 'Project directory',
			initial: 'my-tackl-app',
			validate: v =>
				/^[a-z0-9\-._]+$/.test(v)
					? true
					: 'Use lowercase letters, numbers, - . _',
		},
	].filter(q => q.type !== null);

	const answers = await prompts(promptQuestions, {
		onCancel: () => {
			log.warn('Cancelled.');
			process.exit(1);
		},
		onSubmit: () => {
			// Clean up terminal
			process.stdout.write('\x1b[?25h');
		},
	});

	const projectName = (answers.name || initial.name).trim();
	const ref = initial.ref; // Always use main branch
	const doInstall = initial.install; // Default: true
	const doGit = initial.git; // Default: true

	// Validate project name
	if (!projectName) {
		log.error('Project name is required.');
		process.exit(1);
	}

	const targetDir = path.resolve(process.cwd(), projectName);
	if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
		log.error(
			`Directory "${projectName}" already exists and is not empty.`
		);
		process.exit(1);
	}
	fs.mkdirSync(targetDir, { recursive: true });

	showBanner();
	console.log(pc.bold(pc.white('🚀 Starting project creation...\n')));

	log.step(`Creating project: ${pc.bold(pc.cyan(projectName))}`);
	log.step(`Template: ${pc.bold(pc.yellow(`${OWNER}/${REPO}@${ref}`))}`);
	console.log();

	const tarUrl = `https://codeload.github.com/${OWNER}/${REPO}/tar.gz/${encodeURIComponent(ref)}`;
	const tmpTar = path.join(os.tmpdir(), `tackl-${Date.now()}.tgz`);

	try {
		log.step('📥 Downloading template...');
		const res = await fetch(tarUrl);
		if (!res.ok)
			throw new Error(`Download failed: ${res.status} ${res.statusText}`);

		// Convert response to buffer and write to file
		const arrayBuffer = await res.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		fs.writeFileSync(tmpTar, buffer);

		log.ok('Template downloaded successfully!');
	} catch (e) {
		log.error(`Download failed: ${e.message}`);
		log.error('Please check your internet connection and try again.');
		process.exit(1);
	}

	try {
		log.step('📦 Extracting files...');
		await tar.x({ file: tmpTar, cwd: targetDir, strip: 1 });
		log.ok('Files extracted successfully!');
	} catch (e) {
		log.error(`Extraction failed: ${e.message}`);
		log.error('Please try again or check if the template is valid.');
		process.exit(1);
	} finally {
		try {
			fs.unlinkSync(tmpTar);
		} catch {}
	}

	// Remove template .git if present
	try {
		const gitPath = path.join(targetDir, '.git');
		if (fs.existsSync(gitPath))
			fs.rmSync(gitPath, { recursive: true, force: true });
	} catch {}

	// Remove any existing lock files to ensure npm is used
	try {
		const yarnLock = path.join(targetDir, 'yarn.lock');
		const pnpmLock = path.join(targetDir, 'pnpm-lock.yaml');
		if (fs.existsSync(yarnLock)) fs.unlinkSync(yarnLock);
		if (fs.existsSync(pnpmLock)) fs.unlinkSync(pnpmLock);
		log.step('🧹 Cleaned up lock files to ensure npm usage');
	} catch {}

	// Patch package name
	log.step('📝 Updating project configuration...');
	const pkg = path.join(targetDir, 'package.json');
	if (fs.existsSync(pkg)) {
		try {
			const json = JSON.parse(fs.readFileSync(pkg, 'utf8'));
			json.name = projectName.toLowerCase();
			fs.writeFileSync(pkg, JSON.stringify(json, null, 2));
			log.ok('Project configuration updated!');
		} catch (e) {
			log.warn(`Could not update package.json: ${e.message}`);
		}
	}

	// Create .npmrc to ensure npm is used
	try {
		const npmrcPath = path.join(targetDir, '.npmrc');
		fs.writeFileSync(npmrcPath, 'package-lock=true\n');
		log.step('📝 Created .npmrc to ensure npm usage');
	} catch (e) {
		log.warn(`Could not create .npmrc: ${e.message}`);
	}

	if (doGit) {
		try {
			log.step('🔧 Initializing git repository...');
			execSync('git init', { cwd: targetDir, stdio: 'ignore' });

			// Set default branch to main (not master)
			execSync('git branch -M main', { cwd: targetDir, stdio: 'ignore' });

			execSync('git add -A', { cwd: targetDir, stdio: 'ignore' });
			execSync('git commit -m "chore: scaffold with tackl"', {
				cwd: targetDir,
				stdio: 'ignore',
			});
			log.ok('Git repository initialized!');
		} catch (e) {
			log.warn(`Git init failed: ${e.message}`);
		}
	}

	if (doInstall) {
		try {
			log.step('📦 Installing dependencies with npm...');

			// Disable Husky during installation to prevent Git issues
			const originalEnv = { ...process.env };
			process.env.HUSKY = '0';

			execSync('npm install', { cwd: targetDir, stdio: 'inherit' });

			// Restore environment
			process.env = originalEnv;

			// Try to fix audit issues automatically
			try {
				log.step('🔧 Fixing security vulnerabilities...');
				execSync('npm audit fix', { cwd: targetDir, stdio: 'inherit' });
				log.ok('Security vulnerabilities fixed!');
			} catch (e) {
				log.warn(
					'Some vulnerabilities could not be automatically fixed.'
				);
				log.info(
					'You can run "npm audit fix --force" manually if needed.'
				);
			}

			log.ok('Dependencies installed successfully!');
		} catch (e) {
			log.warn(`Install failed: ${e.message}`);
		}
	} else {
		log.info('Skipped dependency install.');
	}

	const rel = path.relative(process.cwd(), targetDir) || '.';
	console.log(
		'\n' + pc.bold(pc.green('Success!')) + ' Project scaffolded.\n'
	);
	console.log(`  Next steps:`);
	console.log(`  1) cd ${rel}`);
	if (!doInstall) console.log(`  2) npm install`);
	console.log(`  ${doInstall ? '2' : '3'}) npm run dev`);
}

main().catch(e => {
	console.error(e);
	process.exit(1);
});
