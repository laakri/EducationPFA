const mongoose = require("mongoose");
const User = require("./user");
const Group = require("./group");

const waitinguser = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      unique: true,
      required: true,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Group,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wuser", waitinguser);
