require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const userroutes = require('./routes/user')
const postroutes = require('./routes/post')
const commentroutes = require('./routes/comment')
const path = require('path')

app.listen(process.env.PORT)

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true})
    .then(value => {
        console.log(`db connected`)
    }, reason => {
        console.log(reason)
    })

app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '../dist/client')))

app.use(userroutes)
app.use(postroutes)
app.use(commentroutes)

app.get(
  '/*',
  (req, res) => {
    res.sendFile(
      path.join(__dirname, '../dist/client/index.html')
    )
  }
)

app.use((req, res) => {
    res.status(404).send(
        {
            status: 0,
            msg: '404 error'
        }
    )
})
