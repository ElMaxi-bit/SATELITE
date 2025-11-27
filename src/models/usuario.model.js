const pool = require("../db");

class UsuarioModel {

    static async getAll() {
        const query = "SELECT * FROM usuario ORDER BY id_usuario ASC";
        const { rows } = await pool.query(query);
        return rows;
    }

    static async getById(id) {
        const query = "SELECT * FROM usuario WHERE id_usuario = $1";
        const values = [id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async create(data) {
        const query = `
            INSERT INTO usuario (nombre, clave)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const values = [data.nombre, data.clave];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async update(id, data) {
        const query = `
            UPDATE usuario
            SET nombre = $1,
                clave = $2
            WHERE id_usuario = $3
            RETURNING *;
        `;
        const values = [data.nombre, data.clave, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async delete(id) {
        const query = "DELETE FROM usuario WHERE id_usuario = $1 RETURNING *;";
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
}

module.exports = UsuarioModel;
