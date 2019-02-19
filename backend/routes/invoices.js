const express = require("express");

const Invoice = require("../models/invoice");

const router = express.Router();

router.post(
  "",
  (req, res, next) => {
    const invoice = new Invoice({
      invoiceNumber: req.body.invoiceNumber,
      client: req.body.client,
      date: req.body.date,
      total: req.body.total,
    });
    console.log(invoice);
    invoice.save().then(createdInvoice => {
      res.status(201).json({
        message: "Invoice added successfully",
        invoice: {
          ...createdInvoice,
          id: createdInvoice._id
        }
      });
    });
  }
);

router.get("", (req, res, next) => {
  Invoice.find().then(documents => {
    res.status(200).json({
      message: "Invoices fetched successfully!",
      invoices: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Invoice.findById(req.params.id).then(invoice => {
    if (invoice) {
      res.status(200).json(invoice);
    } else {
      res.status(404).json({ message: "invoice not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Invoice.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "invoice deleted!" });
  });
});

module.exports = router;
