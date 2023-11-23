export const packageJson = [
	{
		devDependencies: {
			stylelint: '{latest}',
			'stylelint-config-standard': '{latest}',
		},
		scripts: {
			'lint-css': "stylelint '**/*.{css,scss}'",
		},
	},
];
