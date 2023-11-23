export const packageJson = [
	{
		devDependencies: {
			'@commitlint/config-conventional': '{latest}',
			'@commitlint/cli': '{latest}',
			eslint: '{latest}',
			'eslint-plugin-react': '{latest}',
			'eslint-plugin-react-hooks': '{latest}',
			'eslint-plugin-jsx-a11y': '{latest}',
			'@typescript-eslint/parser': '{latest}',
			'@typescript-eslint/eslint-plugin': '{latest}',
			husky: '{latest}',
			prettier: '{latest}',
			'lint-staged': '{latest}',
			stylelint: '{latest}',
			'stylelint-config-standard': '{latest}',
			commitizen: '{latest}',
			'cz-conventional-changelog': '{latest}',
		},
		scripts: {
			lint: 'eslint . --ext ts,tsx,js,jsx --report-unused-disable-directives --max-warnings 0',
			'lint:fix':
				'eslint . --ext ts,tsx,js,jsx --report-unused-disable-directives --max-warnings 0 --fix',
			'lint-css': "stylelint '**/*.{css,scss}' --fix",
			'check-types': 'tsc --noEmit',
			prettify:
				'prettier --ignore-path .gitignore --write "**/*.(js|jsx|ts|tsx)"',
			format: 'npm run lint:fix && npm run lint-css && npm run prettify',
			prepare: 'husky install',
			commit: 'cz',
		},
		'lint-staged': {
			'*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
			'**/*.ts?(x)': () => 'npm run check-types',
			'*.{css,scss}': ['stylelint --fix'],
			'*.{json,yaml,md,html}': ['prettier --write'],
		},
		commitlint: {
			extends: ['@commitlint/config-conventional'],
			rules: {
				'body-leading-blank': [2, 'always'],
			},
		},
		config: {
			commitizen: {
				path: 'node_modules/cz-conventional-changelog',
			},
		},
	},
];
