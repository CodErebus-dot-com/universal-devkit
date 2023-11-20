export const packageJson = [
  {
    dependencies: {
      prettier: '{latest}',
    },
    scripts: {
      prettify: 'prettier --ignore-path .gitignore --write "**/*.(js|jsx|ts|tsx)"',
    },
  },
];
