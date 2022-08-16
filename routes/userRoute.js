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
// Cart
// view cart
router.get("/:id/cart", (req, res) => {
  let cart = [];
  if (cart !== 0) {
    try {
      let sql = "Select cart FROM users WHERE ?";
      let users = { user_id: req.params.id };
      con.query(sql, users, (err, result) => {
        if (err) throw err;
        res.send(result[0].cart);
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("empty");
  }
});
// add to cart
router.post("/:id/cart", (req, res) => {
  let cart = [];
  con.query(
    `SELECT * FROM users WHERE user_id = ${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      user_id = result[0].user_id;
      let album = {
        user_id: req.body.user_id,
        album_name: req.body.album_name,
        artists: req.body.artists,
        descriptions: req.body.descriptions,
        price: req.body.price,
        image: req.body.image,
        release_date: req.body.release_date,
        quantity: req.body.quantity,
        tracklist: req.body.tracklist,
      };
      cart.push(album);
      if (result[0].cart !== "") {
        cart = JSON.parse(result[0].cart);
      }
      con.query(
        `UPDATE users SET cart = ? WHERE user_id = ${req.params.id}`,
        JSON.stringify(cart),
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    }
  );
});

module.exports = router;
