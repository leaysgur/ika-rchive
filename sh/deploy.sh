#!/bin/sh
git fetch -p
git merge origin/master
npm run build
