export const configOptions = {
  '1. Code Formatting': [
    { value: 'prettier', label: 'Prettier' },
    { value: 'eslint', label: 'ESLint' },
    {
      value: 'stylelint',
      label: 'Stylelint',
      hint: 'a CSS linter that helps avoid errors and enforce conventions',
    },
  ],
  '2. Automation': [
    { value: 'husky', label: 'Husky' },
    {
      value: 'lintstaged',
      label: 'Lint-Staged',
      hint: 'runs linters against staged git files',
    },
  ],
  '3. Version Control and Release Management': [
    {
      value: 'commitlint',
      label: 'Commitlint',
      hint: 'helps your team adhere to a commit convention',
    },
    {
      value: 'commitizen',
      label: 'Commitizen',
      hint: 'standardizes commit messages',
    },
    // {
    //   value: 'changesets',
    //   label: 'Changesets',
    //   hint: 'manages your versioning and changelogs',
    // },
  ],
  '4. IDE Configuration': [
    {
      value: 'vscode',
      label: 'VSCode',
      hint: 'provides a .vscode directory to maintain consistency with development across the team',
    },
    {
      value: 'editorconfig',
      label: 'EditorConfig',
      hint: 'maintains consistent coding styles across various editors and IDEs',
    },
  ],
  // '5. Deployment': [
  //   { value: 'netlify', label: 'Netlify' },
  //   { value: 'vercel', label: 'Vercel' },
  // ],
}

export const presetOptions = [
  {
    value: 'express',
    label: 'Express Setup',
    hint: 'Preconfigured setup with all the best practices will be provided. Recommended for new projects.',
  },
  {
    value: 'custom',
    label: 'Custom Setup',
    hint: 'Customizable setup with only the necessary boilerplate will be provided.',
  },
]
