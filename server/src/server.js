const express = require('express')
const bodyParser = require('body-parser')
const dbConfig = require('./config/database.js')
const mongoose = require('mongoose')
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
    res.header("Content-Type", "application/json;charset=utf-8")
    next() 
});  

app.get('/', (req, res) => {    
    res.json({"message": "Welcome to BlogNx application."})
})

require('./routes/article.routes.js')(app)
require('./routes/authenticate.routes.js')(app)
require('./routes/myblog.routes.js')(app)

app.listen(3000, () => {
    console.log("Server is listening on port 3000!")
})