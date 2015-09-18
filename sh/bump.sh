#!/bin/sh
old=$1;
new=$2;

if [ $# -ne 2 ]; then
  echo "Usage:"
  echo "  ./sh/bump.sh <current version> <next version>"
  exit 1
fi

echo "$old -> $new"

re="s/$old/$new/g"

perl -pi -e ${re} package.json
perl -pi -e ${re} index.html
