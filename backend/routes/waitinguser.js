const express = require("express");
const { async } = require("rxjs");
const Wuser = require("../models/waitinguser");
const router = express.Router();

router.post("/AddToWl", (req, res, next) => {
  const wuser = new Wuser({
    userId: req.body.userId,
    groupId: req.body.groupId,
  });
  wuser
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User added to waitlist ",
        result: {
          ...result,
          id: result._id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "You are already in our Waitlist",
        error: err,
      });
    });
});
/******************-Get All-**********/
router.get("/GetAll", (req, res, next) => {
  Wuser.find()
    .select(["-__v"])
    .populate({
      path: "userId",
      select: "_id email name imgPath",
    })
    .populate({
      path: "groupId",
      select: "_id groupStartDate groupCategory ",
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

/******************-Delete from waitlist-**********/

router.delete("/delete/:id", async (req, res, next) => {
  try {
    await Wuser.deleteOne({ userId: req.params.id });
    res.status(200).json({
      message: "User  Deleted succesfully !",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
