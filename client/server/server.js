const express = require('express')
const fs = require('fs')
const path = require('path')
const ServerRenderer = require("./renderer")

const app = express()

const isProd = process.env.NODE_ENV === 'production'

let renderer
let readyPromise
if (isProd) {
    app.use("/dist", express.static(path.join(__dirname, "../dist")))
    let serverEntry = require("../dist/index_server")    
    let template = fs.readFileSync("./dist/index.html", "utf-8")    
    renderer = new ServerRenderer(serverEntry, template)
} else {
    readyPromise = require("./setup-dev-server")(app, (serverEntry, template) => {
        renderer = new ServerRenderer(serverEntry, template)
    })
}

app.use("/assets", express.static(path.join(__dirname, "../assets")))

const render = (req, res) => {
    console.log('=======enter server=========')
    console.log('visit url: ' + req.url)

    renderer.renderToString(req).then(({error, html}) => {
        if (error) {
            if (error.url) {
                res.redirect(error.url)
            } else if (error.code) {
                res.status(error.code).send("error code：" + error.code)
            }
        }
        res.send(html)
    }).catch(error => {
        console.log(error)
        res.status(500).send("Internal server error")
    })
}

app.get("*", isProd ? render : (req, res) => {         
    readyPromise.then(() => {             
        render(req, res)
    })
})

app.listen(3002, () => {
    console.log("BlogNx is running")
})