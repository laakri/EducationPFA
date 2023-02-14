const express = require("express");
const router = express.Router();
const checkauth = require("../middleware/check-user");
const Announc = require("../models/announc");
const User = require("../models/user");

/******************-Add Announcement-**********/

router.post("/Add", (req, res, next) => {
  const userId = req.body.userId;
  const userRole = req.body.userRole;
  const content = req.body.content;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new Error("User not found");
      }
      if (
        user.roles.includes(userRole) &&
        (userRole === "student" || userRole === "admin")
      ) {
        const announc = new Announc({
          userId: userId,
          userRole: userRole,
          content: content,
        });
        return announc.save();
      } else {
        throw new Error("User role not authorized to add announcement");
      }
    })
    .then((result) => {
      res.status(201).json({
        message: "Announcement added successfully",
        result: {
          ...result._doc,
          id: result._id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Couldn't add Announcement !",
        error: err.message,
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
    .sort({ createdAt: -1 })
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

/******************-Delete Announcement-**********/
router.delete("/delete", async (req, res, next) => {
  try {
    const announcId = req.body.announcId;
    const userId = req.body.userId;
    const announcement = await Announc.findById(announcId);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    if (announcement.userId.toString() !== userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await announcement.remove();

    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});
/******************-Update Announcement-**********/
router.patch("/update", async (req, res, next) => {
  const announcId = req.body.announcId;
  const userId = req.body.userId;
  const content = req.body.content;
  try {
    const announcement = await Announc.findOne({
      _id: announcId,
      userId: userId,
    });
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    announcement.content = content;
    await announcement.save();
    return res
      .status(200)
      .json({ message: "Announcement updated successfully" });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});
module.exports = router;
