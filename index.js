const express = require("express")
const connect = require("./db")

const app = express()

app.use(express.json())

const bcrypt = require("bcrypt")
const userModel = require("./model")

app.post("/signup",async(req,res)=>{
    let {email,password} = req.body
    bcrypt.hash(password,5,async(err,hash)=>{
        if(err){
            res.send("Error Found")
        }
        else{
            let data = await userModel.create({email:email,password:hash})
            res.send(data)
        }
    })
})

app.post("/login",async(req,res)=>{
    let {email,password} = req.body
    let data = await userModel.findOne({email})
    if(data){
        bcrypt.compare(password,data.password,(err,result)=>{
            if(err){
                res.send("Invalid Password")
            }
            else{
                res.send("Login Success")
            }
        })
    }
    else{
        res.send("Registeration Required")
    }
})

app.listen(8090,()=>{
    connect()
    console.log("Server on 8090")
})