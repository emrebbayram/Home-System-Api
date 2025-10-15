const express = require("express")
const router = express.Router()
const fs = require("fs");

jsonPath = "/data/data.json"

router.post("/create",(req,res) => {
    var dataNew;
    console.log(req.query.name);
    console.log(req.query.pass);
    console.log(req.query.mail);
    fs.readFile(jsonPath,"utf8",(err,data) => {
        dataNew = JSON.parse(data);
        var found = false;
        if (req.query.name == "" || req.query.pass == "" || req.query.mail == "" || req.query.name == null || req.query.pass == null || req.query.mail == null){
            res.status(400).send("null values")
            found = true;
        }
        for (let index = 0; index < dataNew.length; index++) {
            if (dataNew[index]["name"] == req.query.name){
                res.status(300).send("already exist");
                found = true;
                break;
            }    
        }
        if (found == false){
            var newMail = req.query.mail
            newMail = newMail.replace("%40","@")
            dataNew[dataNew.length] = {"name":req.query.name,"pass":req.query.pass,"email":newMail,"permissionDate":null};
            fs.writeFile(jsonPath,JSON.stringify(dataNew),(err) => {
                if (err) {
                    res.status(400).send("user not created");
                    throw err;
                }
                console.log("new user");
                res.status(200).send("user created");
            });
        }
    });
})

router.get("/all/8888778787878454554412125445dsadsadsadsa",(req,res) => {
    fs.readFile(jsonPath,"utf8",(err,data) => {
        if (data){
            res.send(data);
        }
    })
})

router.put("/all/8888778787878454554412125445dsadsadsadsa",(req,res) => {
    fs.readFile(jsonPath,"utf8",(err,data) => {
        if (data){
            var dataNew = JSON.parse(data)
            for (let index = 0; index < dataNew.length; index++) {
                var element = dataNew[index];
                if (element["name"] == req.query.name){
                    element["permissionDate"] = req.query.perm;
                    console.log("yetki değişti")
                    console.log(element)
                    fs.writeFile(jsonPath,JSON.stringify(dataNew),(err) => {
                        if (err){
                            res.status(400).send(err)
                        }else {
                            res.status(200).send("succesful")
                        }         
                        index = 999            
                    }) 
                }
            }
        }
    })
})


function dateCheck(userDateInput){
    var datetime = new Date();
    //var date = datetime.toISOString().slice(0,10)

    const userDate = Date.parse(userDateInput);
    if (userDate > datetime){
        return true
    }else {
        return false
    }
}


router.get("/login",(req,res) => {
    fs.readFile(jsonPath,"utf8",(err,data) => {
        if (data){
            dataNew = JSON.parse(data)
            var found = false;
            for (let index = 0; index < dataNew.length; index++) {
                if (dataNew[index]["name"] == req.query.name){
                    found = true;
                    if (dataNew[index]["pass"] == req.query.pass){
                        const permission = dateCheck(dataNew[index]["permissionDate"])
                        if (permission){
                            res.status(200).send("logged in with permission");
                        }else {
                            res.status(201).send("logged in without permission");
                        }
                        break;
                    }else {
                        res.status(300).send("wrong password");
                        break;
                    }
                }
            }
            if (!found){
                res.status(300).end("user not found ");
            }
        }else {
            res.status(300).end("user not found");
        }
    });
});

module.exports = router