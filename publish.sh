#!/usr/bin/env bash
#
# Generates production code and pushes it up to the site
#

rm -rf ./build && \
npm run build && \
git checkout gh-pages && \
git pull origin gh-pages && \
cp -r ./build/ ./ && \
rm -rf ./build && \
git add . && \
git commit -am "chore(publish): production code generated automatically" && \
git push origin gh-pages