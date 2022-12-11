const express = require("express");
const router = express.Router();
const multer = require("multer");
const { async } = require("rxjs");
const Group = require("../models/group");





/******************-Add Group-**********/

router.post(
    "/AddGroup",
    (req, res, next) => {
      const group = new Group({
        groupName: req.body.groupName,
        groupCategory: req.body.groupCategory,
        groupSpeciality: req.body.groupSpeciality,
        groupTeacher: req.body.groupTeacher,
        groupLessonHours: req.body.groupLessonHours,
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

/******************-Add Student to Group-**********/


const addStudentToGroup = function(groupId, user) {
  return Group.findByIdAndUpdate(
    groupId,
    { $push: { groupUsers: user } },
    { new: true, useFindAndModify: true }
  );
};

router.post("/test",(req, res, next) => 
{
  const start = async () => {
  const tutorial = await addStudentToGroup("6395f045375dbb688e105435", "6395f1fa0c7c021d8ec9acf3");
  }
  start().then((result) => {
    res.status(201).json({
      message: "User Added to Group Succesfully ",

    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      message: "Couldn't Add User to Group  !",
      error: err,
    });
  });

});












module.exports = router;
