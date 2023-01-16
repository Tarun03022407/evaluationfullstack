const { application } = require("express");
const express = require("express")
const {PostModel}= require("../models/posts.model")
const postRouter = express.Router();

postRouter.get("/",async(req,res)=>{
    const query=req.query.device
    try {
        let data = await PostModel.find({device:query})
        res.send(data)
    } catch (error) {
        console.log(error);
    }
})

postRouter.post("/create",async(req,res)=>{
    const payload = req.body
    try {
      const newpost = new PostModel(payload)
      await newpost.save()
      res.send("created new post ")
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong "})
    }
})
postRouter.patch("/update/:id",async(req,res)=>{
    const payload = req.body
    const id = req.params.id
    const post= await PostModel.findOne({_id:id})
    const useridpost= post.userID
    const useridrequesting = req.body.userID
    try {
        if(useridrequesting!==useridpost){
            res.send({"msg":"you are not authorized"})
        }else{
            await PostModel.findOneAndUpdate({_id:id},payload)
            res.send("updated the post")
        }
    
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong "})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{

    const id = req.params.id
    const post= await PostModel.findOne({_id:id})
    const useridpost= post.userID
    const useridrequesting = req.body.userID
    try {
        if(useridrequesting!==useridpost){
            res.send({"msg":"you are not authorized"})
        }else{
            await PostModel.findByIdAndDelete({_id:id})
            res.send("updated the post")
        }
    
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong "})
    }
})

module.exports={postRouter}