const express = require("express");
const EventController = require("../controllers/eventController");
const Token = require("../utils/checkToken");
const router = express.Router();

 // fro all event name 
router.get("/all" ,Token , EventController.getAllEvents)
// Fetch transactions for an event (by event name)
router.get("/:eventId",Token , EventController.getEventTransactions);

router.post("/createEvent" , Token , EventController.createNewEvent);
module.exports = router;
