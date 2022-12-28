const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const enumValues = require("mongoose-enumvalues");
const User = require("./user");

const groupSchema = mongoose.Schema(
  {
    /*teacherId: { type: mongoose.Schema.Types.ObjectId, ref: User },*/

    groupObject: { type: String, required: true },
    groupCategory: { type: String, required: true },
    teacherId: { type: String, required: true },
    groupDescription: { type: String, required: true },

    groupFilePath: {
      type: String,
      default: "../../assets/reactjs.png",
    },

    groupPrice: { type: String, required: true },
    groupLevel: { type: String, default: "Beginner" },
    groupStartDate: { type: String, required: true },
    groupPeriode: { type: String, default: "1" },
    groupHourPerWeek: { type: String, default: "10" },

    groupExperienseNeed: { type: String, default: "None" },
    groupExperienseGain: { type: String, default: "None" },
    groupFuturesGain: { type: String, default: "None" },

    groupDetails: { type: String, default: "None" },

    groupUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const enumOptions = {};

groupSchema.plugin(enumValues, enumOptions);

groupSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Group", groupSchema);
