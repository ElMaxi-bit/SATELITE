const TicketModel = require("../models/ticket.model");

const TicketController = {
    getAll: async (req, res) => {
        const data = await TicketModel.getAll();
        res.json(data);
    },

    getById: async (req, res) => {
        const { id } = req.params;
        const data = await TicketModel.getById(id);
        res.json(data);
    },

    create: async (req, res) => {
        const { nom_ticket, rut_trabajador, nom_trabajador, nom_local, activo, fecha } = req.body;
        const data = await TicketModel.create(nom_ticket, rut_trabajador, nom_trabajador, nom_local, activo, fecha);
        res.json(data);
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { nom_ticket, rut_trabajador, nom_trabajador, nom_local, activo, fecha } = req.body;
        const data = await TicketModel.update(id, nom_ticket, rut_trabajador, nom_trabajador, nom_local, activo, fecha);
        res.json(data);
    },

    delete: async (req, res) => {
        const { id } = req.params;
        const data = await TicketModel.delete(id);
        res.json(data);
    }
};

module.exports = TicketController;
