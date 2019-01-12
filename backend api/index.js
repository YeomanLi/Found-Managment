const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = new express()

// import listen port and mongoDB
const port = process.env.port || 5000
const db = require('./config/keys').mongoURI

app.listen(port, () => {
    console.log(`Server is running on prot ${port}`)
})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(db)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err))

const userAPI = require('./routes/api/user.js')
app.use('/users', userAPI)