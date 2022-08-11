const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const middleware = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authController = require("../controller/Auth/index");
// get all
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM users", (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    console.log(error);
  }
});

// Gets one users
router.get("/:id", middleware, (req, res) => {
  try {
    con.query(
      `SELECT * FROM users where user_id =${req.params.id} `,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// edit user
router.put("/:id", (req, res) => {
  const { email, password, full_name, address, country, phone, user_type } =
    req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    con.query(
      `UPDATE users SET email="${email}",password="${hash}",full_name="${full_name}",address="${address}",country="${country}",phone="${phone}",user_type="${user_type}" WHERE users.user_id="${req.params.id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});
// delete user
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM users  WHERE users.user_id="${req.params.id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.get;

// Register Route and Add new user
// The Route where Encryption starts
router.post("/register", (req, res) => {
  return authController.Register(req, res);
});

// Login
router.post("/login", (req, res) => {
  return authController.Login(req, res);
});

// Verify
router.get("/users/verify", (req, res) => {
  const token = req.header("x-auth-token");
  return authController.Verify(req, res);
});
// Importing the dependencies

module.exports = router;
