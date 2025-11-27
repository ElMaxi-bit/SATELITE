const pool = require("../db");

class SolicitanteModel {

    static async getAll() {
        const query = "SELECT * FROM solicitante ORDER BY id_solicitante ASC";
        const { rows } = await pool.query(query);
        return rows;
    }

    static async getById(id) {
        const query = "SELECT * FROM solicitante WHERE id_solicitante = $1";
        const values = [id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async create(data) {
        const query = `
            INSERT INTO solicitante (nombre_completo, email, telefono, vigencia)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [
            data.nombre_completo,
            data.email,
            data.telefono,
            data.vigencia
        ];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async update(id, data) {
        const query = `
            UPDATE solicitante
            SET nombre_completo = $1,
                email = $2,
                telefono = $3,
                vigencia = $4
            WHERE id_solicitante = $5
            RETURNING *;
        `;
        const values = [
            data.nombre_completo,
            data.email,
            data.telefono,
            data.vigencia,
            id
        ];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async delete(id) {
        const query = "DELETE FROM solicitante WHERE id_solicitante = $1 RETURNING *;";
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
}

module.exports = SolicitanteModel;
