import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectdb } from './src/db/database.mjs'

dotenv.config()
const app =  express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())




connectdb()
.then (()=>{
    app.listen(process.env.PORT) 
    console.log(`Server is running on port ${process.env.PORT}`)

})
.catch ((err) =>{
    console.log("mongoDB connection failed !!!!",err)
})