const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String, required: true }
});

module.exports = mongoose.model("Client", clientSchema);
