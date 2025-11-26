const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT datname FROM pg_database");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;
