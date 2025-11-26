const express = require("express");
const router = express.Router();
const TicketController = require("../controllers/ticket.controller");

router.get("/", TicketController.getAll);
router.get("/:id", TicketController.getById);
router.post("/", TicketController.create);
router.put("/:id", TicketController.update);
router.delete("/:id", TicketController.delete);

module.exports = router;
