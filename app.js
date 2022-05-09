require("dotenv/config");

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const commerceRoutes = require("./routes/commerce.routes");
app.use("/", commerceRoutes)

require("./error-handling")(app);

module.exports = app;
