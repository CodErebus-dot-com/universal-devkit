import { PACKAGE_LOCK, YARN_LOCK, PNPM_LOCK } from '../utils/consts.js';

export type LOCK_FILE =
	| typeof PACKAGE_LOCK
	| typeof YARN_LOCK
	| typeof PNPM_LOCK;
export type PACKAGE_MANAGER = 'yarn' | 'npm' | 'pnpm';
