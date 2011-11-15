#!/bin/sh

rm -rf chapter8
mkdir chapter8
cp 01_phonegap_basic/01_config_xml/index.html chapter8
cp -LR tartanhunt/images chapter8
mkdir chapter8/scripts
cp tartanhunt/scripts/jquery* chapter8/scripts
cp -LR tartanhunt/style chapter8
mkdir chapter8/extras
mkdir chapter8/extras/images
mv chapter8/images/splash* chapter8/extras/images
zip -qr chapter8.zip chapter8