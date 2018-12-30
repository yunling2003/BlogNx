const shell = require('shelljs')
shell.config.verbose = true

shell.exec('sh ./bash/upload_server.sh')

shell.exec('ssh root@39.106.198.51 "sh /var/www/upload/blogserver/script/deploy_server.sh"')