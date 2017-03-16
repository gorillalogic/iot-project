#!/bin/sh 
#sudo npm install  webpack -g

WEBPACK=`which webpack`

if [[ -d web ]]; then
  pushd web
  #npm install
  $WEBPACK --progress -p
  pushd src
  aws s3 cp client.min.js s3://gorilla-iot-react --acl public-read

fi

