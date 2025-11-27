const express = require("express");
const router = express.Router();
const SupportRequirementController = require("../controllers/supportRequirement.controller");

router.get("/get-clients", SupportRequirementController.getClients);
router.get("/get-modulos/:idCliente", SupportRequirementController.getModulosByCliente);
router.get("/get-severidades", SupportRequirementController.getSeveridades);
router.get("/get-solicitantes/:idCliente", SupportRequirementController.getSolicitantesByCliente);
router.post("/create-ticket", SupportRequirementController.createTicket);

module.exports = router;
