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


const app = express()



app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))


// Conect to mpngodb
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB')
});



// Routers
const indexRouter = require('./routes/index')
app.use('/', indexRouter)


app.listen(process.env.PORT || 3000)
console.log("Server is runing on port 3000");