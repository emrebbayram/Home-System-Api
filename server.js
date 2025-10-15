const express = require("express");
const fs = require("fs");
const app = express();

function dataJsonCheck (){
    fs.readFile("/data/data.json","utf8",(err,data) => {
        if (err){
            console.log(err)
            console.log("/data/data.json oluşturuluyor...");
            var data = 
            [
                {
                    name:'Bob',
                    pass:"0123456789rds",
                    email:"bob@dsa.com",
                    permissionDate:"2022-02-02"
                },
                {
                    name:'Bobsd',
                    pass:"0123456s789rds",
                    email:"bob@dsa.com",
                    permissionDate:"2022-02-02"
                }
            ]
            fs.writeFile("/data/data.json",JSON.stringify(data),(err) => {
                if (err){
                    console.log(err)
                }
            })
        }
    });
}

dataJsonCheck()

app.use(express.json())

app.use(logger)

app.get("/",(req,res) => {
    res.status(200).send({
        "message":"succ"
    })
});

app.get("/contact",(req,res) => {
    res.status(200).send("contact@mail.com")
});


const userRouter = require("./router/users")

function logger(req,res,next){
    console.log(req.get("host"))
    next()
}

app.use("/users",userRouter)

app.listen(3000);