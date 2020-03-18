const express = require("express");
const db = require("../../data/dbConfig.js");
const Router = express.Router();

Router.route("/")
  .get(async (req, res) => {
    const accounts = await db("accounts");
    res.status(200).json(accounts);
  })
  .post((req, res) => {
    res.status(200).json({ message: "Hello from post" });
  });

Router.route("/:id")
  .get((req, res) => {
    res.status(200).json({ message: `Hello from Get ${req.params.id}` });
  })
  .post((req, res) => {
    res.status(200).json({ message: `Hello from post ${req.params.id}` });
  })
  .delete((req, res) => {
    res.status(200).json({ message: `Hello from delete ${req.params.id}` });
  })
  .put((req, res) => {
    res.status(200).json({ message: "Hello from put" });
  });

module.exports = Router;
