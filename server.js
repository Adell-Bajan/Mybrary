// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').load()
// }
// const dotenv = require('dotenv')
// const buf = Buffer.from('hello world')
// const opt = { debug: true }
// const config = dotenv.parse(buf, opt)
const mongoose = require('mongoose')
const config = require('./config/database')
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const app = express()




app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))


// Conect to mpngodb
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB')
});



// Routers
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

// Middlwere
app.use('/', indexRouter)
app.use('/authors', authorRouter)



app.listen(process.env.PORT || 3000)
console.log("Server is runing on port 3000");