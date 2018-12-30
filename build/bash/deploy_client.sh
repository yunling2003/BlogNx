mkdir -p /var/www/blogserver
tar -xvzf /var/www/upload/blognx/blog-client.tar.gz -C /var/www/blognx
chmod 755 /var/www/blognx
nginx -s reload