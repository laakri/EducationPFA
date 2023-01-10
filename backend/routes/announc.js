const express = require("express");
const Announc = require("../models/announc");
const router = express.Router();
const checkauth = require("../middleware/check-user");

/******************-Add Announcement-**********/

router.post("/Add", (req, res, next) => {
  const announc = new Announc({
    userId: req.body.userId,
    userRole: req.body.userRole,
    content: req.body.content,
  });
  announc
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Announcement added succesfully",
        result: {
          ...result,
          id: result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Couldn't add Announcement !",
        error: err,
      });
    });
});

/******************-Get All-**********/
router.get("/GetAll", (req, res, next) => {
  const { userRole } = req.query;
  const query = userRole ? { userRole } : {};
  Announc.find(query)
    .select(["-__v"])
    .populate({
      path: "userId",
      select: "_id category name imgPath",
    })

    .sort({ createdAt: 1 })
    .then((documents) => {
      res.status(200).json({
        result: documents,
      });
    })
    .then()
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
