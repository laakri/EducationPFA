const express = require("express");
const router = express.Router();
const multer = require("multer");
const Group = require("../models/group");





/******************-Add Group-**********/

router.post(
    "/AddGroup",
    (req, res, next) => {
      const group = new Group({
        groupName: req.body.groupName,
        groupSpeciality: req.body.groupSpeciality,
        groupTeacher: req.body.groupTeacher,
        groupLessoncount: req.body.groupLessoncount,
        groupLessondate: req.body.groupLessondate,

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


module.exports = router;
