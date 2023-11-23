module.exports = {
	settings: {
		react: {
			version: 'detect',
		},
	},
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['eslint:recommended'],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	overrides: [
		{
			files: ['**/*.ts'],
			parser: '@typescript-eslint/parser',
			plugins: ['@typescript-eslint'],
			extends: ['plugin:@typescript-eslint/recommended'],
			rules: {
				'@typescript-eslint/no-unused-vars': 'error',
				'@typescript-eslint/explicit-function-return-type': [
					'warn',
					{
						allowExpressions: true,
						allowConciseArrowFunctionExpressionsStartingWithVoid: true,
					},
				],
				'@typescript-eslint/ban-ts-comment': 'warn',
				'no-mixed-spaces-and-tabs': 'off',
			},
		},
	],
};
