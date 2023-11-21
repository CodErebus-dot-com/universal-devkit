export const packageJson = [
  {
    devDependencies: {
      prettier: '{latest}',
    },
    scripts: {
      prettify:
        'prettier --ignore-path .gitignore --write "**/*.(js|jsx|ts|tsx)"',
    },
  },
]
