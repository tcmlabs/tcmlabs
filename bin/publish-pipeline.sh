#!/usr/bin/env bash

bin/build-all.sh
bin/test-all.sh

npx lerna publish from-package
