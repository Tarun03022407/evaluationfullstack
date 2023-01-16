const express = require("express")
const { connection } = require("./configs/db")
const app = express()
const {authenticate} = require("./middleware/authenticate")
const {userRouter}=require("./routes/user.routes")
const {postRouter}=require("./routes/posts.routes")
app.use(express.json())

// app.use("/",(req,res)=>{
//     res.send("hello welcome to social media app")
// })
app.use("/users",userRouter)

app.use(authenticate)

app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to db");
    } catch (error) {
        console.log(error);
    }
   console.log(`app running at ${process.env.port}`);
})
