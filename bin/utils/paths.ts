import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const TEMPLATES_DIR = path.join(__dirname, '..', 'templates')
export const PACKAGE_JSON_DIR = path.join(__dirname, '..', 'packageJson')
export const ROOT_DIR = process.cwd()
export const PACKAGE_JSON = path.join(ROOT_DIR, 'package.json')
