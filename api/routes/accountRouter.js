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
  .get(validateAccountID, (req, res) => {
    res.status(200).json(req.account);
  })

  .delete(validateAccountID, async (req, res) => {
    console.log(req.params.id);
    try {
      const removed = await db("accounts")
        .where({ id: req.params.id })
        .del();
      res.status(200).json(removed);
    } catch (error) {
      res.status(500).send(`An error occured: ${error}`);
    }
  })
  .put(ValidateAccount, async (req, res) => {
    try {
      await db("accounts")
        .where({ id: req.params.id })
        .update(req.body);
      const account = await db("accounts").where({ id: req.params.id });
      res.status(200).json(account);
    } catch (error) {
      res.status(500).json({ errorMessage: error });
    }
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
async function validateAccountID(req, res, next) {
  try {
    const account = await db("accounts").where({ id: req.params.id });
    account.length > 0
      ? (req.account = account[0]) & next()
      : // ? (req.project = project) & next()
        res.status(400).json({ message: "Error retrieving the project" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving the project" });
  }
}
module.exports = Router;
