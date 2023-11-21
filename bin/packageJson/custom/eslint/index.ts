export const packageJson = [
  {
    devDependencies: {
      eslint: '{latest}',
      'eslint-plugin-react': '{latest}',
      'eslint-plugin-react-hooks': '{latest}',
      'eslint-plugin-jsx-a11y': '{latest}',
      '@typescript-eslint/parser': '{latest}',
      '@typescript-eslint/eslint-plugin': '{latest}',
    },
    scripts: {
      lint: 'eslint . --ext ts,tsx,js,jsx --report-unused-disable-directives --max-warnings 0',
      'lint:fix':
        'eslint . --ext ts,tsx,js,jsx --report-unused-disable-directives --max-warnings 0 --fix',
    },
  },
]
