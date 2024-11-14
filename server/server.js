const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const PORT = process.env.PORT || 5000;
const app=express()


const mongoDBURI = 'mongodb+srv://adkaneb:Password%231@cluster0.y2q5d.mongodb.net/'
mongoose
.connect(mongoDBURI)
.then(()=>console.log('MongoDB Conneted'))
.catch((error)=> console.log('Error connecting to MongoDB :', error))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(
    cors({
        origin: "http://localhost:5173/",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
            "Content-Type",
            "Expires",
            "Pragma",
            "Cache-Control"
        ],
        credentials: true
    })
)

app.listen(PORT, ()=>{
    console.log(`Port is running on ${PORT}`);
})