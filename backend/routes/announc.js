const express = require("express");
const router = express.Router();
const Announc = require("../models/announc");
const User = require("../models/user");
const Group = require("../models/group");
const checkauth = require("../middleware/check-user");

/******************-Add Announcement-**********/

router.post("/Add", (req, res, next) => {
  const userId = req.body.userId;
  const userRole = req.body.userRole;
  const content = req.body.content;
  const ArrayOfGroups = req.body.ArrayOfGroups;
  console.log(userId, userRole, content, ArrayOfGroups);

  let createdAnnounc;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new Error("User not found");
      }
      if (
        user.roles.includes(userRole) &&
        (userRole === "student" || userRole === "admin")
      ) {
        // Check if the ArrayOfGroups contains valid group IDs
        const promises = ArrayOfGroups.map((groupId) => {
          return Group.findById(groupId).then((group) => {
            if (!group) {
              throw new Error(`Group ${groupId} not found`);
            }
            return true;
          });
        });
        return Promise.all(promises).then((results) => {
          if (results.some((result) => !result)) {
            throw new Error("One or more group IDs are invalid");
          }
          const announc = new Announc({
            userId: userId,
            userRole: userRole,
            content: content,
          });
          createdAnnounc = announc;

          // Check if the user has permission to add announcement to all groups
          const promises2 = ArrayOfGroups.map((groupId) => {
            return Group.findById(groupId).then((group) => {
              if (!group) {
                throw new Error(`Group ${groupId} not found`);
              }
              if (!user.groups.includes(groupId)) {
                throw new Error(
                  `User ${userId} is not a member of group ${groupId}`
                );
              }
              group.announcs.push(createdAnnounc);
              return group.save();
            });
          });

          return Promise.all(promises2);
        });
      } else {
        throw new Error("User role not authorized to add announcement");
      }
    })
    .then(() => {
      return createdAnnounc.save();
    })
    .then(() => {
      res.status(201).json({
        message: "Announcement added successfully",
        result: {
          ...createdAnnounc._doc,
          id: createdAnnounc._id,
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
