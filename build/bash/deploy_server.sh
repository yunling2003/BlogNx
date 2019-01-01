mkdir -p /var/www/blogserver
mkdir -p /var/www/blogserver/resource
mkdir -p /var/www/blogserver/resource/image
systemctl stop blogserver
tar -xvzf /var/www/upload/blogserver/blog-server.tar.gz -C /var/www/blogserver
chmod 755 /var/www/blogserver
cd /var/www/blogserver
/usr/local/bin/npm install
systemctl start blogserver
systemctl status blogserver