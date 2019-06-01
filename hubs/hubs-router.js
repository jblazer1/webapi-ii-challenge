const express = require("express");

const Hubs = require("../data/db.js");

const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const posts = await Hubs.find(req.query);
//     res.status(200).json(posts);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Error retrieving the posts."
//     });
//   }
// });

// POST ================================== POST ======================================== POST ==================
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    } else {
      const hub = await Hubs.insert(req.body);
      res.status(201).json(hub);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding the hub" });
  }
});

// router.post("/:id/comments", async (req, res) => {
//   const { id } = req.params;
//   const messageInfo = { ...req.body, id: req.params.id };

//   if (!messageInfo.text) {
//     res
//       .status(400)
//       .json({ errorMessage: "Please provide text for the comment." });
//   } else if (!id) {
//     res
//       .status(404)
//       .json({ message: "The post with the specified ID does not exist." });
//   } else {
//     try {
//       const saved = await Hubs.insertComment(messageInfo);
//       res.status(201).json(saved);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         error: "There was an error saving the comment to the database"
//       });
//     }
//   }
// });
router.post("/:id/comments", async (req, res) => {
  const messageInfo = { ...req.body, post_id: req.params.id };
  // console.log("Post_ID", messageInfo.post_id);

  try {
    const saved = await Hubs.insertComment(messageInfo);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to save message", error });
  }
});

// GET ================================== GET ============================= GET ============================= GET
router.get("/", async (req, res) => {
  try {
    const hubs = await Hubs.find(req.query);
    res.status(200).json(hubs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const hub = await Hubs.findById(req.params.id);

    if (hub.length) {
      res.status(200).json(hub);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The post information could not be retrieved.", error });
  }
});

router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await Hubs.findCommentById(id);

    if (comments.length) {
      res.status(200).json(comments);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "The comments information could not be retrieved.", err });
  }
});

// PUT ================================= PUT =============================== PUT =========================== PUT
// router.put("/:id", async (req, res) => {
//   if (!req.body.title || !req.body.contents) {
//     res.status(400).json({
//       errorMessage: "Please provide title and contents for the post."
//     });
//   } else {
//     try {
//       const hub = await Hubs.update(req.params.id, req.body);
//       if (hub) {
//         res.status(200).json(hub);
//       } else {
//         res
//           .status(404)
//           .json({ message: "The post witht the specified ID does not exist." });
//       }
//     } catch (error) {
//       res
//         .status(500)
//         .json({ error: "The post information could not be motified.", error });
//     }
//   }
// });

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.findById(id)
    .then(userInfo => {
      if (!userInfo) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist. " });
      } else if (!changes.name || !changes.bio) {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      } else {
        db.update(id, changes).then(updated => {
          res.status(200).json({ updated });
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be modified.", error });
    });
});

// DELETE ============================== DELETE =========================== DELETE ============================== DELETE
router.delete("/:id", async (req, res) => {
  try {
    const count = await Hubs.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ success: "The delete has been successful. " });
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The post could not be removed", error });
  }
});
module.exports = router;
