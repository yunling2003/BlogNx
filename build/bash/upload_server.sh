rm -rf  ./tmp
mkdir tmp
cp -rf ../server ./tmp
rm -rf ./tmp/server/node_modules ./tmp/server/resource
rm -f ./tmp/server/npm-debug.log ./tmp/server/src/npm-debug.log
tar -zcvf ./tmp/blog-server.tar.gz -C ./tmp/server .
scp -r ./tmp/*.gz root@39.106.198.51:/var/www/upload/blogserver