#!/usr/bin/env node
import * as p from '@clack/prompts';
import { FileUtils } from '@code-shaper/shaper-utils';
import path from 'path';
import color from 'picocolors';
import * as emoji from 'node-emoji';
import {
	renderTitle,
	configOptions,
	presetOptions,
	ROOT_DIR,
	TEMPLATES_DIR,
	PACKAGE_JSON,
	isEmptyDir,
	install,
	updatePackageJson,
	fetchFromPackageJson,
	execTransformFiles,
	CONFIG_OPTIONS,
	isGitInitialized,
	initializeGitRepo,
} from './utils/index.js';
import PackageJson from '@npmcli/package-json';

async function main(): Promise<void> {
	if (isEmptyDir()) {
		p.outro(
			color.red(
				`${emoji.get(
					'no_entry',
				)} This directory is empty. Create an app and try again...`,
			),
		);
		process.exit(1);
	}
	if (!FileUtils.fileExists(PACKAGE_JSON)) {
		p.outro(color.red(`${emoji.get('no_entry')} No package.json found!`));
		process.exit(1);
	}

	renderTitle();

	p.note(
		'If the tool you select already exists in your project then, it will be overwritten.',
		color.yellow('CAUTION'),
	);

	const project = await p.group(
		{
			isConfirm: () =>
				p.confirm({
					message: 'Do you want to continue using the tool?',
					initialValue: true,
				}),
			initType: async ({ results }) =>
				results.isConfirm &&
				(await p.select<
					{ value: string; label: string; hint: string }[],
					string
				>({
					message: 'Choose the setup you want to go with',
					options: presetOptions,
				})),
			configType: async ({ results }) =>
				results.isConfirm &&
				results.initType === 'custom' &&
				(await p.groupMultiselect({
					message: 'Choose the tools you need',
					options: configOptions,
				})),
		},
		{
			onCancel: () => {
				p.cancel(color.red(`${emoji.get('no_entry')} Operation cancelled`));
				process.exit(0);
			},
		},
	);

	const { configType, initType, isConfirm } = project;
	if (isConfirm) {
		!isGitInitialized() && (await initializeGitRepo());
		if (initType === 'custom') {
			(configType as string[]).map(c => {
				const srcPath = path.join(TEMPLATES_DIR, initType, c as string);
				if (FileUtils.fileExists(srcPath)) {
					execTransformFiles(srcPath, ROOT_DIR);
				} else {
					return;
				}
			});
		} else {
			const srcPath = path.join(TEMPLATES_DIR, initType as string);
			execTransformFiles(srcPath, ROOT_DIR);
		}

		const newPackageJson = await fetchFromPackageJson(
			(configType as string[]) || CONFIG_OPTIONS,
			initType as string,
		);
		await updatePackageJson(newPackageJson as PackageJson.PackageJson[]);
		await install();

		p.outro(color.green(`${emoji.get('partying')} You're all set!`));
	} else {
		p.outro(color.red(`${emoji.get('no_entry')} Process exited`));
	}
}

main().catch(console.error);
