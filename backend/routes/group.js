const express = require("express");
const router = express.Router();
const multer = require("multer");
const { async } = require("rxjs");
const Group = require("../models/group");
const User = require("../models/user");
const fs = require("fs");
const { group } = require("console");
const randomstring = require("randomstring");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/file-folder");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

/******************-Add Group-**********/

router.post(
  "/AddGroup",
  multer({ storage: storage }).single("file"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const randomString = randomstring.generate(8);
    const group = new Group({
      groupCode: randomString,
      groupObject: req.body.groupObject,
      teacherId: req.body.teacherId,

      groupCategory: req.body.groupCategory,
      groupDescription: req.body.groupDescription,

      groupFilePath: url + "/file-folder/" + req.file.filename,

      groupPrice: req.body.groupPrice,
      groupLevel: req.body.groupLevel,
      groupStartDate: req.body.groupStartDate,
      groupPeriode: req.body.groupPeriode,
      groupHourPerWeek: req.body.groupHourPerWeek,

      groupExperienseNeed: req.body.groupExperienseNeed,
      groupExperienseGain: req.body.groupExperienseGain,
      groupFuturesGain: req.body.groupFuturesGain,

      groupDetails: req.body.groupDetails,
    });

    group
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Group Added Succesfully ",
          result: {
            ...result,
            id: result._id,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Couldn't Add Group  !",
          error: err,
        });
      });
  }
);

/******************-Add User <=> Group-**********/

router.post("/AddUserGroup", async (req, res, next) => {
  const groupId = req.query.groupId;
  const userId = req.query.userId;
  const Paymentstatu = req.query.Paymentstatu;
  try {
    const group = await Group.findById(groupId);
    if (!group.groupUsers.includes(userId)) {
      await Group.findByIdAndUpdate(
        groupId,
        { $push: { groupUsers: userId } },
        { new: true, useFindAndModify: true }
      );

      await User.findByIdAndUpdate(
        userId,
        { $push: { groups: groupId } },
        { new: true, useFindAndModify: true }
      );
      await User.findByIdAndUpdate(
        userId,
        { Paymentstatu: Paymentstatu },
        { new: true }
      );

      res.status(201).json({
        message: "User <=> Group Succesfully ",
      });
    } else {
      throw "User already exists in the group";
    }
  } catch (err) {
    res.status(500).json({
      message: "User already exists in the group",
      error: err,
    });
  }
});

/******************-get User <=> Group-**********/

router.get("/GetUsersByGroup", async (req, res, next) => {
  const { groupId } = req.query;
  try {
    const documents = await Group.findById(groupId)
      .select([
        "-groupObject",
        "-groupCategory",
        "-teacherId",
        "-groupDescription",
        "-groupFilePath",
        "-groupPrice",
        "-groupLevel",
        "-groupExperienseNeed",
        "-groupExperienseGain",
        "-groupFuturesGain",
        "-groupDetails",
        "-__v",
      ])
      .populate({
        path: "groupUsers",
        select:
          "-password -category -speciality -roles -groups -updatedAt -__v",
      });

    res.status(200).json({
      result: documents,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});
/******************-Delete User <=> Group-**********/

router.post("/DeleteUserGroup", async (req, res, next) => {
  const groupId = req.query.groupId;
  const userId = req.query.userId;

  try {
    await Group.findByIdAndUpdate(
      groupId,
      { $pull: { groupUsers: userId } },
      { new: true, useFindAndModify: true }
    );
    await User.findByIdAndUpdate(
      userId,
      { $pull: { groups: groupId } },
      { new: true, useFindAndModify: true }
    );

    res.status(201).json({
      message: "Delete User <=> Group Succesfully ",
    });
  } catch (err) {
    res.status(500).json({
      message: "Couldn't Delete User <=> Group  !",
      error: err,
    });
  }
});

/******************-Get Groups by Category -**********/
router.get("/GetAll", (req, res, next) => {
  const { groupCategory } = req.query;
  const query = groupCategory ? { groupCategory } : {};

  Group.find(query)
    .select(["-__v"])
    .then((documents) => {
      res.status(200).json({
        result: documents,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

/******************-Get Groups by Category -**********/
router.get("/GetOne/:id", (req, res, next) => {
  const id = req.params.id;

  Group.find({ _id: id })
    .select(["-__v"])
    .then((documents) => {
      res.status(200).json({
        result: documents,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
/******************-Get  All the Groups By Teacher Id-**********/
router.get("/GetGroupsCodeById/:teacherId", async (req, res, next) => {
  const teacherId = req.params.teacherId;
  try {
    const groups = await Group.find({ teacherId: teacherId }).select(
      "_id groupCode"
    );
    if (groups.length === 0) {
      return res.status(404).json({
        message: `No groups found for teacher with ID ${teacherId}`,
      });
    }

    res.status(200).json({
      message: "Group codes retrieved successfully",
      groups: groups,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

/******************-Get Groups -**********/
router.get("/GetAllFiltred", async (req, res, next) => {
  const { groupCategory, groupLevel } = req.query;
  const limit = req.query.pageSize;
  const page = req.query.page;

  const skip = page * limit;

  const filter = {};
  if (groupCategory) {
    filter.groupCategory = groupCategory;
  }
  if (groupLevel) {
    filter.groupLevel = groupLevel;
  } /*
  var currentDate = new Date();
  
  filter.groupStartDate = { $gte: currentDate };
*/
  try {
    const documents = await Group.find(filter)
      .limit(limit)
      .skip(skip)
      .sort({ groupStartDate: 1 })
      .select(["-groupUsers", "-__v"]);

    res.status(200).json({
      result: documents,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});
/******************-Get Stats -**********/
router.get("/GetStats", async (req, res, next) => {
  try {
    const StudentCount = await User.find({ roles: "student" }).count();
    const TeacherCount = await User.find({ roles: "teacher" }).count();
    const GroupCount = await Group.find().count();
    const groupCategory = await Group.aggregate([
      {
        $group: {
          _id: "$groupCategory",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ])
      .exec()
      .then((results) => {
        return results[0]._id;
      });

    const stat = {
      StudentCount: StudentCount,
      TeacherCount: TeacherCount,
      GroupCount: GroupCount,
      groupCategory: groupCategory,
    };

    res.status(200).json({
      result: stat,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

/***************-Delete Group-*******************/

router.delete("/delete", async (req, res, next) => {
  try {
    const filepath = await Group.findById(req.params.id).select(
      "groupFilePath"
    );
    fs.unlink(filepath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    await Group.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "User Deleted seccesfully !",
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
