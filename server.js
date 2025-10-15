const express = require("express");
const fs = require("fs");
const app = express();

function logger(req,res,next){
    console.log(req.get("host"))
    next()
}

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


const acRouter = require("./router/ac")

app.use("/ac",acRouter)

app.listen(3000);