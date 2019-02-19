const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const invoicesRoutes = require("./routes/invoices");
const clientsRoutes = require("./routes/clients");

const app = express();

mongoose
  .connect(
    "mongodb+srv://will:ENYTLgX87oGS5hES@cluster0-gjzyh.mongodb.net/test?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/invoices", invoicesRoutes);
app.use("/api/clients", clientsRoutes);

module.exports = app;
