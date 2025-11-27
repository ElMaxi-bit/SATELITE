const pool = require("../db");

const Tipo = {
    getAll: async () => {
        const result = await pool.query("SELECT * FROM tipo_ticket ORDER BY id_tipo");
        return result.rows;
    },

    getById: async (id) => {
        const result = await pool.query(
            "SELECT * FROM tipo_ticket WHERE id_tipo = $1",
            [id]
        );
        return result.rows[0];
    },

    create: async ({ nom_tipo, desc_tipo }) => {
        const result = await pool.query(
            `INSERT INTO tipo_ticket (nom_tipo, desc_tipo)
             VALUES ($1, $2)
             RETURNING *`,
            [nom_tipo, desc_tipo]
        );
        return result.rows[0];
    },

    update: async (id, { nom_tipo, desc_tipo }) => {
        const result = await pool.query(
            `UPDATE tipo_ticket
             SET nom_tipo = $1, desc_tipo = $2
             WHERE id_tipo = $3
             RETURNING *`,
            [nom_tipo, desc_tipo, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await pool.query(
            "DELETE FROM tipo_ticket WHERE id_tipo = $1 RETURNING *",
            [id]
        );
        return result.rows[0];
    }
};

module.exports = Tipo;
