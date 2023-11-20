#!/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"

# Get staged files using git
staged_files=$(git diff --cached --name-only --diff-filter=ACM)

# Run your linting or checks on the staged files
for file in $staged_files; do
  # Example: Run ESLint on JS/TS files
  if [ "${file##*.}" = "js" ] || [ "${file##*.}" = "jsx" ] || [ "${file##*.}" = "ts" ] || [ "${file##*.}" = "tsx" ]; then
    npx eslint "$file"
    # Add more conditions for other file types and respective linters or checks
  fi

  # Add more conditional checks and corresponding linters or checks for other file types
done

exit 0
