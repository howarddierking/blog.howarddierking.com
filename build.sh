#!/bin/sh

SCRIPTDIR=$(dirname "$0")
echo "switching to $SCRIPTDIR"
cd "$SCRIPTDIR"
npm install
node build.js
