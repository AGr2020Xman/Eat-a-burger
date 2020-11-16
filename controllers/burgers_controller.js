const express = require('express');
const burger = require('../models/burger');

const router = express.Router();

// CRUD
// creating all routes
router.get("/", (req, res) => {
  burger.selectAll((data) => {
    const hbsObject = {
      burgers: data,
    };

    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", (req, res) => {
  burger.insertOne(
      ["burger_name", "devoured"], 
      [req.body.name, req.body.devoured],
      (result) => {
        console.log(result);
    // Send back the ID of the new burger
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", (req, res) => {
  const condition = `id = + ${req.params.id}`;

  console.log("condition", condition);

  burger.updateOne(
      { devoured: req.body.devoured },
      condition,
      (result) => {
          if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", (req, res) => {
  console.log(req.params);
  const condition = `id = + ${req.params.id}`;

  burger.delete(condition, (result) => {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;