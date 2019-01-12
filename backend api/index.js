const express = require('express')
const app = new express()

// 端口
const port = process.env.port || 5000

app.listen(port, () => {
    console.log(`Server is running on prot ${port}`)
})

app.get('/', (req, res) => {
    res.send('root')
})