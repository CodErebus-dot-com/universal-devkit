export const packageJson = [
  {
    dependencies: {
      stylelint: '{latest}',
      'stylelint-config-standard': '{latest}',
    },
    scripts: {
      'lint-css': "stylelint '**/*.{css,scss}'",
    },
  },
];
