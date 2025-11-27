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
        const {
            desc_breve,
            desc_detallada,
            fec_creacion,
            fec_cierre,
            id_tipo,
            id_cliente,
            id_solicitante,
            id_usuario
        } = req.body;

        const data = await TicketModel.create(
            desc_breve,
            desc_detallada,
            fec_creacion,
            fec_cierre,
            id_tipo,
            id_cliente,
            id_solicitante,
            id_usuario
        );

        res.json(data);
    },

    update: async (req, res) => {
        const { id } = req.params;
        const {
            desc_breve,
            desc_detallada,
            fec_creacion,
            fec_cierre,
            id_tipo,
            id_cliente,
            id_solicitante,
            id_usuario
        } = req.body;

        const data = await TicketModel.update(
            id,
            desc_breve,
            desc_detallada,
            fec_creacion,
            fec_cierre,
            id_tipo,
            id_cliente,
            id_solicitante,
            id_usuario
        );

        res.json(data);
    },

    delete: async (req, res) => {
        const { id } = req.params;
        const data = await TicketModel.delete(id);
        res.json(data);
    }
};

module.exports = TicketController;
