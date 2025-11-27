const express = require("express");
const path = require("path");
const app = express();
const supportRequirementRoutes = require("./src/routes/supportRequirement.routes");

app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

app.use("/support-requirement", supportRequirementRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
