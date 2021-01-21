const express = require("express")
const router = express.Router();
const Task = require("../models/taskSchema") 

router.post("/add", (req,res)=>{
    try{
        const task = new Task({
            title: req.body.title,
            priority: req.body.priority,
            isDone: req.body.isDone
        })
        res.json(task)
        task.save()
    }catch(err){
        res.json({message: err})
    }
})

router.delete("/del/:postid", async (req,res)=>{
    try{
        await Task.deleteOne({_id: req.params.postid})
    }catch(err){
        res.json({message: err})
    }
 })
module.exports = router



