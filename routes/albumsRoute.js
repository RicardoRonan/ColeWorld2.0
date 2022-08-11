const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const middleware = require("../middleware/auth");
const jwt = require("jsonwebtoken");

// Get all albums
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM albums", (err, result) => {
      if (err) throw err;
      res.send(result);
      console.log(result);
    });
  } catch (error) {
    console.log(error);
  }
});

// Gets one album
router.get("/:id", (req, res) => {
  try {
    con.query(
      `Select * from albums where album_id=${req.params.id}`,
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
// Add album
router.post("/", middleware, (req, res) => {
  console.log("added new album successfully");
  if (req.user.user_type === "admin") {
    const {
      user_id,
      album_name,
      artists,
      price,
      descriptions,
      image,
      release_date,
      quantity,
      tracklist,
    } = req.body;
    try {
      con.query(
        `INSERT into albums (user_id,album_name,artists,price,descriptions,image,release_date,quantity,tracklist) values ('${user_id}' ,'${album_name}', '${artists}', '${price}', '${descriptions}' , '${image}' , '   ${release_date}' , '${quantity}','${tracklist}')`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Access Denied");
  }
});
// edit album
router.put("/:id", middleware, (req, res) => {
  if (req.user.user_type === "admin") {
    console.log("updated album successfully");
    const {
      user_id,
      album_name,
      artists,
      price,
      descriptions,
      image,
      release_date,
      quantity,
      tracklist,
    } = req.body;
    try {
      con.query(
        `UPDATE albums SET user_id="${user_id}",album_name="${album_name}", artists="${artists}", price="${price}",descriptions="${descriptions}",image="${image}",release_date="${release_date}",quantity="${quantity}",tracklist="${tracklist}" WHERE album_id="${req.params.id}"`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Access Denied");
  }
});
// delete albums
router.delete("/:id", middleware, (req, res) => {
  if (req.user.user_type === "admin") {
    console.log("deleted album successfully");
    try {
      con.query(
        `DELETE FROM albums  WHERE album_id="${req.params.id}"`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("Access Denied");
  }
});
// cart

module.exports = router;
