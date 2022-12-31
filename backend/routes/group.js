const express = require("express");
const router = express.Router();
const multer = require("multer");
const Group = require("../models/group");
const User = require("../models/user");

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
    const group = new Group({
      groupObject: req.body.groupObject,
      groupCategory: req.body.groupCategory,
      teacherId: req.body.teacherId,
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

const addStudentToGroup = function (groupId, user) {
  return Group.findByIdAndUpdate(
    groupId,
    { $push: { groupUsers: user } },
    { new: true, useFindAndModify: true }
  );
};
const addGroupToStudent = function (groupId, user) {
  return User.findByIdAndUpdate(
    user,
    { $push: { groups: groupId } },
    { new: true, useFindAndModify: true }
  );
};
router.post("/AddUserGroup", (req, res, next) => {
  const groupId = req.query.groupId;
  const userId = req.query.userId;
  const start = async () => {
    const Group = await addStudentToGroup(groupId, userId);
    const User = await addGroupToStudent(groupId, userId);
  };
  start()
    .then((result) => {
      res.status(201).json({
        message: "User <=> Group Succesfully ",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Couldn't Add User <=> Group  !",
        error: err,
      });
    });
});

/******************-get User <=> Group-**********/

router.get("/GetUsersByGroup", (req, res, next) => {
  const { groupId } = req.query;

  Group.findById(groupId)
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
      select: "-password -category -speciality -roles -groups -updatedAt -__v",
    })
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

/******************-Delete User <=> Group-**********/

const deleteStudentToGroup = function (groupId, user) {
  return Group.findByIdAndUpdate(
    groupId,
    { $pull: { groupUsers: user } },
    { new: true, useFindAndModify: true }
  );
};
const deleteGroupToStudent = function (groupId, user) {
  return User.findByIdAndUpdate(
    user,
    { $pull: { groups: groupId } },
    { new: true, useFindAndModify: true }
  );
};
router.post("/DeleteUserGroup", (req, res, next) => {
  const start = async () => {
    const Group = await deleteStudentToGroup(
      "63aac6f9ddd3d25b418e495d",
      "639846a9d0a18de5770ae976"
    );
    const User = await deleteGroupToStudent(
      "63aac6f9ddd3d25b418e495d",
      "639846a9d0a18de5770ae976"
    );
  };
  start()
    .then((result) => {
      res.status(201).json({
        message: "Delete User <=> Group Succesfully ",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Couldn't Delete User <=> Group  !",
        error: err,
      });
    });
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
    .then()
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
    .then()
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

/******************-Get Groups -**********/
router.get("/GetAllFiltred", (req, res, next) => {
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
  Group.find(filter)
    .limit(limit)
    .skip(skip)
    .sort({ groupStartDate: 1 })
    .select(["-groupUsers", "-__v"])
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
