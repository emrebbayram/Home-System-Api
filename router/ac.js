const express = require("express")
const router = express.Router()

const commands = Object.freeze({
    START: 0,
    STOP: 1,
    RESTART: 2,
    TEMP_INCREASE: 3,
    TEMP_DECREASE: 4,
    MODE_COOL: 5,
    MODE_HEAT: 6,
    MODE_FAN: 7,
    GET_TEMP: 8
})

var current_command;

function GetCommandName(value) {
  return Object.keys(commands).find(key => commands[key] === value);
}

router.get("/", (req, res) => {
    res.status(200).send("AC is working")
})

router.get("/command/view", (req, res) => {
    res.status(200).send("" + GetCommandName(current_command))
})
router.get("/command", (req, res) => {
    res.status(200).send("" + current_command)
    current_command = undefined;
})
router.get("/commands", (req, res) => {
    res.status(200).send(commands)
})
router.post("/command", (req, res) => {
    const command = commands[req.query.command]
    if (command === undefined) {
        res.status(400).send("Invalid command")
    }else {
        current_command = command
        res.status(200).send("Command received: " + command)
    }
})
router.post("/temp/response", (req, res) => {
    const temp = req.query.temp
    if (temp === undefined) {
        res.status(400).send("Invalid temperature")
    }else {
        current_command = temp
        res.status(200).send(temp)
    }
})

module.exports = router;
