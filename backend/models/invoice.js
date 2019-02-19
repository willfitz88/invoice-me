const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema({
  invoiceNumber: { type: String, required: true },
  client: { type: String, required: true },
  date: { type: Date, required: true }
});

module.exports = mongoose.model("Invoice", invoiceSchema);
