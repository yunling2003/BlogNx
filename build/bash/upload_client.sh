rm -rf  ./tmp
mkdir tmp
cp -rf ../client/dist ./tmp
cp -rf ../client/server ./tmp
rm -rf ./tmp/server/node_modules
tar -zcvf ./tmp/blog-client.tar.gz -C ./tmp/dist .
tar -zcvf ./tmp/blog-ssr.tar.gz -C ./tmp/server .
scp -r ./tmp/*.gz root@39.106.198.51:/var/www/upload/blognx
