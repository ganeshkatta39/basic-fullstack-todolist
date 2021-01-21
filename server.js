const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
require('dotenv/config')


mongoose.connect(process.env.DB_Connection,
    { useNewUrlParser: true , useUnifiedTopology: true },
    ()=>{console.log("connected to mongodb")}
)


const index = require("./routes/index")
const tasks = require("./routes/tasks")
const add = require("./routes/add")

// express app
const app = express()
const port = process.env.port || 3000;

// //View Engine
// app.set('views',path.join(__dirname,"views"))
// app.set('view engin','ejs')
// app.engine('html',require('ejs').renderFile )


// set static files 
app.use(express.static(path.join(__dirname, "public")))

// setting bodyParser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));



//Routes
app.use('/', index)
app.use('/api',tasks)
app.use('/api', add)


app.listen(port, ()=>{
    console.log("server running on port "+port)
})

// connecting to mongodb
// mongoose.connect(process.env.DB_Connection,
//     { useNewUrlParser: true , useUnifiedTopology: true },
//     ()=>{console.log("connected to mongodb")}
// )