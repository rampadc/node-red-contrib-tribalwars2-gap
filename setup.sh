#!/bin/sh

# Update node-red
rm -rf node-red
rm -rf node-red-src
git submodule init
git submodule update
mv node-red node-red-src

# Replace nodes with custom
rm -rf node-red-src/nodes/*
cp -r nodes node-red-src/nodes
rm node-red-src/settings.js
cp settings.js node-red-src/settings.js

# Run and build node-red: https://github.com/node-red/node-red
cd node-red-src
npm install
grunt release

cp -a .dist/node-red-*/. ../node-red
cd ../node-red
rm -rf ../node-red-src
npm install --production
