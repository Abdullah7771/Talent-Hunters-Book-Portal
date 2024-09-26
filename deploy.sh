#!/bin/bash

cd ~/builds
tar -xzf build.tar.gz -C ~/th-book
cd ~/modules
tar -xzf node_modules.tar.gz -C ~/th-book
cd ~/th-book
pm2 restart 0
rm -rf ~/builds ~/modules