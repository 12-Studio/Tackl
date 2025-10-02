import { execSync } from 'child_process';
import fs from 'fs';
import prompts from 'prompts';

(async () => {
	try {
		console.log('Starting commit message prompts...');

		const onCancel = () => {
			console.log('\nCommit cancelled by user');
			process.exit(1);
		};

		const response = await prompts(
			[
				{
					type: 'text',
					name: 'description',
					message: 'Enter a description of your changes:',
					validate: value =>
						value.length >= 10 ||
						'Description must be at least 10 characters',
				},
				{
					type: 'select',
					name: 'type',
					message: 'Select the type of change:',
					choices: [
						{
							title: 'Bug fix (non-breaking change which fixes an issue)',
							value: 'bug',
						},
						{
							title: 'New feature (non-breaking change which adds functionality)',
							value: 'feature',
						},
						{ title: 'Breaking change', value: 'breaking' },
						{ title: 'Documentation update', value: 'docs' },
						{ title: 'Code refactor', value: 'refactor' },
						{ title: 'Performance improvement', value: 'perf' },
						{ title: 'Dependencies update', value: 'deps' },
					],
				},
				{
					type: 'confirm',
					name: 'buildCheck',
					message:
						'Would you like to verify the build before committing?',
					initial: true,
				},
				{
					type: 'text',
					name: 'notes',
					message: 'Additional notes (optional):',
				},
			],
			{
				onCancel,
			}
		);

		// Check if we have all required fields
		if (!response.description || !response.type) {
			console.error('Commit cancelled: Required fields missing');
			process.exit(1);
		}

		// Only run build check if user confirms
		if (response.buildCheck) {
			console.log('\nRunning build check...');
			try {
				execSync('npm run build', { stdio: 'inherit' });
				console.log('✅ Build successful!');
			} catch (error) {
				console.error(
					'\n❌ Build failed. Please fix errors before committing.'
				);
				process.exit(1);
			}
		}

		const typeEmoji = {
			bug: '🐛',
			feature: '✨',
			breaking: '💥',
			docs: '📚',
			refactor: '♻️',
			perf: '⚡',
			deps: '📦',
		};

		const commitMessage =
			`${typeEmoji[response.type]} ${response.description}\n\n` +
			`Type: ${response.type}\n` +
			`Build: ${response.buildCheck ? '✅ Verified' : '⏩ Skipped'}\n` +
			(response.notes ? `\nNotes: ${response.notes}` : '');

		// Write to Git commit message file
		fs.writeFileSync('.git/COMMIT_EDITMSG', commitMessage);
		console.log('\nCommit message created successfully!');
		process.exit(0);
	} catch (err) {
		console.error('Error during commit:', err);
		process.exit(1);
	}
})();
