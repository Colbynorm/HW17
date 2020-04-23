const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({  extended: true  }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGOD_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

const routes = require("./routes/htmlRoutes");
app.use(routes);

const apiRoutes = require("./routes/apiRoutes");
app.use(apiRoutes);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});