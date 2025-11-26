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

    create: async (nom_ticket, rut_trabajador, nom_trabajador, nom_local, activo, fecha) => {
        const result = await pool.query(
            `INSERT INTO ticket 
            (nom_ticket, rut_trabajador, nom_trabajador, nom_local, activo, fecha)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [nom_ticket, rut_trabajador, nom_trabajador, nom_local, activo, fecha]
        );
        return result.rows[0];
    },

    update: async (num_ticket, nom_ticket, rut_trabajador, nom_trabajador, nom_local, activo, fecha) => {
        const result = await pool.query(
            `UPDATE ticket SET 
                nom_ticket = $1,
                rut_trabajador = $2,
                nom_trabajador = $3,
                nom_local = $4,
                activo = $5,
                fecha = $6
            WHERE num_ticket = $7
            RETURNING *`,
            [nom_ticket, rut_trabajador, nom_trabajador, nom_local, activo, fecha, num_ticket]
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
