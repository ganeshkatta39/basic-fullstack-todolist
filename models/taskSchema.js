const mongoose = require("mongoose")

const TaskSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    priority:{
        type:String,
        required: true
    },
    isDone:{
        type:Boolean,
        required:true
    }
})


module.exports = mongoose.model('tasks',TaskSchema)