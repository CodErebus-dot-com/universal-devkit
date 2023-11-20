#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

LC_ALL=C
bold=$(tput bold)
normal=$(tput sgr0)
RED='\033[0;31m'
YLW='\033[0;33m'
NC='\033[0m' # No Color

commit_msg_file=$1

# Check if the commit message file exists
if [ ! -f "$commit_msg_file" ]; then
  echo "${YLW}Commit message file not found."
  exit 1
fi

# Define your custom commit message format (example: starts with feat/fix/chore, followed by a meaningful message)
commit_regex="^(build|chore|ci|docs|feat|fix|perf|refactor|style|test|hotfix|assets)(\(.+\))?: .+"

# Read the commit message from the file
commit_msg=$(cat "$commit_msg_file")

message="\nCommit messages in this project must adhere to this contract: ${bold}$commit_regex.${normal} \n"

# Check if the commit message matches the defined format
if ! echo "$commit_msg" | grep -qE "$commit_regex"; then
  echo "${RED}$message"
  exit 1
fi

exit 0
