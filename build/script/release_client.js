const shell = require('shelljs')
shell.config.verbose = true

shell.exec('sh ./bash/upload_client.sh')

shell.exec('ssh root@39.106.198.51 "sh /var/www/upload/blognx/script/deploy_client.sh"')