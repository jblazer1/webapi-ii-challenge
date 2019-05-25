const express = require("express");

const Hubs = require("../data/db.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Hubs.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the posts."
    });
  }
});

// POST ================================== POST ======================================== POST ===================
router.post("/", async (req, res) => {
  try {
    const hub = await Hubs.insert(req.body);

    if (!hub.title || !hub.contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    } else {
      res.status(201).json(hub);
    }
  } catch (error) {
    ({
      error: "There was an error while saving the post to the database"
    });
  }
});

// GET ================================== GET ============================= GET ============================= GET
router.get("/", async (req, res) => {
  try {
    const hubs = await Hubs.find(req.query);
    res.status(200).json(hubs);
  } catch (error) {
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});

module.exports = router;
