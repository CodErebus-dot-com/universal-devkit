# Universal DevKit

A command-line tool designed to streamline the setup process for essential
development tools. It simplifies the configuration of popular tools used for
code formatting, linting, version control, and many more.

Best for TypeScript based React or Nextjs projects.

![npm](https://img.shields.io/npm/v/@coderebus/universal-devkit?logo=npm)
![NPM](https://img.shields.io/npm/l/%40coderebus%2Funiversal-devkit)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/%40coderebus%2Funiversal-devkit)

Badges from [Shields](https://shields.io/)

## Table of Contents

1. [Why UDK?](#why-udk)
2. [Available Tools](#available-tools)
3. [Usage](#usage)
   - [Express Setup](#express-setup)
   - [Custom Setup](#custom-setup)
   - [Scripts](#scripts)
   - [Key Pointers](#few-things-to-keep-in-mind)
4. [Contributors](#contributors)
5. [Third-party Tools](#third-party-tools)

## Why UDK?

There are a couple of reasons why should consider using this tool.

1. Setting up development environments, adopting the best tools and practices is
   a painful and arduous job as you have to go through a ton of documentation
   and/or you are unsure of what and which tools to include in your project.
2. The most obvious problem is the time it takes for the "so called setup".

UDK provides instant setup of your favorite tools, installs the required
dependencies, adds the necessary scripts and voila, your setup is ready!

## Available Tools

1. Code Formatting
   - [Prettier](https://prettier.io/)
   - [ESLint](https://eslint.org/)
   - [Stylelint](https://stylelint.io/)
2. Automation
   - [Husky](https://typicode.github.io/husky/)
   - [Lint-Staged](https://github.com/lint-staged/lint-staged)
3. Version Control and Release Management
   - [Commitlint](https://commitlint.js.org/#/)
   - [Commitizen](https://commitizen-tools.github.io/commitizen/)
4. IDE Configuration
   - VSCode
   - [EditorConfig](https://editorconfig.org/)

## Usage

Run the below command:

```bash
npx @coderebus/universal-devkit@latest
```

You will then be asked the following prompt:

```bash
Choose the setup you want to go with:
- Express Setup
- Custom Setup
```

### Express Setup

The Express Setup offers a hassle-free, ready-to-go configuration for essential
development tools. It includes a predefined set of popular tools configured with
the best industry settings. This setting is recommended for new projects or when
you prefer a swift, standardized setup.

### Custom Setup

Custom Setup provides flexibility, allowing you to cherry-pick specific tools
based on your project's requirements. It's ideal for existing projects or when
you prefer selecting individual tools and configuring them according to your
needs.

### Scripts

The scripts can be used with your favorite package managers (npm, yarn and
pnpm). Here are the scripts available for you to use:

1. Code Formatting

   - to run prettier

   ```bash
   npm run prettify
   ```

   - to run eslint

   ```bash
   npm run lint
   ```

   - to fix lint issues

   ```bash
   npm run lint:fix
   ```

   - to run stylelint

   ```bash
   npm run lint-css
   ```

   - to run lint:fix, lint-css and prettify (comes with express setup)

   ```bash
   npm run format
   ```

2. Version Control

   - the new commit command instead of git commit (comes with commitizen)

   ```bash
   npm run commit
   ```

### Few Things To Keep In Mind

1. If you choose a tool and that tool is already configured in your project,
   then it may get overwritten with the new configuration. You will see this
   warning when you use this tool.
2. In express setup, the code formatting (`eslint`, `prettier`, `stylelint`) is
   automated with the help of `lint-staged` and `husky` when you commit your
   code.
3. `eslint` setup is

## Contributors

I would appreciate a ton of feedback and help at the same time to improve on
existing limitations and ofcourse, to add more to this.

## Third-party Tools

Special mention to the third-party tools that I have used to build the cli:

1. [Clack](https://www.npmjs.com/package/@clack/prompts) - helped me build the
   beautiful cli interface easily.
2. [ShellArtist](https://www.npmjs.com/package/shell-artist) - helped me create
   UDK ASCII Art and write other beautiful logs easily.
