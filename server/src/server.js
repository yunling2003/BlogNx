const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const dbConfig = require('./config/database.js')
const mongoose = require('mongoose')
const configKeys = require('./constkeys.js')
const article = require('./routes/article.routes.js')
const authentication = require('./routes/authenticate.routes.js')
const myblog = require('./routes/myblog.routes.js')
const weixin = require('./routes/weixin.routes.js')
const app = express()

mongoose.Promise = global.Promise
mongoose.connect(dbConfig.url).then(() => {
    console.log("Successfully connected to the database")
}).catch(err => {
    console.log(err.message)
    process.exit()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.all('*', (req, res, next) => {  
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")   
    res.header("Access-Control-Expose-Headers", "AuthToken")  
    res.header("Content-Type", "application/json;charset=utf-8")      
    next() 
});  

app.get('/', (req, res) => {    
    res.json({"message": "Welcome to BlogNx application."})
})

app.use('/api/image', express.static(path.join(__dirname, "../resource/image")))
app.use('/api/article', article)
app.use('/api/auth', authentication)
app.use('/api/myblog', myblog)
app.use('/api/weixin', weixin)

app.listen(configKeys.port, () => {
    console.log("Server is listening on port 3000!")
})