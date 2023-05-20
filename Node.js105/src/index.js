require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

app.get('/check', (req, res, next) => {
    res.json({ msg: "Health Check" })
})

// app.use('/', require('./routes'))
app.use('/recipes', require('./routes/recipe.route'))

app.listen(process.env.PORT)


// entry ---> route ----> controller ----> model