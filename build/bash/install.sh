#! /usr/bin/env bash

#install nginx
apt-get install nginx

#install mongodb
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
apt-get update
apt-get install -y mongodb-org
service mongod start

#install node.js
apt-get install -y python-software-properties software-properties-common
add-apt-repository ppa:chris-lea/node.js
apt-get update

apt-get install nodejs
apt install nodejs-legacy
apt install npm

npm install n -g
n stable