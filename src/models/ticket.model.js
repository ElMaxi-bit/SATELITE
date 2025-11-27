const pool = require("../db");

const TicketModel = {
    getAll: async () => {
        const result = await pool.query("SELECT * FROM ticket");
        return result.rows;
    },

    getById: async (num_ticket) => {
        const result = await pool.query(
            "SELECT * FROM ticket WHERE num_ticket = $1",
            [num_ticket]
        );
        return result.rows[0];
    },

    create: async (desc_breve, desc_detallada, fec_creacion, fec_cierre, id_tipo, id_cliente, id_solicitante, id_usuario) => {
        const result = await pool.query(
            `INSERT INTO ticket 
            (desc_breve, desc_detallada, fec_creacion, fec_cierre, id_tipo, id_cliente, id_solicitante, id_usuario)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *`,
            [desc_breve, desc_detallada, fec_creacion, fec_cierre, id_tipo, id_cliente, id_solicitante, id_usuario]
        );
        return result.rows[0];
    },

    update: async (num_ticket, desc_breve, desc_detallada, fec_creacion, fec_cierre, id_tipo, id_cliente, id_solicitante, id_usuario) => {
        const result = await pool.query(
            `UPDATE ticket SET 
                desc_breve = $1,
                desc_detallada = $2,
                fec_creacion = $3,
                fec_cierre = $4,
                id_tipo = $5,
                id_cliente = $6,
                id_solicitante = $7,
                id_usuario = $8
            WHERE num_ticket = $9
            RETURNING *`,
            [desc_breve, desc_detallada, fec_creacion, fec_cierre, id_tipo, id_cliente, id_solicitante, id_usuario, num_ticket]
        );
        return result.rows[0];
    },

    delete: async (num_ticket) => {
        const result = await pool.query(
            "DELETE FROM ticket WHERE num_ticket = $1 RETURNING *",
            [num_ticket]
        );
        return result.rows[0];
    }
};

module.exports = TicketModel;
