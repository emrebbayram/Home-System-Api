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

var last_temp_check;

var lastTemp;
var lastHum;

function GetCommandName(value) {
  return Object.keys(commands).find(key => commands[key] === value);
}

async function waitForTempUpdate(old_temp_check) {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            if (old_temp_check !== last_temp_check) {
                clearInterval(interval);
                resolve();
            }
        }, 100);
    })
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
router.post("/command", async (req, res) => {
    const command = commands[req.query.command]
    if (command === undefined) {
        res.status(400).send("Invalid command")
    }else {
        current_command = command
        if (command === commands.GET_TEMP) {
            if (last_temp_check === undefined || (Date.now() - last_temp_check) > 300000) {
                const old_temp_check = last_temp_check;
                await waitForTempUpdate(old_temp_check);
                var data = {};
                data["temp"] = lastTemp;
                data["hum"] = lastHum;
                res.status(200).send(data);
            }else {
                var data = {};
                data["temp"] = lastTemp;
                data["hum"] = lastHum;
                res.status(200).send(data);
            }
        }else {
            res.status(200).send("Command received: " + command)
        }
    }
})
router.post("/temp/response", (req, res) => {
    const temp = req.query.temp
    const hum = req.query.hum
    if (temp === undefined) {
        res.status(400).send("Invalid temperature")
    }else {
        if (hum !== undefined) {
            lastHum = hum;
        }
        lastTemp = temp;
        last_temp_check = Date.now();
        res.status(200).send()
    }
})

module.exports = router;
