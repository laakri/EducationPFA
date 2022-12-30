const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Group = require("../models/group");
const jwt = require("jsonwebtoken");
const router = express.Router();
const multer = require("multer");
const checkauth = require("../middleware/check-user");

/*************-Signup-********** */

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      name: req.body.name,
      phonenum: req.body.phonenum,
      password: hash,
      email: req.body.email,
      category: req.body.category,
      speciality: req.body.speciality,
      location: req.body.location,
      roles: [req.body.role],
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "user created!",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
          message: "This user already exited !",
        });
      });
  });
});
/*************-Login-********** */

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ phonenum: req.body.phonenum })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Incorrect Phone number !",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Incorrect password !",
        });
      }
      const token = jwt.sign(
        { phonenum: fetchedUser.phonenum, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        userName: fetchedUser.name,
        userRole: fetchedUser.roles[0],
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Authentication failed !",
      });
    });
});

/*************-Get User-********** */

router.get("/data/:id", (req, res, next) => {
  User.find({ _id: req.params.id })
    .select(["-password", "-__v"])
    .then((documents) => {
      res.status(200).json({
        message: "Profile runs seccesfully !",
        users: documents,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: "Profile Failed !",
      });
    });
});
/*************-Get Users-********** */

router.get("/data", (req, res, next) => {
  User.find({ roles: "student" })
    .select(["-phonenum", "-password", "-email", "-location", "-__v"])
    .then((documents) => {
      res.status(200).json({
        message: "Users data runs seccesfully !",
        users: documents,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: "Users data Failed !",
      });
    });
});
/*************-Get Users with filter-********** */

router.get("/search", (req, res) => {
  const query = req.query.name;

  User.find({ name: { $regex: "^" + query, $options: "i" }, roles: "student" })
    .then((documents) => {
      res.status(200).json({
        message: "User runs seccesfully !",
        users: documents,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: "User Failed !",
      });
    });
});

/*************-Get Teachers-********** */

router.get("/datateacher", (req, res, next) => {
  User.find({ roles: "teacher" })
    .select(["-phonenum", "-password", "-location", "-__v"])
    .then((documents) => {
      res.status(200).json({
        message: "Profile runs seccesfully !",
        users: documents,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: "Profile Failed !",
      });
    });
});

/*************-Update User-********** */

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

router.patch(
  "/up",
  multer({ storage: storage }).single("imgPath"),
  async (req, res, next) => {
    try {
      const id = req.body.userId;
      const url = req.protocol + "://" + req.get("host");

      const userUpdated = {
        userId: req.body.userId,
        Wallet: req.body.Wallet,
        country: req.body.country,
        responsTime: req.body.responsTime,
        imgPath: url + "/file-folder/" + req.file.filename,
        description: req.body.description,
        occupation: req.body.occupation,
        skills: req.body.skills,
        verified: "yes",
      };
      const options = { new: true };

      const userYP = await User.findByIdAndUpdate(id, userUpdated, options);
      res.send(userYP);
      console.log("User updated !");
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        error: err,
        message: "User update failed !",
      });
    }
  }
);

/***************-Delete-*******************/
router.delete("/delete/:id", checkauth, (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: "User deleted !" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Problem In deleting User !",
      });
    });
});
module.exports = router;
