#!/bin/bash

SCRIPTDIR=$(dirname "$0")
echo "swithcing to $SCRIPTDIR"
cd "$SCRIPTDIR"
npm install
node serve.js
