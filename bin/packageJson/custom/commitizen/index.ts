export const packageJson = [
	{
		config: {
			commitizen: {
				path: 'node_modules/@commitlint/cz-commitlint',
			},
		},
		scripts: {
			commit: 'cz',
		},
		devDependencies: {
			'@commitlint/cz-commitlint': '{latest}',
			commitizen: '{latest}',
		},
	},
];
