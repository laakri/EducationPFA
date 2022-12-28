const express = require("express");
const Categ = require("../models/category");
const router = express.Router();

/******************-Add CAtegory-**********/

router.post("/Add", (req, res, next) => {
  const categ = new Categ({
    categName: req.body.categName,
  });
  categ
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Category added succesfully",
        result: {
          ...result,
          id: result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Couldn't add Category !",
        error: err,
      });
    });
});

/******************-Get All-**********/
router.get("/GetAll", (req, res, next) => {
  Categ.find()
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

module.exports = router;
