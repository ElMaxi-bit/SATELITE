const pool = require("../db");

class ClienteModel {

    static async getAll() {
        const query = "SELECT * FROM cliente ORDER BY id_cliente ASC";
        const { rows } = await pool.query(query);
        return rows;
    }

    static async getById(id) {
        const query = "SELECT * FROM cliente WHERE id_cliente = $1";
        const values = [id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async create(data) {
        const query = `
            INSERT INTO cliente (nom_cliente)
            VALUES ($1)
            RETURNING *;
        `;
        const values = [data.nombre_cliente];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async update(id, data) {
        const query = `
            UPDATE cliente
            SET nom_cliente = $1
            WHERE id_cliente = $2
            RETURNING *;
        `;
        const values = [data.nombre_cliente, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async delete(id) {
        const query = "DELETE FROM cliente WHERE id_cliente = $1 RETURNING *;";
        const values = [id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }
}

module.exports = ClienteModel;