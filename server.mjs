import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectdb } from './src/db/database.mjs'
import  userRouter  from './src/routes/user.router.mjs' 
dotenv.config()
const app =  express()
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:8000",
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use('/user',userRouter)

app.get("/test", (req, res) => {
    res.send('server is running');
});

connectdb()
.then (()=>{
    app.listen(process.env.PORT) 
    console.log(`Server is running on port ${process.env.PORT}`)

})
.catch ((err) =>{
    console.log("mongoDB connection failed !!!!",err)
})