#!/bin/sh

rm -rf chapter8
mkdir chapter8
cp 01_phonegap_basic/01_config_xml/index.html chapter8
cp -LR tartanhunt/images chapter8
mkdir chapter8/scripts
cp tartanhunt/scripts/jquery* chapter8/scripts
cp 01_phonegap_basic/02_splash_icons/scripts/app.js chapter8/scripts
cp -LR tartanhunt/style chapter8
mkdir chapter8/extras
mkdir chapter8/extras/images
mkdir chapter8/extras/scripts
cp 02_local_storage/scripts/done.js chapter8/extras/scripts/app.localStorage.js
cp tartanhunt/scripts/app.js chapter8/extras/scripts/app.final.js
mv chapter8/images/splash* chapter8/extras/images