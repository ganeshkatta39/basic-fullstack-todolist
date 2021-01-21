const express = require("express")
const router = express.Router();
const Task = require("../models/taskSchema") 

router.get("/tasks", async (req,res)=>{
   try{
       const tasklist = await Task.find()
       res.json(tasklist)
   }catch(err){
       res.json({message: err})
   }
})

router.get("/specific/:postid", async (req,res)=>{
    try{
        const task = await Task.findById(req.params.postid)
        res.send(task)
    }catch(err){
        res.json({message: err})
    }
 })

module.exports = router
