const express = require("express")
const router = express.Router()

const commands = Object.freeze({
    START: 0,
    STOP: 1,
    RESTART: 2,
    TEMP_INCREASE: 3,
    TEMP_DECREASE: 4
})

var current_command;

router.get("/", (req, res) => {
    res.status(200).send("AC is working")
})

router.get("/command/view", (req, res) => {
    res.status(200).send("" + current_command)
})
router.get("/command", (req, res) => {
    res.status(200).send("" + current_command)
    commands[current_command] = undefined;
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

module.exports = router;
