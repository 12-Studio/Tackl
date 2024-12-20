const prompts = require('prompts');
const { execSync } = require('child_process');

async function main() {
    const questions = [
        {
            type: 'text',
            name: 'description',
            message: 'Enter a description of your changes:',
            validate: value => value.length >= 10 || 'Description must be at least 10 characters',
        },
        {
            type: 'select',
            name: 'type',
            message: 'Select the type of change:',
            choices: [
                { title: 'Bug fix (non-breaking change which fixes an issue)', value: 'bug' },
                { title: 'New feature (non-breaking change which adds functionality)', value: 'feature' },
                { title: 'Breaking change', value: 'breaking' },
                { title: 'Documentation update', value: 'docs' },
                { title: 'Code refactor', value: 'refactor' },
                { title: 'Performance improvement', value: 'perf' },
                { title: 'Dependencies update', value: 'deps' },
            ],
        },
        {
            type: 'confirm',
            name: 'buildSuccess',
            message: 'Does the website build successfully with `npm run build`?',
            initial: false,
        },
        {
            type: 'text',
            name: 'notes',
            message: 'Additional notes (optional):',
        },
    ];

    const response = await prompts(questions);

    if (!response.buildSuccess) {
        console.error('\n❌ Please fix build errors before committing.');
        process.exit(1);
    }

    // Run build test
    try {
        execSync('npm run build', { stdio: 'inherit' });
    } catch (error) {
        console.error('\n❌ Build failed. Please fix errors before committing.');
        process.exit(1);
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
        `Build: ✅ Verified\n` +
        (response.notes ? `\nNotes: ${response.notes}` : '');

    return commitMessage;
}

main()
    .then(message => {
        console.log('\nCommit message:\n', message);
        process.stdout.write(message);
    })
    .catch(error => {
        console.error('Error:', error);
        process.exit(1);
    });
