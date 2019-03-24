#! /usr/bin/env bash

osascript -e 'tell app "Terminal"
    do script "mongod"
end tell'

osascript -e 'tell app "Terminal"
    do script "cd /Users/leon/Applications/BlogNx/server && npm start"
end tell'

cd /Users/leon/Applications/BlogNx/client
npm run dev