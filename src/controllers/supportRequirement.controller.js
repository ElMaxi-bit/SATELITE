const pool = require("../db");

const SupportRequirementController = {

    getClients: async (req, res) => {
        try {
            const query = `
                SELECT id_cliente, nom_cliente
                FROM cliente
                ORDER BY id_cliente;
            `;
            const { rows } = await pool.query(query);

            if (rows.length === 0) {
                return res.status(404).json({
                    status: "error",
                    code: 404,
                    message: "Recurso no encontrado",
                    data: { observation: "No hay clientes disponibles" }
                });
            }

            const clientsList = rows.map(c => ({
                idCliente: String(c.id_cliente),
                nombreCliente: c.nom_cliente
            }));

            return res.status(200).json({
                status: "success",
                code: 200,
                message: "Solicitud procesada correctamente",
                data: { clientsList }
            });

        } catch (error) {
            console.error("Error en getClients:", error);
            return res.status(500).json({
                status: "error",
                code: 500,
                message: "Error interno del servidor"
            });
        }
    },

    getModulosByCliente: async (req, res) => {
        try {
            const { idCliente } = req.params;

            const query = `
                SELECT m.id_modulo, m.nom_modulo
                FROM modulo m
                JOIN cliente_modulo cm ON cm.id_modulo = m.id_modulo
                WHERE cm.id_cliente = $1;
            `;
            const { rows } = await pool.query(query, [idCliente]);

            const moduloList = rows.map(m => ({
                idModulo: String(m.id_modulo),
                nombreModulo: m.nom_modulo
            }));

            return res.status(200).json({
                status: "success",
                code: 200,
                data: { moduloList }
            });

        } catch (error) {
            console.error("Error en getModulosByCliente:", error);
            return res.status(500).json({
                status: "error",
                code: 500,
                message: "Error interno del servidor"
            });
        }
    },

    getSeveridades: async (req, res) => {
        try {
            const query = `
                SELECT id_severidad, nom_severidad
                FROM severidad
                ORDER BY id_severidad;
            `;
            const { rows } = await pool.query(query);

            const severidadList = rows.map(s => ({
                idSeveridad: String(s.id_severidad),
                nombreSeveridad: s.nom_severidad
            }));

            return res.status(200).json({
                status: "success",
                code: 200,
                data: { severidadList }
            });

        } catch (error) {
            console.error("Error en getSeveridades:", error);
            return res.status(500).json({
                status: "error",
                code: 500,
                message: "Error interno del servidor"
            });
        }
    },

    getSolicitantesByCliente: async (req, res) => {
        try {
            const { idCliente } = req.params;

            const query = `
                SELECT s.id_solicitante, s.nombre_completo
                FROM solicitante s
                JOIN cliente_solicitante cs ON cs.id_solicitante = s.id_solicitante
                WHERE cs.id_cliente = $1;
            `;
            const { rows } = await pool.query(query, [idCliente]);

            const solicitanteList = rows.map(s => ({
                idSolicitante: String(s.id_solicitante),
                nombreSolicitante: s.nombre_completo
            }));

            return res.status(200).json({
                status: "success",
                code: 200,
                data: { solicitanteList }
            });

        } catch (error) {
            console.error("Error en getSolicitantesByCliente:", error);
            return res.status(500).json({
                status: "error",
                code: 500,
                message: "Error interno del servidor"
            });
        }
    },

    createTicket: async (req, res) => {
    try {
        const {
            descripcionBreve,
            descripcionDetallada,
            idCliente,
            idSolicitante,
            idUsuario,
            idModulo,
            idSeveridad
        } = req.body;

        if (
            !descripcionBreve ||
            !descripcionDetallada ||
            !idCliente ||
            !idSolicitante ||
            !idUsuario ||
            !idModulo ||
            !idSeveridad
        ) {
            return res.status(400).json({
                status: "error",
                code: 400,
                message: "Datos insuficientes",
                data: { observation: "Faltan parámetros obligatorios" }
            });
        }

        const query = `
            INSERT INTO ticket 
            (desc_breve, desc_detallada, fec_creacion, id_tipo, id_cliente, id_solicitante, id_usuario, id_modulo, id_severidad)
            VALUES ($1, $2, NOW(), null, $3, $4, $5, $6, $7)
            RETURNING *;
        `;

        const values = [
            descripcionBreve,
            descripcionDetallada,
            idCliente,
            idSolicitante,
            idUsuario,
            idModulo,
            idSeveridad
        ];

        const { rows } = await pool.query(query, values);
        const ticket = rows[0];

        return res.status(200).json({
            status: "success",
            code: 200,
            message: "Ticket creado correctamente",
            data: {
                numTicket: String(ticket.num_ticket),
                descBreve: ticket.desc_breve,
                descDetallada: ticket.desc_detallada,
                idCliente: String(ticket.id_cliente),
                idSolicitante: String(ticket.id_solicitante),
                idUsuario: String(ticket.id_usuario),
                idModulo: String(ticket.id_modulo),
                idSeveridad: String(ticket.id_severidad)
            }
        });

    } catch (error) {
        console.error("Error en createTicket:", error);
        return res.status(500).json({
            status: "error",
            code: 500,
            message: "Error interno del servidor"
        });
    }
}}

module.exports = SupportRequirementController;
