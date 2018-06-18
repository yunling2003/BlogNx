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

require('./routes/article.routes.js')(app)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.json({"message": "Welcome to BlogNx application."})
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000!")
})