const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname,'static')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'static', 'index.html'))
    res.end
})

app.get('http://localhost:8080/OSP-1.0-SNAPSHOT/hello-world/test', (req, res) => {
    res.send("Ok Done")
    res.end
})

app.listen(5016)
