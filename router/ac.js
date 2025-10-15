const express = require("express")
const router = express.Router()

const commands = Object.freeze({
    START : 0,
    STOP : 1,
    RESTART : 2,
    TEMP_INCREASE : 3,
    TEMP_DECREASE : 4
})

var current_command;

router.get("/",(req,res) => {
    res.status(200).send("AC is working")
})
router.get("/command",(req,res) => {
    res.status(200).send(""+current_command)
})

