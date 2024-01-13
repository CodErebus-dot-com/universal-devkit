import PackageJson from '@npmcli/package-json';
import path from 'path';
import util from 'util';
import fs from 'fs';
import { exec } from 'child_process';
import { FileUtils } from '@code-shaper/shaper-utils';
import { spinner } from '@clack/prompts';
import sa from 'shell-artist';
import * as emoji from 'node-emoji';
import { PACKAGE_MANAGER } from '../types/index.js';
import {
	PACKAGE_LOCK,
	YARN_LOCK,
	PNPM_LOCK,
	PACKAGE_MANAGER_MAP,
} from './consts.js';
import { ROOT_DIR, PACKAGE_JSON_DIR } from './paths.js';

const { fileExists, transformFiles } = FileUtils;
const execute = util.promisify(exec);
const s = spinner();

export const fetchFromPackageJson = async (
	configOptions: string[],
	initType: string,
): Promise<unknown[]> => {
	s.start(
		`${emoji.get('rocket')} Getting the necessary dependencies and scripts...`,
	);
	const newPackageJson: PackageJson.PackageJson[][] = await Promise.all(
		configOptions.map(async config => {
			const srcPackageJsonPath =
				process.platform === 'win32'
					? `file://${path.join(
							PACKAGE_JSON_DIR,
							initType,
							initType === 'custom' ? config : '',
							'index.js',
					  )}`
					: path.join(
							PACKAGE_JSON_DIR,
							initType,
							initType === 'custom' ? config : '',
							'index.js',
					  );
			const srcPackageJsonModule = await import(srcPackageJsonPath);
			return srcPackageJsonModule.packageJson;
		}),
	);

	return newPackageJson.flat();
};

export const identifyPackageManager = (): PACKAGE_MANAGER => {
	const packageLock = path.join(ROOT_DIR, PACKAGE_LOCK);
	const pnpmLock = path.join(ROOT_DIR, PNPM_LOCK);
	const yarnLock = path.join(ROOT_DIR, YARN_LOCK);

	if (fileExists(yarnLock)) {
		return PACKAGE_MANAGER_MAP.YARN_LOCK;
	}
	if (fileExists(pnpmLock)) {
		return PACKAGE_MANAGER_MAP.PNPM_LOCK;
	}
	if (fileExists(packageLock)) {
		return PACKAGE_MANAGER_MAP.PACKAGE_LOCK;
	}
	return PACKAGE_MANAGER_MAP.PACKAGE_LOCK;
};

export const getLatestVersion = async (dep: string): Promise<string> => {
	const response = await fetch(`https://registry.npmjs.org/${dep}`);
	const data = await response.json();
	const latestVersion = data['dist-tags'].latest;
	return latestVersion;
};

export const updatePackageJson = async (
	newPackageJson: PackageJson.PackageJson[],
): Promise<void> => {
	try {
		const packageJson = await PackageJson.load('./');
		const packageContent = packageJson.content;
		const latestVersionsPromises: Promise<void>[] = [];

		const newPackageContent = newPackageJson.reduce((merged, pkg) => {
			Object.keys(pkg).forEach(key => {
				if (Object.prototype.hasOwnProperty.call(pkg, key)) {
					if (
						merged[key] &&
						typeof merged[key] === 'object' &&
						!Array.isArray(merged[key])
					) {
						merged[key] = { ...merged[key], ...pkg[key] };
					} else {
						merged[key] = pkg[key];
					}
				}

				if (key === 'devDependencies' && typeof pkg[key] === 'object') {
					const depKeys = Object.keys(pkg[key] as object);
					for (const dep of depKeys) {
						if ((pkg[key] as PackageJson.PackageJson)[dep] === '{latest}') {
							latestVersionsPromises.push(
								getLatestVersion(dep).then(latestVersion => {
									if (merged[key]) {
										(merged[key] as PackageJson.PackageJson)[dep] =
											latestVersion;
									} else {
										merged[key] = { [dep]: latestVersion };
									}
								}),
							);
						}
					}
				}
			});
			return merged;
		}, {});

		await Promise.all(latestVersionsPromises);

		const updatedPackageJson = { ...packageContent };

		Object.keys(newPackageContent).forEach(key => {
			if (
				updatedPackageJson[key] &&
				typeof updatedPackageJson[key] === 'object'
			) {
				updatedPackageJson[key] = {
					...updatedPackageJson[key],
					...newPackageContent[key],
				};
			} else {
				updatedPackageJson[key] = newPackageContent[key];
			}
		});

		packageJson.update(updatedPackageJson);
		await packageJson.save();
		s.stop(`${emoji.get('memo')} Updated the package.json`);
	} catch (error) {
		console.error(error);
	}
};

export const install = async (): Promise<void> => {
	const pkgManager = identifyPackageManager();
	const spinner = sa.start('Installing dependencies...', {
		color: 'cyan',
		modifier: 'bold',
		emoji: 'rocket',
	});
	const { stderr } = await execute(`${pkgManager} install`);

	if (stderr) {
		sa.stop(spinner, 'Installation failed!', { emoji: 'fire' }, 'error');
		sa.log(stderr);
	} else {
		sa.stop(
			spinner,
			'Dependencies installed successfully',
			{
				modifier: 'bold',
				emoji: 'sparkles',
			},
			'success',
		);
	}
};

export const execTransformFiles = (src: string, dst: string): void => {
	const ogConsole = console.log;

	console.log = () => {};
	transformFiles(src, dst, {});
	console.log(); // empty log
	console.log = ogConsole;
};

/**
 * @description : method to check if git initialized or not
 * @returns {boolean} true if git is initialized else false
 */
export const isGitInitialized = (): boolean => {
	try {
		const gitDir = path.join(process.cwd(), '.git');
		return fs.statSync(gitDir).isDirectory();
	} catch (e) {
		return false;
	}
};

/**
 * @description : method to initiate git repository
 */
export const initializeGitRepo = async (): Promise<void> => {
	const { stderr, stdout } = await execute('git init');

	if (stderr) {
		sa.error(`Error: Failed to intialized git repo. ${stderr}`);
		process.exit(1);
	}
	if (stdout) {
		sa.success(stdout, {
			emoji: 'heavy_check_mark',
		});
	}
};

/**
 * @description : method to check if directory is empty or not
 * @param {string} directoryPath : location of directory
 * @returns {boolean} true if empty else false
 */
export const isEmptyDir = (directoryPath?: string): boolean => {
	try {
		const files = fs.readdirSync(directoryPath ?? process.cwd());
		return files.length === 0;
	} catch (e) {
		return false;
	}
};
