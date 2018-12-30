rm -rf  ./tmp
mkdir tmp
cp -rf ../client/dist ./tmp
tar -zcvf ./tmp/blog-client.tar.gz -C ./tmp/dist .
scp -r ./tmp/*.gz root@39.106.198.51:/var/www/upload/blognx
