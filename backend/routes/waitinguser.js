const express = require("express");
const { async } = require("rxjs");
const Wuser = require("../models/waitinguser");
const router = express.Router();
const User = require("../models/user");
const Group = require("../models/group");
router.post("/AddToWl", (req, res, next) => {
  const userId = req.body.userId;
  const groupId = req.body.groupId;

  // Check if group exists and user is not already in it
  Group.findById(groupId)
    .populate("groupUsers")
    .exec((err, group) => {
      if (err) {
        return res.status(500).json({
          message: "Error finding group",
          error: err,
        });
      }

      if (!group) {
        return res.status(404).json({
          message: "Group not found",
        });
      }

      const userIndex = group.groupUsers.findIndex((user) =>
        user._id.equals(userId)
      );
      if (userIndex !== -1) {
        // User is already in the group
        return res.status(400).json({
          message: "User is already in the group",
        });
      }

      const wuser = new Wuser({
        userId: userId,
        groupId: groupId,
      });

      wuser
        .save()
        .then((result) => {
          res.status(201).json({
            message: "User added to waitlist",
            result: {
              ...result,
              id: result._id,
            },
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Error saving waitlist entry",
            error: err,
          });
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
