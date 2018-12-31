#!/bin/sh

# Update node-red
rm -rf node-red
git submodule init
git submodule update

# Replace nodes with custom
rm -rf node-red/nodes/*
cp -r nodes node-red/nodes
rm node-red/settings.js
cp settings.js node-red/settings.js

# Run and build node-red: https://github.com/node-red/node-red
cd node-red
npm install
npm run build