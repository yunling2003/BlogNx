systemctl stop blogssr

rm -rf /var/www/blognx
mkdir -p /var/www/blognx
mkdir -p /var/www/blognx/dist
mkdir -p /var/www/blognx/server
tar -xvzf /var/www/upload/blognx/blog-client.tar.gz -C /var/www/blognx/dist
tar -xvzf /var/www/upload/blognx/blog-ssr.tar.gz -C /var/www/blognx/server
chmod 755 /var/www/blognx
cd /var/www/blognx/server
/usr/local/bin/npm install

systemctl start blogssr
systemctl status blogssr

nginx -s reload