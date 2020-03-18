const express = require("express");
const db = require("../../data/dbConfig.js");
const Router = express.Router();

Router.route("/")
  .get(async (req, res) => {
    const accounts = await db("accounts");
    res.status(200).json(accounts);
  })
  .post(ValidateAccount, async (req, res) => {
    try {
      const post = await db("accounts").insert(req.body);
      res.status(200).json(post);
    } catch (error) {
      res
        .status(500)
        .json({ error: `Error inserting post to database ${error}` });
    }
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

function ValidateAccount(req, res, next) {
  const { name, budget } = req.body;
  if (!name || !budget) {
    res
      .status(400)
      .json({ message: "Post missing required fields: Name or Budget" });
  } else {
    next();
  }
}

module.exports = Router;
