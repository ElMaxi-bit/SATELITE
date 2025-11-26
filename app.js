const express = require("express");
const app = express();

app.use(express.json());

const ejemploRoutes = require("./src/routes/ejemplo.routes");
app.use("/api/ejemplo", ejemploRoutes);

const dbTestRoutes = require("./src/routes/db.routes");
app.use("/api/db-test", dbTestRoutes);

module.exports = app;

const ticketRoutes = require("./src/routes/ticket.routes");
app.use("/api/tickets", ticketRoutes);

