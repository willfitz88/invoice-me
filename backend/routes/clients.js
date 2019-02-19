const express = require("express");

const Client = require("../models/client");

const router = express.Router();

router.post(
  "",
  (req, res, next) => {
    const client = new Client({
      fname: req.body.fname,
      lname: req.body.lname,
      company: req.body.company,
      email: req.body.email
    });
    console.log(client);
    client.save().then(createdClient => {
      res.status(201).json({
        message: "Client added successfully",
        client: {
          ...createdClient,
          id: createdClient._id
        }
      });
    });
  }
);

router.get("", (req, res, next) => {
  Client.find().then(documents => {
    res.status(200).json({
      message: "Clients fetched successfully!",
      clients: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Client.findById(req.params.id).then(client => {
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404).json({ message: "client not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Client.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "client deleted!" });
  });
});

module.exports = router;
